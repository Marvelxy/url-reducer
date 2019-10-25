Feature: Some basic homepage test
  Home page test for logged in users

Scenario: View the homepage
  Given I am a logged in user
  When I visit the homepage
  Then I should see my email
  And I should see a "Go to bookmark" text
  Then I can visit the bookmarks page
  And I should see a "Home" link
  When I click the "Home" link
  Then I should be on the homepage
