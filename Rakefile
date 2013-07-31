require 'rubygems'
require 'digest/md5'
require 'directory_watcher'
require 'jekyll'
require 'less'

task :default => [:server]

desc 'Hash css file, rename it and replace all stylesheet links'
task :prod_less => :less do
  hash = Digest::MD5.file('css/intermediate.css').hexdigest() + '.css'
  mv 'css/intermediate.css', 'css/'+hash
  replace_stylesheet_links(hash)
end

desc 'Replace all stylesheet links to intermediate'
task :dev_less => :less do
  replace_stylesheet_links('intermediate.css')
end

desc 'Compile less files'
task :less do
  rm Dir.glob('css/*.css')
  mkdir_p 'css'
  parser = Less::Parser.new :paths => '_less', :filename => '_less/main.less'
  tree = parser.parse(open('_less/main.less').gets(nil))
  css = tree.to_css(:compress => true)
  open('css/intermediate.css', 'w').puts(css)
end

desc 'Serve jekyll site and automatically compile less files'
task :server do
  dw = DirectoryWatcher.new '_less', :glob => '*.less', :interval => 1
  dw.add_observer {
    Rake::Task['dev_less'].execute
  }
  dw.start
  puts "Press ENTER to exit."
  server = Process.spawn('jekyll server --watch')
  STDIN.gets
  Process.kill(9, server)
end

def replace_stylesheet_links(new_name)
  files = Dir.glob('{*.html,_includes/*.html,_layouts/*.html}')
  files.each{ |arg|
    content = open(arg).gets(nil)
    content = content.gsub(/<link rel=\"stylesheet\" href=\"\/css\/.*\.css\">/, '<link rel="stylesheet" href="/css/' + new_name + '">')
    open(arg, 'w').puts(content)
  }
end
