#!/bin/sh
lessc stylesheets/main.less stylesheets/main.css
rm stylesheets/min/*.css
lessc -yui-compress stylesheets/main.less stylesheets/min/intermediate.css
HASH=`md5 -q stylesheets/min/intermediate.css`
mv "stylesheets/min/intermediate.css" "stylesheets/min/${HASH}.css"
