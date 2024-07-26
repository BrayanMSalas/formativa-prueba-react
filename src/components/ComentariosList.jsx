import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";



export function ComentariosList(){
    
    const [listadoComentarios, setListadoComentarios] = useState([]);

    useEffect(() =>{
        
        const fetchComentarios = async () => { 
                try{
                const response = await api.get('comments/');
                setListadoComentarios(response.data);
            }catch(error){
                console.log(error.message);
            }
        }
        fetchComentarios();
    },[]);

                    //quedaste en el minuto 27:34
    return(
        listadoComentarios.map()
    )
}