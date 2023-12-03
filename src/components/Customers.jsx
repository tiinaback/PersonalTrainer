import { Button, Snackbar } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";



export default function Customers() {

    const [customers, setCustomers] = useState([{
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    }]);

    const [msg, setMsg] = useState('');

    const [open, setOpen] = useState(false);

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true, width: 150 },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true, width: 150 },
        { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 150 },
        { headerName: 'City', field: 'city', sortable: true, filter: true, width: 150 },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        },
        {
            cellRenderer: params => <EditCustomer params={params} updateCustomer={updateCustomer} />,
            width: 120
        }
    ]

    const gridRef = useRef();


    useEffect(() => getCustomers(), [])

    const url_customers = 'https://traineeapp.azurewebsites.net/api/customers';
    const getCustomers = () => {
        fetch(url_customers)
            .then(response => response.json())
            .then(responseData =>
                setCustomers(responseData.content))
            .catch(error => console.error(error));

    }

    const deleteCustomer = (params) => {
        console.log("params: " + params.data.links.href);
        fetch(params.data.links.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer is deleted successfully!');
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => console.error(error));

    }

    const addCustomer = (customer) => {
            fetch(url_customers, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert('Something went wrong!')
                }
            })
            .catch(error => console.error(error))
    }

    const updateCustomer = (url_customers, updatedCustomer) => {
            fetch(url_customers, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer updated successfully');
                    setOpen(true);
                    getCustomers();
                } else
                    alert('Something went wrong' + response.statusText)
            })
            .catch(error => console.error(error))
    }


    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
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

