#!/bin/sh
rm css/*.css
lessc --yui-compress "_less/main.less" > "css/intermediate.css"
HASH=`md5 -q css/intermediate.css`
mv "css/intermediate.css" "css/${HASH}.css"
#search all html files and exchange stylesheet links to the new minified version
find . -name "*.html" -exec sed -i "" "s/<link rel=\"stylesheet\" href=\"\/css\/.*\.css\">/<link rel=\"stylesheet\" href=\"\/css\/${HASH}\.css\">/g" {} \;
find . -name "*.html" -exec sed -i "" "s/<link rel=\"stylesheet\" href=\"\.\.\/css\/.*\.css\">/<link rel=\"stylesheet\" href=\"\.\.\/css\/${HASH}\.css\">/g" {} \;
