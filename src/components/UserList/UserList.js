import React from 'react';
// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// React Query, Axios
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
// Styling
import './UserList.css';

export default function UserList({ dispatch }) {
  /* ------------------------------- React Query ------------------------------ */
  const { isLoading, error, data } = useQuery(
    'usersData',
    () =>
      axios
        .get('https://users-crud1.herokuapp.com/users/')
        .then((res) => res.data),
    { refetchInterval: 1000 }
  );
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_USER', userID: id });
  };

  const updatingUser = (id) => {
    const selectedUser = data.find((user) => {
      return user.id === id;
    });
    dispatch({ type: 'UPDATING_USER', payload: selectedUser });
  };

  return (
    <div className='d-flex flex-row flex-wrap justify-content-center'>
      {/* {isFetching && <h1>Updating...</h1>} */}

      {data.map((user) => {
        return (
          <div key={user.id}>
            <Card border='dark' style={{ width: '18rem' }} className='m-2'>
              <Card.Header>{`${user.first_name} ${user.last_name}`}</Card.Header>
              <Card.Body>
                <Card.Title>{user.email}</Card.Title>
                <Card.Subtitle>{user.birthday}</Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant='danger'
                  className='mx-1'
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant='success'
                  className='mx-1'
                  onClick={() => {
                    updatingUser(user.id);
                  }}
                >
                  Update
                </Button>
              </Card.Footer>
            </Card>
          </div>
        );
      })}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
