import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


export default function EditCustomer(props){

    
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false); 

    const handleClickOpen = () => {
        setOpen(true)
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
        })
    }

    const handleInputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick')
        setOpen(false)
    }

    const handleSave = () => {
        console.log(props.params.data.links.href);
        props.updateCustomer(props.params.data.links.href, customer);
        setOpen(false); 
    }


    return (
        <>
        <Button size="small" onClick={handleClickOpen}>Edit</Button>

        <Dialog

            open={open}
            onClose={handleClose}>

            <DialogTitle>Edit Customer</DialogTitle>

            <DialogContent>

                <TextField
                margin="dense"
                label='Firstname'
                name='firstname'
                value={customer.firstname}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='Lastname'
                name='lastname'
                value={customer.lastname}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='Streetaddress'
                name='streetaddress'
                value={customer.streetaddress}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='Postcode'
                name='postcode'
                value={customer.postcode}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='City'
                name='city'
                value={customer.city}
                onChange={handleInputChanged}
                fullWidth
                variant="standard"
                ></TextField>

                <TextField
                margin="dense"
                label='Email'
                name='email'
                value={customer.email}
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