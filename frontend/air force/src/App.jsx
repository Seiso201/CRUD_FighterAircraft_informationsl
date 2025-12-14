import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');


  useEffect(() => {
    // 2. ใช้ fetch API เพื่อเรียก Express Endpoint
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
  }, []); // [] หมายถึงให้เรียกใช้แค่ครั้งเดียวเมื่อ Component mount

  return (
    <>
      <div className="App">
      <h1>Air Craft Transfer Data</h1>
      
      {loading && <p>Loading data from backend...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* 4. แสดงผลข้อมูลที่ได้รับ */}
      {backendData && (
        <div>
          <h2>Data Received:</h2>
          <p><strong>Air-Craft Name :</strong> {backendData.name}</p>
          <p><strong>Country:</strong> {backendData.country}</p>
          <p><strong>Role:</strong> {backendData.role}</p>
          <p><strong>Max-Speed:</strong> {backendData.max_speed}</p>
          <p><strong>Year:</strong> {backendData.year}</p>
          <p><strong>Stealth:</strong> {backendData.stealth}</p>
        </div>
      )}
    </div>

    <div>
      <p>{text}</p>
      <form>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </form>
    </div>
    </>
  )
}

export default App
