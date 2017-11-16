class Activity < ApplicationRecord
  belongs_to :tag
  delegate :user, to: :tag, allow_nil: true

  before_validation :set_default_values
  after_create_commit { ActivityBroadcastJob.perform_later self }

  default_scope { order(created_at: :desc) }

  scope :finished, -> { where.not(end_time: nil) }
  scope :doing, -> { where(end_time: nil) }
  scope :today, -> { where("start_time >= ?", Time.current.beginning_of_day) }
  scope :week, -> { where("start_time >= ?", Time.current.beginning_of_week) }
  scope :month, -> { where("start_time >= ?", Time.current.beginning_of_month) }

  validates_presence_of :start_time

  def finish!(time = Time.current)
    self.end_time = time
    save
  end

  private

  def set_default_values
    self.start_time ||= Time.current
    self.duration = (self.end_time - self.start_time).ceil if self.start_time && self.end_time
  end
end
