---
title: How to remove space occupied errors in ruby under cygwin
description: "When you install custom ruby versions using a tool like ruby-build you might run into address space occupied problems."
---

After successfully installing ruby 2.0.0-p247 in [cygwin](http://cygwin.com/) with [ruby-build](https://github.com/sstephenson/ruby-build) as a [rbenv](https://github.com/sstephenson/rbenv) plugin. I was getting weird `child_info_fork::abort:` errors that caused my call to `gem install bundler` to fail.

The error messages looked like this:

	child_info_fork::abort: address space needed by '...' (...) is already occupied

I found this [mailing list entry](http://www.cygwin.com/ml/cygwin/2012-02/msg00701.html) that included a [rubyrebase script](http://www.cygwin.com/ml/cygwin/2012-02/txt00030.txt) and a [post describing a solution for rvm](http://gsjhywel.swan.ac.uk/?p=12) which was similiar to [this](http://ficial.wordpress.com/2011/07/06/cygwin-and-rails-unable-to-remap-to-same-address-as-parent-died-waiting-for-dll-loading-errno-11/).

Since these solutions lacked a single script that could be executed using `ash` I have created my own. You **have** to run the script using

	ash -c '/path/to/rubyrebase'

Make sure you have closed all cygwin processes.

	#!/bin/ash

    # Define constants
    PATH=$(cd $tp2 && pwd):/usr/bin:/bin
    
    # Define functions
    cleanup()
    {
        rm -f "${TmpFile}"
        exit ${ExitCode}
    }
    
    # Set temp directory
    TmpDir="${TMP:-${TEMP:-/tmp}}"
    
    TmpFile="$TmpDir/rubyrebase.lst"
    
    find ~/.rbenv/versions/ -iname "*.dll" -print > "${TmpFile}"
    find ~/.rbenv/versions/ -iname "*.so" -print >> "${TmpFile}"
    
    rebaseall -v -T "${TmpFile}"
    
    ExitCode=$?
    
    cleanup
