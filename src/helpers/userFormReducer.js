import axios from 'axios';
let selectedUser = {};

function userFormReducer(state, action) {
  switch (action.type) {
    case 'HANDLE_INPUT_TEXT':
      return { ...state, [action.field]: action.payload };

    case 'CREATE_USER':
      const newUser = {
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
        birthday: state.birthday,
      };
      axios.post('https://users-crud1.herokuapp.com/users/', newUser);
      return {
        ...state,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
      };

    case 'DELETE_USER':
      axios.delete(`https://users-crud1.herokuapp.com/users/${action.userID}/`);
      return { ...state };

    case 'UPDATING_USER':
      selectedUser = {
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        birthday: action.payload.birthday,
      };
      return {
        email: action.payload.email,
        password: action.payload.password,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        birthday: action.payload.birthday,
        updating: true,
      };

    case 'UPDATE_USER':
      const updatedUser = {
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
        birthday: state.birthday,
      };
      console.log(selectedUser, updatedUser);
      axios.put(
        `https://users-crud1.herokuapp.com/users/${selectedUser.id}/`,
        updatedUser
      );
      return {
        ...state,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        updating: false,
      };

    case 'CANCEL_UPDATE_USER':
      return {
        ...state,
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: '',
        updating: false,
      };

    default:
      throw new Error();
  }
}

export default userFormReducer;
