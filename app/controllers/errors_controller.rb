class ErrorsController < ApplicationController
    skip_before_action :authenticate_user!, :raise => false
    #skip_before_action :authenticate_user!, only: [:reduce_url, :redirect_to_main_url]

    def not_found
        respond_to do |format|
            format.html { render status: 404 }
        end
    end

    def unacceptable
        respond_to do |format|
            format.html { render status: 422 }
        end
    end

    def internal_error
        respond_to do |format|
            format.html { render status: 500 }
        end
    end
end
