require 'rubygems'
require 'digest/md5'

task :default => [:less]

desc 'Watch Less'
task :watch => :devless do
  system('when-changed _less/* -c rake devless')
end

desc 'Compile Less'
task :less do
  rm Dir.glob('css/*.css')
  mkdir_p 'css'
  system('lessc --yui-compress "_less/main.less" > "css/intermediate.css"')
  hash = Digest::MD5.file('css/intermediate.css').hexdigest()
  mv 'css/intermediate.css', 'css/'+hash+'.css'
  system('find . -name "*.html" -exec sed -i "s/<link rel=\"stylesheet\" href=\"\/css\/.*\.css\">/<link rel=\"stylesheet\" href=\"\/css\/'+hash+'\.css\">/g" {} \;')
end

desc 'Dev Compile Less'
task :devless do
  rm Dir.glob('css/*.css')
  mkdir_p 'css'
  system('lessc "_less/main.less" > "css/intermediate.css"')
  system('find . -name "*.html" -exec sed -i "s/<link rel=\"stylesheet\" href=\"\/css\/.*\.css\">/<link rel=\"stylesheet\" href=\"\/css\/intermediate\.css\">/g" {} \;')
end

desc 'Running Jekyll with --server --auto option'
task :dev do
  system('jekyll server --watch')
end
