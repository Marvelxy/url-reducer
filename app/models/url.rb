class Url < ApplicationRecord
  validates :short, uniqueness: {
    #message: "should happen once per year"
  }

  validates :long, uniqueness: {
    message: "This URL has already been reduced by another user."
  }
end
