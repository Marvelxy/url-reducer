When("I visit the homepage") do
  visit root_path
end

Then("I must see a {string} link") do |link_text|
  expect(page).to have_link(link_text)
end

Then("I should see a {string} link") do |link_text|
  expect(page).to have_link(link_text)
end
