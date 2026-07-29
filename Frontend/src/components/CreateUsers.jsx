import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUsers() {
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ age, setAge] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/create', {
                name,
                email,
                age: Number(age),
            });
            navigate('/');
        } catch (error) {
            console.error('There was an error creating the user!', error);
        }
    };

  return (
    <div className="page-center">
        <div className="page-card page-card--compact">
            <div className="page-hero">
                <p className="eyebrow">New Record</p>
                <h1 className="page-title">Create User</h1>
                <p className="page-subtitle">
                    Add a fresh record to the database with a clean, focused form.
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
                        <button type="submit" className="action-button">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateUsers
