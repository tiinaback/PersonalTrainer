import { AppBar, Typography } from "@mui/material"
import TabFunction from "./components/TabFunction"




function App() {


  return (

    <div className="App">
    <AppBar position="sticky" color="default">
      <Typography variant="h5">
      Personal Trainer
      </Typography>
    </AppBar>
    <TabFunction />
    </div>

  )
}

export default App