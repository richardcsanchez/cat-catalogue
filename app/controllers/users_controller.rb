class UsersController < ApplicationController
  skip_before_action :require_logged_in, only: [:new, :create]
  before_action :redirect_to_current_user, only: [:show, :edit, :update, :cat_adoption]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
     if @user.save
       session[:user_id] = @user.id
       redirect_to user_path(@user)
     else
       render :new
     end
  end

  def show
  end

  def edit
  end

  def update
    @user = User.find_by_id(params[:id])
      if @user.update(user_params)
        redirect_to @user
      else
        render :edit
      end
    end

    def cat_adoption
      @user = User.find_by_id(session["user_id"])
      @cat = Cat.find_by_id(params[:id])
      if @user.adopt_cat(@cat)
        flash[:notice] = "Congratulations! You've adopted #{@cat.name}"
         redirect_to cat_path(@cat)
       elsif
         @user.money < @cat.cost
         flash[:notice] = "You don't have enough money to adopt this cat"
         redirect_to cat_path(@cat)
       end
    end

  private


  def user_params
   params.require(:user).permit(:name, :password, :email, :money, :admin, :owner_id)
  end


end
