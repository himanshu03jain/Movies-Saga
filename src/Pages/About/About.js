import React from "react";

function About() {
    return(
        <>
        <div style={{marginLeft: "50px"}}>
        <h2>It shows the trending movies</h2>
        <br></br>
        <ul>
            <li>If you like any movie you can add into favourite section by clicking on Add Button</li>
            <li>You can also remove the added movie from favourite section by clicking on Remove button</li>
        </ul>
        <br></br>
        <h2>You can search any movie in search tab </h2>
        <br></br>
        <ul>
            <li>Type any movie name and press search icon</li> 
        </ul>
        <br></br>
        <h2>Main function</h2>
        <br></br>
        <ul>
            <li>If you click on any movie card it shows the full detail of that movie Like:</li>
            <br></br>
            <p>💠Deccription</p>
            <p>💠Year</p>
            <p>💠Trailer</p>
            <p>💠Cast</p>
        </ul>
        <br></br>
        <ul>
            <li>
                <p>If you are facing any problem in this you can raise an issue on my <a href="https://github.com/himanshu03jain/Movies-Saga/" style={{color:"white"}}>Github</a></p>
            </li>
        </ul>
        </div>
        <p style={{textAlign:"center", positon: "relative", marginTop: "15px"}}>Made with 💓 by Himanshu jain ©️ 2021</p>
        </>
    );
};

export default About;