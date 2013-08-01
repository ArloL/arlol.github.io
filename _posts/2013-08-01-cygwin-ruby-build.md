---
published: true
layout: default
title: Automatically Test ClassLoader Memory Leaks
subtitle: How to test for memory leaks in Tomcat 7.
description: How to test for memory leaks in Tomcat 7.
---

## Cygwin dependencies for using ruby-build

I really like using [rbenv](https://github.com/sstephenson/rbenv) in combination with [ruby-build](https://github.com/sstephenson/ruby-build). It's a lightweight alternative to rvm. To use it in cygwin I had to install the following dependencies:

*   binutils
*   make
*   zlib-devel
*   openssl-devel