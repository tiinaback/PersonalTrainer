import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function AddTrainings(props){

    
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    });

    const [open, setOpen] = useState(false); 

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick')
        setOpen(false)
    }

    const handleInputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false); 
    }

    const changeDate = (event) => {
        console.log("change date " + event);
        console.log("change date " + event.format("DD.MM.YYYY"));
        setTraining({...training, date: event.format("DD.MM.YYYY")});
    }

    return (
        <>
        <Button variant="outlined"
            onClick={() => setOpen(true)}>New Training</Button>

        <Dialog

            open={open}
            onClose={handleClose}>

            <DialogTitle>New Training</DialogTitle>

            <DialogContent>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                margin="dense"
                label='Date'
                name='date'
                value={training.date}
                onChange={changeDate}
                fullWidth
                variant="standard"
                ></DatePicker>
                </LocalizationProvider>

                <TextField
                margin="dense"
                label='Duration'
                name='duration'
                value={training.duration}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='Activity'
                name='activity'
                value={training.activity}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>

        </Dialog>
        </>
    );
}