Rails.application.routes.draw do
  resources :activities
  resources :tasks
  resources :tags
  get '/', to: 'pages#index'
  post 'authenticate', to: 'authentication#authenticate'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
