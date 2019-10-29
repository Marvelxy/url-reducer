class Url < ApplicationRecord
  validates :short, uniqueness: true
  validates :long, uniqueness: {
    message: "should happen once per year"
  }
end
