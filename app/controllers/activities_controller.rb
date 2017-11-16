class ActivitiesController < ApplicationController
  before_action :set_activity, only: [:show, :edit, :update, :destroy]

  # GET /activities
  # GET /activities.json
  def index
    # TODO: Move to a dedicated dashboard controller
    result = {
      daily_doughnut_chart: @current_user.daily_doughnut_chart,
      doing: @current_user.doing,
      first_entry_today: @current_user.log_in_time,
      total_entries_today: @current_user.activities.today.count,
      hours_today: @current_user.activities.today.sum(:duration)
    }
    render json: result.to_json
  end

  # POST /activities
  # POST /activities.json
  def create
    @current_user.activities.doing.map { |activity| activity.finish! }
    tag = Tag.find_or_initialize_by(rfid: params[:rfid].chomp, user: @current_user)
    @activity = tag.activities.build

    respond_to do |format|
      if @activity.save
        format.html { redirect_to @activity, notice: 'Activity was successfully created.' }
        format.json { render :show, status: :created, location: @activity }
      else
        format.html { render :new }
        format.json { render json: @activity.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /activities/1
  # PATCH/PUT /activities/1.json
  def update
    respond_to do |format|
      if @activity.update(activity_params)
        format.html { redirect_to @activity, notice: 'Activity was successfully updated.' }
        format.json { render :show, status: :ok, location: @activity }
      else
        format.html { render :edit }
        format.json { render json: @activity.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /activities/1
  # DELETE /activities/1.json
  def destroy
    @activity.destroy
    respond_to do |format|
      format.html { redirect_to activities_url, notice: 'Activity was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_activity
      @activity = Activity.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def activity_params
      params.require(:activity).permit(:start_time, :end_time)
    end
end
