json.extract! activity, :id, :start_time, :end_time, :duration
json.tag do
  json.extract! activity.tag, :id, :colour, :name
end
json.url activity_url(activity, format: :json)
