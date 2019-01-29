class CatsController < ApplicationController

  def index
    if @agency = Agency.find_by_id(params["agency_id"])
      @cats = @agency.cats.adoptable
    end

    if !params[:state].blank? && Agency.find_by_state(params[:state])
      @cats = Cat.by_state(params[:state]).adoptable

    elsif !params[:breed].blank? && params[:state].blank?
      @cats = Cat.by_breed(params[:breed])

    else
      @cats = Cat.adoptable
    end

  end

  def new
    if !if_not_admin
      @cat = Cat.new
    end
  end

  def create
    @cat = Cat.new(cat_params)
    @cat.user_id = current_user.id
     if @cat.save
       redirect_to cat_path(@cat)
     else
       render :new
     end
  end

  def show
    @cat = Cat.find(params[:id])
  end

  def edit
    if !if_not_admin
      @cat = Cat.find_by_id(params[:id])
    end
  end

  def update
    @cat = Cat.find_by_id(params[:id])
    if @cat.update(cat_params)
      redirect_to @cat
    else
      render :edit
    end
  end

  def destroy
    if !if_not_admin
    @cat = Cat.find_by_id(params[:id])
      @cat.destroy
      redirect_to cats_path
    end
  end




  private


  def cat_params
   params.require(:cat).permit(:name, :age, :breed, :sex, :disposition, :cost, :adopted, :neutered, :image, :agency_id, :owner_id)
  end
end
