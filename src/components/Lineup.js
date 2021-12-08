import {v4 as uuidv4} from "uuid";


function Lineup(props) {
    
        console.log ("Line up reached:")
        // let team = props.fixtureID[0].team.name;
        // console.log (team);
            return(<>
                <div className="lineupbottom">
                <div className ="teams">
                    <h2>{props.fixtureID[0].team.name}</h2>   
                    <img src={props.fixtureID[0].team.logo} alt=""/>
                    <h5>Formation - {props.fixtureID[0].formation}</h5>
                    <h4>Starting XI</h4> 
                    <ul>  
                        {props.fixtureID[0].startXI.map( p => <li key={uuidv4()}>{p.player.number} - {p.player.name}</li>)}
                    </ul>
                    <h4>Substitutes</h4>
                    <ul>  
                        {props.fixtureID[0].substitutes.map( p => <li key={uuidv4()}>{p.player.number} - {p.player.name}</li>)}
                    </ul>
                </div>
                <div className="teams">
                    <h2>{props.fixtureID[1].team.name}</h2>
                    <img src={props.fixtureID[1].team.logo} alt=""/>
                    <h5>Formation - {props.fixtureID[1].formation}</h5>
                    <h4>Starting XI</h4>
                    <ul>  
                        {props.fixtureID[1].startXI.map( p => <li key={uuidv4()}>{p.player.number} - {p.player.name}</li>)}
                    </ul>
                    <h4>Substitutes</h4>
                    <ul>  
                        {props.fixtureID[1].substitutes.map( p => <li key={uuidv4()}>{p.player.number} - {p.player.name}</li>)}
                    </ul>

                </div>
                </div>
            </>);
}

export default Lineup;