source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.7'
# Use sqlite3 as the database for Active Record
#gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  #gem 'capybara', '>= 2.15'
  gem 'capybara' , '~> 2.13'
  #gem 'selenium-webdriver'
  #gem 'selenium-webdriver', '~> 3.142', '>= 3.142.4'

  # rspec-rails is a testing framework for Rails 3.x, 4.x and 5.x.
  gem 'rspec-rails', '~> 3.7'

  # A library for setting up Ruby objects as test data.
  gem 'factory_bot_rails'
end

group :test do
  gem 'cucumber-rails', require: false
  # database_cleaner is not required, but highly recommended
  gem 'database_cleaner'

  gem 'shoulda', '~> 3.5'
  gem 'shoulda-matchers', '~> 2.0'
  gem 'rails-controller-testing'
end

# A library for setting up Ruby objects as test data.
# gem 'factory_bot'

# Library for stubbing and setting expectations on HTTP requests in Ruby.
gem 'webmock', '~> 3.7', '>= 3.7.2'

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Below are the gems I included
gem 'devise'
gem 'mysql2'

# Webpacker makes it easy to use the JavaScript pre-processor and bundler webpack 4.x.x+ to manage application-like JavaScript in Rails. It coexists with the asset pipeline, as the primary purpose for webpack is app-like JavaScript, not images, CSS, or even JavaScript Sprinkles (that all continues to live in app/assets).
gem 'webpacker', '3.5'

# Production database
gem 'pg'

gem 'ffi', '1.11.1', platform: :mingw

# A that adds react to rails.
gem 'react-rails'
