class Cat < ApplicationRecord
  belongs_to :agency
  belongs_to :user

  validates :name, :breed, :disposition, :age, :sex, :agency_id, presence: :true

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
