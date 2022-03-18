import React from 'react';
// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Styling
import './UserForm.css';

export default function UserForm({ userFormState, dispatch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_USER' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_USER' });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({ type: 'CANCEL_UPDATE_USER' });
  };

  const handleTextChange = (e) => {
    dispatch({
      type: 'HANDLE_INPUT_TEXT',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className='formUser'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='formUserFirstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First name'
                name='first_name'
                value={userFormState.first_name}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='formUserLastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last name'
                value={userFormState.last_name}
                name='last_name'
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-3' controlId='formUserEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={userFormState.email}
            name='email'
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formUserPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={userFormState.password}
            name='password'
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formUserBirthdate'>
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type='date'
            placeholder=''
            value={userFormState.birthday}
            name='birthday'
            onChange={handleTextChange}
          />
        </Form.Group>

        {!userFormState.updating ? (
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <>
            <Button variant='primary' type='submit' onClick={handleUpdate}>
              Update
            </Button>
            <Button
              variant='danger'
              type='submit'
              className='mx-3'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}
