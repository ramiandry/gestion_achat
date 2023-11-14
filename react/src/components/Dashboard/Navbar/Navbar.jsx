import { useTheme, styled } from "@mui/material/styles";
import { AppBar, Avatar, Box, ButtonBase, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography } from "@mui/material";
import React from "react";
import Logo from "./Logo";
import { Adjust, FilterList, List, ListAlt, Search, Tune } from "@mui/icons-material";
import { shouldForwardProp } from '@mui/system';
import Notification from "./Notification";
import Profile from "./Profile";
var isActive=true;
const sidebar=()=>{
  isActive=false
  Navbar.prototype.sidebar=false
}
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius:10,
    height:50,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important',
        borderColor:theme.palette.error.light,
        '& input:hover':{
            borderColor:theme.palette.error.dark,
        },
    },
    
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.grey[200],
    color: theme.palette.error.dark,
    '&:hover': {
        background: theme.palette.error.dark,
        color: theme.palette.grey[200]
    }
}));

function Navbar() {
  const theme = useTheme();
  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        transition: theme.transitions.create("width"),
      }}
    >
      <Toolbar>

        {/*---------------------Logo---------------------*/}
        <Box width="14vw" display="flex" justifyContent="space-between">
          <ButtonBase>
            <Logo />
          </ButtonBase>
          <IconButton
            sx={{
              borderRadius: "10px",
              transition: "all .2s ease-in-out",
              background: theme.palette.grey[200],
              "&:hover": {
                background: theme.palette.error.dark,
                color: theme.palette.grey[200],
              },
            }}
            onClick={sidebar}
          >
            <List stroke={1.5} size="1.3rem" sx={{color:theme.palette.error.light, "&:hover":{
                color:theme.palette.gray
            }}} />
          </IconButton>
        </Box>

        {/*-----------------------Search Section-----------------------*/}
        <Box sx={{width:"70vw", display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    onChange={(e) => false}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search sx={{fontSize:"14pt"}} color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <ButtonBase sx={{ borderRadius: '12px' }}>
                                <HeaderAvatarStyle variant="rounded">
                                    <Tune fontSize="5px"/>
                                </HeaderAvatarStyle>
                            </ButtonBase>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
            <Box width="14vw" display="flex" justifyContent="space-between">
                <Notification/>
                
                <Profile/>
            </Box>
      </Toolbar>
    </AppBar>
  );

}

Navbar.prototype.sidebar=isActive
export default Navbar;
