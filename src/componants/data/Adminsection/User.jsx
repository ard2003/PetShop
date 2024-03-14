import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const User = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

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
        
   {users.map((user, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{user.password}</td>
    <td>
      {/* <Button onClick={() =>(index)}>Remove</Button> */}
    </td>
  </tr>
))}
        
      </tbody>
    </Table>
  );
   }

export default User;
