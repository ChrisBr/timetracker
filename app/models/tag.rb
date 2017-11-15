class Tag < ApplicationRecord
  has_many :activities
  belongs_to :user

  validates_uniqueness_of :user_id, scope: :rfid
  validates_presence_of :user_id, :rfid

  def name
    self[:name] || rfid
  end
end
