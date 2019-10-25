class UsersController < ApplicationController
	protect_from_forgery except: :is_login

	before_action :authenticate_user!
	skip_before_action :authenticate_user!, only: [:is_login]

	layout "user"

	def is_login
		if user_signed_in?
			render plain: "true"
		else
			render plain: "false"
		end
	end

	def profile

	end
end
