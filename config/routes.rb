Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    get '/signin', to: 'sessions#new'
    post '/signin', to: 'sessions#create'
    get '/signout', to: 'sessions#destroy'
    post '/cats', to: 'cats#create'
    delete '/cats', to: 'cats#destroy'
    get '/agency/:id/cats', to: 'agencies#cats_by_agency'
    get '/auth/facebook/callback', to: 'sessions#create'
    get '/cats/:id/adopt', to: 'users#cat_adoption', as: 'adopt_cat'
    get '/users/:id/cats', to: 'users#cats_by_user'

    resources :cats

    resources :agencies do
      resources :cats, only: [:new, :show, :index, :cats_by_agency]
    end

    resources :users do
      resources :cats, only: [:show, :index, :edit, :cats_by_user]
    end

    root 'welcome#home'


end
