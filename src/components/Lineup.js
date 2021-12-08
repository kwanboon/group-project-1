import API from "./API"
import {useState, useEffect} from "react";

function Lineup(props) {

    if (props.fixtureID>0) {
        fetchTeamLineup();
    }

    let returndata = [];
    let lineup = [];

    async function fetchTeamLineup() {
        const response = await API.get("/fixtures/lineups", {params:{fixture:props.fixtureID}});
        // console.log ("Getting Team Lineup data: ", response);
        if (response.status  === 200) {
            returndata = response.data.response;
        }

        lineup =
        // console.log("Team Lineup Data:", returndata);
        // console.log("Team 1: ",returndata[0].team.name )        
    }

    // function displayLineup() {
    //     const displayLine = returndata.map((l)=>{
    //         return(<>
    //         <div className ="left">
    //             <h2>{returndata[0].team.name}</h2>
    //         </div>
    //         <div className="right">
    //             <h2>{returndata[1].team.name}</h2>
    //         </div>
    //         </>)
    //     });
    //     return displayLine;
    // }
    
    return(<>
        <div className ="left">
            <h2>{returndata[0].team.name}</h2>
        </div>
        <div className="right">
            <h2>1</h2>
        </div>
        </>
    );
}

export default Lineup;