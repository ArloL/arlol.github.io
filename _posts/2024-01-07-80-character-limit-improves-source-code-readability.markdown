---
title: An 80 character limit improves source code readability
---
In my opinion an 80 (non-whitespace) character limit is sensible because it improves source code readability.

I regularly see the argument brought up that it is not “modern”. Our displays are bigger now and the origin can be traced back to punch cards where the limit made physical sense. But does that history make the limit _bad_? Or is it a bad way to argue for a personal preference?

Code is read more than it is written. In typography you can find line length recommendations ranging from a minimum of 40 to a maximum of 80; sometimes even 100. Yes, Code is not prose, but both wan’t to be consumed by human perception (i.e. eyes 👀 or screen readers 🗣️) and be understood. That is why I think it sensible to use those numbers as an inspiration. The major difference is that code uses a lot of whitespace for indentation. If we account for a (sensible) nesting level of 4-6 and a “tab” width of 4 you get ~20 whitespace characters. Sadly editors don’t allow differentiating between whitespace and non-whitespace characters that way.

One thing that makes reading code a lot harder in my opinion is side-scrolling. If you have to scroll left and right to read code it is harder to understand because you can never _see_ the whole code. You will have to keep it in your head. That uses precious brain energy that could be used for understanding what the code does - not what it looks like. The most likely scenarios where side-scrolling happens with longer lines are comparing diffs and opening tabs side-by-side (ie. implementation and test). And these get worse if you have increased your font size for e.g. accessibility reasons. There are even code editors (i.e. Xcode) that wrap lines automatically to prevent side-scrolling. Every sensible prose editor does this by default.

That is why I recommend setting a character limit between 80 and 120 for source code. Everything else makes your code harder to read and understand. I adjust that value based on the typical indentation depth of the language and project: e.g. Java 100-120, Bash 80.

PS Please be aware that this is an easy topic to discuss because *everybody* has a (strong) opinion about it. If you ever discuss this in your team longer than 15 minutes, you are likely [bike-shedding](https://en.wiktionary.org/wiki/bikeshedding). Choose a value - even a [random one](https://www.random.org/integers/?num=1&min=100&max=200&col=1&base=10&format=html&rnd=new) - and use it consistently. That consistency will help readability more than the difference between 120 and 130.

Examples to illustrate the point:

<pre style="white-space: pre">
<code>RUN \
    --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add \
        git \
        make

# vs.

RUN --mount=type=cache,target=/var/cache/apk,sharing=locked apk add git make
</code></pre>

<pre style="white-space: pre">
<code>_logger.LogInformation("Client timestamp for {}: {}",
    connectionId,
    webSocketRequest.ClientTimestamp);

# vs.

_logger.LogInformation("Client timestamp for {}: {}", connectionId, webSocketRequest.ClientTimestamp);
</code></pre>

<pre style="white-space: pre">
<code>return map.map(MappingNode::getValue)
		.map(List::stream)
		.orElse(Stream.empty())
		.filter(t -> {
			if (t.getKeyNode() instanceof ScalarNode keyNode
					&& key.equals(keyNode.getValue())) {
				return true;
			}
			return false;
		})
		.findFirst();

# vs.

return map.map(MappingNode::getValue).map(List::stream).orElse(Stream.empty()).filter(t -> {
			if (t.getKeyNode() instanceof ScalarNode keyNode && key.equals(keyNode.getValue())) {
				return true;
			}
			return false;
		}).findFirst();
</pre></code>
