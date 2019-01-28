class Cat < ApplicationRecord
  belongs_to :agency
  belongs_to :user

  validates :name, :breed, :disposition, :age, :sex, :agency_id, presence: :true

  def adopt_me
    self.owner_id = current_user.id
    current_user.money = (current_user.money - self.cost)
  end

  def adopted?
    if self.owner_id == true
  end

  def neutered?
    if self.neutered == true
      "Yes"
    else
      "No"
    end
  end

end
