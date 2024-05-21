import { useNavigate } from "react-router-dom";
import AddPatientForm from "../components/AddPatientForm";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';


function AddPatient() {
    let navigate = useNavigate();

    return(
        <Grid container alignItems={"stretch"} display={"flex"} height={"100vh"} flexDirection={"column"}>
            <Grid container justifyContent={"right"} paddingRight={2} paddingTop={2} xs={12}>
                <Button size="small" variant="contained" onClick={() => navigate('/')}>Back</Button>
            </Grid>
            <Grid container justifyContent={"center"} flexGrow={1} xs={12}>
                <AddPatientForm navigate={navigate}/>
            </Grid>
        </Grid>
    )
}

export default AddPatient;