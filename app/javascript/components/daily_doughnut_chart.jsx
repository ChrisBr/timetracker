import React from 'react'
import axios from 'axios'
import {Doughnut} from 'react-chartjs-2';

export default class DailyDoughnutChart extends React.Component {
  render() {
    if(this.props.data.datasets[0].data.length > 0){
      return (
        <div className="row pt-3">
          <div className="col-12">
            <Doughnut data={this.props.data} height={this.props.height} />
          </div>
        </div>
      );
    }else{
      return(
        <div className="row pt-3">
          <div className="col-12">
            <h3>There are no finished activities yet. Start by moving the TimeDice on the reader!</h3>
          </div>
        </div>
      );
    }
  }
}
