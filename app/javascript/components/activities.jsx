import React from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'

export default class Activies extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [], today: [], doing: null };
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
        that.setState({ activities: parsedData.finished, today: parsedData.today, doing: parsedData.doing });
      }
    });
  }

  loadInitialData(that){
    const headers = { headers: { "Authorization": "Bearer " + this.props.auth_token }}
    axios.get('/activities?format=json', headers)
    .then(function (response) {
      console.log(response);
      that.setState({ activities: response.data['finished'], today: response.data['today'], doing: response.data['doing'] });
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
        <main role="main" className="container">
          <div>
            <h1>{doing.tag.name} since {dateFormat((new Date(doing.start_time)), "h:MM:ss TT")}</h1>
          </div>
          <div>
            <h1>Today</h1>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.state.today).map(key =>(
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{this.toHHMMSS(this.state.today[key])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          </div>
        </main>
      );
    }else {
      return(<span>Loading ...</span>)
    }
  }
}
