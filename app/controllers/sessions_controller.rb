class SessionsController < ApplicationController
  skip_before_action :require_logged_in, only: [:new, :create]

  def new
  end

  def create
    if auth
      user = User.find_by_omniauth(auth)
    else
      user = User.find_by(email: params[:user][:email])
      user = user.try(:authenticate, params[:user][:password])
    end
    return redirect_to root_path unless user
    session[:user_id] = user.id
    redirect_to user_path(user)
  end

  def destroy
    reset_session
    redirect_to root_path
  end

  private
  def auth
    request.env['omniauth.auth']
  end

end
