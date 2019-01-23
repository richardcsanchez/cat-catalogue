class SessionsController < ApplicationController
  skip_before_action :require_logged_in, only: [:new, :create]

  def new
  end

  def create
    # if
      user = User.find_by(email: params[:user][:email])
      user = user.try(:authenticate, params[:user][:password])
      return redirect_to(controller: 'sessions', action: 'new') unless user
      session[:user_id] = user.id
      redirect_to user_path(user)
    # else
    #   @user = User.find_or_create_by(uid: auth['uid']) do |u|
    #   u.name = auth['info']['name']
    #   u.email = auth['info']['email']
    #   u.image = auth['info']['image']
    # end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

  private
  def auth
    request.env['omniauth.auth']
  end

end
