
import { NavLink } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { removeToken } from "../featuers/auth/authSlice";
import { useState, useEffect } from "react";

const Navigation = () => {
  const dispatch=useDispatch()
  const user=useSelector(state=>state.auth.user)
  const isLoginUser=useSelector(state=>state.auth.isLoginUser)
  const [styles, setStyles] = useState(getResponsiveStyles());
  
  console.log('Navigation - user:', user)
  console.log('Navigation - isLoginUser:', isLoginUser)

  useEffect(() => {
    const handleResize = () => {
      setStyles(getResponsiveStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const exit=()=>{
    dispatch(removeToken())
  }

  return (
    <div style={styles.navBar}>

       <div style={styles.logoContainer}>
        <img src="/logo.png" alt="logo" style={styles.logo} />
      </div>
      <div style={styles.linksContainer}>
      <NavLink to='/home' style={styles.link}>בית 🏠</NavLink>
      {!user&&(<NavLink to='/' style={styles.link}>כניסה / הרשמה 🚪</NavLink>)}
      <NavLink to='/basket' style={styles.link}>עגלת קניות 🛒</NavLink>
      <NavLink to='/sale' style={styles.link}>מבצעים ✨</NavLink>
      <NavLink to='/update' style={styles.link}>עדכון פרטים ✏️</NavLink>
      <NavLink to='/'onClick={(e)=>{e.preventDefault()
         exit()}} style={styles.link} >יציאה👋🏼</NavLink>
         </div>
<h1 style={styles.userText}>שלום {user ? (user.displayName || user.name) : "אורח/ת"}</h1>    
</div>
  )
}
//בודק את גודל המסך 
const getResponsiveStyles = () => {
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  const isMobile = window.innerWidth < 768;
  
  return {
    navBar: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "5px 10px" : isTablet ? "6px 15px" : "8px 20px",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      backgroundImage: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('/backgruond2.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderBottom: "2px solid #3a6b35",
      direction: "rtl",
      flexWrap: isMobile ? "wrap" : "nowrap"
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      height: isMobile ? "120px" : isTablet ? "160px" : "200px",
      width: "auto",
      objectFit: "contain",
    },
    linksContainer: {
      display: "flex",
      gap: isMobile ? "8px" : isTablet ? "12px" : "15px",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexWrap: isMobile ? "wrap" : "nowrap"
    },
    userText: {
      color: "black",
      fontSize: isMobile ? "18px" : isTablet ? "22px" : "27px",
      fontWeight: "500",
      padding: "0 12px",
      whiteSpace: isMobile ? "normal" : "nowrap",
    },
    link: {
      color: "black",
      fontSize: isMobile ? "16px" : isTablet ? "20px" : "26px",
      textDecoration: "none",
      padding: isMobile ? "6px 8px" : isTablet ? "7px 10px" : "8px 12px",
      borderRadius: "4px",
      transition: "all 0.3s ease",
      fontWeight: "500",
      cursor: "pointer"
    }
  };
};


export default Navigation;
