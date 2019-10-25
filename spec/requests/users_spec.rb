require 'rails_helper'

RSpec.describe "Users", type: :request do
  it "should return 'false' when not signed in" do
    visit check_auth_path
    expect(page).to have_content('false')
  end

  it "can login" do
    user = FactoryBot.create(:user, :email => "example@example.com", :password => "secret")
    visit "/users/sign_in"
    fill_in "Email", :with => "example@example.com"
    fill_in "Password", :with => "secret"
    click_button "Log in"
    expect(page).to have_http_status(200)
  end
end
