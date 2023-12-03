import { Button, Snackbar } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddTrainings from "./AddTrainings";
import EditTrainings from "./EditTrainings";

export default function Trainings () {

    const [trainings, setTrainings] = useState([{
        date: null,
        duration: '',
        activity: '',
    }]);

    const [msg, setMsg] = useState('');

    const [open, setOpen] = useState(false);



    const columns = [
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true, width: 150 },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        },
        {
            cellRenderer: params => <EditTrainings params={params} updateTraining={updateTraining} />,
            width: 120
        }
    ]

    const gridRef = useRef();


    useEffect(() => getTrainings(), [])

    const url_trainings = 'https://traineeapp.azurewebsites.net/api/trainings';
    const getTrainings = () => {
        fetch(url_trainings)
            .then(response => response.json())
            .then(responseData =>
                setTrainings(responseData.content))
            .catch(error => console.error(error));

    }

    const deleteTraining = (params) => {
        console.log("params: " + params.data.links.href);
        fetch(params.data.links.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Training is deleted successfully!');
                    setOpen(true);
                    getTrainings();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => console.error(error));

    }

    const addTraining = (training) => {
            fetch(url_trainings, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    getTrainings();
                } else {
                    alert('Something went wrong!')
                }
            })
            .catch(error => console.error(error))
    }

    const updateTraining = (url_trainings, updatedTraining) => {
            fetch(url_trainings, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTraining)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Training updated successfully');
                    setOpen(true);
                    getTrainings();
                } else
                    alert('Something went wrong' + response.statusText)
            })
            .catch(error => console.error(error))
    }


    return (
        <>
            <AddTrainings addTraining={addTraining} />
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    animateRows={true}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}>
                </AgGridReact>

                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>

                </Snackbar>
            </div>
        </>
    )
}