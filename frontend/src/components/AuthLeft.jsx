import {Check} from "lucide-react"

const AuthLeft = () => {
  return (
    <div className='auth-brand'>

        <div className='brand-content'>

            <div className='brand-logo'>
              <div className='brand-icon'>
                P
              </div>
              <span>PayWallet</span>
            </div>
        </div>

        <div className='brand-message'>
            <h1>
              Simple.
              <br />
              Secure.
              <br />
              <span>Yours.</span>
            </h1>

            <p>A simple way to manage your wallet, send money, and stay in control of your finances.</p>
        </div>

        <div className='brand-features'>
          <div className='brand-feature'>
            <div className='feature-icon'>
              <Check/>
            </div>

            <div>
              <strong>Secure</strong>
              <span>Your account is protected.</span>
            </div>
          </div>

          <div className='brand-feature'>
            <div className='feature-icon'> <Check/> </div>
              <div>
                <strong>Easy transfer</strong>
                <span>Send money in just a few clicks.</span>
              </div>
          </div>

          <div className='brand-feature'>
            <div className='feature-icon'>
              <Check/>
            </div>

            <div>
              <strong>Simple Wallet</strong>
              <span>Everything you need in one place.</span>
            </div>
          </div>

        </div>

        <div className='brand-decoration'>
          <div className='decoration-card decoration-card-one'>
          </div>

          <div className='decoration-card decoration-card-icon'></div>

          <div className='wallet-symbol'>
            <span>P</span>
          </div>
        </div>

    </div>
  )
}

export default AuthLeft
