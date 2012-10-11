#!/bin/sh
lessc stylesheets/main.less stylesheets/main.css
rm stylesheets/min/*.css
lessc -yui-compress stylesheets/main.less stylesheets/min/intermediate.css
HASH=`md5 -q stylesheets/min/intermediate.css`
mv "stylesheets/min/intermediate.css" "stylesheets/min/${HASH}.css"
#search all html files and exchange stylesheet links
find . -name "*.html" -exec sed -i "s/<link rel=\"stylesheet\" href=\"stylesheets\/min\/.*\.css\">/<link rel=\"stylesheet\" href=\"stylesheets\/min\/${HASH}\.css\">/g" {} \;
