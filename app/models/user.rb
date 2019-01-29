class User < ApplicationRecord
  has_secure_password
  validates :name, :email, presence: true

  include EmailValidatable
  validates :email, uniqueness: true
  validates :email, email: true

  has_many :cats
  has_many :agencies, through: :cats

  def self.personal_cat_collection
    includes('cats').where(cat.owner_id == self.id)
  end

  def adopt_cat(cat)
    if self.money >= cat.cost
      cat.owner_id = self.id
      self.money -= cat.cost
      self.cats << cat
      self.save
    end
  end

  def self.find_by_omniauth(auth)
    oauth_email = auth["info"]['email']
    user = User.find_by(email: oauth_email)
    end

  end
