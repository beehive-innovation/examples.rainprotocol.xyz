import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import {
  Route, Routes
} from "react-router-dom";

import BasicInteractionExample from "./examples/BasicInteractionExample/BasicInteractionExample";
import HomePage from "./pages/HomePage";
import ListItemLink from "./components/ListItemLink";
import OpcodeCalculatorExample from "./examples/OpcodeCalculatorExample/OpcodeCalculatorExample";
import DeploySaleExample from "./examples/DeploySaleExample/DeploySaleExample";
import DeployGatedNFTExample from "./examples/DeployGatedNFTExample/DeployGatedNFTExample";

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
        <ListItemLink to="/" text="Home" />
        <ListItemLink to="/basic-interaction-example" text="Basic Interaction Example" />
        <ListItemLink to="/opcode-calculator-example" text="Opcode Calculator Example" />
        <ListItemLink to="/deploy-sale-example" text="Deploy Sale Example" />
        <ListItemLink to="/deploy-gatednft-example" text="Deploy GatedNFT Example" />
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
            bgcolor: 'background.paper',
            boxShadow: 1
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
              key={'basic-interaction-example'}
              path="/basic-interaction-example"
              element={
                <BasicInteractionExample />
              }
            />
            <Route
              key={'opcode-calculator-example'}
              path="/opcode-calculator-example"
              element={
                <OpcodeCalculatorExample />
              }
            />
            <Route
              key={'deploy-sale-example'}
              path="/deploy-sale-example"
              element={
                <DeploySaleExample />
              }
            />
            <Route
              key={'deploy-gatednft-example'}
              path="/deploy-gatednft-example"
              element={
                <DeployGatedNFTExample />
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
