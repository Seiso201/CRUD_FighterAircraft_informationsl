import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import MediaCard from './components/Card.jsx';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const theme = useTheme();

  useEffect(() => {
    // ใช้ axios ซึ่งดีกว่า fetch ตรงที่แปลงเป็น json ให้เลย
    axios.get('http://localhost:3000/')
      .then(response => {
        setBackendData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Axios fetch error:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []); // [] คือ dependencies ถ้าค่าไหนในวงเล็บนี้เปลี่ยน useState จะทำงานอีกครั้ง ถ้าเป็นค่าว่างจะทำงานตอนแรกทีเดียว

  return (
    <Container>
      <div className="App" >
      <Typography variant='h2' sx={{color:theme.palette.secondary.main, fontFamily:theme.typography.fontFamily}}>Air-Craft</Typography>

      <div>
      <p>{text}</p>
      <form>
        <TextField id="outlined-basic" label="Search" variant="outlined" type="text" sx={{width:500, margin:1}} value={text} onChange={(e) => setText(e.target.value)}/>
      </form>
      <div id='btn'>
      <Button sx={{margin:1, fontFamily:theme.typography.fontFamily}}>Search</Button>
    </div>
    </div>
      
      {loading && <p>Loading data from backend...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* การใช้ props */}
      {backendData && (
          <MediaCard data={backendData} sx={{}} />
      )}
    </div>

    </Container>
  )
}

export default App
