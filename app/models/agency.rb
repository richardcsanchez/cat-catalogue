class Agency < ApplicationRecord
  has_many :cats
  has_many :users, through: :cats

  validates :name, :state, :email, presence: :true
  validates :phone_number, length: {is: 10}


  include EmailValidatable
  validates :email, uniqueness: true
  validates :email, email: true

  def agency_name
    self.find(params[:id]).name
  end
end
