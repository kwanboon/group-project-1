import {useState} from "react";

function EplTeams(props) {
    // const defaultState = null;

    const [selectedTeam, setNewTeam] = useState(0);

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


    function filterTeams(e) {
        e.preventDefault();
        setNewTeam(e.target.value);
        console.log("NewTeam:", selectedTeam);


    }

    return(
            <form>
            <select onChange={filterTeams}>
                {eplTeamArray.map((t) => 
                <option value={t.id}>{t.name}</option>
                )}
            </select>
            </form>
    );
 
}

export default EplTeams;