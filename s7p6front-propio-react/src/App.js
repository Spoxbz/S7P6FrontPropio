import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/users/${id}`);
    setUserToEdit(null);
  };

  const handleSave = () => {
    setUserToEdit(null);
  };

  return (
    <div>
      <h1>User CRUD App</h1>
      <UserForm userToEdit={userToEdit} onSave={handleSave} />
      <UserList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;