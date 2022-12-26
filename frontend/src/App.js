import './App.css';
import AlarmControl from './containers/AlarmControl';
import MenuBar from './components/MenuBar/MenuBar';
import { Grid } from '@mui/material';

function App() {
  return (
    <div>
      <MenuBar />
      <AlarmControl />
    </div>
  );
}

export default App;