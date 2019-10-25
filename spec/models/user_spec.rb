require 'rails_helper'

RSpec.describe User, type: :model do
  subject {
    described_class.new(
      username: 'John',
      email: 'john_doe@email.com',
      password: 'secret'
    )
  }

  it "is valid without a username" do
    subject.username = nil
    expect(subject).to be_valid
  end

  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a password" do
    subject.password = nil
    expect(subject).to_not be_valid
  end

  it "has none to begin with" do
    expect(User.count).to eq 0
  end

  it "is valid with required attributes" do
    expect(subject).to be_valid
  end

  it "has one after adding one" do
    subject.save
    expect(User.count).to eq 1
  end

  describe "Associations" do
    it { should have_many(:bookmarks)}
  end

  describe "Validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end

end
