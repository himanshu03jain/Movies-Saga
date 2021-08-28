import React, { useState} from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import Popular from "./Pages/Popular/Popular";
import Favourite from "./Pages/Favourites/Favourite"
import Search from "./Pages/Search/Search";
import About from "./Pages/About/About";

const FavouriteRender = withRouter(Favourite);


function App() {

    const [newfavMov, setNewfavMov] = useState([]);
    //console.log(newfavMov);
    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <Container>   
                    <Switch>
                        <Route
                            path="/"
                            render={routeProps => <Popular {...routeProps} setNewfavMov={setNewfavMov}/>}
                            exact
                        />

                        <Route path="/favourite" >
                            <FavouriteRender newfavMov={newfavMov} setNewfavMov={setNewfavMov}/>
                        </Route>
                        <Route
                            path="/search"
                            render={routeProps => <Search {...routeProps} setNewfavMov={setNewfavMov}/>}
                            
                        />
                        
                        <Route path="/about" component={About}/>
                    </Switch>
                </Container>
                <Navbar />
            </div>

        </BrowserRouter>
    );
}

export default App;