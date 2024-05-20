import { useNavigate } from "react-router-dom";
import PatientsDashboard from "../components/PatientsDashboard";
import { useState, useEffect } from "react";

function Home(){
    const [data, setData] = useState([]);

    let navigate = useNavigate();
    useEffect (() =>{ fetchData()}, []);
    
    const fetchData = async () => {
        let rawData = await fetch('http://localhost:3000/patient').then((res) => res.json());
        setData(rawData);
    }
    
    return (
        <div>
            <button onClick={() => navigate('/addPatient')}>Add Patient</button>
            { 
            data.length === 0 ? 
            <p>No patients were added yet</p> : 
            (<PatientsDashboard data={data}/>)
            }
        </div>
    );
}

export default Home;