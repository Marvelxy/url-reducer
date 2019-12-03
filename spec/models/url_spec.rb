require 'rails_helper'

RSpec.describe Url, type: :model do
  let(:user) { User.create(username: 'Marv', email: 'marv@example.com', password: 'marv_marv') }

  it "has none to begin with" do
    expect(Url.count).to eq 0
  end

  it "has one after adding one if user is signed in" do
    Url.create!(
      short: 'Test user',
      long: '4.987558578, 2.87979778798',
      user_id: 2
    )
    expect(Url.count).to eq 1
  end
  
  it "has one after adding one if user is not signed in" do
    Url.create!(
      short: 'joijjiijij',
      long: 'oijijoijijijiojoijiji',
    )
    expect(Url.count).to eq 1
  end

  describe "Validations" do
    it { should validate_presence_of(:long) }
  end

end
