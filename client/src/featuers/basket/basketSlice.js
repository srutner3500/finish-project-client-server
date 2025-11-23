import { createSlice } from "@reduxjs/toolkit";

//שומר את הID כדי לבדוק האם המשתמש מחובר
const getUserId = () => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr && userStr !== "undefined") {
    try {
      user = JSON.parse(userStr);
    } catch (err) {
      console.warn("Failed to parse user from localStorage", err);
      user = null;
    }
  }
  return user ? user._id : "guest";
}

const initialState = {
  items: []
}
const basketSlice=createSlice({
    name:"basket",
    initialState,
    reducers:{
        addToBasket:(state,action)=>{
            const userId=getUserId()
            const product=action.payload
            const findProduct=state.items.find((item)=>item._id===product._id)

            if(findProduct){
                findProduct.quantity+= product.quantity
            }else{
                state.items.push(product)
            }
            localStorage.setItem(`basketItems${userId}`,JSON.stringify(state.items))
        },
        removeFromBasket:(state,action)=>{
            const userId=getUserId()
            state.items=state.items.filter(item=>item._id!==action.payload)
            localStorage.setItem(`basketItems${userId}`,JSON.stringify(state.items))
        },
        clearBasket:(state)=>{
            const userId=getUserId()
            state.items=[]
            localStorage.removeItem(`basketItems${userId}`)
        },
        loadBasket:(state)=>{
            const userId=getUserId()
            const saveBasket=localStorage.getItem(`basketItems${userId}`)
            state.items=saveBasket ? JSON.parse(saveBasket):[]
    }
}
})
export const{addToBasket,removeFromBasket,clearBasket,loadBasket }=basketSlice.actions
export default basketSlice.reducer