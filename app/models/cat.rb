class Cat < ApplicationRecord
  belongs_to :agency
  belongs_to :user

  validates :name, :breed, :disposition, :age, :sex, :agency_id, presence: :true

  def self.personal_cat_collection(user)
    where(owner_id: user)
  end

  def self.order_by_cost
    self.order('cost desc')
  end

  def self.all_adoptable_breeds
    self.adoptable.collect {|c| c.breed}.uniq
  end

  def self.find_by_state(state)
    self.adoptable.select do |cat|
      if cat.state == state
        cat
      end
    end
  end

  def self.adoptable
    where(adopted: false)
  end

  def self.by_breed(breed)
    where(breed: breed)
  end

  def state
    self.agency.state
  end

  def adopted?
    self.adopted
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
