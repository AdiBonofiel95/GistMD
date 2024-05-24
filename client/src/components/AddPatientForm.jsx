import { useRef, useState } from "react";
import { SEX_TYPES } from "../types/SEX_TYPES";
import ErrorMessage from "./ErrorMessage";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

function AddPatientForm(props) {

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
            fetch('http://localhost:3000/patient', requestOptions).then(res => {
                if (res.ok){
                    props.navigate('/');
                }
                else {
                    alert("something went wrong - not able to fetch")
                }
            })
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

        setErrors(errors);
        return Object.keys(errors).length === 0;
      }

      const onChangeName = (event) => {
        patientForm.current.patientName = event.target.value;
      }
      
      const onChangeSex = (event) => {
        patientForm.current.sex = event.target.value;
      }

      const onChangeDOB = (event) => {
        patientForm.current.dateOfBirth = event.$d;
      }

      const onChangeLanguage = (event) => {
        patientForm.current.language = event.target.value;
      }
      
      const onChangeOperation = (event) => {
        patientForm.current.operation = event.target.value;
      }

    return (
        <form style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: 20}}>
            <TextField fullWidth label="Patient Name" id="fullWidth" onChange={onChangeName}/>
            {errors.patientName && (
                <ErrorMessage message={errors.patientName}/>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker onChange={onChangeDOB}/>
            </LocalizationProvider>
            {errors.dateOfBirth && (
                <ErrorMessage message={errors.dateOfBirth}/>
            )}
            <Grid container flexDirection={"column"} alignItems={"flex-start"}>
                <FormLabel component={"legend"}>Sex</FormLabel>
                <RadioGroup onChange={onChangeSex} row>
                    <FormControlLabel value={SEX_TYPES.MALE} control={<Radio />} label="Male" />
                    <FormControlLabel value={SEX_TYPES.FEMALE} control={<Radio />} label="Female" />
                </RadioGroup>
            </Grid>
            <TextField fullWidth  label="Language" id="fullWidth" onChange={onChangeLanguage}/>
            {errors.language && (
                <ErrorMessage message={errors.language}/>
            )}
            <TextField fullWidth label="Operation" id="fullWidth" onChange={onChangeOperation}/>
            {errors.operation && (
                <ErrorMessage message={errors.operation}/>
            )}
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
    );

}

export default AddPatientForm;