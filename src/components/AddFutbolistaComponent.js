import React, { useState, useEffect } from 'react';
import FutbolistaService from '../services/FutbolistaService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddFutbolistaComponent = () => {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fecha_nacimiento, setFecha_Nacimiento] = useState("");
    const [caracteristicas, setCaracteristicas] = useState("");
    const [posicionId, setPosicionId] = useState("");
    const [posiciones, setPosiciones] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            FutbolistaService.getFutbolistaById(id).then((response) => {
                const futbolista = response.data[0];  
                setNombres(futbolista.nombres);
                setApellidos(futbolista.apellidos);
                setFecha_Nacimiento(futbolista.fecha_nacimiento);
                setCaracteristicas(futbolista.caracteristicas);
                setPosicionId(futbolista.posicion ? futbolista.posicion.id : "");
            }).catch(error => {
                console.log("Error al obtener futbolista:", error);
            });
        }
    }, [id]);

    useEffect(() => {
        const fetchPosiciones = async () => {
            try {
                const response = await FutbolistaService.getAllPosiciones();
                setPosiciones(response.data);
            } catch (error) {
                console.error('Error al obtener las posiciones:', error);
            }
        };

        fetchPosiciones();
    }, []);

    const saveFutbolista = (e) => {
        e.preventDefault();
        const selectedPosicion = posiciones.find(pos => pos.id === parseInt(posicionId));
        const futbolista = {
            id: id ? parseInt(id) : null,  
            nombres,
            apellidos,
            fecha_nacimiento,
            caracteristicas,
            posicion: selectedPosicion ? { id: selectedPosicion.id, nombre: selectedPosicion.nombre } : null
        };
    
        if (id) {
            FutbolistaService.updateFutbolista(futbolista).then((response) => {
                console.log(response);
                alert("Se actualizó correctamente");
            }).catch(error => {
                console.log(error);
            });
        } else {
            FutbolistaService.createFutbolista(futbolista).then((response) => {
                console.log(response);
                navigate("/futbolistas");
            }).catch(error => {
                console.log(error);
            });
        }
    }
    
    

    const title = id ? 'Actualizar Futbolista' : 'Registro de Futbolista';

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>{title}</h2>
                        <div className='card-body'>
                            <form onSubmit={saveFutbolista}>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombres</label>
                                    <input
                                        type='text'
                                        placeholder='Digite sus nombres'
                                        name='nombres'
                                        className='form-control'
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellidos</label>
                                    <input
                                        type='text'
                                        placeholder='Digite sus apellidos'
                                        name='apellidos'
                                        className='form-control'
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Fecha de Nacimiento</label>
                                    <input
                                        type='date'
                                        placeholder='Seleccione la fecha de nacimiento'
                                        name='fecha_nacimiento'
                                        className='form-control'
                                        value={fecha_nacimiento}
                                        onChange={(e) => setFecha_Nacimiento(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Caracteristicas</label>
                                    <input
                                        type='text'
                                        placeholder='Digite sus caracteristicas'
                                        name='caracteristicas'
                                        className='form-control'
                                        value={caracteristicas}
                                        onChange={(e) => setCaracteristicas(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Posición</label>
                                    <select
                                        name='posicion'
                                        className='form-control'
                                        value={posicionId}
                                        onChange={(e) => setPosicionId(e.target.value)}
                                    >
                                        <option value="" disabled>Seleccione una posición</option>
                                        {posiciones.map((pos) => (
                                            <option key={pos.id} value={pos.id}>{pos.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='botones'>
                                    <button type="submit" onClick={(e) => saveFutbolista(e)}  className="btn btn-primary mb-2">{id ? 'Actualizar' : 'Registrar'}</button>
                                    <Link to="/futbolistas" className='btn btn-danger mb-2'>Cancelar</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFutbolistaComponent;
