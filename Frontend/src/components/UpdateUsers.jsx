import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUsers() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/users/${id}`)
            .then(response => {
                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setAge(response.data.age ?? '');
            })
            .catch(error => {
                console.error('There was an error fetching the user!', error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/users/${id}`, {
                name,
                email,
                age: Number(age),
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    return (
        <div className="page-center">
            <div className="page-card page-card--compact">
                <div className="page-hero">
                    <p className="eyebrow">Edit Record</p>
                    <h1 className="page-title">Update User</h1>
                    <p className="page-subtitle">
                        Refine the existing record without losing the calm, polished look of the app.
                    </p>
                </div>

                <div className="form-panel">
                    <form className="form-card" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter full name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="field field--full">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    placeholder="Enter age"
                                    required
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="ghost-button" onClick={() => navigate('/')}>
                                Cancel
                            </button>
                            <button type="submit" className="action-button">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUsers;
