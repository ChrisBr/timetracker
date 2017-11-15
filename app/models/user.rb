class User < ApplicationRecord
  has_secure_password

  has_many :tags
  has_many :activities, through: :tags

  validates_uniqueness_of :email
end
