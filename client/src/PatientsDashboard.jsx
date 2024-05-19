import {useState, useEffect} from "react";

function PatientsDashboard(props) {

    const [data, setData] = useState([]);

    useEffect (() =>{ fetchData()}, []);
    
    const fetchData = async () => {
        let rawData = await fetch('http://localhost:3000/patient').then((res) => res.json());
        console.log(rawData);
        setData(rawData);
    }

    function calculateAge(dateOfBirth){
        var ageDiff = new Date(Date.now() - dateOfBirth.getTime());
        return Math.abs(ageDiff.getUTCFullYear() - 1970);
        // return dateOfBirth.getFullYear();
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Age</th>
                        <th>Languagee</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.patientName}</td>
                            <td>{item.sex}</td>
                            <td>{calculateAge(new Date(item.dateOfBirth))}</td>
                            <td>{item.language}</td>
                            <td>{item.operation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}

export default PatientsDashboard;