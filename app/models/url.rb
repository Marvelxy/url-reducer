class Url < ApplicationRecord
  belongs_to :user
  
  validates :short, uniqueness: {
    #message: "should happen once per year"
  }

  validates :long, uniqueness: {
    message: "This URL has already been reduced by another user."
  }

  def self.generate_url_id
    url_id = rand(10000..99999)
    url = Url.where(short: url_id).count
    if url == 0
      return url_id
    else
      generate_url_id()
    end
  end

  # If long URL has http prefix, redirect to it; else add http prefix and redirect to it
  def self.return_http_prefix(long_url)
    if long_url.match(/^http:|https:/i)
      long_url
    else
      "http://" + long_url
    end
  end
end
