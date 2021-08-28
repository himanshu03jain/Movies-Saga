import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/singleContent"
import "./Popular.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Popular = ({ setNewfavMov }) => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    
    const fetchPopular = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        //console.log(data.results);
        setContent(data.results);
    };

    function addMovie(newMovie, newTitle, newPoster, newRelease_date, newVote_average, newVote_count) {
        
        setNewfavMov((prevMov) => {
            return [...prevMov, {
                key: Math.random(),
                id: newMovie,
                title: newTitle,
                poster: newPoster,
                release_date: newRelease_date,
                vote_average: newVote_average,
                vote_count: newVote_count
            }];
        });
               
        toast.info('Successfully added to favourites', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500
        });
        
    };

    //console.log(detail);

    useEffect(() => {
        fetchPopular();
    }, [page]);
    return (
        <div>
            <span className="pageTitle">Popular Movies</span>
            <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            title={c.title}
                            poster={c.poster_path}
                            release_date={c.release_date}
                            vote_average={c.vote_average}
                            vote_count={c.vote_count}
                            buttonName="Add"
                            handleFav={addMovie}
                    />)
                )}
            </div>
            <CustomPagination setPage={setPage} numOfPages={10} />
        </div>
    );
}

export default Popular;