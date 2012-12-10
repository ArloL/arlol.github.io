#!/bin/bash
#
# This script downloads a gravatar image and uses it to create a favicon.
# It requires http://netpbm.sourceforge.net/.

# Adapted from:
# http://jason.the-graham.com/2010/10/17/generating_gravatar_favicons_for_jekyll/

# Replace with your email address. Make sure it's all lowercase.
EMAIL=mailtoarlo@gmail.com

# Calculate the hash of the email address.
HASH=`md5 -q -s ${EMAIL}`

# Generate the URL from which to download the image.
URL=https://secure.gravatar.com/avatar/${HASH}.png?size=32

# Download the image
curl -C - -L "${URL}" -o "./favicon.png"

# Convert the image to a favicon

# Adapter from:
# http://www.brennan.id.au/13-Apache_Web_Server.html#favicon
pngtopnm -mix ./favicon.png > tmp_logo.pnm

rm -f favicon.ico

pnmscale -xsize=32 -ysize=32 ./tmp_logo.pnm > tmp_logo32.ppm
pnmscale -xsize=16 -ysize=16 ./tmp_logo.pnm > tmp_logo16.ppm

pnmquant 256 tmp_logo32.ppm > tmp_logo32x32.ppm
pnmquant 256 tmp_logo16.ppm > tmp_logo16x16.ppm

ppmtowinicon -output ./favicon.ico tmp_logo16x16.ppm tmp_logo32x32.ppm

rm -f tmp_logo* favicon.png

# Convert image to apple touch icons

URL=https://secure.gravatar.com/avatar/${HASH}.png?size=57
curl -C - -L "${URL}" -o "./apple-touch-icon-57x57-precomposed.png"
cp apple-touch-icon-57x57-precomposed.png apple-touch-icon-precomposed.png
cp apple-touch-icon-57x57-precomposed.png apple-touch-icon.png

URL=https://secure.gravatar.com/avatar/${HASH}.png?size=72
curl -C - -L "${URL}" -o "./apple-touch-icon-72x72-precomposed.png"

URL=https://secure.gravatar.com/avatar/${HASH}.png?size=114
curl -C - -L "${URL}" -o "./apple-touch-icon-114x114-precomposed.png"
