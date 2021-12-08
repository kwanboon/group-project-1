import React from "react";
// import API from "../components/API";
import EplTeams from "../components/EplTeams";
import Lineup from "../components/Lineup";

class TeamLineup extends React.Component {
    constructor() {
        super();
        this.handleTeamFixture=this.handleTeamFixture.bind(this);
        //this.fetchTeamLineup=this.fetchTeamLineup.bind(this);
    
        //Set State in Class
        this.state={
            fixtureID: null,
        }
    }


    componentDidMount() {
        // this.fetchTeamFixtures();
        // this.fetchTeamLineup();
        console.log("First Mount");
    }

    handleTeamFixture(addFixture) {
        console.log("addFixture: ", addFixture)
        // const fixtureID = [...this.state.fixtureID]
        // fixtureID.push(addFixture);
        this.setState({fixtureID:addFixture});
        // console.log("FixtureID: ", this.state.fixtureID)
    }

    render(){
        return(
            <div className="lineup">
                <EplTeams returnFix={this.handleTeamFixture}/>
                <Lineup fixtureID={this.state.fixtureID}/>
            </div>
        )
    }
}

export default TeamLineup;