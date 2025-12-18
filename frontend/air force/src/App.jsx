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
  const domain = "http://localhost:3000/api";

  // modal
  const [modal, setModal] = useState({ type: null, id: null });
  const openCreate = () => setModal({ type: 'create', id: null });
  const openEdit = id => setModal({ type: 'edit', id });
  const closeModal = () => setModal({ type: null, id: null });

  const handleDelete = async (id) => {
  if (!id) return;
  if (!window.confirm("Delete this aircraft?")) return;

  try {
    setLoading(true);
    await axios.delete(`${domain}/aircrafts/${id}`);
    setBackendData(prev => (prev ? prev.filter(item => item.id !== id) : prev));
  } catch (err) {
    console.error("Delete error:", err);
    setError(err.message || "Delete failed");
  } finally {
    setLoading(false);
  }
};

  const fetchAircrafts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(domain + "/aircrafts");
      setBackendData(res.data);
      setError(null);
    } catch (err) {
      console.error("Axios fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAircrafts();
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
                  onDelete={() => handleDelete(item.id)}
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
          <Form use_for={modal.type === "create" ? "create" : "edit"} id={modal.id} onClose={closeModal} onSaved={fetchAircrafts} edit_data={backendData?.find(item => item.id === modal.id)}  />
        </Modal>

      </div>
    </Container>
  );
}

export default App;
