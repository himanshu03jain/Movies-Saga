import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {img_300, noPicture} from "../../config/config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({id}) => {

  const [credits, setCredits] = useState([]);
  let i=0;
  let image = [];
  

  const items = credits.map((c) => {
    // console.log(c);
    <div className="carouselItem">
      <img 
        src={`${img_300}`/c.profile_path}
        alt={c?.name}
        onDragStart = {handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  // let x = `${img_300}/${c.profile_path}`;
  // image[i] = <div className="carouselItem">
  // <img src = {x} alt={c?.name} onDragStart = {handleDragStart} className="carouselItem__img"/>
  // <b className="carouselItem__txt">{c?.name}</b>
  // </div>
  // i++;
  // console.log(image);
  });

  //console.log(items);
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    // console.log(data);
    // console.log(data.cast[0].profile_path);
    setCredits(data.cast);
  }

  useEffect(() => {
    fetchCredits();
  }, []);
  return (
    <AliceCarousel 
      mouseTracking
      items={items}
      responsive={responsive}
      infinite
      disableDotsControls
      disableButtonsControls
      autoPlay
    />
  );
};

export default Carousel;