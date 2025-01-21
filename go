#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

gem list -i bundler || gem install bundler

bundle install

bundle exec jekyll serve --port 56931
