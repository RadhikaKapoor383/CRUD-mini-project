import React from 'react'
import { Link } from 'react-router-dom'

function Users() {
    const [ users, setUsers ] = React.useState([{
        Name: "John Doe",
        Email: "john.doe@example.com",
        Age: 30
    }])
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
                            <td>{user.Name}</td>
                            <td>{user.Email}</td>
                            <td>{user.Age}</td>
                            <td>
                                <Link to="/update" className="btn btn-sm btn-primary">Edit</Link>
                                <button className="btn btn-sm btn-danger">Delete</button>
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
