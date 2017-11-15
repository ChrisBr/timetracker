Rails.application.routes.draw do
  resources :activities
  resources :tags
  get '/', to: 'pages#index'
  post 'authenticate', to: 'authentication#authenticate'

  mount ActionCable.server => '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
