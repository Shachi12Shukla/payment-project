import React, { useState } from 'react'
import AuthLeft from '../components/AuthLeft'
import { useNavigate} from "react-router-dom"
import api from "../api/AxiosAPI.js";
import {useAuth} from "../context/Auth.jsx"

const Signin = () => {
  
  const navigate = useNavigate();
  const {login} = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if(!formData.username || !formData.password){
      setError("Please fill in all details");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/user/signin', formData);
      login(response.data.token, response.data.user);
      navigate('/user/dashboard');

    } catch (error) {
      setError(error?.response?.data?.message || "Unable to login");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='auth-page'>

      <AuthLeft/>

      <div className='auth-form-section'>

        <div className='auth-form-container'>

          <h1>Login into your account</h1>

          <p className='auth-subtitle'>Start using PayWallet in a few seconds</p>

          {error && <div className='auth-error'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label>
                Username
              </label>

              <input type="text" placeholder='johnXDoe' name='username' value={formData.username} onChange={handleChange}/>
            </div>

            <div className='input-group'>
              <label >
                Password
              </label>

              <input type="password" placeholder='.........' name='password' value={formData.password} onChange={handleChange} />
            </div>

            <button className='auth-button' type='submit' disabled={loading}>
              {loading ? "Redirecting..." : "Login"}
            </button>

            <p className='auth-switch'>
              Don't have an account? 
              <button onClick={() => navigate('/user/signup')}>
                Sign Up
              </button>
            </p>

          </form>

        </div>

      </div>
    </div>
  )
}

export default Signin
