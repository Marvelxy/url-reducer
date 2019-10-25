class Category < ApplicationRecord
	has_many :bookmarks, dependent: :destroy

	validates_presence_of :name
	validates_presence_of :description
	validates_presence_of :marker_icon
end
