---
layout: default
title: "Cygwin dependencies for using ruby-build"
subtitle: "Which dependencies to install for cygwin when using ruby-build."
description: "Which dependencies to install for cygwin when using ruby-build."
author: Arlo O'Keeffe
published: true
---

I really like using [rbenv](https://github.com/sstephenson/rbenv) in combination with [ruby-build](https://github.com/sstephenson/ruby-build). It's a lightweight alternative to [rvm](rvm.io). To use it in [cygwin](http://cygwin.com/) I had to install the following dependencies:

*   binutils
*   make
*   zlib-devel
*   openssl-devel