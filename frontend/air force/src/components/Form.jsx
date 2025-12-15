import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Form({use_for, id}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style}>
      {use_for === "create" ? (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Aircraft
        </Typography>
      ) : (
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Aircraft {id}
        </Typography>
      )}
    </Box>
  );
}
