import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/AxiosAPI";
import { useAuth } from "../context/Auth";
import {IndianRupee} from "lucide-react"

import "../styles/sendMoney.css";


const SendMoney = () => {

    const navigate = useNavigate();

    // const { userData } = useAuth();


    // Search related state
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);


    // Selected recipient
    const [selectedUser, setSelectedUser] = useState(null);


    // Amount
    const [amount, setAmount] = useState("");


    // Current balance
    const [balance, setBalance] = useState(0);
    const [balanceLoading, setBalanceLoading] = useState(true);


    // Error and transfer loading
    const [error, setError] = useState("");
    const [transferLoading, setTransferLoading] = useState(false);

    useEffect(() => {

      const getBalance = async () => {

          try {

              const response = await api.get("/account/balance");

              setBalance(response.data.balance);

          } catch (error) {

              console.log(error);

              setError("Unable to get your balance.");

          } finally {

              setBalanceLoading(false);

          }
      };


      getBalance();

    }, []);

    const handleSearch = async () => {

    if (search.trim() === "") {
      setUsers([]);
      return;
    }

    try {

      setSearchLoading(true);
      setError("");

      const response = await api.get("/user/bulk?filter=" + search);

      setUsers(response.data.user);

    } catch (error) {

      console.log(error);
      setError("Unable to search users.");

    } finally {

      setSearchLoading(false);

    }
    };



    const handleSelectUser = (user) => {

      setSelectedUser(user);

      // Remove search results after selecting
      setUsers([]);

    };

    const handleTransfer = async () => {

      setError("");
      if (!selectedUser) {

        setError("Please select a user.");

        return;
      }

      const transferAmount = Number(amount);

      // Check amount
      if (!transferAmount || transferAmount <= 0) {
        setError("Please enter a valid amount.");
        return;
      }

      if (transferAmount > balance) {

      setError("Insufficient balance.");

      return;
      }

        try {

          setTransferLoading(true);

          const response = await api.post("/account/transfer", { transfer_user_id: selectedUser._id, amount: transferAmount});

            // Transfer successful
            if (response.status === 200) {
              navigate("/transfer-success?firstName=" + selectedUser.firstName + "&lastName" +  selectedUser.lastName + "&username=" + selectedUser.username + "&amount=" + transferAmount);
            }

        } catch (error) {

            console.log(error);

            if (error.response?.status === 400) {

              setError("Insufficient balance.");

            } else if (error.response?.status === 404) {

              setError("Invalid account.");

            } else {

              setError("Transfer failed. Please try again.");

            }

        } finally {

          setTransferLoading(false);

        }
    };

    const formatBalance = (value) => {
      return Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2})
    };

    return (

        <div className="send-money-page">

            <div className="send-money-header">

              <h1>Send Money</h1>

              <p>
                Send money to another PayWallet user.
              </p>

            </div>

            {error && (
              <div className="transfer-error">
                {error}
              </div>
            )}

            <div className="send-money-content">

                <div className="transfer-card">

                  <h2>Choose recipient</h2>

                  <p className="card-description">
                    Search by first name or last name.
                  </p>

                    <div className="search-box">
                      <input type="text" placeholder="Search users" value={search} onChange={(e) => {setSearch(e.target.value)}} className="search-input-wrapper"/>

                      <button onClick={ () => handleSearch()} disabled={searchLoading} className="search-button">
                        {searchLoading ? "Searching..." : "Search"}
                      </button>
                    </div>

                    <div className="user-results">

                        {users.map((user) => (

                            <div className="user-result" key={user._id}>

                                <div className="user-avatar">
                                  {user.firstName?.charAt(0).toUpperCase()}
                                </div>

                                <div className="user-info">

                                  <h3>
                                    {user.firstName}{" "}
                                    {user.lastName}
                                  </h3>

                                  <p>
                                    @{user.username}
                                  </p>

                                </div>

                                <button className="select-button" onClick={() => { handleSelectUser(user) }}>
                                  Select
                                </button>

                            </div>

                        ))}

                    </div>

                    {selectedUser && (

                        <div className="selected-user">

                            <p>Selected recipient</p>

                            <h3> {selectedUser.firstName}{" "} {selectedUser.lastName}
                            </h3>

                            <span>
                              @{selectedUser.username}
                            </span>

                            <button onClick={() => {setSelectedUser(null)}} className="change-user-button">
                              Change
                            </button>

                        </div>

                    )}

                </div>

                <div className="transfer-card">

                  <h2>Enter amount</h2>

                  <p className="card-description">
                    Enter the amount you want to send.
                  </p>

                    <div className="amount-input-wrapper">

                        <span><IndianRupee/></span>

                        <input type="number" min="1" placeholder="0" value={amount} onChange={(e) => {
                            setAmount(e.target.value);
                            }}
                        />

                    </div>

                    <div className="available-balance">

                        <span>
                          Available balance
                        </span>

                        <strong> {balanceLoading ? "Loading..." : `₹ ${formatBalance(balance)}`}
                        </strong>

                    </div>

                    {selectedUser && Number(amount) > 0 && (

                        <div className="transfer-summary">

                            <div>

                                <span>
                                  Sending to
                                </span>

                                <strong>
                                  {selectedUser.firstName}{" "}
                                  {selectedUser.lastName}
                                </strong>

                            </div>

                            <div>

                              <span>
                                Amount
                              </span>

                              <strong>
                                ₹ {formatBalance(Number(amount))}
                              </strong>

                            </div>

                            <div>

                                <span> Balance after transfer </span>

                                <strong> ₹{" "} {formatBalance(balance - Number(amount) )} </strong>

                            </div>

                        </div>

                    )}

                    <button className="transfer-button" onClick={handleTransfer} disabled={transferLoading || !selectedUser || !amount}>
                      {transferLoading ? "Sending..." : "Send Money"}
                    </button>

                </div>

            </div>

        </div>
    );
};


export default SendMoney;