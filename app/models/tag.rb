class Tag < ApplicationRecord
  has_many :activities
  belongs_to :user

  validates_uniqueness_of :rfid, scope: :user_id
  validates_uniqueness_of :name, scope: :user_id
  validates_presence_of :user_id, :rfid

  def name
    self[:name] || rfid
  end
end
