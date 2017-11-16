class ActivityBroadcastJob < ApplicationJob
  queue_as :default

  def perform(activity)
    ActivitiesChannel.broadcast_to(activity.user, render_activities(activity))
  end

  private

  def render_activities(activity)
    user = activity.user
    activities = user.activities.today
    result = {
      daily_doughnut_chart: user.daily_doughnut_chart,
      doing: user.doing,
      first_entry_today: user.log_in_time,
      total_entries_today: activities.count,
      hours_today: activities.sum(:duration)
    }
    result.to_json
  end
end
