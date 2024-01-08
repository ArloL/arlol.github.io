---
title: An 80 character limit improves source code readability
---
An 80 (non-whitespace) character limit is sensible because it improves source code readability.

A regular argument for a higher limit is that it is more modern. Our displays are bigger and the limit comes from punch cards where it made physical sense. But does that history make the limit bad? And does the available screen real estate change anything?

We read code more than we write it. For prose [typography recommends line lengths](https://en.wikipedia.org/wiki/Line_length) of 40 to 80 (sometimes 100) characters. And that has not changed with modern display sizes since our eyes and brains have not changed. One can argue that code is not prose, but both want to be understood by humans. One major difference is that code uses a lot of whitespace for indentation. A (sensible) nesting level of 5 and a default tab width of 4 adds ~20 whitespace characters. This results in 60 to 100 (sometimes 120) characters. Ideally our tools would allow for that distinction. Sadly, they don’t. Nonetheless: 80 characters are in the sensible range.

Is our screen real estate thus wasted? No. Modern displays make it possible to read code side-by-side. For example to review diffs (e.g. git or pull requests) or to open two files together (e.g. implementation and test). With the standard font size of 12 pt two tabs in Visual Studio Code can show 156 characters. A more legible 16 pt reduces that to 118 characters. Another reason to keep the character limit sensible. Otherwise one has to start scrolling left and right to read everything. This makes it harder to understand because one can never _see_ everything. Ideally all tools would be responsive and wrap lines at the edge of the viewport dynamically (like e.g. Xcode). Sadly, they don’t.

In summary: a limit of 80 non-whitespace characters makes sense. To account for indentation I recommend a limit between 80 and 120. Everything else makes your code harder to read and understand.

Please be aware that this is an easy topic to discuss ad nauseam. Often *everybody* has a (strong) opinion about it. If you ever discuss this longer than 15 minutes, you are likely [bike-shedding](https://en.wiktionary.org/wiki/bikeshedding). Choose a value - even a [random one](https://www.random.org/integers/?num=1&min=80&max=120&col=1&base=10&format=html&rnd=new) - and stick with it. That consistency will help readability more than the difference between 90 and 110.

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
