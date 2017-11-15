class ActivityBroadcastJob < ApplicationJob
  queue_as :default

  def perform(activity)
    ActivitiesChannel.broadcast_to(activity.user, render_activities(activity))
  end

  private

  def render_activities(activity)
    user = activity.user
    doing = user.activities.includes(:tag).doing.first
    today = user.activities.finished.group(:rfid).sum(:duration)
    ApplicationController.renderer.render('activities/index.json', format: :js, assigns: { doing: doing, today: today })
  end
end
