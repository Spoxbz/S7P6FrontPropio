import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ userToEdit, onSave }) => {
  const [user, setUser] = useState({
    id: null,
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.id) {
      await axios.put(`http://localhost:8081/users/${user.id}`, user);
    } else {
      await axios.post('http://localhost:8081/users', user);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{user.id ? 'Edit User' : 'Add User'}</h2>
      <div>
        <label>Username</label>
        <input name="username" value={user.username} onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" value={user.password} onChange={handleChange} />
      </div>
      <div>
        <label>First Name</label>
        <input name="firstname" value={user.firstname} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastname" value={user.lastname} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
