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
    <div className="page-center">
        <div className="page-card">
            <div className="page-hero">
                <p className="eyebrow">CRM Workspace</p>
                <h1 className="page-title">Users</h1>
                <p className="page-subtitle">
                    Manage customer records in a calm, elegant workspace with quick access to create, edit, and remove entries.
                </p>
            </div>

            <div className="page-toolbar">
                <div className="toolbar-text">
                    {users.length} record{users.length === 1 ? '' : 's'} in the database
                </div>
                <div className="toolbar-actions">
                    <Link to="/create" className="action-link">Create User</Link>
                </div>
            </div>

            <div className="page-body">
                <div className="table-wrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4">
                                        <div className="empty-state">No users yet. Create your first record to get started.</div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="cell-name">{user.name}</td>
                                        <td className="cell-muted">{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <div className="row-actions">
                                                <Link to={`/update/${user._id}`} className="btn-soft">Edit</Link>
                                                <button
                                                    type="button"
                                                    className="btn-danger-soft"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Users
