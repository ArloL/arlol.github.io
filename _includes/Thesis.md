# IntAirAct

## A Framework enabling Device Interaction using REST

>Ziel: Die Darstellung der zu lösenden Aufgabe, der beschrittenen Lösungswege und der Ergebnisse ist präzise und kompakt auszuführen.

# Acknowledgement

Thanks to [Robbie Hanson](http://deusty.blogspot.ca/), [Matt Stevens](http://codeworkshop.net/), [Blake Watters](https://github.com/blakewatters), [Jeff Verkoeyen](http://jeffverkoeyen.com) and [Taras Kalapun](http://kalapun.com/) for creating incredibly good open source code that I could learn a lot from and re-use it.

Also many thanks to all the contributors of [RestKit](https://github.com/RestKit/RestKit), [CocoaAsyncSocket](https://github.com/robbiehanson/CocoaAsyncSocket), [RoutingHTTPServer](https://github.com/mattstevens/RoutingHTTPServer), [CocoaHTTPServer](https://github.com/robbiehanson/CocoaHTTPServer), [CocoaLumberjack](https://github.com/robbiehanson/CocoaLumberjack) and [iOS-Framework](https://github.com/jverkoey/iOS-Framework).

Thanks to Chris Burns for reviewing my code and giving me feedback.

Thanks to Paul Hegarty and [Leland Stanford Junior University](http://www.stanford.edu) for the course [CS193P "iPad and iPhone Application Development"](http://www.stanford.edu/class/cs193p) that is available for free via [iTunes U](http://itunes.stanford.edu/).

Thanks to Prof. Dr. Manfred Meyer and [Dr. Frank Maurer](http://ase.cpsc.ucalgary.ca/) for giving me the possibility to write my thesis in the beautiful town of Calgary, Alberta, Canada.

# Zusammenfassung

# Abstract

# Content

1.	Introduction
2.	Related Work
3.	Definitions
4.	Application domains
5.	Mission statement
6.	Requirements
7.	Design
8.	Implementation
9.	Evaluation

# List of Figures

# List of Tables

# List of Listings

# Introduction

##	Motivation

> Why am I doing this?

The number of devices used in everyday and professional life is increasing daily. Currently most of the applications for these devices focus on a single user and, if necessary, use web technologies for collaboration. A server acts as the hub for the devices. For remote situations this architecture is sensible. But in local situations the devices should communicate directly with each other. This is more efficient and opens up the possibility for new usage scenarios: namely Device Interaction. These interactions can consist of basic sharing of information such as contacts or be more advanced using gestures and location data.

In this thesis I will present a framework that enables these interactions.

# Related Work

An overview of research in the field of device interaction.

*	Ubiquitious Computing
*	Multi-surface
*	Device interaction
*	Multiple devices

# Definitions

##	Framework

> What is a Framework to me?

## Device Interaction

> What is Device Interaction to me?

There are obviously two parts here: Device and Interaction.

### Devices

Basically just a list of all the possible devices:

*	Mobile devices
	*	Tablets
		*	iPad
		*	Android
	*	Phones
		*	iPhone
		*	Android
		*	Windows Phone
		*	Blackberry
*	Touch Tables
*	TV
*	Sound station

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

## REST

> What is REST for me?

I understand it rather as the REST API than the architecture style described by Fielding [quote dissertation].

# Application domains

## Existing examples for Device Interaction

*	AirPlay (AirTunes)
*	AirDrop
*	Remote App(s) for iOS
*	Bump
*	Joypad
*	Remote Apps for Android
*	DLNA

## Usage scenarios

Example applications of device interaction.
	
# Mission statement

The idea of a mission statement comes from the [Google Web Toolkit](https://developers.google.com/web-toolkit/) project and many parts are copied or adapted from it's [mission statement](https://developers.google.com/web-toolkit/makinggwtbetter#introduction).

IntAirAct's mission is to radically improve the user experience by enabling developers to use web technologies to build interacting applications for any modern operating system.

**to radically improve**

The unconventional premise of IntAirAct (i.e. use REST, JSON and HTTP in a local network, having HTTP servers on mobile devices) sets the tone for how we are to be open-minded about approaches that make a big impact. We are willing to invest extra consideration and work to find solutions of the "order-of-magnitude" rather than the "good enough" variety.

**user experience**

The experience we want to optimize is the end user's experience. We strongly prioritize features that can make the biggest difference to end users. Obviously, we want to make developers' lives easier, too, but never at the expense of the user experience.

**by enabling developers**

IntAirAct is about enabling developers to do great things, not necessarily spoon-feeding them or putting them in a straightjacket. IntAirAct strives to be easy to use without sacrificing efficiency. We generally prioritize ensuring that the basics of IntAirAct work very well rather than adding dozens of features. It's much better to provide a solid platform so that other great libraries can be built on top of IntAirAct rather than trying to be all things to all people out of the box.

**web technologies**

The web is everywhere. A lot of developers start by learning web oriented languages such as HTML, CSS and PHP. We want to utilize this existing knowledge and move it into the local domain. This makes the learning curve very steep - as in you learn a lot very quickly.

**interacting applications**

We strongly believe that device interaction will play a big role in future application development and therefore we should start creating the basic frameworks for developers to use.

**any modern operating system**

IntAirAct should be as portable as it can be so long as it doesn't involve sacrificing user experience in any significant way.

# Requirements

##	Application Domain Requirements

*	No central server
*	Ad-Hoc-Situations
	Introduced by mobile devices.
*	Location, Touch & Movement Detection
	=> This enables touch or movement based interactions
*	Location
	It should enable the tracking of location

## API requirements

Look at the messaging system parameter from EAI and include it here.

*	State-of-the-art programming models
	*	iOS specific
		*	Blocks
*	Low Entry-Barrier
	*	Little code as possible
*	Extensibility
*	Security
*	Discovery
*	Performance
	This should satisfy the restrictions introduced by location.
	100 messages / second
	10ms / message
*	Protocol switch
	If necessary the application might decide to utilise a different communications protocol like RTSP+RTP.
*	Platform independent
	*	Windows
	*	Mac
	*	Linux
*	Language independent
	*	Objective C
	*	Java
	*	C#

# Design

## Restrictions

*	Same (W-)LAN
	*	Bluetooth sucks
*	Focus on iOS
	*	because it is mainly used inside lab
*	Proof of concept for other OSs
*	Security is not a real issue
	But it should be able to be added later
*	Not solving the problem of automated stuff. I consume services that I know (!) about.

## Design decisions

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

## Technology evaluation

*	CocoaHTTPServer + RoutingHTTPServer
*	RestKit vs. Resty
	*	RestKit
	*	Resty

# Evaluation

## Performance

Test this by playing ping pong.

## API Usage Experience Results

Finish the API and then have people use it.
Prepare an interview with them and analyse the results.

Donate to Robby Hanson and ask for a code review.

Evaluate the usage in the Multi-Surface Environment and Facet projects.
