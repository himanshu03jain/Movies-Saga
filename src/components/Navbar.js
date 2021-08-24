import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#393E46",
        zIndex: 100,
    },
});

function Navbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const history = useHistory();

    useEffect(() => {
        if (value === 0) history.push("/");
        else if(value === 1) history.push("/favourite");
        else if(value === 2) history.push("/search");
        else if(value === 3) history.push("/about");
        
    }, [value, history]);
    
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction style={{ color: "white" }} label="Popular" icon={<WhatshotIcon />} />
            <BottomNavigationAction style={{ color: "white" }} label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} />
            <BottomNavigationAction style={{ color: "white" }} label="About" icon={<ContactSupportIcon />} />
        </BottomNavigation>
    );
}

export default Navbar;