class Bookmark < ApplicationRecord
  #attr_accessor :title

  belongs_to :category
  belongs_to :user

  validates_presence_of :title
end
