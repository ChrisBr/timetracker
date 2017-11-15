import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'

export default class Activies extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], doing: null };
  }

  setupActionCable(that){
    // TODO: initialize the App instance in react
    loadActioncable();
    App.activities = App.cable.subscriptions.create('ActivitiesChannel', {
      connected: function(data){
        console.log("Connected");
      },
      received: function(data) {
        //TODO: Parsing the data shouldn't be necessary
        var parsedData = JSON.parse(data);
        that.setState({ activities: parsedData.finished, doing: parsedData.doing });
      }
    });
  }

  loadInitialData(that){
    const headers = { headers: { "Authorization": "Bearer " + this.props.auth_token }}
    axios.get('/activities?format=json', headers)
    .then(function (response) {
      that.setState({ activities: response.data['finished'], doing: response.data['doing'] });
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
    if(this.state.doing){
      return (
        <div>
          <span>Doing</span>
          <div key={doing.id}>
            <span>{doing.id} - </span>
            <span>{this.prettyDate(doing.start_time)} - </span>
            <span>{doing.tag.name}</span>
          </div>
          <span>Finished Activities</span>
            {this.state.activities.map(activity =>(
              <div key={activity.id}>
                <span>{activity.id} - </span>
                <span>{this.prettyDate(activity.start_time)} - </span>
                <span>{this.prettyDate(activity.end_time)} - </span>
                <span>{this.toHHMMSS(activity.duration)} - </span>
                <span>{activity.tag.name}</span>
              </div>
            ))}
        </div>
      );
    }else {
      return(<span>{this.props.auth_token} -  Loading ...</span>)
    }
  }
}
