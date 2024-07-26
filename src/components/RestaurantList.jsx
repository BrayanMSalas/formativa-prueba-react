import { useEffect, useState } from "react";
import api from "../services/api";

export function RestaurantList(){
    
    const [listadoRestaurant, setListadoRestaurant] = useState([]);

    const fetchRestaurants = async() =>{
        try{
            const response = await api.get('restaurants/');
            setListadoRestaurant(response.data)
        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(() =>{
        fetchRestaurants();
    },[listadoRestaurant]);

    async function DeleteRestaurant(id) {
        try{
            const response = await api.delete(`restaurants/${id}`);
            console.log(response.data);
            console.log("Se elimino el restaurant correctamente!");
            fetchRestaurants();
        }catch(error){
            console.log(error.message);
        }
    }
    return(
        <div className="container mt-4">
            <h1 className="mb-4">Restaurants</h1>
            <ul className="list-group">
                {
                    listadoRestaurant.map(r => 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        <img src={r.image} alt="image"  height="50"/>
                        <a href={'Restaurant-detail/' + r.id}>{r.name}</a>
                        <button className="btn btn-danger btn-sm" onClick={()=>DeleteRestaurant(r.id)}>
                            Delete
                        </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}