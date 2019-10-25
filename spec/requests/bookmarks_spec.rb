require 'rails_helper'
require 'factories/user'

RSpec.describe "Bookmarks", type: :request do
  it "redirect to sign_in page when visit bookmarks, if not logged in" do
    visit bookmarks_path
    expect(page).to have_current_path(user_session_path)

    """
    url = URI.parse(current_path)
    puts url
    """
    #expect(page).to have_http_status(:redirect)
  end

  it "can visit bookmaks page when logged in" do
    visit "/users/sign_in"
    user = FactoryBot.create(:user, :email => "example@example.com", :password => "secret")
    fill_in "Email", :with => "example@example.com"
    fill_in "Password", :with => "secret"
    click_button "Log in"
    visit bookmarks_path
    expect(page).to have_current_path(bookmarks_path)
    #@user = FactoryBot.create(:user, :email => "example@example.com", :password => "secret")
    #login_as(@user) # devise helper
  end

  it "does not render a different template" do
    get root_path
    expect(response).to_not render_template(:show)
  end


end
