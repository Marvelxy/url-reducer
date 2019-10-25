Feature: Visit the home page
  As a user, not logged in
  In order to approve the content of the Lorem Ipsum
  I want to sign it

Scenario: using a valid signature
  When I visit the homepage
  Then I must see a "Sign in" link
  And I should see a "Sign up" link
  
