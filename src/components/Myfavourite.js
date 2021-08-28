import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent/singleContent";
import "../Pages/Popular/Popular.css";

function Myfavourites(props) {
    let path = props.link;
    const [content, setContent] = useState([]);
    // console.log(props);

    function removeMovie(id, title, poster, release_date, vote_average, vote_count){
        setContent(prevMov => {
            return prevMov.filter((mov, index) => {
                return index !== id;
            });
        });

        console.log(content);
    }
    
    const fetchFav = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/${path.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );

        //console.log(data);
        setContent(data);
        console.log(content);
    }

    useEffect(() => {
        fetchFav();
    }, []);
    
    return (

        <div >
            <SingleContent
                key={content.id}
                id={content.id}
                title={content.title}
                poster={content.poster_path}
                release_date={content.release_date}
                vote_average={content.vote_average}
                vote_count={content.vote_count}
                buttonName="Remove"
                removeFav={removeMovie}
            />
        </div>
    );
}

export default Myfavourites;