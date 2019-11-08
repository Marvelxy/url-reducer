class ReducersController < ApplicationController

  protect_from_forgery except: :reduce_url

  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:reduce_url, :redirect_to_main_url]

  def reduce_url
    """
    bookmark = Bookmark.find(params[:bookmark_id])
		bookmark.review_stars = params[:review_stars]
		bookmark.save
		render plain: 'true' """

    url = Url.new
    url.short = Url.generate_url_id
    url.long = params[:url]

    if user_signed_in?
      url.user_id = current_user.id
    end

    if url.save
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
        format.json {
          render json: {
            reduced_url: url.short,
            status: 200
          }
        }
      end
    else
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
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

  def redirect_to_main_url
    url = Url.find_by_short(params[:id])
    full_url = Url.return_http_prefix(url.long)
    redirect_to full_url
    #redirect_to 'http://facebook.com'
  end
end
