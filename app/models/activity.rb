class Activity < ApplicationRecord
  belongs_to :tag
  delegate :user, to: :tag, allow_nil: true

  before_validation :set_default_values
  after_create_commit { ActivityBroadcastJob.perform_later self }

  scope :finished, -> { where.not(end_time: nil) }
  scope :doing, -> { where(end_time: nil) }
  # TODO: Add scopes for today, week and month

  # TODO: Add default ordering

  validates_presence_of :start_time

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
