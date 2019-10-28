class ReducersController < ApplicationController

  protect_from_forgery except: :reduce_url

  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:reduce_url]

  def reduce_url
    """
    bookmark = Bookmark.find(params[:bookmark_id])
		bookmark.review_stars = params[:review_stars]
		bookmark.save
		render plain: 'true' """

    respond_to do |format|
      format.html # index.html.erb
      #format.xml  { render xml: @bookmarks }
      format.json { render json: {'reduced_url': params[:url]}}
    end
  end
end
