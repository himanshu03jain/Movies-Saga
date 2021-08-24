import React, {useState} from "react";
import SingleContent from "../../components/SingleContent/singleContent";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CustomPagination from "../../components/Pagination/CustomPagination"
// import Myfavourites from "../../components/Myfavourite";

toast.configure();
const Favourite = ({ newfavMov }) => {

    // const [page, setPage] = useState(1);
    // const [newArr, setNewArr] = useState([]);
    let uniq = newfavMov.slice(1);
    let newArr = [];
    let newRemArr = [];
    let uniqObj = {};
    for(let i in uniq){
        let objtitle = uniq[i]['title'];
        uniqObj[objtitle] = uniq[i];
    }
    for (let i in uniqObj){
        newArr.push(uniqObj[i]);
    }
    

    function removeMovie(newMovie, newTitle, newPoster, newRelease_date, newVote_average, newVote_count){
        // newRemArr(prevMov => {
        //     return prevMov.filter((mov, index) => {
        //         return index !== newMovie;
        //     });
        // });
        newRemArr = newArr.filter((item) => item.id !== newMovie );
        newArr.splice(0, newArr.length);
        for(let i in newRemArr){
            newArr.push(newRemArr[i]);
        }
        toast.info('Successfully removed from favourites', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1500});
        //console.log(newArr);
    }
    //console.log(newArr);
    return (
        <div>
            <span className="pageTitle">Your favourite movies</span>
            <div className="trending">
                {
                    newArr && newArr.map((c) => <SingleContent
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        poster={c.poster}
                        release_date={c.release_date}
                        vote_average={c.vote_average}
                        vote_count={c.vote_count}
                        buttonName="Remove"
                        removeFav={removeMovie}
                    />)
                }
            </div>
            {/* <CustomPagination setPage={setPage} /> */}
        </div>
    );
}

export default Favourite;

        // <>
        // <span className="pageTitle" >Favourite</span>
        // <div className="trending">

        //     {uniq.map((mov, index) => {
        //             return <Myfavourites
        //                 key={index}
        //                 link={mov} />;
        //     })}
        // </div>
        // </>