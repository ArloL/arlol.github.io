---
layout: default
title: How to make Wikipedia easier to read
subtitle: "Wikipedia is not very readable. Here is how to make it easier."
description: "Wikipedia is not very readable. Here is how to make it easier."
author: Arlo O'Keeffe
published: false
---

In my opinion Wikipedia is not very readable. The lines are too long and the font size is too small. But you can change that by adding custom CSS. In order to do that you have to create an account first. Then visit [User:*Example*/vector.css](https://wikipedia.org/wiki/Special:MyPage/vector.css). Create the page and enter the following css

    #bodyContent {
        font-size: 1.1em;
    }
    #bodyContent p, #bodyContent ul, #bodyContent ol, #bodyContent dd {
        max-width: 40em;
    }

That will increase the font size and limit the line length to approximately 80 characters per line.
