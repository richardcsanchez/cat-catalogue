class User < ApplicationRecord
  has_secure_password
  validates :name, :email, presence: true

  include EmailValidatable
  validates :email, uniqueness: true
  validates :email, email: true

  has_many :cats
  has_many :agencies, through: :cats

  def adopt_cat(cat)
    cat.owner_id = self.id
    self.money -= cat.cost
    self.cats << cat
    self.save
  end

  def self.find_or_create_by_omniauth(auth)
    self.where(email: auth["info"]["email"]).first_or_create do |user|
      user.password = SecureRandom.hex
    end
  end

end
