---
published: true
layout: default
title: Cygwin dependencies for using ruby-build
subtitle: Which dependencies to install for cygwin when using ruby-build.
description: Which dependencies to install for cygwin when using ruby-build.
---

I really like using [rbenv](https://github.com/sstephenson/rbenv) in combination with [ruby-build](https://github.com/sstephenson/ruby-build). It's a lightweight alternative to rvm. To use it in cygwin I had to install the following dependencies:

*   binutils
*   make
*   zlib-devel
*   openssl-devel