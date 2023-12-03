import { useState } from "react";
import Trainings from "./Trainings";
import Customers from "./Customers";
import Home from "./Home";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";

function TabFunction() {

    const [value, setValue] = useState('Home');
  
    const handleChange = (event, value) => {
      console.log("Tab value is " + value);
      setValue(value);
    
    }
  

 return(   

  <div>

    <Tabs value={value} onChange={handleChange} centered={true}>
      <Tab label='Home' value='Home'/>
      <Tab label='Customers' value='Customers'/>
      <Tab label='Trainings' value='Trainings'/>
    </Tabs>
    {value === 'Home' && <Home/>}
    {value === 'Customers' && <Customers/>}
    {value === 'Trainings' && <Trainings/>}

  </div>

 );
 
}

 export default TabFunction

