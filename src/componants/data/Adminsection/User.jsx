import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const User = () => {
  const name=localStorage.getItem('username')
  const password=localStorage.getItem('password')
  const email=localStorage.getItem('email')
  const handleRemoveRegistration=(()=>{
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.removeItem('email')
  })
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
        
          <tr >
            <td>{  1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{password}</td>
            <td>
              <Button onClick={() => handleRemoveRegistration()}>Remove</Button>
            </td>
          </tr>
        
      </tbody>
    </Table>
  );
};

export default User;
