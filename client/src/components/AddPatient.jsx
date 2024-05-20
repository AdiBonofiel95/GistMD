import { useRef, useState } from "react";
import { SEX_TYPES } from "../types/SEX_TYPES";
import ErrorMessage from "./ErrorMessage";

function AddPatient() {

    const patientForm = useRef({patientName:'', dateOfBirth: undefined, sex: undefined, language:'', operation:''});
    const [errors, setErrors] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        if (isFormValid()){
            const requestOptions = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({...patientForm.current, dateOfBirth: new Date(patientForm.current.dateOfBirth)})
            };
            fetch('http://localhost:3000/patient', requestOptions)
        }
      }

      const isFormValid = () => {
        let errors = {}
        
        if (patientForm.current.patientName === '') {
            errors.patientName = "Patient name is missing";
        }
        else if (patientForm.current.patientName.split(' ').length < 2){
            errors.patientName = "Invalid patient name - last name missing";
        }
        if (!patientForm.current.dateOfBirth) {
            errors.dateOfBirth = "Missing patient's date of birth";
        }
        else if (new Date(patientForm.current.dateOfBirth) > Date.now()) {
            errors.dateOfBirth = "Invalid date of birth";
        }
        if (!patientForm.current.sex) {
            errors.sex = "Sex must be picked";
        }
        if (patientForm.current.language === '') {
            errors.language = "Patient language is missing";
        }
        if (patientForm.current.operation === '') {
            errors.operation = "Patient operation is missing";
        }

        if (Object.keys(errors).length === 0) {
            return true;
        };
        setErrors(errors);
        return false;
      }

      const onChangeName = (event) => {
        patientForm.current.patientName = event.target.value;
      }
      
      const onChangeSex = (event) => {
        patientForm.current.sex = event.target.value;
      }

      const onChangeDOB = (event) => {
        patientForm.current.dateOfBirth = event.target.value;
      }

      const onChangeLanguage = (event) => {
        patientForm.current.language = event.target.value;
      }
      
      const onChangeOperation = (event) => {
        patientForm.current.operation = event.target.value;
      }

      const inputStyle = {maxWidth: 150, margin:5}


    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", padding: 15}}>
            {/* <label>Patient Name:</label> */}
            <input type="text" placeholder="Patient Name" onChange={onChangeName} style={inputStyle} />
            {errors.patientName && (
                <ErrorMessage message={errors.patientName}/>
            )}
            <input type="date" placeholder="Date of Birth" onChange={onChangeDOB} style={inputStyle}/>
            {errors.dateOfBirth && (
                <ErrorMessage message={errors.dateOfBirth}/>
            )}
            <div>
                <p style={{maxWidth:"min-content", margin:"0"}}>sex</p>
                <div style={{display:"flex", flexDirection:"row"}}>
                    Male <input type="radio" name="sexType" value={SEX_TYPES.MALE} onChange={onChangeSex} style={inputStyle}/>
                    Female <input type="radio" name="sexType" value={SEX_TYPES.FEMALE} onChange={onChangeSex} style={inputStyle}/>
                </div>
                {errors.sex && (
                <ErrorMessage message={errors.sex}/>
            )}
            </div>
            <input type="text" placeholder="Language" onChange={onChangeLanguage} style={inputStyle} />
            {errors.language && (
                <ErrorMessage message={errors.language}/>
            )}
            <input type="text" placeholder="Operation" onChange={onChangeOperation} style={inputStyle} />
            {errors.operation && (
                <ErrorMessage message={errors.operation}/>
            )}
            <input type="submit" value={"Submit"} style={inputStyle}/>
        </form>
    );

}

export default AddPatient;