import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import Box from './box'
import DailyDoughnutChart from './daily_doughnut_chart'

export default class Activies extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  setupActionCable(that){
    // TODO: initialize the App instance in react
    loadActioncable();
    App.activities = App.cable.subscriptions.create('ActivitiesChannel', {
      connected: function(data){
        console.log("Socket connected");
      },
      received: function(data) {
        var parsedData = JSON.parse(data);
        that.setState({
          daily_doughnut_chart: parsedData.daily_doughnut_chart,
          doing: parsedData.doing,
          first_entry_today: parsedData.first_entry_today,
          total_entries_today: parsedData.total_entries_today,
          hours_today: parsedData.hours_today,
          loaded: true
        });
      }
    });
  }

  loadInitialData(that){
    const headers = { headers: { "Authorization": "Bearer " + this.props.auth_token }}
    axios.get('/activities?format=json', headers)
    .then(function (response) {
      that.setState({
        daily_doughnut_chart: response.data.daily_doughnut_chart,
        doing: response.data.doing,
        first_entry_today: response.data.first_entry_today,
        total_entries_today: response.data.total_entries_today,
        hours_today: response.data.hours_today,
        loaded: true
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    const that = this;
    this.setupActionCable(that);
    this.loadInitialData(that)
  }

  prettyDate(date) {
    return dateFormat((new Date(date)), "dddd, mmmm dS, yyyy, h:MM:ss TT")
  }

  toHHMMSS(sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  render() {
    const doing = this.state.doing;
    if(this.state.loaded){
      return (
        <main role="main" className="container">
        <div className="row">
          <div className="col-12">
            <h1>Today, {dateFormat((new Date()), "dddd, mmmm dS, yyyy")}</h1>
          </div>
        </div>
        <DailyDoughnutChart data={this.state.daily_doughnut_chart} height={100} />
        <div className="row pt-5">
          <Box title="Current Activity" value={this.state.doing} />
          <Box title="Hours Logged" value={this.toHHMMSS(this.state.hours_today)} />
          <Box title="Time Entries" value={this.state.total_entries_today} />
          <Box title="Logged In" value={dateFormat((new Date(this.state.first_entry_today)), "h:MM:ss TT")} />
        </div>
        </main>
      );
    }else {
      return(<span>Loading ...</span>)
    }
  }
}
