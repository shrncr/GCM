import React, { useState } from 'react';
import axios from 'axios';

// Login component for user authentication
const Login = () => {
  // State for form data (username, password, role)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'administrator',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to submit the login form
  const submitForm = () => {
    // Perform any necessary client-side validation

    // Submit the form using AJAX or other methods
    // Example using Axios
    axios({
      url: 'http://localhost:8082/admin',
      method: 'POST',
      headers: {
        authorization: 'mongodb+srv://sarahrnciar:m66Wpq4mggMTOZw8@admin.eqktqv7.mongodb.net/?retryWrites=true&w=majority', // Authorization header
      },
      data: { "username": formData.username, "password": formData.password }, // Form data

      // Handle errors
      catch(error) {
        console.error('error:', error); // Log error
        alert('An error occurred.'); // Show alert for error
      }
    }).then((res) => {
      console.log(res); // Log response
    });
  };

  return (
    <div className="login-container">
      {/* Login form */}
      <h2>Login</h2>
      <form>
        {/* Username input */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Password input */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Role selection */}
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

        {/* Submit button */}
        <button type="button" onClick={submitForm}>
          Login
        </button>
      </form>

      {/* Forgot username/password link */}
      <a href="#" className="forgot-link">
        Forgot Username/Password?
      </a>

      {/* Registration link */}
      <a href="#" className="registered-link">
        Not registered? Create an account
      </a>
    </div>
  );
};

export default Login;
