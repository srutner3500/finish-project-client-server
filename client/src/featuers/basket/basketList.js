import { removeFromBasket, clearBasket} from "./basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BasketList = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const items = useSelector((state) => state.basket.items)

  if (!items || items.length === 0) {
    return <h2 className="no-basket">הסל שלך ריק 🛒</h2>
  }

  const totalPrice=items.reduce((sum,item)=>sum+item.price*item.quantity,0)

  return (
    <div className="basket-container">
      <h2 className="basket-title">🛍️ סל הקניות שלך</h2>
      <div className="basket-grid">
        {items.map((item) => (
          <div key={item._id} className="basket-card">
            <img className="basket-image" src={`http://127.0.0.1:9636${item.image}`} alt={item.productName} />
            <h4 className="basket-name">{item.productName}</h4>
            <h5 className="basket-description">{item.description}</h5>
            <h3 className="basket-price">₪{item.price*item.quantity}</h3>
            <p className="basket-quantity">כמות: {item.quantity}</p>
            <button className="basket-remove" onClick={() => dispatch(removeFromBasket(item._id))}>הסר ❌</button>
          </div>
        ))}
      </div>

      <div className="total-pay">
       <h3>סה״כ לתשלום: ₪{totalPrice}</h3>
        </div>

      <button className="basket-clear" onClick={() => dispatch(clearBasket())} >נקה סל 🗑️</button>
      <button className="pay" onClick={()=>navigate('/pay')}>תשלום</button>
    </div>
  );
};

export default BasketList;

