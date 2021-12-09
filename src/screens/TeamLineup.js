import React from "react";
import API from "../components/API";
import EplTeams from "../components/EplTeams";
import Lineup from "../components/Lineup";
import "./TeamLineup.css";

class TeamLineup extends React.Component {
    constructor() {
        super();
        this.handleTeamFixture=this.handleTeamFixture.bind(this);
        //this.fetchTeamLineup=this.fetchTeamLineup.bind(this);
    
        //Set State in Class
        this.state={
            fixtureID: 0,
            lineUpArray: [],
        }
    }

    async fetchTeamLineup() {
        // if (this.state.fixtureID > 0) {
            console.log("async fixtureid: ", this.state.fixtureID);
            const response = await API.get("/fixtures/lineups", {params:{fixture:this.state.fixtureID}});
        
            // console.log ("Getting Team Lineup data: ", response);
            if (response.status  === 200) {
                const returndata = response.data.response;
            
                this.setState({lineUpArray:returndata});
                console.log("Team Lineup Data:", returndata);
            }
            
            // console.log("Team 1: ",returndata[0].team.name )       
        // }
    }

    componentDidMount() {
        console.log("First Mount");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fixtureID !== this.state.fixtureID) {
            this.fetchTeamLineup();
            console.log("Did Update");
        }
    }

    handleTeamFixture(addFixture) {
        console.log("addFixture: ", addFixture)
        // const fixtureID = [...this.state.fixtureID]
        // fixtureID.push(addFixture);
        this.setState({fixtureID:addFixture});
        // console.log("FixtureID: ", this.state.fixtureID)
        // this.fetchTeamLineup();
    }

    render() {
        return(<>
            <div className="container5">
                <h3>Past Fixtures and Lineups</h3>
                <EplTeams returnFix={this.handleTeamFixture}/>
                {this.state.lineUpArray.length > 0
                ? <Lineup fixtureID={this.state.lineUpArray}/>
                : <div></div>}
            </div>
        </>)
    }
}

export default TeamLineup;