import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
name:"auth",
initialState:{
    token:localStorage.getItem("token")||"",
    isLoginUser: (() => {
        const token = localStorage.getItem("token")
        const userStr = localStorage.getItem("user")
        return !!(token || (userStr && userStr !== "undefined"))
    })(),
    user: (() => {
        const userStr = localStorage.getItem("user")
        try {
            return userStr && userStr !== "undefined" ? JSON.parse(userStr) : null
        } catch {
            return null
        }
    })(),
},
reducers:{
    setToken:(state,action)=>{
    const token=action.payload.token
    state.token=token
    state.isLoginUser=true
    localStorage.setItem("token",token)
    },
       setUser:(state,action)=>{
        state.user=action.payload.user
        state.isLoginUser=true 
        localStorage.setItem("user",JSON.stringify(action.payload.user))
    },
    removeToken:(state)=>{
        state.token=""
        state.isLoginUser=false
        //כדי שמידע ישן של משתמש ימחק לחלוטין מהlocalStorge
        state.user = null
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }
}
})
export default authSlice.reducer
export const {setToken,removeToken, setUser}=authSlice.actions