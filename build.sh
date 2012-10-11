#!/bin/sh
lessc css/main.less css/main.css
rm css/min/*.css
lessc -yui-compress css/main.less css/min/intermediate.css
HASH=`md5 -q css/min/intermediate.css`
mv "css/min/intermediate.css" "css/min/${HASH}.css"
#search all html files and exchange stylesheet links
find . -name "*.html" -exec sed -i "s/<link rel=\"stylesheet\" href=\"css\/min\/.*\.css\">/<link rel=\"stylesheet\" href=\"css\/min\/${HASH}\.css\">/g" {} \;
