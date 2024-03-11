import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const User = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const storedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    setRegistrations(storedRegistrations);
  }, []);

  const handleRemoveRegistration = (index) => {
   
    const updatedRegistrations = [...registrations];
    updatedRegistrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    setRegistrations(updatedRegistrations);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((registration, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{registration.username}</td>
            <td>{registration.email}</td>
            <td>{registration.password}</td>
            <td>
              <Button onClick={() => handleRemoveRegistration(index)}>Remove</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default User;
