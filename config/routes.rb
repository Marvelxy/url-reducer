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
  post 'reduce-url', to: 'reducers#reduce_url'

end
