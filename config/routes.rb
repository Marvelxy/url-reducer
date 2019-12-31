Rails.application.routes.draw do
  #devise_for :users
  """
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  """


  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	root to: 'maps#index'
  resources :maps
  resources :categories

  resources :bookmarks
  # save ratings
	post 'rate-location/:id', to: 'bookmarks#rateLocation'

	#resources :map

	get 'check-auth' => 'users#is_login'
  get 'profile' => 'users#profile'



  # New routes
  post 'reduce-url', to: 'urls#reduce_url'
  get 'r/:id' => 'urls#redirect_to_main_url'
  resources :urls
  post 'edit-reduced-url', to: 'urls#edit_reduced_url'
  post 'regenerate-long-url', to: 'urls#regenerate_long_url'
  post 'delete-url', to: 'urls#delete_url'

  # Error pages
  get '/404', to: "errors#not_found"
  get '/422', to: "errors#unacceptable"
  get '/500', to: "errors#internal_error"


end
