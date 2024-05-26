import { useNavigate } from "react-router-dom";
import PatientsDashboard from "../components/PatientsDashboard";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { importPatientData } from "../services/patientService";

function Home(){
    const [data, setData] = useState([]);

    let navigate = useNavigate();
    
    useEffect (() =>{ 
        importPatientData().then(setData)
    }, []);
    
    return (
        <Grid container justifyContent="center" height={"100vh"}>
            <Grid xs = {10}>
                <div></div>
            </Grid>
            <Grid xs={2} paddingRight={2} paddingTop={2} paddingBottom={2}>
                <Button size="small"  variant="contained" onClick={() => navigate('/addPatient')}>Add</Button>
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