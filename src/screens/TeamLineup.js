import React from "react";
import API from "../components/API";
import EplTeams from "../components/EplTeams";

class TeamLineup extends React.Component {
    constructor() {
        super();
        // this.fetchTeamFixtures=this.fetchTeamFixtures.bind(this);
        this.fetchTeamLineup=this.fetchTeamLineup.bind(this);
    
        //Set State in Class
        this.state={
            teamID: [],
        }
    }


    componentDidMount() {
        // this.fetchTeamFixtures();
        this.fetchTeamLineup();
        console.log("First Mount");
    }


    async fetchTeamLineup() {
        const response = await API.get("/fixtures/lineups", {params:{fixture:710699}});
        console.log ("Getting Team Lineup data: ", response);

        let returndata = [];
        if (response.status  === 200) {
            returndata = response.data;
        }
        console.log("Team Lineup Data:", returndata);
    }

    render(){
        return(
            <div className="lineup">
                <EplTeams />

            </div>
        )
    }
}

export default TeamLineup;