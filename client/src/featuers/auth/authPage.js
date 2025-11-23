import { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth-actions">
      {showLogin ? <Login /> : <Register />}
      <div style={{textAlign: "center" }}>
        {showLogin ? (
          <p>
            אין לך חשבון?{" "}
            <button onClick={() => setShowLogin(false)}>הרשם כאן</button>
          </p>
        ) : (
          <p>
            כבר יש לך חשבון?{" "}
            <button onClick={() => setShowLogin(true)}>התחבר כאן</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
