import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./singleContent.css";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Badge from '@material-ui/core/Badge';
import ContentModal from "../ContentModal/ContentModal";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


function SingleContent({ id, title, poster, release_date, vote_average, vote_count, buttonName, handleFav, removeFav }) {
    const classes = useStyles();
    let icon = 1;
    if(buttonName === "Add"){
        icon = 1;
    }
    else{
        icon = 0;
    }
    
    return (
        <div className="joint">
        <ContentModal id={id}>
        <Badge badgeContent={vote_average} color={"secondary"} />
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">{release_date}
                <span>{vote_count} Votes</span>
            </span>
        </ContentModal>
        <div className="bot">
            <Button
                onClick={icon ? 
                    () => handleFav(id, title, poster, release_date, vote_average, vote_count) 
                    : () => removeFav(id, title, poster, release_date, vote_average, vote_count)}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={icon ? <Add /> : <Remove />}
            >
                {buttonName}
            </Button>
        </div>
        </div>
    );
};

export default SingleContent;