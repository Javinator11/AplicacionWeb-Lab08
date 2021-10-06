import * as React from 'react';
import "./index.css";
import { AppBar, IconButton, Typography, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";


/**
 * Navigation bar elements
 * @returns NavigationBar UI elements
 */
const NavigationBar = () => {
    return(
        <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography className="storeName" variant="h6" color="inherit" component="div">
            <Link className="product-list-link" to={`/`}>ChambaSoft Store</Link>
          </Typography>
        </Toolbar>
      </AppBar>

    );
};

export default NavigationBar;