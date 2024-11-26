---
title: Export Dependencies Plugin - Use Maven and Buck in parallel
description: The result of an experiment to use two build systems in parallel.
---

I was experimenting with [Buck](https://buckbuild.com) for work. I heard about
it first at [Devoxx UK 2015](http://www.devoxx.co.uk) and was wondering whether
we could use it to speed up our CI builds.

Why only our CI builds?

One problem is that we're a Windows shop and Buck only has Linux and macOS
Support. Second we use Maven and the Maven IDE integration. We do this to
reduce complexity for our apprentices and new hires.

This means Buck was never going to be a full replacement for us. But it could
be of use on our CI servers which are Linux. What I needed was a way to produce
BUCK files from the existing Maven pom.xml files. And the result of that work
is the [export-dependencies-maven-plugin](https://github.com/evosec/export-dependencies-maven-plugin).

To test it on your project call

~~~~
mvn de.evosec:export-dependencies-maven-plugin:buck
~~~~

It will convert your pom

~~~
<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>de.evosec</groupId>
    <artifactId>buck-single-dependency</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <dependencies>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>18.0</version>
        </dependency>
    </dependencies>
</project>
~~~

to a target/BUCK file like this

~~~
java_library(
  name = 'COMPILE',
  visibility = ['PUBLIC'],
  exported_deps = [
    ':com.google.guava-guava-jar'
  ],
)

java_library(
  name = 'OPTIONAL',
  visibility = ['PUBLIC'],
  exported_deps = [

  ],
)

java_library(
  name = 'PROVIDED',
  visibility = ['PUBLIC'],
  exported_deps = [

  ],
)

java_library(
  name = 'RUNTIME',
  visibility = ['PUBLIC'],
  exported_deps = [

  ],
)

java_library(
  name = 'TEST',
  visibility = ['PUBLIC'],
  exported_deps = [

  ],
)

prebuilt_jar(
  name = 'com.google.guava-guava-jar',
  binary_jar = ':remote-com.google.guava-guava-jar',
)

remote_file(
  name = 'remote-com.google.guava-guava-jar',
  out = 'com.google.guava-guava-jar-18.0.jar',
  url = 'mvn:com.google.guava:guava:jar:18.0',
  sha1 = 'cce0823396aa693798f8882e64213b1772032b09',
)
~~~

And then you can use a BUCK file like this to build your project

~~~
java_library(
    name = "main",
    srcs = glob(["src/main/java/**/*.java"]),
    resources = glob(["src/main/resources/**"]),
    resources_root = "src/main/resources",
    exported_deps = [
        "//target:COMPILE",
    ],
    deps = [
        "//target:OPTIONAL",
    ],
    provided_deps = [
        "//target:PROVIDED",
    ],
)

java_test(
    name = "test",
    srcs = glob(["src/test/java/**/*Test.java"]),
    resources = glob(["src/test/resources/**"]),
    resources_root = "src/test/resources",
    source_under_test = [":main"],
    deps = [
        ":main",
        ":test_utils",
        "//target:TEST",
        "//target:OPTIONAL",
        "//target:PROVIDED",
    ],
)

java_library(
    name = "test_utils",
    srcs = glob(["src/test/java/**/*.java"], excludes = ["**/*Test.java"]),
    deps = [
        ":main",
        "//target:TEST",
        "//target:OPTIONAL",
        "//target:PROVIDED",
    ],
)
~~~

This was running for a while but I never got around to trying to get Buck to produce WAR files or build our GWT projects. In the end I realized that the increased complexity is too high a price for the promised speed-up of our builds. At the end of the day we're just a small dev shop with *"average"* developers.
