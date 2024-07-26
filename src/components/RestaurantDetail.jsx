import api from "../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function RestaurantDetail() {
    const { id } = useParams();

    const [NameRestaurant, setNameRestaurant] = useState('');
    const [addressRestaurant, setAddressRestaurant]  = useState('');
    const [image, setImage] = useState('');
    const [comment, setComment] = useState([]);
    const [ratingTotal, setRatingTotal] = useState(0);

    const [nameComment, setNameComment] = useState('');
    const [descriptionComment, setDescriptionComment] = useState('');
    const [ratingComment, setRatingComment] = useState(null);

    const handleSubmit = async (evento) =>{
        evento.preventDefault();

        
        const comment = new FormData();
        comment.append('restaurant',id);
        comment.append('name', nameComment);
        comment.append('description', descriptionComment);
        comment.append('rating', ratingComment);

        try{
            await api.post('comments/', comment, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            alert('Comentario Agregado con exito!');
            fetchRestaurants();
        }catch(error){
            console.log(error.message);
        }
    };

    const fetchRestaurants = async() =>{
        try{
            const response = await api.get(`restaurants/${id}`);
            setNameRestaurant(response.data.name);
            setAddressRestaurant(response.data.address);
            setImage(response.data.image);
            setComment(response.data.comments);
            setRatingTotal(response.data.average_rating);
        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(() =>{
        fetchRestaurants();
    },[id]);

    async function DeleteComment(id) {
        try{
            const response = await api.delete(`comments/${id}`);
            console.log(response.data);
            alert("Se elimino el comentario correctamente!");
            fetchRestaurants();
        }catch(error){
            console.log(error.message);
        }
    };
    async function RestaurantEdit(){
        window.location.href=`/Edit-Restaurant/${id}`
    };
    return(
        <div className="container mt-4 border p-2">
            <h2>{NameRestaurant}</h2>
            <p>{addressRestaurant}</p>
            <img src={image} alt="photo restaurant"
                className="img-fluid" />
            <h3 className="mt-4">{ratingTotal}</h3>
            <h3>Comments:</h3>
            <ul className="list-group">
                {
                    comment.map(c=> 
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            
                                <span>
                                    <strong>{c.name}: </strong> {c.description}
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={()=>DeleteComment(c.id)}>
                                    Delete
                                </button>
                                
                            
                        </li>
                    )
                }

            </ul>

            
            <form className="mt-4">
                <h3>Add a Comment</h3>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setNameComment(e.target.value)}required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea className="form-control" onChange={(e) => setDescriptionComment(e.target.value)}required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating:</label>
                    <input type="number" min="1" max="5" className="form-control" onChange={(e) => setRatingComment(e.target.value)}required />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
            {

            }

            <button className="btn btn-primary mt-4" onClick={RestaurantEdit}>Edit Restaurant</button>
        </div>
    )
}