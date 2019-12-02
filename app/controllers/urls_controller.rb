class UrlsController < ApplicationController

  protect_from_forgery except: :reduce_url

  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:reduce_url, :redirect_to_main_url]
  layout "user"

  def index
    @url = Url.where(user_id: current_user.id)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render xml: @url }
      format.json { render json: @url}
    end
  end

  def reduce_url
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

  def edit_reduced_url
    #url = Url.where(user_id: current_user.id, long: params[:oldLongURL])
    url = Url.find_by_long(params[:oldLongURL])
    url.long = params[:editedLongURL]

    if url.save
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml:  }
        format.json {
          render json: {
            new_url: params[:editedLongURL],
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

  def regenerate_long_url
    url = Url.find(params[:oldShortURLId])
    url.short = Url.generate_url_id

    if url.save
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
        format.json {
          render json: {
            new_short_url: url.short,
            status: 200
          }
        }
      end
    end
  end

  def delete_url
    url = Url.find(params[:URLId])
    if url.destroy
      respond_to do |format|
        format.html # index.html.erb
        #format.xml  { render xml: @bookmarks }
        format.json {
          render json: {
            message: 'URL deleted',
            status: 200
          }
        }
      end
    end
  end
end
