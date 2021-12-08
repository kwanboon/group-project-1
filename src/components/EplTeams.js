import {useState, useEffect} from "react";
import API from "./API";
import moment from "moment";

function EplTeams(props) {

    // const defaultState = {
    //     id:33,
    //     fixture:0,
    // };

    const [selectedTeam, setNewTeam] = useState(33);
    const [selectedFixture, setNewFixture] = useState(0);
    const [listItems, setListItems] = useState([]);

    const eplTeamArray = [{
        id:0,
        name: "Select a Team",
        logo: ""
    },
    {
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
    
    useEffect(()=>{
        console.log("Team Changed");
    },[selectedTeam]);

    function displayListItems(listItems) {
        const listItemsArray = listItems.map((t) => {
            const niceDate = moment(t.fixture.date).format("ddd, MMM Do YYYY");
            return (
                <option key={t.fixture.id} value={t.fixture.id}>{niceDate}</option>
            )}
        );

        return listItemsArray;
    }

    async function fetchTeamFixtures() {
            const response = await API.get("/fixtures", {params:{season:2021, team:selectedTeam, last:5}});
            console.log ("Getting Fixtures data: ", selectedTeam);

            if (response.status  === 200) {
                returndata = response.data.response;
            }
            console.log("Team Fixture Data:", returndata);

            console.log("List of Fixtures",
                returndata.map((t) => 
                    t.fixture.id
                )
            )
            
            setListItems(returndata)
            // setNewFixture(returndata[0].fixture.id);
            if (returndata.length>0 && returndata[0].fixture) {
                setNewFixture(returndata[0].fixture.id)
             }

            // console.log(listItems)
        
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
        // console.log("Selected Fixture: ", selectedFixture);
        props.returnFix(selectedFixture);
        // e.target.reset();
    }

    console.log("Selected Fixture: ", selectedFixture);
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
                    {displayListItems(listItems)}
                </select>
                </div>
            </form>
    );
 
}

export default EplTeams;