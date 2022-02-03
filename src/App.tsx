import React, {useEffect, useState} from 'react';
import './App.css';
import {Typography} from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {
  Route, Link, Routes
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrustParticipantPage from "./pages/TrustParticipantPage";

const drawerWidth = 240;

function App() {

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to="/trustparticipants">
          <ListItem button>
            <ListItemText primary={"Trust Participants"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;




  return (
    <div>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>

          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />

          <Routes>
            <Route
              key={'home'}
              path="/"
              element={
                <HomePage />
              }
            />

            <Route
              key={'trustparticipantpage'}
              path="/trustparticipants"
              element={
                <TrustParticipantPage />
              }
            />

            {/*<Redirect to="/" />*/}
          </Routes>
        </Box>
      </Box>




    </div>
  );
}

export default App;
