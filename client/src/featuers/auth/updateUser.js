import { useEffect, useState } from "react";
import { useUpdateUserMutation} from "./authApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.auth);

  const [updateUserFunc, { isLoading }] = useUpdateUserMutation();

  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("אין משתמש מחובר");
      return;
    }

    try {
      const payload = {
        name: form.name,
        userName: form.userName,
        email: form.email,
        ...(form.password ? { password: form.password } : {}),
      };

      const updatedData = await updateUserFunc({
        id: user._id,
        data: payload,
      }).unwrap();

      dispatch(setUser(updatedData))
      localStorage.setItem("user", JSON.stringify(updatedData)); // עדכון localStorage
      alert("המשתמש עודכן בהצלחה!")
      setForm((prev) => ({ ...prev, password: "" }))
      navigate("/home");
    } catch (err) {
      console.error("Update error:", err);
      alert(err?.data?.message || "שגיאה בעדכון המשתמש")
    }
  }

  if (!user) return <h3>אין משתמש מחובר</h3>

  return (
    <form onSubmit={handleSubmit}>
      <h2>עדכון פרטי משתמש</h2>

      {isLoading && <p>טוען...</p>}

      <div>
        <label>שם</label>
        <input name="name" type="text" value={form.name} onChange={handleChange} />
      </div>

      <div>
        <label>שם משתמש</label>
        <input name="userName" type="text" value={form.userName} onChange={handleChange} />
      </div>

      <div>
        <label>אימייל</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
      </div>

      <div>
        <label>סיסמה חדשה (לא חובה)</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </div>

      <button type="submit">עדכן</button>
    </form>
  );
};

export default UpdateUser