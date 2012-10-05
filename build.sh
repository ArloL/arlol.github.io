#!/bin/sh
lessc stylesheets/main.less stylesheets/main.css
# get hash of the main.css file
java -jar ./tools/yuicompressor.jar -o stylesheets/intermediate.css stylesheets/main.css
HASH=`md5 -q stylesheets/intermediate.css`
mv "stylesheets/intermediate.css" "stylesheets/${HASH}.css"
