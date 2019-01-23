class WelcomeController < ApplicationController
  skip_before_action :require_logged_in

  def home
    if current_user != nil
      redirect_to user_path(current_user)
    end
  end

end
