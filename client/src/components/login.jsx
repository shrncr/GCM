import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Routes, Route, Link, useNavigate, useRoutes } from 'react-router-dom';
import { LoginContext } from './app';
/*
Login page for admin
*/

// Login component for user authentication
const Login = () => {
  const { login, setLogin } = useContext(LoginContext)
  const navigate = useNavigate();
  const apiUrl = process.env.VERCEL_URL;
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

  // function that allows enter key to confirm login
  const handleKeyDown = (e) => {
    // Check if the Enter key was pressed
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default Enter key behavior
      submitForm(); // Call the submit function
    }
  };


  // Function to submit the login form
  const submitForm = () => {
    // Perform any necessary client-side validation

    // Submit the form using AJAX or other methods
    // Example using Axios
    axios({
      url: `${apiUrl}/admin`,
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
      if (res.data) {

        console.log(res.data)
        console.log("inside")
        setLogin(true)
        navigate("/admin")

      }




    });
  };

  return (
    <div>
      {/* Login form */}
      <div className='login-header'>
        <h1>Login</h1>
      </div>
      <div className="form-container">
        <form onKeyDown={handleKeyDown}>

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


          {/* Submit button */}
          <button type="button" onClick={submitForm}>
            Login
          </button>

        </form>
      </div>




    </div>
  );
};

export default Login;
/*

 Role selection 
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

Forgot username/password link 
<a href="#" className="forgot-link">
Forgot Username/Password?
</a>

 Registration link 
<a href="#" className="registered-link">
Not registered? Create an account
</a>

*/