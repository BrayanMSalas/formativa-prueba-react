import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export function RestaurantEdit(){
    const {id} = useParams();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (evento) =>{
        evento.preventDefault();

        console.log(name, address, image);
        
        const restaurant = new FormData();
        restaurant.append('name',name);
        restaurant.append('address', address);
        restaurant.append('image', image);

        try{
            await api.put(`restaurants/${id}/`, restaurant, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            alert('Restaurante agregado a la base de datos!');
            window.location.href="/list-restaurants"
        }catch(error){
            console.log(error.message);
        }
    };
    useEffect(()=>{
        console.log(id);
        const getRestaurant = async () => {
            try {
                const response = await api.get(`restaurants/${id}/`);
                name.current.value = response.data.name;
                address.current.value = response.data.address;
            } catch (error) {
                console.log(error.message);
            }
        }
        getRestaurant();
    },[id]);
    return(
        <div className="container mt-4 border p-2">
            <h2>Edit Restaurant</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}