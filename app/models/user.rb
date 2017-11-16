class User < ApplicationRecord
  has_secure_password

  has_many :tags
  has_many :activities, through: :tags

  validates_uniqueness_of :email

  PieActivitiy = Struct.new(:sum, :colour, :name)

  # Returns a hash which can be used to generate a PieChart
  # with chart.js
  # For example:
  # {
  #   labels: ["Red", "Blue"],
  #   datasets: [{
  #       label: '# of Votes',
  #       data: [12, 19],
  #       backgroundColor: [
  #         'rgba(255, 99, 132, 0.2)',
  #         'rgba(54, 162, 235, 0.2)',
  #       ]
  #   }]
  # }
  def daily_doughnut_chart
    {
      labels: pie_data.map { |item| item.name },
      datasets: [{
        label: 'Today',
        data: pie_data.map { |item| item.sum },
        backgroundColor: background_colours(pie_data.map { |item| item.colour })
      }]
    }
  end

  def doing
    doing = activities.doing.includes(:tag).first
    doing ? doing.tag.name : 'n/a'
  end

  def log_in_time
    activities.today.last.try(:start_time)
  end

  private

  def background_colours(colours)
    colours.map { |colour| colour || "rgba(#{rand(0..255)}, #{rand(0..255)}, #{rand(0..255)}, 0.5)" }
  end

  def pie_data
    sum = activities.finished.today.group(:rfid).sum(:duration)
    user_tags = tags.where(rfid: sum.keys).select(:rfid, :name, :colour)
    result = []
    user_tags.each do |tag|
        result << PieActivitiy.new(sum[tag.rfid], tag.colour, tag.name) if sum[tag.rfid]
    end
    result
  end
end
