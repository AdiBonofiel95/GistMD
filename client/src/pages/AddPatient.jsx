import { useNavigate } from "react-router-dom";
import AddPatientForm from "../components/AddPatientForm";


function AddPatient() {
    let navigate = useNavigate();

    return(
        <div>
            <AddPatientForm navigate={navigate}/>
            <button onClick={() => navigate('/')}>back</button>
        </div>
    )
}

export default AddPatient;