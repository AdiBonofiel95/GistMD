import { useRef, useState } from "react";
import { SEX_TYPES } from "../types/SEX_TYPES";
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
import dayjs from "dayjs";

function AddPatientForm(props) {

    const patientForm = useRef({patientFirstName:'', 
                                patientLastName:'', 
                                dateOfBirth: undefined, 
                                sex: SEX_TYPES.MALE, 
                                language:'', 
                                operation:''});

    const [errors, setErrors] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        if (isFormValid()){
            const requestOptions = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({...patientForm.current, 
                                        patientName: `${patientForm.current.patientFirstName} ${patientForm.current.patientLasttName}`, 
                                        dateOfBirth: new Date(patientForm.current.dateOfBirth)})
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

      const IsValidName = (name, type) => {
        let validChars = /^[a-zA-Z]+$/;

        if (name.length === 0){
            return `${type} name is missing.`
        }
        if (! validChars.test(name)){
            return `${type} name can only contain alphabetic charecters`
        }

        return undefined
      }

      const isFormValid = () => {
        let errors = {}
        
        if (IsValidName(patientForm.current.patientFirstName), "First") {
            errors.patientFirstName = IsValidName(patientForm.current.patientFirstName, "First");
        }
        if (IsValidName(patientForm.current.patientLastName, "Last")) {
            errors.patientLastName = IsValidName(patientForm.current.patientLastName, "Last");
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

      const onChangeFirstName = (event) => {
        patientForm.current.patientFirstName = event.target.value;
      }
      
      const onChangeLastName = (event) => {
        patientForm.current.patientLastName = event.target.value;
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
            <Grid container flexDirection={"row"} spacing={1}>
                <Grid xs={5}>
                    <TextField 
                        error={errors.patientFirstName ? true : false} 
                        fullWidth 
                        label="First Name" 
                        id="fullWidth" 
                        onChange={onChangeFirstName}
                        helperText={errors.patientFirstName ?? undefined}
                    />
                </Grid>
                <Grid xs={7}>
                    <TextField 
                        error={errors.patientLastName ? true : false} 
                        fullWidth 
                        label="Last Name" 
                        id="fullWidth" 
                        onChange={onChangeLastName}
                        helperText={errors.patientLastName ?? undefined}
                    />
                </Grid>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker 
                    label="Date of birth" 
                    onChange={onChangeDOB}
                    maxDate={dayjs()}
                    slotProps={{
                        textField: {
                            error: errors.dateOfBirth ? true : false,
                            helperText: errors.dateOfBirth
                        }
                    }}
                />
            </LocalizationProvider>
            <Grid container flexDirection={"column"} alignItems={"flex-start"}>
                <FormLabel component={"legend"}>Sex</FormLabel>
                <RadioGroup onChange={onChangeSex} row defaultValue={SEX_TYPES.MALE}>
                    <FormControlLabel value={SEX_TYPES.MALE} control={<Radio />} label="Male" />
                    <FormControlLabel value={SEX_TYPES.FEMALE} control={<Radio />} label="Female" />
                </RadioGroup>
            </Grid>
            <TextField 
                fullWidth  
                label="Language" 
                id="fullWidth" 
                onChange={onChangeLanguage}
                error={errors.language ? true : false}
                helperText={errors.language ?? undefined}
            />
            <TextField 
                fullWidth 
                label="Operation" 
                id="fullWidth" 
                onChange={onChangeOperation}
                error={errors.operation ? true : false}
                helperText={errors.operation ?? undefined}
            />
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </form>
    );

}

export default AddPatientForm;