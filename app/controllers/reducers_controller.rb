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

    url = Url.new
    url.short = '09808u8'
    url.long = params[:url]

    if url.save
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
        format.json { render json: {'reduced_url': url.short}}
      end
    else
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
        #format.json { message: "Validation failed", errors: url.errors, status: 400}
        format.json {
          render json: {
            errors_count: url.errors.count,
            errors: url.errors,
            status: 400
          }
        }
      end
    end
  end
end
