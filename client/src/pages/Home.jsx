import { useNavigate } from "react-router-dom";
import PatientsDashboard from "../components/PatientsDashboard";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';

function Home(){
    const [data, setData] = useState([]);

    let navigate = useNavigate();
    useEffect (() =>{ fetchData()}, []);
    
    const fetchData = async () => {
        let rawData = await fetch('http://localhost:3000/patient').then((res) => res.json());
        setData(rawData);
    }
    
    return (
        // <div>
        //     <button onClick={() => navigate('/addPatient')}>Add Patient</button>
            // { 
            // data.length === 0 ? 
            // <p>No patients were added yet</p> : 
            // (<PatientsDashboard data={data}/>)
            // }
        // </div>
        <Grid container justifyContent="center">
            <Grid xs = {10}>
                <div></div>
            </Grid>
            <Grid xs={2}>
                <button onClick={() => navigate('/addPatient')}>Add Patient</button>
            </Grid>
            <Grid xs={12} container justifyContent= {"center"}>
                { 
                    data.length === 0 ? 
                    <p>No patients were added yet</p> : 
                    (<PatientsDashboard data={data}/>)
                }
            </Grid>
        </Grid>
    );
}

export default Home;