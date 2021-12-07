import {useState, useEffect} from "react";
import API from "../components/API";

function EplTeams(props) {

    // const defaultState = {
    //     id:33,
    //     fixture:0,
    // };

    const [selectedTeam, setNewTeam] = useState(33);
    const [selectedFixture, setNewFixture] = useState(0);

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
    let  listItems = [];
    
    useEffect(()=>{
        console.log("Team Changed");
    },[selectedTeam]);

    async function fetchTeamFixtures() {
            const response = await API.get("/fixtures", {params:{season:2021, team:selectedTeam, last:5}});
            console.log ("Getting Fixtures data: ", selectedTeam);

            if (response.status  === 200) {
                returndata = response.data.response;
            }
            // console.log("Team Fixture Data:", returndata);

            console.log("List of Fixtures",
                returndata.map((t) => 
                    t.fixture.id
                )
            )

            listItems = returndata.map((t) => {
                return (
                    <option value={t.fixture.id}>{t.fixture.date}</option>
                )}
            );

            console.log(listItems)
        
        }

    function filterTeams(e) {
        e.preventDefault();
        setNewTeam(e.target.value);
        // selectedTeam.id = e.target.value
        console.log("NewTeamID:", selectedTeam);

        fetchTeamFixtures();
    }

    function filterFixtures(e) {
        e.preventDefault();
        setNewFixture(e.target.value);
        console.log("Selected Fixture: ", selectedFixture);
    }


    return(
            <form>
                <div>
                <select onChange={filterTeams}>
                    {eplTeamArray.map((t) => 
                    <option key={t.id} value={t.id}>{t.name}</option>
                    )}
                </select>
                </div>
                <div>
                <select onChange={filterFixtures}>
                    {listItems}
                </select>
                </div>
            </form>
    );
 
}

export default EplTeams;