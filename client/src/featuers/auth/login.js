import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken, setToken, setUser } from "./authSlice";
import { jwtDecode } from "jwt-decode";
import { loadBasket } from "../basket/basketSlice";
import { auth, provider, signInWithPopup } from "./firebase";

const Login = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const [LoginForm, setLoginForm] = useState({ userName: "", password: "" })
  const [loginFunc, { isError, isLoading, isSuccess, error, data }] = useLoginMutation()

  const handleChange = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value })
  }

  // התחברות רגילה עם שם משתמש וסיסמה
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(removeToken())
    await loginFunc(LoginForm)
    setLoginForm({ userName: "", password: "" })
  }

 const handleGoogleLogin = async () => {
  try {
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const response = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
    });

    const data = await response.json();

    dispatch(setToken({ token: data.token }))
    const decoded = jwtDecode(data.token)
    dispatch(setUser({ user: decoded }))
    dispatch(loadBasket())
    nav("/home")

  } catch (error) {
    console.error("Google login failed:", error)
  }
};

 //התחברות רגילה
  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({ token: data.token }))
      const decoded = jwtDecode(data.token)
      dispatch(setUser({ user: decoded }))
      dispatch(loadBasket())
      nav("/home")
    }
  }, [isSuccess, data, dispatch, nav])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>כניסה</h2>
        <div>
          <label>שם</label>
          <div>
            <input id="userName" name="userName" type="text" onChange={handleChange} />
          </div>
        </div>
        <div>
          <label>סיסמא</label>

          <div>
            <input id="password" name="password" type="password" onChange={handleChange} />
          </div>
        </div>
        {isError && (
          <h3 style={{ color: "red" }}>
            {error?.data?.message || "שם משתמש או סיסמה שגויים"}
          </h3>
        )}
        <button type="submit">שלח</button>
      </form>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        התחבר עם Google
      </button>
    </>
  );
};

export default Login;
