import React from 'react'

function CreateUsers() {
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-70 bg-white rounded p-3">
            <h2>Create User</h2>
            <form>
                <div className="mb-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" required />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="mb-2">
                    <label htmlFor="age">Age</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter age" required />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateUsers
