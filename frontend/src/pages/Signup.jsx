import "../styles/auth.css"
import AuthLeft from '../components/AuthLeft'
import {useNavigate} from "react-router-dom"
import { useState } from 'react' 
import api from "../api/AxiosAPI.js";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    if(!formData.firstName || !formData.lastName || !formData.username || !formData.password){
      setError("Please fill in all details");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/user/signup", formData);
      navigate("/user/signin");
      
    } catch (error) {
      setError(error?.response?.data?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className='auth-page'>

      {/* {Left Section} */}
      <AuthLeft/>
       
      {/* {Right Section} */}
      <div className='auth-form-section'>

        <div className='auth-form-container'>
          <h1>Create your account</h1>

          <p className="auth-subtitle">Start using PayWallet in a few seconds</p>

          {error && (
            <div className='auth-error'> 
              {error}
            </div>)}

          <form onSubmit={handleSubmit}>
            <div className='name-row'>

              <div className='input-group'>

                <label>
                  First Name
                </label>

                <input type="text" placeholder='John' name='firstName' value={formData.firstName} onChange={handleChange}/>
              </div>

              <div className='input-group'>

                <label>
                  Last Name
                </label>

                <input type="text" placeholder='Doe' name='lastName' value={formData.lastName} onChange={handleChange}/>
              </div>
            </div>

            <div className='input-group'>

              <label>
                Username
              </label>

              <input type="text" placeholder='JohnXDoe' name='username' value={formData.username} onChange={handleChange}/>
            </div>

            <div className='input-group'>

              <label>
                Password
              </label>

              <input type="password" placeholder='...........' name='password' value={formData.password} onChange={handleChange}/>
            </div>

            <button className='auth-button' type='submit' disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className='auth-switch'>Already have an account? 
            <button onClick={() => navigate("/user/signin")}>
              Sign in
            </button>
          </p>

        </div>
        
      </div>
      
    </div>
  )
}

export default Signup
