class Activity < ApplicationRecord
  belongs_to :tag
  before_validation :set_default_values

  scope :finished, -> { where.not(end_time: nil) }
  scope :doing, -> { where(end_time: nil) }

  validates_presence_of :tag_id, :start_time

  def finish!(time = Time.now)
    self.end_time = time
    save
  end

  private

  def set_default_values
    self.start_time ||= Time.now
    self.duration = (self.end_time - self.start_time).ceil if self.start_time && self.end_time
  end
end
