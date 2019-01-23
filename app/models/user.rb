class User < ApplicationRecord
  has_secure_password
  validates :name, :money, :email, presence: true

  include EmailValidatable
  validates :email, uniqueness: true
  validates :email, email: true

  has_many :cats
  has_many :agencies, through: :cats

end
