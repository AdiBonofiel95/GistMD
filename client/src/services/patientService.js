

function calculateAge(dateOfBirth){
    var ageDiff = new Date(Date.now() - dateOfBirth.getTime());
    return Math.abs(ageDiff.getUTCFullYear() - 1970);
}

export async function importPatientData() {
    let rawData = await fetch(process.env.REACT_APP_PATIENT_BACKEND_ENDPOINT).then((res) => res.json());
    rawData.forEach(element => {
        element.age = calculateAge(new Date(element.dateOfBirth));
    });

    return rawData;
}

export function postPatientData(patientData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(patientData)
    };

    return fetch(process.env.REACT_APP_PATIENT_BACKEND_ENDPOINT, requestOptions)
}

