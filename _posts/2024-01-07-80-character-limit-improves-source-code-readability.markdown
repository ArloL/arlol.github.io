---
title: An 80 character limit improves source code readability
---
An 80 (non-whitespace) character limit is sensible because it improves source code readability.

A regular argument against is that it is not “modern”. Our displays are bigger and the limit comes from punch cards where it made physical sense. But does that history make the limit _bad_? And does our available screen real estate change anything?

We read code more than we write it. Typography recommends line lengths ranging from 40 to 80; sometimes even 100. Yes, code is not prose, but both want to be understood by humans. That is why it is sensible to use those numbers as an inspiration. A major difference is that code uses a lot of whitespace for indentation. If we account for a (sensible) nesting level of 4-6 and a “tab” width of 4 you get ~20 whitespace characters.

One thing that makes reading code harder is side-scrolling. If you have to scroll left and right to read code it is harder to understand because you can never _see_ the whole code. You will have to keep it in your head. That uses precious brain energy that could be used for understanding what the code does - not what it looks like. Side-scrolling happens when comparing diffs or opening tabs side-by-side (ie. implementation and test). And it gets worse if you have longer lines or increased your font size (e.g. for accessibility reasons). There are editors (i.e. Xcode) that wrap lines to prevent side-scrolling.

That is why I recommend setting a character limit between 80 and 120 for source code. Everything else makes your code harder to read and understand. I adjust that value based on the typical indentation depth of the language and project: e.g. Java 100-120, Bash 80.
# 
PS Please be aware that this is an easy topic to discuss because *everybody* has a (strong) opinion about it. If you ever discuss this in your team longer than 15 minutes, you are likely [bike-shedding](https://en.wiktionary.org/wiki/bikeshedding). Choose a value - even a [random one](https://www.random.org/integers/?num=1&min=100&max=200&col=1&base=10&format=html&rnd=new) - and stick with it. That consistency will help readability more than the difference between 120 and 130.

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
