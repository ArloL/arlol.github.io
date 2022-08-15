#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

if ! hash rbenv 2>/dev/null; then
  set +o xtrace
  echo "rbenv missing: brew install rbenv"
  exit 1
fi

rbenv install --skip-existing

gem list -i bundler || gem install bundler

bundle install

bundle exec jekyll serve
