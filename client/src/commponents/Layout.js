import Navigation from "./Navigation"
import{Outlet} from 'react-router-dom'

const Layout=()=>{

    return <div style={{ padding: "1rem", color: "#3a6b35", font:"status-bar"}}>
   <Navigation/>
    <Outlet/>
    </div>

}
export default Layout