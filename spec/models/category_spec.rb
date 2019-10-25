require 'rails_helper'

RSpec.describe Category, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"
  it "is valid with valid attributes" do
    expect(Category.new).to_not be_valid
  end

  it "is not valid without a name" do
    category = Category.new(name: nil)
    expect(category).to_not be_valid
  end

  it "has one category after creating one" do
    Category.create(
      name: 'Shopping Mall',
      description: 'A general shopping mall',
      marker_icon: 'kkkjjkkj'
    )
    expect(Category.count).to eq 1
  end
end
