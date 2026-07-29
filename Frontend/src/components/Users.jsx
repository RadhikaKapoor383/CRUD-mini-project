import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Users() {
    const [users, setUsers] = useState([])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/users/${id}`);
            setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-60 bg-white rounded p-3">
            <Link to="/create" className='btn btn-success'>Create +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={`/update/${user._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    </div>
  )
}

export default Users
