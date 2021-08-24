import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SingleContent from "../../components/SingleContent/singleContent"
import CustomPagination from "../../components/Pagination/CustomPagination";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#fff"
        },
    },
});

function Search({ setNewfavMov }) {

    const [content, setContent] = useState();
    const [searchText, setSearchText] = useState("");
    const [numOfPages, setNumOfPages] = useState();
    const [page, setPage] = useState(1);
    const [fav, setFav] = useState([]);
    const [detail, setDetail] = useState([
        {
            key: 1,
            id: 5,
            title: "title",
            poster: "poster",
            release_date: "release",
            vote_average: 8,
            vote_count: 100
        }
    ]);

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${numOfPages}&include_adult=false`);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    function addMovie(newMovie, newTitle, newPoster, newRelease_date, newVote_average, newVote_count) {
        //console.log(newMovie, newt);
        const newFav = [...fav, newMovie];
        const updateDetail = [
            ...detail,
            {
                key: detail.length + 1,
                id: newMovie,
                title: newTitle,
                poster: newPoster,
                release_date: newRelease_date,
                vote_average: newVote_average,
                vote_count: newVote_count
            }
        ];
        
        setDetail(updateDetail);
        setFav(newFav);
        
        setNewfavMov(updateDetail);

        toast.info('Successfully added to favourites', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500});
        // var x = document.getElementById("snackbar");
        // x.className = "show";
        // setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: " 15px 0px" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        style={{ marginLeft: 10 }} 
                        onClick={fetchSearch}> 
                        <SearchIcon fontSize="large"/>
                    </Button>
                </div>
            </ThemeProvider>
            <div className="trending">
                {content && content.map((c) => (
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
                {searchText &&
                    !content && 
                    (<h2>Press Search icon </h2>)
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Search;