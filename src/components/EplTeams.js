import {useState} from "react";
import API from "../components/API";

function EplTeams(props) {

    const defaultState = {
        id:33,
        fixture:0,
    };

    const [selectedTeam, setNewTeam] = useState(defaultState);

    const eplTeamArray = [{
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png"
    },
    {
        id: 34,
        name: "Newcastle",
        logo: "https://media.api-sports.io/football/teams/34.png"
    },
    {
        id: 38,
        name: "Watford",
        logo: "https://media.api-sports.io/football/teams/38.png"
    },
    {
        id: 39,
        name: "Wolves",
        logo: "https://media.api-sports.io/football/teams/39.png"
    }
    ];

    let returndata = [];

    async function fetchTeamFixtures() {
            const response = await API.get("/fixtures", {params:{season:2021, team:selectedTeam.id, last:5}});
            console.log ("Getting Fixtures data: ", selectedTeam.id);

            if (response.status  === 200) {
                returndata = response.data.response;
            }
            console.log("Team Fixture Data:", returndata);
    
        }

    function filterTeams(e) {
        e.preventDefault();
        setNewTeam(defaultState);
        selectedTeam.id = e.target.value
        console.log("NewTeamID:", selectedTeam.id);

        fetchTeamFixtures();
    }

    function filterFixtures(e) {
        e.preventDefault();
        selectedTeam.fixture = e.target.value
        console.log("Selected Fixture: ", selectedTeam.fixture);
    }

    return(
            <form>
                <div>
                <select onChange={filterTeams}>
                    {eplTeamArray.map((t) => 
                    <option value={t.id}>{t.name}</option>
                    )}
                </select>
                </div>
                <div>
                <select onChange={filterFixtures}>
                    {returndata.map((t) => 
                    <option value={t.id}>{t.date}</option>
                    )}
                </select>
                </div>
            </form>
    );
 
}

export default EplTeams;