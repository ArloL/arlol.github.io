---
layout: default
title: Automatically Test ClassLoader Memory Leaks
subtitle: How to test for memory leaks in Tomcat 7.
description: How to test for memory leaks in Tomcat 7.
author: Arlo O'Keeffe
published: true
---

Have you ever wondered whether your web application is leaking your classloader? Normally you would manually test using VisualVM or jProfiler which can be tedious and you may forget to test before releasing. Therefore I present a small jUnit test that you can run in your Continuous Integration tool to test for a leaking classloader.

    import static com.jayway.awaitility.Awaitility.*;
    import static org.junit.Assert.*;

    import java.io.File;
    import java.lang.ref.WeakReference;
    import java.net.UnknownHostException;
    import java.util.concurrent.Callable;

    import org.apache.catalina.Context;
    import org.apache.catalina.core.JreMemoryLeakPreventionListener;
    import org.apache.catalina.core.StandardContext;
    import org.apache.catalina.core.ThreadLocalLeakPreventionListener;
    import org.apache.catalina.startup.Tomcat;
    import org.junit.Test;

    import com.jayway.awaitility.Duration;

    public class MemoryLeakTest {

        @Test
        public void testMemoryLeak() throws Exception {
            Tomcat tomcat = null;
            try {
                tomcat = getTomcatInstance();

                Context context = tomcat.addWebapp("/test", "../../test.war");

                if (context instanceof StandardContext) {
                    StandardContext standardContext = (StandardContext) context;
                    standardContext.setClearReferencesHttpClientKeepAliveThread(true);
                    standardContext.setClearReferencesStatic(true);
                    standardContext.setClearReferencesStopThreads(true);
                    standardContext.setClearReferencesStopTimerThreads(true);
                }

                tomcat.getServer().addLifecycleListener(
                        new JreMemoryLeakPreventionListener());
                tomcat.getServer().addLifecycleListener(
                        new ThreadLocalLeakPreventionListener());

                tomcat.start();

                final WeakReference<ClassLoader> classLoaderReference =
                        new WeakReference<ClassLoader>(context.getLoader()
                                .getClassLoader());

                tomcat.getHost().removeChild(context);
                context = null;

                await().atMost(Duration.ONE_MINUTE).until(new Callable<Boolean>() {

                    @Override
                    public Boolean call() throws Exception {
                        if (classLoaderReference.get() != null) {
                            System.gc();
                            return false;
                        }
                        return true;
                    }

                });
            } finally {
                if (tomcat != null) {
                    try {
                        tomcat.stop();
                        tomcat.destroy();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        private Tomcat getTomcatInstance() throws UnknownHostException {
            File tempCatalinaBase =
                    new File(System.getProperty("tomcat.test.catalina.base",
                            "target/tomcat-tmp"));
            if (tempCatalinaBase.exists() && !delete(tempCatalinaBase)) {
                fail("Unable to delete existing temporary directory for test");
            }
            if (!tempCatalinaBase.mkdirs() && !tempCatalinaBase.isDirectory()) {
                fail("Unable to create temporary directory for test");
            }

            File appBase = new File(tempCatalinaBase, "webapps");
            if (!appBase.mkdir() && !appBase.isDirectory()) {
                fail("Unable to create appBase for test");
            }

            System.setProperty("catalina.base", tempCatalinaBase.getAbsolutePath());

            Tomcat tomcat = new Tomcat();
            tomcat.setPort(0);

            tomcat.setBaseDir(tempCatalinaBase.getAbsolutePath());
            tomcat.getHost().setAppBase(appBase.getAbsolutePath());

            return tomcat;
        }

        private static boolean delete(File file) {
            // Check if file is directory/folder
            if (file.isDirectory()) {
                // Get all files in the folder
                File[] files = file.listFiles();
                for (int i = 0; i < files.length; i++) {
                    // Delete each file in the folder
                    if (!delete(files[i])) {
                        return false;
                    }
                }
                // Delete the folder
                return file.delete();
            } else {
                // Delete the file if it is not a folder
                return file.delete();
            }
        }

    }