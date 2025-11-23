import { useEffect, useState } from "react"
import { useRegisterMutation ,useUpdateUserMutation} from "./authApiSlice"
import { useNavigate } from "react-router-dom"

const Register=()=>{

  const nav=useNavigate()
    const [registerFunc,{isError,isLoading,isSuccess,error}]=useRegisterMutation()

    const [form, setForm]=useState({
    name: "",
    userName: "",
    password: "",
    email: "",
    })

    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
       const strongPassword = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{6,}$/;
    if (!strongPassword.test(form.password)) {
     alert("הסיסמה חייבת לכלול לפחות אות באנגלית, לפחות תו מיוחד ולפחות 6 תווים");
      return;
    }
    console.log("Password is strong!");

    if(!form.email.includes('@')||!form.email.includes('.')){
      alert("איימיל חייב לכלול @ ו . ")
      return
    }
    if (!form.name || !form.userName|| !form.email||!form.password) {
    alert("יש למלא את כל השדות לפני שליחה");
    return;
  }
  try{
    await registerFunc(form).unwrap()
      alert("ההרשמה בוצעה בהצלחה!");

      setForm({
        name: "",
        userName: "",
        password: "",
        email: "",
      });

      nav("/"); // נווט לדף לוגין
    } catch (err) {
      console.error("שגיאה בהרשמה:", err);
      alert(err?.data?.message || "שגיאה בשרת");
    }
  };
    return(
    <form onSubmit={handleSubmit}>
    <h2>הרשמה</h2>

      {isLoading && <h4>טוען...</h4>}
      {isError && (
        <h4 style={{ color: "red" }}>{JSON.stringify(error?.data || error)}</h4>
      )}
      {isSuccess && (
        <h4 style={{ color: "green" }}>המשתמש נוסף בהצלחה</h4>
      )}
    <div>
        <label>שם</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>שם משתמש</label>
        <input
          name="userName"
          type="text"
          value={form.userName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>סיסמא</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>אימייל</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button type="submit">הרשמה</button>
    </form>
  );
}
export default Register







