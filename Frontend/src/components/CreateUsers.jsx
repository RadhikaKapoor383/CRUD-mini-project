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
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-70 bg-white rounded p-3">
            <h2>Create User</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="age">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter age" required 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateUsers
