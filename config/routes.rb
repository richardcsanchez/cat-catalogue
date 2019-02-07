Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    get '/signin', to: 'sessions#new'
    post '/signin', to: 'sessions#create'
    get '/signout', to: 'sessions#destroy'
    post '/cats', to: 'cats#create'
    delete '/cats', to: 'cats#destroy'
    get '/auth/facebook/callback', to: 'sessions#create'

    get '/cats/:id/adopt', to: 'users#cat_adoption', as: 'adopt_cat'
    get '/cats/filter', to: 'cats#index'
    get '/cats/adoptable', to: 'cats#index'
    get '/cats/filter_by_cost', to: 'cats#filter_by_cost'

    resources :cats

    resources :agencies do
      resources :cats, only: [:new, :show, :index, :edit]
    end

    resources :users do
      resources :cats, only: [:show, :index, :edit]
    end

    root 'welcome#home'


end
