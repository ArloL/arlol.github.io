---
title: LinkageError with Spring Boot Developer tools
description: Customizing the restart classloader to prevent LinkageError when using the Spring Boot Developer tools.
---

While converting an existing Spring application to Spring Boot I came across
a `LinkageError`:

    Caused by: java.lang.LinkageError: loader constraint violation in interface itable initialization: when resolving method "com.sun.proxy.$Proxy203.payBill(Lcom/example/Bill;)V" the class loader (instance of org/springframework/boot/devtools/restart/classloader/RestartClassLoader) of the current class, com/sun/proxy/$Proxy203, and the class loader (instance of sun/misc/Launcher$AppClassLoader) for interface com/example/services/BillService have different Class objects for the type com/example/Bill used in the signature
        at java.lang.Class.getDeclaredConstructors0(Native Method)
        at java.lang.Class.privateGetDeclaredConstructors(Class.java:2671)
        at java.lang.Class.getConstructor0(Class.java:3075)
        at java.lang.Class.getConstructor(Class.java:1825)
        at java.lang.reflect.Proxy.newProxyInstance(Proxy.java:729)
        at org.springframework.aop.framework.JdkDynamicAopProxy.getProxy(JdkDynamicAopProxy.java:121)
        at org.springframework.aop.framework.ProxyFactory.getProxy(ProxyFactory.java:109)
        at org.springframework.amqp.remoting.client.AmqpProxyFactoryBean.afterPropertiesSet(AmqpProxyFactoryBean.java:52)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1637)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1574)
        ... 47 common frames omitted

It worked fine when I 
[disabled restarting](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-devtools-restart-disable)
of the Developer tools. So I checked the documentation and found the section on
[how restarting works](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-spring-boot-restart-vs-reload).
It uses two different classloaders. A restart classloader for changing classes
and a base classloader for classes that don't.

The stack trace tells us that both classloaders are loading Class `Bill`.
This is because `BillService` is from a shared library and uses `Bill` from my
code. The base classloader loads both classes on startup. The restart
classloader uses `BillService` from the base classloader and loads `Bill` again.

To prevent this you have to load the shared library with the restart
classloader. Thus we
[customize the restart classloader](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-devtools-customizing-classload)
to include the shared library:

    restart.include.example-shared=/example-shared-[\\.\\w-]+\.jar
