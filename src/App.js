import './App.css';
import AlarmControl from './containers/AlarmControl';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container columns={12} sx={{ flexflow: 1 }}>
      <Grid item xs={6} margin='auto'>
        <AlarmControl />
      </Grid>
    </Grid>
  );
}

export default App;