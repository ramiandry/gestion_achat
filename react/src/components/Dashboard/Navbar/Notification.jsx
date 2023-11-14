import { Notifications } from "@mui/icons-material";
import {
  Badge,
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
function Notification() {
  const theme = useTheme();
  var [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setAnchorEl(true);
  };

  const handleClickClose = () => {
    setAnchorEl(false);
  };
  return (
    <>
      <IconButton
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "10px",
          transition: "all .2s ease-in-out",
          background: theme.palette.grey[200],
          "&:hover": {
            background: theme.palette.error.dark,
            color: theme.palette.grey,
          },
        }}
      >
        <Badge variant="dot" color="info" si>
          <Notifications
            stroke={1.5}
            size="1.3rem"
            sx={{
              color: theme.palette.error.light,
              "&:hover": {
                color: theme.palette.grey[200],
              },
            }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl}
        onClose={handleClickClose}
        sx={{
          position: "absolute",
          left: "67%",
          top: "7%",
          height: "80vh !important",
          "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
            height: "90vh",
            width: "300px",
          },
        }}
      >
        <MenuItem onClick={handleClickClose}>dsndjsdnsjnds</MenuItem>
      </Menu>
    </>
  );
}

export default Notification;
