require 'rails_helper'

"""
RSpec.configure do |c|
  c.use_transactional_examples = true
end"""

RSpec.describe Bookmark, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"
  #context "with 2 or more comments" do
  #  it "orders them in reverse chronologically" do
  #    post = Post.create!
  #    comment1 = post.comments.create!(:body => "first comment")
  #    comment2 = post.comments.create!(:body => "second comment")
  #    expect(post.reload.comments).to eq([comment2, comment1])
  #  end
  #end

  let(:user) { User.create(username: 'Marv', email: 'marv@example.com', password: 'marv_marv') }
  let(:category) { Category.create(name: 'Shopping Mall', description: 'A general shopping mall', marker_icon: 'kkkjjkkj') }

  it "has none to begin with" do
    expect(Bookmark.count).to eq 0
  end

  it "has one after adding one" do
    #user = User.create(username: 'Marv', email: 'marv@example.com', password: 'marv_marv')
    #category = Category.create(name: 'Shopping Mall', description: 'A general shopping mall', marker_icon: 'kkkjjkkj')

    Bookmark.create!(
      title: 'Test user',
      geolocation: '4.987558578, 2.87979778798',
      note: 'ojoijijiji',
      review_stars: 4,
      category: category,
      user: user
    )
    expect(Bookmark.count).to eq 1
  end

  describe "Validations" do
    it { should validate_presence_of(:title) }
    #it { should validate_presence_of(:password) }
  end

  describe "Associations" do
    it { should belong_to(:user) }
  end

end
