/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.

console.log('Hello World from Webpacker');

import 'jquery/src/jquery';
//import Turbolinks from 'turbolinks';
import Rails from 'rails-ujs'

import 'bootstrap/dist/css/bootstrap';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.js'

import 'bookmarks'
import 'app'
//Turbolinks.start();

Rails.start();

import '../src/maps.scss';
import '../src/users.scss';
import '../src/urls.scss';
import '../src/bookmarks.scss';

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
