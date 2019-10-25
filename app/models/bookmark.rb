class Bookmark < ApplicationRecord
  #attr_accessor :title

  belongs_to :category
  belongs_to :user

  validates_presence_of :title

  #def return_ratings
  	#case self.review_stars
  	#when 5
	#
 	#
  	#end
  #end
end
