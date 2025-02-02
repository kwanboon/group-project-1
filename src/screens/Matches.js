import React from "react";
import API from "../components/scheduleAPI";
import "./Matches.css";
import * as moment from "moment";
import uuid from 'react-uuid'

class Matches extends React.Component {
  
  constructor(){
    super();
    this.fetchAllMatches = this.fetchAllMatches.bind(this);

    //this.state in class component is set this way, has to be an object
    
    this.state = {
      matches: [],
    };
  }

  componentDidMount() {
    console.log("This is first render");
    this.fetchAllMatches();
  }

  async fetchAllMatches() {

    const response = await API.get(`&date_from=${moment().format("YYYY-MM-DD")}&date_to=${moment().add(5, 'days').format("YYYY-MM-DD")}`);
    console.log("Check Data: ", response); //
    let matches =[];

    if (response.status === 200) {
      matches = response.data.data;
    }

    // console.log("Array of matches for the next 5 days: ", matches);

    this.setState({
      ...this.state,
      matches,
    });
  };


  render() {

    const { matches } = this.state; 

    console.log ("Rendering: ", matches);

    matches.sort(function(a,b) {
        return new Date(a.match_start_iso) - new Date(b.match_start_iso);
    });

    function getLocalDate(date) {
        return moment(date).utcOffset("+08:00").format("DD MMMM");
    }

    function getLocalTime(time) {
        return moment(time).utcOffset(8).format("HH:mm")
    }

    function groupedMatches(date){
        const list = {};

        for(let i=0; i<5; i++){
            list[moment().add(i, 'days').format("DD MMMM")] = [];
        }

        for (let i = 0; i < matches.length; i++) {
            let date = getLocalDate(matches[i].match_start_iso);
            if (list[date]){
                list[date].push(matches[i]);
            }
        }
        return list;
    }

    let list = groupedMatches();
    console.log("List (after grouping:", list);

    const dateHeaders = Object.keys(list); 


    return (
      <>

        {/* <div className="matches-container"> */}
        <div className="container4">
            <h3>UPCOMING EPL MATCHES</h3>
                    { 
                        dateHeaders.map(dateHeader => {
                            if (list[dateHeader]&&list[dateHeader].length>0) {
                                const rowData = list[dateHeader].map( item => {
                                    return (
                                        <tr key={uuid()}>
                                            <td className="match-details-row">
                                            <td className="match-time">{getLocalTime(item.match_start_iso)}</td>
                                            <img className="team-logo" src={item.home_team.logo} alt="team logo" /><td className="match-home-team">{item.home_team.name}</td>
                                            <td className="vs">VS</td>
                                            <img className="team-logo" src={item.away_team.logo} alt="team logo" /><td className="match-away-team">{item.away_team.name}</td>
                                            </td>
                                        </tr>
                                        )
                                })
                                return (
                                    <table key={uuid()} className="match-table">

                                    <thead>
                                            <th  colspan="4" className="match-date-header">{dateHeader}</th>
                                    </thead>

                                    <tbody>
                                        {rowData}
                                    </tbody>
                                    
                                    </table>
                                )
                            }

                            else {
                                return null
                            }
                        }) 
                    }
        </div>

      </>
    );
  }
}

export default Matches;