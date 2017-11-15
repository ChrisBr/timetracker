json.doing(@doing, partial: 'activities/activity', as: :activity)
json.finished do
  json.array! @today, partial: 'activities/activity', as: :activity
end
