class AgenciesController < ApplicationController
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
  end

  def edit
    @agency = Agency.find_by_id(params[:id])
  end

  def index
    @agencies = Agency.all
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
