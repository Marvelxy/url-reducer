class BookmarksController < ApplicationController
	before_action :authenticate_user!

	layout "user"

	def index
	    #@bookmarks = Bookmark.select("*").joins(:category)
	    @bookmarks = Bookmark.select('bookmarks.id,bookmarks.title,bookmarks.category_id,bookmarks.geolocation,bookmarks.note,bookmarks.review_stars,categories.name,categories.marker_icon').where(["user_id = ?", current_user.id]).joins(:category)

	    respond_to do |format|
	      format.html # index.html.erb
	      format.xml  { render xml: @bookmarks }
	      format.json { render json: @bookmarks}
	    end
	end

	def new
		# @bookmark = Bookmark.new
	end

	def create
		bookmark = Bookmark.new

		bookmark.title = params[:title]
		bookmark.geolocation = params[:geolocation]
		bookmark.note = params[:note]
		bookmark.category_id = params[:category_id]
		bookmark.user_id = current_user.id

		bookmark.save

		render json: 'true'
	end

	def update
		bookmark = Bookmark.find(params[:bookmark_id])

		bookmark.title = params[:title]
		bookmark.geolocation = params[:geolocation]
		bookmark.note = params[:note]
		bookmark.category_id = params[:category_id]
		bookmark.user_id = current_user.id

		bookmark.save

		#render json: 'true'
		respond_to do |format|
			format.html # index.html.erb
			format.xml  { render xml: @bookmarks }
			format.json { render json: 'true'}
		end
	end

	def destroy
		#render plain: params[:id]
		bookmark = current_user.bookmarks.where(id: params[:id])
		if bookmark.destroy(params[:id])
			redirect_to bookmarks_path
		end
	end

	def rateLocation
		bookmark = Bookmark.find(params[:bookmark_id])
		bookmark.review_stars = params[:review_stars]
		bookmark.save
		render plain: 'true'
	end


	private

		def bookmark_params
			params.require(:bookmark).permit(:name, :age)
		end
end
