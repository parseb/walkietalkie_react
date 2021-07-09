Rails.application.routes.draw do
  resources :conversations

  root to: 'conversations#new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/audio/:id', to: 'conversations#audio'
end
