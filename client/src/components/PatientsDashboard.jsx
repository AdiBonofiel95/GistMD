import { DataGrid } from '@mui/x-data-grid';

function PatientsDashboard(props) {
    const columns = [
        { field: 'patientName', headerName: 'Patient name', minWidth: 200,},
        { field: 'sex', headerName: 'Sex', minWidth: 100,},
        { field: 'age', headerName: 'Age', type: 'number', minWidth: 100,},
        { field: 'language', headerName: 'Language', minWidth: 140,},
        { field: 'operation', headerName: 'Operation', minWidth: 140,},
    ];


    return (
        <DataGrid
            rows={props.data}
            columns={columns}
            autoPageSize={true}
        />
    );
    
}

export default PatientsDashboard;