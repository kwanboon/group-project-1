import {useState, useEffect} from "react";
import API from "./API";
import moment from "moment";

function EplTeams(props) {

    const [selectedTeam, setNewTeam] = useState(0);
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
        fetchTeamFixtures();
    },[selectedTeam]);

    function displayListItems(listItems) {
        const listItemsArray = listItems.map((t) => {
            const niceDate = moment(t.fixture.date).format("ddd, MMM Do YYYY");
            return (
                <option key={t.id} value={t.fixture.id}>{niceDate}</option>
            )}
        );

        return listItemsArray;
    }

    async function fetchTeamFixtures() {
        try {
            const response = await API.get("/fixtures", {params:{season:2021, team:selectedTeam, last:5}});

            if (response.status  === 200) {
                returndata = response.data.response;
                console.log("2. Team Fixture Data: ", returndata);
            }

            setListItems(returndata)
            // setNewFixture(returndata[0].fixture.id);
            if (returndata.length>0 && returndata[0].fixture) {
                setNewFixture(returndata[0].fixture.id)
            }
        } catch (error) {
            console.log (error);
        }
            
    }

    function filterTeams(e) {
        e.preventDefault();
        setNewTeam(e.target.value);
        // selectedTeam.id = e.target.value
        //console.log("1. TeamID selected: ", selectedTeam);

        // fetchTeamFixtures();
    }

    function filterFixtures(e) {
        e.preventDefault();
        setNewFixture(e.target.value);
        console.log("3. Selected Fixture: ", e.target.value);
        props.returnFix(e.target.value);
        // e.target.reset();
    }

    console.log("Fixture State: ", selectedFixture);
    console.log("1. TeamID selected: ", selectedTeam);
    return(<>
        <div className = "lineuptop">
            <form>
                <div className="dropdown">
                <select onChange={filterTeams}>
                    {eplTeamArray.map((t) => 
                    <option key={t.id} value={t.id}>{t.name}</option>
                    )}
                </select>
                <select onChange={filterFixtures}>
                    <option>Select a Fixture</option>
                    {displayListItems(listItems)}
                </select>      
                </div>  
            </form>
        </div>
    </>);
 
}

export default EplTeams;