import { ComentariosList } from "./components/ComentariosList";
import { RestaurantList } from "./components/RestaurantList";
import { RestaurantCreate } from "./components/RestaurantCreate";
import { RestaurantDetail } from "./components/RestaurantDetail";
import { RestaurantEdit } from "./components/RestaurantEdit";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App(){
    return (
        <Router>
            <div>
                <h1>CRUD RESTAURANT</h1>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/list-restaurants">Restaurant Reviews</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/create-restaurant">Create Restaurant</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='/list-comments' element={<ComentariosList/>}/>
                    <Route path='/list-restaurants' element={<RestaurantList/>}/>
                    <Route path='/create-restaurant' element={<RestaurantCreate/>}/>
                    <Route path='/Restaurant-detail/:id' element={<RestaurantDetail/>}/>
                    <Route path='/Edit-Restaurant/:id' element={<RestaurantEdit/>}/>
                </Routes>
            </div>
        </Router>
    );
}