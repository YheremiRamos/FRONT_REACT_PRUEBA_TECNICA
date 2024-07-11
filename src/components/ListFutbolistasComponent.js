import React, { useEffect, useState } from 'react';
import FutbolistaService from '../services/FutbolistaService';
import { Link } from 'react-router-dom';

const ListFutbolistasComponent = () => {
    const [futbolistas, setFutbolistas] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [futbolistasPerPage] = useState(8);

    useEffect(() => {
        FutbolistaService.getAllFutbolistas()
            .then(response => {
                const futbolistasWithFormattedDates = response.data.map(futbolista => ({
                    ...futbolista,
                    nacimiento: new Date(futbolista.fecha_nacimiento)
                }));
                setFutbolistas(futbolistasWithFormattedDates);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching futbolistas:', error);
            });
    }, []);

    const handleSearch = () => {
        if (searchId === '') {
            alert('Por favor ingresa un ID');
            return;
        }
        FutbolistaService.getFutbolistaById(searchId)
            .then(response => {
                const futbolistaList = response.data;
                if (futbolistaList.length > 0) {
                    const futbolista = futbolistaList[0];
                    alert(`ID: ${futbolista.id}
                        \nNombres: ${futbolista.nombres}
                        \nApellidos: ${futbolista.apellidos}
                        \nNacimiento: ${new Date(futbolista.fecha_nacimiento).toLocaleDateString()}
                        \nCaracteristicas: ${futbolista.caracteristicas}
                        \nPosición: ${futbolista.posicion.nombre}`);
                } else {
                    alert('Futbolista no encontrado');
                }
            })
            .catch(error => {
                console.error('Error fetching futbolista:', error);
                alert('Error al buscar el futbolista');
            });
    };

    // Obtener futbolistas actuales
    const indexOfLastFutbolista = currentPage * futbolistasPerPage;
    const indexOfFirstFutbolista = indexOfLastFutbolista - futbolistasPerPage;
    const currentFutbolistas = futbolistas.slice(indexOfFirstFutbolista, indexOfLastFutbolista);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(futbolistas.length / futbolistasPerPage);

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Futbolistas</h2>
            <Link to="/add-futbolista" className='btn btn-primary mb-2'>Agregar Futbolista</Link>
            <div className='row mb-3'>
                <div className='col-md-4'>
                    <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Buscar por ID'
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-primary' onClick={handleSearch}>Buscar</button>
                </div>
            </div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Nacimiento</th>
                        <th>Caracteristicas</th>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFutbolistas.map(futbolista => (
                        <tr key={futbolista.id}>
                            <td>{futbolista.id}</td>
                            <td>{futbolista.nombres}</td>
                            <td>{futbolista.apellidos}</td>
                            <td>{futbolista.nacimiento.toLocaleDateString()}</td>
                            <td>{futbolista.caracteristicas}</td>
                            <td>{futbolista.posicion.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className='page-item'>
                            <button onClick={() => paginate(number + 1)} className='page-link'>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ListFutbolistasComponent;
