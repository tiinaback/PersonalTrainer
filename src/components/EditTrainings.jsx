import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";


export default function EditTrainings(props){

    
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    });

    const [open, setOpen] = useState(false); 

    const handleClickOpen = () => {
        setOpen(true)
        setTraining({
            date: props.params.data.date,
            duration: props.params.data.duration,
            activity: props.params.data.activity,
        })
    }

    const handleInputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick')
        setOpen(false)
    }

    const handleSave = () => {
        console.log(props.params.data.links.href);
        props.updateTraining(props.params.data.links.href, training);
        setOpen(false); 
    }

    const changeDate = (event) => {
        console.log("change date " + event);
        console.log("change date " + event.format("DD.MM.YYYY"));
        setTraining({...training, date: event.format("DD.MM.YYYY")});
    }


    return (
        <>

        <Button size="small" onClick={handleClickOpen}>Edit</Button>

        <Dialog

            open={open}
            onClose={handleClose}>

            <DialogTitle>Edit Training</DialogTitle>

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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>

        </Dialog>
        </>
    );
}