import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: '1px solid #282c34',
    borderRadius: 10,
    color: "White",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ children, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const {data} = await axios.get(`
    https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setContent(data);
    
  }
  // console.log(content);

  const fetchVideo = async () => {
    const {data} = await axios.get(`
    https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setVideo(data.results[0]?.key);
  }
  
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div className="media" onClick={handleOpen} style={{cursor:"pointer"}} color="inherit">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          { content && (
            <div className={classes.paper}>
            <div className="ContentModal">
              <img 
                alt={content.title}
                className="ContentModal__portrait"
                src={content.poster_path ? 
                  `${img_500}/${content.poster_path}` : 
                    unavailable} 
              />
              <img 
                alt={content.title}
                className="ContentModal__landscape"
                src={content.backdrop_path ? 
                  `${img_500}/${content.backdrop_path}` : 
                    unavailableLandscape} 
              />
              <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.title}(
                      {(content.release_date || "-----").substring(0,4)}
                    )
                  </span>
                  {content.tagline && 
                    (<i className="tagline">{content.tagline}</i>)
                  }
                  <span className="ContentModal__description">{content.overview}</span>
                  <i className="tagline">{content.vote_count} People Like 👍 this movie with {content.vote_average} ⭐ Rating</i>
                  <div>
                    <Carousel id={id}/>
                  </div>
                  <Button 
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}>
                    Watch the trailer 
                  </Button>
              </div>
            </div>
          </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
