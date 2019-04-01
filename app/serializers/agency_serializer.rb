class AgencySerializer < ActiveModel::Serializer
  attributes :id, :name, :street_1, :street_2, :city, :state, :zip_code, :email, :phone_number

  has_many :cats
  has_many :users, through: :cats
end
