Given('I am a logged in user') do
  @user = FactoryBot.create(:user, :email => "example@example.com", :password => "secret")

  visit "/users/sign_in"
  fill_in "Email", :with => "example@example.com"
  fill_in "Password", :with => "secret"
  click_button "Log in"
end

Then('I should see my email') do
  expect(page).to have_text("example@example.com")
end

Then("I should see a {string} text") do |text|
  expect(page).to have_text(text)
end

Then('I can visit the bookmarks page') do
  visit "/bookmarks"
  expect(page).to have_text('BOOKMARKS LIST')
end

Then("I should see a {string} button") do |button_text|
  expect(page).to have_button(button_text)
end

When("I click the {string} link") do |link_text|
  click_link(link_text)
end

Then('I should be on the homepage') do
  expect(page).to have_current_path(root_path)
end
