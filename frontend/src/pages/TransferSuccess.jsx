import { useNavigate, useSearchParams} from "react-router-dom";
import { CheckCircle, ArrowRight, Wallet, IndianRupee } from "lucide-react";

import "../styles/transferSuccess.css";

const TransferSuccess = () => {

  const navigate = useNavigate();
  const [SearchParams] = useSearchParams();

  const firstName = SearchParams.get("firstName");
  const lastName = SearchParams.get("lastName");
  const username = SearchParams.get("username");
  const amount = SearchParams.get("amount");


  const formatAmount = (value) => {
    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };


  return (
    <div className="success-page">

      <div className="success-card">

        {/* Success icon */}
        <div className="success-icon">
          <CheckCircle size={46} />
        </div>


        {/* Heading */}
        <h1>Transfer Successful!</h1>

        <p className="success-message">
          Your money has been sent successfully.
        </p>


        {/* Amount */}
        <div className="success-amount">
          <span>Amount sent</span>

          <strong>
            <IndianRupee/> {formatAmount(amount)}
          </strong>
        </div>


        {/* Recipient */}
        <div className="recipient-section">

          <span>Sent to</span>

          <div className="recipient">

            <div className="recipient-avatar">
              {firstName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3>
                {firstName} {lastName}
              </h3>

              <p>
                @{username}
              </p>
            </div>

          </div>

        </div>


        {/* Transaction status */}
        <div className="success-status">

          <CheckCircle size={18} />

          <span>
            Transfer completed successfully
          </span>

        </div>


        {/* Actions */}
        <div className="success-actions">

          <button
            className="success-button"
            onClick={() => navigate("/user/dashboard")}
          >
            Go to Dashboard
            <ArrowRight size={18} />
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate("/user/send-money")}
          >
            <Wallet size={18} />
            Send Money Again
          </button>

        </div>

      </div>

    </div>
  );
};

export default TransferSuccess;