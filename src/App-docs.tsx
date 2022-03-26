import React, {useEffect, useState} from 'react';
import './App.css';
import {Container, Typography} from "@mui/material";

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
import ContractPage from "./pages/ContractPage";
import CRPPage from "./pages/CRPPage";
import DistributionProgressPage from "./pages/DistributionProgressPage";
import DutchAuctionPage from "./pages/DutchAuctionPage";
import HolderPage from "./pages/HolderPage";
import NoticePage from "./pages/NoticePage";
import PoolPage from "./pages/PoolPage";
import RedeemableERC20Page from "./pages/RedeemableERC20Page";
import RedeemableERC20PoolPage from "./pages/RedeemableERC20PoolPage";
import RedeemablePage from "./pages/RedeemablePage";
import RedeemPage from "./pages/RedeemPage";
import RedeemSeedPage from "./pages/RedeemSeedPage";
import ReserveERC20Page from "./pages/ReserveERC20Page";
import SeedERC20Page from "./pages/SeedERC20Page";
import SeedPage from "./pages/SeedPage";
import SwapPage from "./pages/SwapPage";
import TreasuryAssetCaller from "./pages/TreasuryAssetCaller";
import TreasuryAssetPage from "./pages/TreasuryAssetPage";
import TrustFactoryPage from "./pages/TrustFactoryPage";
import UnseedPage from "./pages/UnseedPage";
import TrustPage from "./pages/TrustPage";

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

        <Link to="/contract">
          <ListItem button>
            <ListItemText primary={"Contract"} />
          </ListItem>
        </Link>
        <Link to="/crp">
          <ListItem button>
            <ListItemText primary={"CRP"} />
          </ListItem>
        </Link>
        <Link to="/distributionprogress">
          <ListItem button>
            <ListItemText primary={"DistributionProgress"} />
          </ListItem>
        </Link>
        <Link to="/dutchauction">
          <ListItem button>
            <ListItemText primary={"DutchAuction"} />
          </ListItem>
        </Link>
        <Link to="/holder">
          <ListItem button>
            <ListItemText primary={"Holder"} />
          </ListItem>
        </Link>
        <Link to="/notice">
          <ListItem button>
            <ListItemText primary={"Notice"} />
          </ListItem>
        </Link>
        <Link to="/pool">
          <ListItem button>
            <ListItemText primary={"Pool"} />
          </ListItem>
        </Link>
        <Link to="/redeemableerc20">
          <ListItem button>
            <ListItemText primary={"RedeemableERC20"} />
          </ListItem>
        </Link>
        <Link to="/redeemableerc20pool">
          <ListItem button>
            <ListItemText primary={"RedeemableERC20Pool"} />
          </ListItem>
        </Link>
        <Link to="/redeemable">
          <ListItem button>
            <ListItemText primary={"Redeemable"} />
          </ListItem>
        </Link>
        <Link to="/redeem">
          <ListItem button>
            <ListItemText primary={"Redeem"} />
          </ListItem>
        </Link>
        <Link to="/redeemseed">
          <ListItem button>
            <ListItemText primary={"RedeemSeed"} />
          </ListItem>
        </Link>
        <Link to="/reserveerc20">
          <ListItem button>
            <ListItemText primary={"ReserveERC20"} />
          </ListItem>
        </Link>
        <Link to="/seederc20">
          <ListItem button>
            <ListItemText primary={"SeedERC20"} />
          </ListItem>
        </Link>
        <Link to="/seed">
          <ListItem button>
            <ListItemText primary={"Seed"} />
          </ListItem>
        </Link>
        <Link to="/swap">
          <ListItem button>
            <ListItemText primary={"Swap"} />
          </ListItem>
        </Link>
        <Link to="/treasuryassetcaller">
          <ListItem button>
            <ListItemText primary={"TreasuryAssetCaller"} />
          </ListItem>
        </Link>
        <Link to="/treasuryasset">
          <ListItem button>
            <ListItemText primary={"TreasuryAssetPage"} />
          </ListItem>
        </Link>
        <Link to="/trustfactory">
          <ListItem button>
            <ListItemText primary={"TrustFactory"} />
          </ListItem>
        </Link>
        <Link to="/trust">
          <ListItem button>
            <ListItemText primary={"Trust"} />
          </ListItem>
        </Link>
        <Link to="/trustparticipant">
          <ListItem button>
            <ListItemText primary={"TrustParticipant"} />
          </ListItem>
        </Link>
        <Link to="/unseed">
          <ListItem button>
            <ListItemText primary={"Unseed"} />
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
              key={'contractpage'}
              path="/contract"
              element={
                <ContractPage/>
              }
            />
            <Route
              key={'crppage'}
              path="/crp"
              element={
                <CRPPage />
              }
            />
            <Route
              key={'distributionprogresspage'}
              path="/distributionprogress"
              element={
                <DistributionProgressPage />
              }
            />
            <Route
              key={'dutchauctionpage'}
              path="/dutchauction"
              element={
                <DutchAuctionPage />
              }
            />
            <Route
              key={'holderpage'}
              path="/holder"
              element={
                <HolderPage />
              }
            />
            <Route
              key={'noticepage'}
              path="/notice"
              element={
                <NoticePage />
              }
            />
            <Route
              key={'poolpage'}
              path="/pool"
              element={
                <PoolPage />
              }
            />
            <Route
              key={'redeemableerc20page'}
              path="/redeemableerc20"
              element={
                <RedeemableERC20Page />
              }
            />
            <Route
              key={'redeemableerc20poolpage'}
              path="/redeemableerc20pool"
              element={
                <RedeemableERC20PoolPage/>
              }
            />
            <Route
              key={'redeemablepage'}
              path="/redeemable"
              element={
                <RedeemablePage />
              }
            />
            <Route
              key={'redeempage'}
              path="/redeem"
              element={
                <RedeemPage />
              }
            />
            <Route
              key={'redeemseedpage'}
              path="/redeemseed"
              element={
                <RedeemSeedPage />
              }
            />
            <Route
              key={'reserveerc20page'}
              path="/reserveerc20"
              element={
                <ReserveERC20Page />
              }
            />
            <Route
              key={'seederc20page'}
              path="/seederc20"
              element={
                <SeedERC20Page />
              }
            />
            <Route
              key={'seedpage'}
              path="/seed"
              element={
                <SeedPage />
              }
            />
            <Route
              key={'swappage'}
              path="/swap"
              element={
                <SwapPage />
              }
            />
            <Route
              key={'trustpage'}
              path="/trust"
              element={
                <TrustPage />
              }
            />
            <Route
              key={'treasuryassetcallerpage'}
              path="/treasuryassetcaller"
              element={
                <TreasuryAssetCaller />
              }
            />
            <Route
              key={'treasuryassetpage'}
              path="/treasuryasset"
              element={
                <TreasuryAssetPage />
              }
            />
            <Route
              key={'trustfactorypage'}
              path="/trustfactory"
              element={
                <TrustFactoryPage />
              }
            />
            <Route
              key={'trustparticipantpage'}
              path="/trustparticipant"
              element={
                <TrustParticipantPage />
              }
            />
            <Route
              key={'unseedpage'}
              path="/unseed"
              element={
                <UnseedPage />
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
