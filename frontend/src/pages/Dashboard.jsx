import React from 'react'
import { useState, useEffect } from 'react'
import {WalletCards, IndianRupee, Send, SendHorizonal, Search, ShieldCheck} from "lucide-react";
import {useAuth} from "../context/Auth"
import {useNavigate} from "react-router-dom"
import "../styles/dashboard.css"
import api from "../api/AxiosAPI"

const Dashboard = () => {

  const navigate = useNavigate();
  const {userData} = useAuth();


  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/account/balance");

        setBalance(response.data.balance);

      } catch (error) {
        console.error(error);
        setError(response?.data?.message || "Unable to fetch your balance.");
      }
      finally{
        setLoading(false);
      }
    }

    fetchBalance();

  }, []);

  const formatBalance = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className='dashboard-page'>


      <header className='dashboard-header'>

        <div>
          <h1>Welcome back {userData?.username ? `${userData.username}` : 'User'}</h1>

          <p> Manage your wallet and send money securely.</p>
        </div>

        {userData && (
          <div className='dashboard-user'>

            <div className='dashboard-user-avatar'>
              {userData.username?.charAt(0).toUpperCase()}
            </div>

            <span>{userData.username}</span>

          </div>
        )}
        
      </header>

      <section className='dashboard-hero'>

        <div className='balance-card'>

          <div className='balance-card-top'>
            <div className='balance-icon'>
              <WalletCards size={22}/>
            </div>

            <span>AVAILABLE BALANCE</span>
          </div>

          <div className='balance-amount'>

              {error ? (
                <p className='balance-error'>{error}</p>
              ) : (
                <p>Your current PayWallet balance <br /> {loading ? "Loading..." : `₹ ${formatBalance(balance)}`}</p>
              )}


              {/* {loading ? (
                <span>Loading...</span>
              ) : (
                <span><IndianRupee/> {`${formatBalance(balance)}`} </span>
              )} */}
            
          </div>

        </div>

        <div className='send-card'>
          <div className='send-card-icon'>
            <Send size={24}/>
          </div>

          <h2>Send Money</h2>

          <p>Transfer money securely to another PayWallet user.</p>

          <button className='primary-button' onClick={() => navigate('/user/send-money')}>
            Send Money
            <SendHorizonal size={19}/>
          </button>
        </div>
      </section>

      <section className='how-section'>

        <div className='section-heading'>
          <h2>How PayWallet works</h2>
          <p>Sending money is simple and secure.</p>
        </div>

        <div className='steps-grid'>
          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              <Search size={22} />
            </div>

            <h3>Choose a user</h3>

            <p>
              Search for the PayWallet user you want to send money to.
            </p>
          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              <IndianRupee size={22} />
            </div>

            <h3>Enter amount</h3>

            <p>
              Enter the amount you want to transfer from your wallet.
            </p>

          </div>


          {/* Step 3 */}

          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              <Send size={22} />
            </div>

            <h3>Transfer securely</h3>

            <p>
              Confirm the transfer and securely send money to the user.
            </p>

          </div>
        </div>

      </section>

       <section className="security-card">

        <div className="security-icon">
          <ShieldCheck size={25} />
        </div>

        <div>
          <h3>Your Money, Secure</h3>

          <p>
            Your PayWallet account is protected using secure
            authentication for wallet operations.
          </p>
        </div>

      </section>
      
    </div>
  )
}

export default Dashboard
