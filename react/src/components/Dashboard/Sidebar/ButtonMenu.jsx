import { Article, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bolder",
  },
}));

export default function ButtonMenu({ path, titre, content, icon }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box>
      <Accordion
        elevation={0}
        sx={{
          borderRadius: "10px",
          fontSize: "11pt",
          width: 220,
          padding: 0,
          bgcolor:
            path !== window.location.pathname
              ? theme.palette.grey[100]
              : "#F7B2CF",
          color:
            path !== window.location.pathname
              ? theme.palette.grey[700]
              : theme.palette.error.dark,
          height: 40,
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
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{lineHeight:0, alignItems:"center", width:"100%", '& .css-o4b71y-MuiAccordionSummary-content':{
        alignItems:"center"
          }}}
        >
          <Icon>{icon}</Icon>
          <Typography sx={{ fontSize: "11pt !important" }} variant="inherit">
            {titre}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{position:"relative"}}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
