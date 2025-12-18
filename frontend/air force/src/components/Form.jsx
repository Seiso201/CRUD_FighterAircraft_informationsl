import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AntSwitch from "@mui/material/Switch";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

export default function Form({ use_for, id, edit_data, onClose, onSaved }) {
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [max_speed, setMax_speed] = useState("");
  const [year, setYear] = useState("");
  const [stealth, setStealth] = useState(true);
  const [image, setImage] = useState(null);

  const [responseMessage, setResponseMessage] = useState("");

  const domain = "http://localhost:3000/api";
  const url = use_for === "create" ? `${domain}/aircrafts` : `${domain}/aircrafts/${id}`;
  const method = use_for === "create" ? axios.post : axios.put;

  // ฟังก์ชันจัดการการเลือกไฟล์
  const handleFileChange = (event) => {
    // เก็บไฟล์แรกที่ผู้ใช้เลือก (event.target.files เป็น Array)
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      setResponseMessage("Please select an image file first.");
      return;
    }

    // สร้าง FormData Object นี่คือสิ่งสำคัญที่ใช้ในการส่งไฟล์และข้อมูลข้อความรวมกัน
    const formData = new FormData();

    formData.append("name", name);
    formData.append("role", role);
    formData.append("country", country);
    formData.append("max_speed", max_speed);
    formData.append("year", year);
    formData.append("stealth", stealth);
    if (use_for === "edit" && edit_data && image === edit_data.image) {
      formData.append("current_image", edit_data.image);
    } else {
      formData.append("image", image);
    }

    console.log([...formData.entries()]);

    // รีเซ็ตข้อความตอบกลับ
    setResponseMessage("Sending data...");

    try {
      const response = await method(
        url, formData);

      // สำเร็จ
      setResponseMessage(`Success: ${response.data.message}`);
      // เคลียร์ฟอร์ม
      setName("");
      setRole("");
      setCountry("");
      setMax_speed("");
      setYear("");
      setStealth(true);
      setImage(null);
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = null;

      // notify parent to refresh list and close modal
      if (onSaved) await onSaved();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error sending data:", error);
      // จัดการ Error ที่มาจาก Server หรือ Network
      setResponseMessage(
        `Error: ${error.response?.data?.error || "Network or server error"}`
      );
    }
  };

  useEffect(() => {
      if (use_for === "edit" && edit_data) {
        setName(edit_data.name || "");
        setRole(edit_data.role || "");
        setCountry(edit_data.country || "");
        setMax_speed(edit_data.max_speed || "");
        setYear(edit_data.year || "");
        setStealth(Boolean(edit_data.stealth));
        setImage(edit_data.image || null);
    }
  }, [use_for, edit_data]);

  return (
    <Box sx={style}>
      {use_for === "create" ? (
        <Container>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ marginY: "10px" }}
            component="h2"
            style={{ textAlign: "center" }}
          >
            Create Aircraft
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "100%" }}
              label="Air-Craft Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "100%" }}
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", marginRight: "4%", width: "48%" }}
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "48%" }}
              label="Max-Speed"
              variant="outlined"
              value={max_speed}
              onChange={(e) => setMax_speed(e.target.value)}
              required
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", marginY: "10px" }}
            >
              <TextField
                id="outlined-basic"
                sx={{ marginY: "10px", marginRight: "4%", width: "48%" }}
                label="First Year Service"
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
              <Stack
                direction="column"
                sx={{
                  alignItems: "center",
                  width: "48%",
                  justifyContent: "center",
                }}
              >
                <Typography>Stealth: </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>false</Typography>
                  <AntSwitch
                    checked={stealth}
                    onChange={(e) => setStealth(e.target.checked)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>true</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ marginY: "10px", marginRight: "60%" }}
            >
              Upload files
              <VisuallyHiddenInput
                id="file-input"
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            {image && <p style={{ margin: "5px 0" }}>Selected: {image.name}</p>}
            <Button type="submit" sx={{ marginY: "30px" }}>
              Submit
            </Button>
          </form>

          {/* แสดงผลการตอบกลับจาก Server */}
          {responseMessage && (
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
              Server Response: {responseMessage}
            </p>
          )}
        </Container>
      ) : (
        <Container>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ marginY: "10px" }}
            component="h2"
            style={{ textAlign: "center" }}
          >
            Edit Aircraft
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "100%" }}
              label="Air-Craft Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "100%" }}
              label="Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", marginRight: "4%", width: "48%" }}
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              sx={{ marginY: "10px", width: "48%" }}
              label="Max-Speed"
              variant="outlined"
              value={max_speed}
              onChange={(e) => setMax_speed(e.target.value)}
              required
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", marginY: "10px" }}
            >
              <TextField
                id="outlined-basic"
                sx={{ marginY: "10px", marginRight: "4%", width: "48%" }}
                label="First Year Service"
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />

              <Stack
                direction="column"
                sx={{
                  alignItems: "center",
                  width: "48%",
                  justifyContent: "center",
                }}
              >
                <Typography>Stealth: </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>false</Typography>
                  <AntSwitch
                    checked={stealth}
                    onChange={(e) => setStealth(e.target.checked)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography>true</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ marginY: "10px", marginRight: "60%" }}
            >
              Upload files
              <VisuallyHiddenInput
                id="file-input"
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </Button>
            {image && <p style={{ margin: "5px 0" }}>Selected: {image.name}</p>}
            <Button type="submit" sx={{ marginY: "30px" }}>
              Submit
            </Button>
          </form>

          {/* แสดงผลการตอบกลับจาก Server */}
          {responseMessage && (
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
              Server Response: {responseMessage}
            </p>
          )}
        </Container>
      )}
    </Box>
  );
}
