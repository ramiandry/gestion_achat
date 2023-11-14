import { Slide, Snackbar } from "@mui/material";
import React, { useEffect } from "react";

import MuiAlert from "@mui/material/Alert";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Alerte() {
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(TransitionRight);

useEffect(()=>{
    console.log("alerte")
})

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={transition}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
}

export default Alerte;
