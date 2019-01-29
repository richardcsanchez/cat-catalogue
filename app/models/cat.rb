class Cat < ApplicationRecord
  belongs_to :agency
  belongs_to :user

  validates :name, :breed, :disposition, :age, :sex, :agency_id, presence: :true

  def self.adoptable
    where(owner_id: nil)
  end

  def self.by_breed(breed)
    where(breed: breed)
  end

  def self.by_state(state)
     @agencies = Agency.find_by_state(state)
     @agencies.cats
  end

  def adopted?
    true if self.owner_id
  end

  def owner_name
    user = User.find_by_id(owner_id)
    user.name
  end

  def neutered?
    if self.neutered == true
      "Yes"
    else
      "No"
    end
  end

end
