---
layout: default
title: IntAirAct
subtitle: A Framework enabling Device Interaction using REST.
description: A Framework enabling Device Interaction using REST.
author: Arlo O'Keeffe
github_link: https://github.com/ase-lab/IntAirAct
---
# What is IntAirAct?

Imagine you could look at the images of all the devices around and then flick at your
TV to show it on the big screen.

IntAirAct enables Developers to achieve just that.

It finds all the devices on the network, allows you to share content between them
and tell other devices to show that content. And all of that using stuff we all
know and love: HTTP, REST and JSON.

# How do I start using it?

Choose your environment: [C#](#c-sharp), [iOS](#ios) or [OS&nbsp;X](#osnbspx).

## C Sharp

The easiest way to get started in C# is using [NuGet](https://nuget.org/). When NuGet is installed: Right click on your project and choose *Manage NuGet Packages…*. Search for the *IntAirAct* package and install it. This will also automatically install all dependencies.

## iOS

[Download](https://github.com/ase-lab/IntAirAct/downloads) the latest iOS version and unarchive the Frameworks.

Place all of the Frameworks inside your project folder. We recommend a
sub-folder called Frameworks.

Drag the Frameworks into your project.

Make sure that all the Frameworks are linked with your binary.

Add `-ObjC` to the *Other Linker Flags* Build Setting and link the following Frameworks:

* CFNetwork
*	libxml2.dylib
*	Security

Now you can head to the [Documentation](#documentation) to get started or to
the [Examples](#examples) for some implementation ideas.

## OS&nbsp;X

[Download](https://github.com/ase-lab/IntAirAct/downloads) the latest iOS version and unarchive the Frameworks.

Place all of the Frameworks inside your project folder. We recommend a
sub-folder called Frameworks.

Drag the Frameworks into your project.

Link the Binary with the following Frameworks:

*	CocoaLumberjack.framework
*	IntAirAct.framework

Add a Copy Files build phase copying the following files to Frameworks:

*	CocoaAsyncSocket.framework
*	CocoaHTTPServer.framework
*	CocoaLumberjack.framework
*	IntAirAct.framework
*	RestKit.framework
*	RestKit+Blocks.framework
*	RoutingHTTPServer.framework

Now you can head to the [Documentation](#documentation) to get started or to
the [Examples](#examples) for some implementation ideas.

# Examples

## Image Sharing

See [IntAirActImageIOS](https://github.com/ase-lab/IntAirActSampleIOS)
and [IntAirActImageOSX](https://github.com/ase-lab/IntAirActSampleOSX).

# Compatibility

IntAirAct is compatible with iOS >= 4.0 and OS&nbsp;X >= 10.6.

# Documentation

Look at the [Code Documentation](#docs).

# Use as a Nested Project
A nested project enables the change of Framework code during development.
This could make debugging easier. But it also increases the build time for
fresh builds.

If you are using git for your project, add it as a submodule:

    git submodule add https://github.com/ase-lab/IntAirAct.git Frameworks/IntAirAct
    cd Frameworks/IntAirAct
    git submodule update --init --recursive

If you are not using git for your project:

    git clone --recursive https://github.com/ase-lab/IntAirAct.git Frameworks/IntAirAct

Drag the IntAirAct project into your project to add it as a nested project.

Now it depends on whether your are coding for
[iOS](#ios---nested) or [OS&nbsp;X](#osnbspx---nested).

## iOS - Nested

Add `IntAirActStaticIOS` as a Target Dependency of your main target.

Link the following Static Libraries:

*	libCocoaAsyncSocket.a
*	libCocoaHTTPServer.a
*	libCocoaLumberjack.a
*	libIntAirAct.a
*	libRestKit.a
*	libRestKit+Blocks.a
*	libRoutingHTTPServer.a

Add `-ObjC` to the *Other Linker Flags* Build Setting and link the following Frameworks:

*	CFNetwork
*	CoreData
*	CoreGraphics
*	MobileCoreServices
*	QuartzCore
*	Security
*	SystemConfiguration

Now you can head to the [Documentation](#documentation) to get started or to
the [Examples](#examples) for some implementation ideas.

## OS&nbsp;X - Nested

Add `IntAirActOSX` as a Target Dependency of your main target.

Link the Binary with the following Frameworks:

*	CocoaLumberjack.framework
*	IntAirAct.framework

Add a Copy Files build phase copying the following files to Frameworks:

*	CocoaAsyncSocket.framework
*	CocoaHTTPServer.framework
*	CocoaLumberjack.framework
*	IntAirAct.framework
*	RestKit.framework
*	RestKit+Blocks.framework
*	RoutingHTTPServer.framework

Now you can head to the [Documentation](#documentation) to get started or to
the [Examples](#examples) for some implementation ideas.

### Build the Framework distribution

To build IntAirAct as a Framework you use these rake tasks. Please note that
Ruby 1.9 is *required*.

For iOS and OS&nbsp;X use `bundle exec rake build`, otherwise use
`bundle exec rake ios:build` or `bundle exec rake osx:build` respectively.

The Frameworks for iOS are in `build/Release-iphoneos` and for OS&nbsp;X
in `build/Release`.

#### Discussion

The advantage is that you only build it once. A nested project always
builds everything for a fresh build (e.g. after a clean).

A disadvantage is that you can't change the code of the Framework directly
if you want to. You also can't browse the source files to set breakpoints.
But you can step into the Framework functions. This makes debugging a
little more difficult.
