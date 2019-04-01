class AgenciesController < ApplicationController
  before_action :admin_access_only, only: [:new, :create, :edit, :update]

  def new
      @agency = Agency.new
  end

  def create
    @agency = Agency.new(agency_params)
     if @agency.save
       redirect_to agency_path(@agency)
     else
       render :new
     end
  end

  def show
    @agency = Agency.find(params[:id])
    respond_to do |format|
    format.html { render :show }
    format.json { render json: @agency }
  end
end

  def edit
      @agency = Agency.find(params[:id])
  end

  def index
    @agencies = Agency.all
    respond_to do |f|
      f.html
      f.json {render json: @posts}
    end
  end

  def update
    @agency = Agency.find_by_id(params[:id])
    if @agency.update(agency_params)
      redirect_to @agency
    else
      render :edit
    end
  end

  private
  def agency_params
   params.require(:agency).permit(:name, :street_1, :street_2, :zip_code, :city, :state, :email, :phone_number)
  end


end
