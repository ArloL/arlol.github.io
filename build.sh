#!/bin/sh
lessc stylesheets/main.less stylesheets/main.css
lessc -yui-compress stylesheets/main.less stylesheets/intermediate.css
HASH=`md5 -q stylesheets/intermediate.css`
mv "stylesheets/intermediate.css" "stylesheets/${HASH}.css"
