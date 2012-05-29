# IntAirAct

## A Framework enabling Device Interaction using REST

>Ziel: Die Darstellung der zu lösenden Aufgabe, der beschrittenen Lösungswege und der Ergebnisse ist präzise und kompakt auszuführen.

# Acknowledgement

Thanks to [Robbie Hanson](http://deusty.blogspot.ca/), [Matt Stevens](http://codeworkshop.net/), [Blake Watters](https://github.com/blakewatters), [Jeff Verkoeyen](http://jeffverkoeyen.com) and [Taras Kalapun](http://kalapun.com/) for creating incredibly good open source code that I could learn a lot from and re-use it.

Also many thanks to all the contributors of [RestKit](https://github.com/RestKit/RestKit), [CocoaAsyncSocket](https://github.com/robbiehanson/CocoaAsyncSocket), [RoutingHTTPServer](https://github.com/mattstevens/RoutingHTTPServer), [CocoaHTTPServer](https://github.com/robbiehanson/CocoaHTTPServer), [CocoaLumberjack](https://github.com/robbiehanson/CocoaLumberjack) and [iOS-Framework](https://github.com/jverkoey/iOS-Framework).

Thanks to Chris Burns for reviewing my code and giving me feedback.

Thanks to Paul Hegarty and [Leland Stanford Junior University](http://www.stanford.edu) for the course [CS193P "iPad and iPhone Application Development"](http://www.stanford.edu/class/cs193p) that is available for free via [iTunes U](http://itunes.stanford.edu/).

Thanks to Prof. Dr. Manfred Meyer and [Prof. Dr. Frank Maurer](http://ase.cpsc.ucalgary.ca/ase/Frank.Maurer.php) for giving me the possibility to write my thesis in the beautiful town of Calgary, Alberta, Canada.

# Zusammenfassung

# Abstract

# Content

1.	Introduction
	1.	Motivation
	2.	Research Goals
2.	Related Work
3.	REST
4.	Range of Applications
	1.	Device Interaction
	2.	Multi-Surface Environments
	3.	Ubiquitous Computing
	4.	Other Usage Scenarios
6.	Requirements
	1.	Platforms
	2.	Application Requirements
	3.	API requirements
7.	Design
	1.	Architecture
	2.	Application Stack
	3.	Design Decisions
8.	Implementation
	1.	Restrictions
	2.	Technology Evaluation
9.	Evaluation
	1.	Performance
	2.	API Usability
	4.	User Experience
10.	Conclusion
	1.	Future Work

# List of Figures

# List of Tables

# List of Listings

# Introduction

##	Motivation

> Why am I doing this?

The number of devices used in everyday and professional life is increasing daily. Currently most of the applications for these devices focus on a single user and, if necessary, use web technologies for collaboration. A server acts as the hub for the devices. For remote situations this architecture is sensible. But in local situations the devices should communicate directly with each other. This is more efficient and opens up the possibility for new usage scenarios: namely Device Interaction. These interactions can consist of basic sharing of information such as contacts or be more advanced using gestures and location data.

In this thesis I will present a framework that enables these interactions.

## Research goals

The basis of these research goals comes from the [Google Web Toolkit](https://developers.google.com/web-toolkit/) and many parts are copied or adapted from it's [mission statement](https://developers.google.com/web-toolkit/makinggwtbetter#introduction).

IntAirAct's goal is to radically improve the user experience by enabling developers to use web technologies to build interacting applications for any modern device.

**to radically improve**

The unconventional premise of IntAirAct (i.e. use REST, JSON and HTTP in a local network, having HTTP servers on mobile devices) sets the tone for how we are to be open-minded about approaches that make a big impact. We are willing to invest extra consideration and work to find solutions of the "order-of-magnitude" rather than the "good enough" variety.

**user experience**

The experience we want to optimize is the end user's experience. We strongly prioritize features that can make the biggest difference to end users. Obviously, we want to make developers' lives easier, too, but never at the expense of the user experience.

**by enabling developers**

IntAirAct is about enabling developers to do great things, not necessarily spoon-feeding them or putting them in a straightjacket. IntAirAct strives to be easy to use without sacrificing efficiency. We generally prioritize ensuring that the basics of IntAirAct work very well rather than adding dozens of features. It's much better to provide a solid platform so that other great libraries can be built on top of IntAirAct rather than trying to be all things to all people out of the box.

**web technologies**

The web is everywhere. A lot of developers start by learning web oriented languages such as HTML, CSS and PHP. We want to utilize this existing knowledge and move it into the local domain. This makes the learning curve very steep. Steep as in you learn a lot very quickly.

**interacting applications**

We strongly believe that device interaction will play a big role in future application development and therefore we should start creating the basic frameworks for developers to use.

**any modern device**

IntAirAct should be as portable as it can be so long as it doesn't involve sacrificing user experience in any significant way.

# Related Work

> I want to show how my research is unique. Distinguish differences of other approaches.
> IEEE Explore
> Scopus
> ACM DL (Scopus indexes ACM)
> 

In this section I briefly present some of the research literature related to device communication.

> MOM, protocols, TCP/IP, HTTP, GameKit

> Since I don't have that many papers about related stuff I first explain the main problem: Then I write that there is nothing that does what I do.
Thus I explain parts of what I will achieve and for that I can then go through related work.
An example: We need device discovery. For device discovery we can use UPNP, Bonjour and JINI.
Then later in design decisions I just compare the advantages and disadvantages of the systems and explain my choice.

# REST

> What is REST for me?

I understand it rather as the REST API than the architecture style described by Fielding [quote dissertation].

# Range of applications

*	Device interaction
*	Multi-Surface Environments
*	Ubiquitous Computing

## Device Interaction

> What is Device Interaction to me?

There are obviously two parts here: Device and Interaction. What a device is, is obvious. But what exactly do I mean by interaction.

###	Interaction

A conversation or exchange between people.

*	Share
	*	Data
	*	Presentations
	*	Images
	*	Videos
	*	General Messages
	
### What is Device Interaction

Device Interaction is an exchange between devices.

### Existing examples for Device Interaction

*	AirPlay (AirTunes)
*	AirDrop
*	Remote App(s) for iOS
*	Bump
*	Joypad
*	Remote Apps for Android
*	DLNA

## Multi-surface environments

>	Look at the Multi-Surface papers from Chris and Teddy
>	The Avengers, Minority Report ;)

## Ubiquitous Computing

>	Take usage scenarios out of the Ubiquitous Computing field that can use this technology.

## Other Usage Scenarios

> Can I think of more?

# Requirements

> Take the range of applications and build up a list of requirements.

## Platforms

> A platform is a combination of device/OS/language. This is a list of the platforms that should be supported.

One of the goals is to support all modern devices. Here is a list of the devices that are meant by "modern device". Additionally all the Operating Systems are listed as well as the programming languages that have to be supported by the framework.

*	Mobile devices
	*	Tablets
		*	iPad (iOS >= 4.0)
		*	Android Tablets (Android >= 2.3)
	*	Phones
		*	iPhone (iOS >= 4.0)
		*	Android Phones (Android >= 2.3)
		*	Windows Phone (>= 7)
		*	Blackberry 
*	Touch Tables
	*	Microsoft Surface
*	TV
	*	Restriction: with a computer/media center connected
	*	Apple TV (uses OS X, but is not an open platform)
	*	Boxee
	*	XBMC
	*	Windows Media Center
*	Sound station
	*	Restriction: with a computer/media center connected

##	Application Requirements

> A list of the requirements introduced by the usage scenarios.

*	No central server
*	Ad-Hoc-Situations
	Introduced by mobile devices.
*	Location, Touch & Movement Detection
	=> This enables touch or movement based interactions
*	Location
	It should enable the tracking of location
*	Performance
	This should satisfy the restrictions introduced by location.
	100 messages / second
	10ms / message
*	Protocol switch
	If necessary the application might decide to utilise a different communications protocol like RTSP+RTP.
*	Discovery
*	Platform independent
	*	Windows
	*	Mac
	*	Linux
*	Language independent
	*	Objective C
	*	Java
	*	C#

## API Requirements

> A list of the requirements to achieve the goal of "enabling developers".

Look at the messaging system parameters from EAI and include it here.

*	State-of-the-art programming models
	*	iOS specific
		*	Blocks
*	Low Entry-Barrier
	*	Little code as possible
*	Extensibility
*	Security

# Design

## Architecture

> Describe the basic architecture of the system. This has to be device, operating system and programming language independent.

## Application stack

> Build a layered description of the framework and describe the tasks provided by each layer. This has to be device, operating system and programming language independent.

## Design Decisions

> Take each layer of the application stack and describe the possible technologies and then describe the decision made in favor of one.

*	ZeroConf
	*	Enables device discovery
	*	Enables ad-hoc situations
	*	Firewall has to enable port XX
*	TCP
	*	Adresses Low Entry-Barrier
	*	This could be a performance hog, but messages using this system are expected to work with this. If no, then an optimised protocol can be negotiated. After discovering the device, etc.
*	HTTP
	*	Adresses Low Entry-Barrier
	*	Lots of existing client and server side libraries.
	*	Security -> HTTPS
*	REST
	*	Adresses Low Entry-Barrier
	*	Lots of existing client and server side libraries.
*	JSON
	*	Adresses Low Entry-Barrier
	*	Lots of existing client and server side libraries.
*	Service orientation
	*	Adresses Extensibility
	*	Authentication -> Service
	*	Rights/Users/etc. -> Service

# Implementation

## Restrictions

> If there are restrictions introduced by the design decisions summarize them here.

*	Same (W-)LAN
	*	introduced by ZeroConf
	*	Bluetooth sucks
*	Focus on iOS
	*	because it is mainly used inside lab, has highest markt percentage, etc.
*	Proof of concept for other OSs
*	Security is not a real issue
	But it should be able to be added later
*	Not solving the problem of automated stuff. I consume services that I know (!) about.

> The automated stuff has to be a design decision as well.

## Technology Evaluation

> For each task introduced by the layers of the application stack and the design decisions describe possible technologies for the different environments.

*	iOS
	*	CocoaHTTPServer + RoutingHTTPServer
	*	RestKit vs. Resty
		*	RestKit
		*	Resty
*	Java
	*	jmDNS
*	Android
	*	jmDNS
*	C#
	*	Apple Bonjour SDK

# Evaluation

> Check with Ethics

## Performance

> Write up a test scenario, implement it and run it. A simple example would be to just return fixed values. This should include one device only tests, two-device and three-device tests. Also cross-platform tests to show that it works cross-platform.

## API Usability

Finish the API and then have people use it.
Prepare an interview with them and analyse the results.

> Donate to Robby Hanson and ask him to use the system. How about Taras Kalapun? Or other guys that do awesome stuff!?

Evaluate the usage in the Multi-Surface Environment and Facet projects.

## User experience

> If we have a focus group in the Facet project perhaps I can use them to do a user experience study. Or perhaps Chris and Teddy will do sth. similar for their thesis.

# Conclusion

> Look at the Research goals and compare them with the evaluation.

## Future work

> What is going to happen with this in the future?
