class CatsController < ApplicationController
  before_action :admin_access_only, only: [:new, :create]
  before_action :your_cat, only: [:show, :edit, :update, :destroy]

  def index
    if @agency = Agency.find_by_id(params[:agency_id])
      @cats = @agency.cats.adoptable
      respond_to do |format|
        format.html { render :show }
        format.json { render json: @cats }
      end
    elsif !params[:state].blank? && Agency.find_by_state(params[:state])
      @cats = Cat.find_by_state(params[:state])

    elsif !params[:breed].blank?
      @cats = Cat.adoptable.by_breed(params[:breed])

    else
      @cats = Cat.adoptable
    end
  end

  def filter_by_cost
    @cats = Cat.adoptable.order_by_cost
    render 'index'
  end

  def new
      @cat = Cat.new
  end

  def create
    @cat = Cat.new(cat_params)
    @cat.user_id = current_user.id
     if @cat.save
       render json: @cat
     else
       render :new
     end
  end

  def show
    @cat = Cat.find_by_id(params[:id])
    @agency = Agency.find_by_id(params[:agency_id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @cat }
    end
  end

  def edit
    @cat = Cat.find_by_id(params[:id])
  end

  def update
    @cat = Cat.find_by_id(params[:id])
    if @cat.update(cat_params)
      if @cat.adopted?
        redirect_to user_cat_path(@cat.user_id, @cat)
      elsif !@cat.adopted?
        redirect_to agency_cat_path(@cat.agency_id, @cat)
    else
      render :edit
    end
  end
  end

  def destroy
    @cat = Cat.find_by_id(params[:id])
      @cat.destroy
      redirect_to cats_path
  end




  private

  def cat_params
   params.require(:cat).permit(:name, :age, :breed, :sex, :disposition, :cost, :adopted, :neutered, :image, :agency_id, :owner_id)
  end

  def your_cat
    @cat = Cat.find(params[:id])
    redirect_to cats_path unless (@cat.adopted? && @cat.owner_id == current_user.id) || current_user.admin?
  end

end
