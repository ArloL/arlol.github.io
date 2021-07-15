---
title: Using SSH to get internet access on a restricted (virtual) machine
description: Using your local host as a proxy during your SSH session to work around internet access restrictions.
---
If you ever have to work with a (virtual) machine that has restricted internet
access, you can use this little trick to use your local host as a SOCKS proxy
during your SSH session. This requires the server to allow TCP forwarding.

    ssh -R 60374 $hostname

    export http_proxy=socks://localhost:60374/
    export https_proxy=$http_proxy

    curl https://example.com
