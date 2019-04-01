class CatSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :age, :sex, :disposition, :cost, :adopted, :user_id, :neutered, :image, :agency_id, :owner_id

  belongs_to :agency
  belongs_to :user
end
