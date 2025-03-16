import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../components/Auth'
import { supabase } from '../supabase/cliente'
import { Notify } from 'notiflix'
import UserPanelLayout from "../components/UserPanelLayout";
import '../assets/css/pages/MiPerfil.css'

    
    const MiPerfil = () => {

        const { currentUser } = useContext(AuthContext)
        const [negocios, setNegocios] = useState([]);

        useEffect(() => {
                document.title = 'A la carta QR - Mi perfil'
                getinfo();
            }, [])

        

         // Cargar los datos del usuario autenticado
        const getinfo = async () => {
            const docs = []
            try {
                const { data } = await supabase
                .from("negocios")
                .select("*")
                .eq('iduser', currentUser.user.id);

                data.forEach((doc) => {
					docs.push({ ...doc })
				})
                
                setNegocios(docs);

            } catch (error) {
                 console.error("Error al obtener negocios:", error);
            }
        }
            
                // Guardar o actualizar un campo del negocio
        const handleUpdate = async (campo, valor, id) => {
            try {
            if (id) {
                // Actualizar el negocio
                const { error } = await supabase
                .from("negocios")
                .update({ [campo]: valor })
                .eq("iduser", currentUser.user.id);
                if (error) throw error;
            } else {
                // Crear el negocio si no existe
                const { error } = await supabase.from("negocios").insert([
                {
                    [campo]: valor,
                    iduser: currentUser.user.id,
                },
                ]);
                if (error) throw error;
            }
            Notify.success('exito');
            } catch (error) {
            console.error("Error al guardar el dato:", error);
            alert("Error al guardar el dato");
            }
        };

        
        return (
            
            <UserPanelLayout title="Mi Perfil">
              <div className="container">
                <h1 className="title">Agrega la información de tu establecimiento</h1>

                {negocios.length === 0 && <p>No tienes registros. Agrega uno.</p>}

                {negocios.map((negocio) => (
                    <div className="form-group" key={negocio.id}>
                    {[
                        "nombre",
                        "telefono",
                        "direccion",
                        "facebook",
                        "instagram",
                        "web",
                    ].map((campo) => (
                        <div key={campo} style={{ marginBottom: "10px" }}>
                        <label className="form-label">{campo.toUpperCase()}: </label>
                        <input className="form-control"
                            type="text"
                            defaultValue={negocio[campo] || ""}
                            onBlur={(e) =>
                            handleUpdate(campo, e.target.value, negocio.id)
                            }
                        />
                        <button className="btn"
                            onClick={() =>
                            handleUpdate(campo, negocio[campo], negocio.id)
                            }
                        >
                            Guardar
                        </button>
                        </div>
                    ))}
                    <hr />
                    </div>
                ))}
    </div>
            </UserPanelLayout>
        );
    };
    
    
export default MiPerfil;