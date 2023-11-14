import { useTheme } from "@mui/material/styles";
import { Box, Button, Icon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ButtonLink({ path, icon, titre }) {
  // var [pathname, setPathname]=useState(window.location.pathname)
  var location = useLocation();
  const theme = useTheme();
  console.log(window.location.pathname);
  return (
    <Link to={path}>
      <Button
        variant="text"
        sx={{
          borderRadius: "10px",
          marginY: "5px",
          fontSize: "11pt",
          width: 220,
          padding: "10px 20px",
          bgcolor: path != location.pathname ? theme.palette.grey[100] : "#F7B2CF",
          color:
            path != location.pathname
              ? theme.palette.grey[700]
              : theme.palette.error.dark,
          height: 50,
          textTransform: "capitalize",
          alignItems: "center",
          lineHeight: 0,
          justifyContent: "left",
          "&:hover": {
            color: theme.palette.error.dark,
            bgcolor: "#F7B2CF",
          },
        }}
      >
        <Icon sx={{ marginRight: "10px" }}>{icon}</Icon>
        <Typography variant="subtitle2">{titre}</Typography>
      </Button>
    </Link>
  );
}

export default ButtonLink;
