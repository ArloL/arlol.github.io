require 'rubygems'
require 'digest/md5'

task :default => [:lessc]

desc 'Compile Less'
task :lessc do
  rm Dir.glob('css/*.css')
  system('lessc --yui-compress "_less/main.less" > "css/intermediate.css"')
  hash = Digest::MD5.file('css/intermediate.css').hexdigest()
  mv 'css/intermediate.css', 'css/'+hash+'.css'
  system('find . -name "*.html" -exec sed -i "" "s/<link rel=\"stylesheet\" href=\"\/css\/.*\.css\">/<link rel=\"stylesheet\" href=\"\/css\/'+hash+'\.css\">/g" {} \;')
end # task :lessc

desc 'Running Jekyll with --server --auto opition'
task :dev do
  system('jekyll --server --auto')
end
