import React, { useState } from 'react';
import axios from 'axios'
/*
Login page for admin
*/

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'administrator',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    // Perform any necessary client-side validation

    // Submit the form using AJAX or other methods
    // Example using Fetch API
    axios({
      url: 'http://localhost:8082/admin',
      method: 'POST',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority',
      },
      data: { "username": formData.username, "password": formData.password },

      catch(error) {
        console.error('error:', error);
        alert('An error occured.')
      }
    }).then((res) => {

      console.log(res)
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="administrator">Administrator</option>
          <option value="researcher">Researcher</option>
        </select>

        <button type="button" onClick={submitForm}>
          Login
        </button>
      </form>

      <a href="#" className="forgot-link">
        Forgot Username/Password?
      </a>

      <a href="#" className="registered-link">
        Not registered? Create an account
      </a>
    </div>
  );
};

export default Login;
