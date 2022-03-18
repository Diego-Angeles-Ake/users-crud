import React, { useReducer } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Helpers
import userFormReducer from './helpers/userFormReducer';
// React Query, Axios
import { QueryClient, QueryClientProvider } from 'react-query';
// Styling
import './App.css';

const queryClient = new QueryClient();
const initialUserFormState = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: '',
  updating: false,
};

function App() {
  const [userFormState, dispatch] = useReducer(
    userFormReducer,
    initialUserFormState
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Row>
          <Col className='p-3'>
            <Container>
              <UserForm userFormState={userFormState} dispatch={dispatch} />
            </Container>
          </Col>
          <Col className='users-bg p-3'>
            <UserList userFormState={userFormState} dispatch={dispatch} />
          </Col>
        </Row>
      </div>
    </QueryClientProvider>
  );
}

export default App;
