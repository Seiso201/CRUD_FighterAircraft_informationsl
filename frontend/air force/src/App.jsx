import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import MediaCard from "./components/Card.jsx";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Form from "./components/Form";

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const theme = useTheme();
  const domain = "http://localhost:3000/";

  // modal
  const [modal, setModal] = useState({ type: null, id: null });
  const openCreate = () => setModal({ type: 'create', id: null });
  const openEdit = id => setModal({ type: 'edit', id });
  const closeModal = () => setModal({ type: null, id: null });

  useEffect(() => {
    // ใช้ axios ซึ่งดีกว่า fetch ตรงที่แปลงเป็น json ให้เลย
    axios
      .get(domain)
      .then((response) => {
        setBackendData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios fetch error:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []); // [] คือ dependencies ถ้าค่าไหนในวงเล็บนี้เปลี่ยน useState จะทำงานอีกครั้ง ถ้าเป็นค่าว่างจะทำงานตอนแรกทีเดียว

  return (
    <Container>
      <div className="App">
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.secondary.main,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Air-Craft
        </Typography>

        <div>
          <p>{text}</p>
          <form>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              type="text"
              sx={{ width: 500, margin: 1 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
          <div id="btn">
            <Button sx={{ margin: 1, fontFamily: theme.typography.fontFamily }}>
              Search
            </Button>
          </div>
        </div>
        
        {/* Modal */}
        <Button onClick={openCreate}>Create Aircraft</Button>

        {loading && <p>Loading data from backend...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* การใช้ props */}
        <Grid container spacing={2} sx={{ margin: 2 }}>
          {backendData &&
            backendData.map((item) => (
              <Grid size={4} key={item.id} >
                <MediaCard 
                  data={item} 
                  onEdit={() => openEdit(item.id)}
                />
              </Grid>
            ))}
        </Grid>
        
        {/* Modal */}
        <Modal
          open={modal.type !== null}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Form use_for={modal.type === "create" ? "create" : "edit"} id={modal.id} onClose={closeModal} edit_data={backendData?.find(item => item.id === modal.id)}  />
        </Modal>

      </div>
    </Container>
  );
}

export default App;
