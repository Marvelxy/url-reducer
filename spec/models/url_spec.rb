require 'rails_helper'

RSpec.describe Url, type: :model do
  let(:user) { User.create(username: 'Marv', email: 'marv@example.com', password: 'marv_marv') }

  it "has none to begin with" do
    expect(Url.count).to eq 0
  end

  it "has one after adding one if user is signed in" do
    #user = User.create(username: 'Marv', email: 'marv@example.com', password: 'marv_marv')
    #category = Category.create(name: 'Shopping Mall', description: 'A general shopping mall', marker_icon: 'kkkjjkkj')

    Url.create!(
      long: 'Test user',
      short: '4.987558578, 2.87979778798',
      user: user
    )
    expect(Bookmark.count).to eq 1
  end
  
  it "has one after adding one if user is not signed in" do
    Url.create!(
      long: 'Test user',
      short: '4.987558578, 2.87979778798',
    )
    expect(Url.count).to eq 1
  end

  describe "Validations" do
    it { should validate_presence_of(:long) }
    it { should validate_presence_of(:short) }
  end

  describe "Associations" do
    it { should belong_to(:user) }
  end
end
