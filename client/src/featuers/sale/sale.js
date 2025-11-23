import ProductGrid from "../product/productGrid";
import { useGetProductsQuery,useUpdateProductMutation } from "../product/productApiSlice";
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from "react-redux";
import { useState ,useEffect} from "react";
import { addToBasket } from "../basket/basketSlice";

const Sale=()=>{
    const dispatch=useDispatch()
    const { data, isLoading, isError, error } = useGetProductsQuery({ page: 1, limit: 1000 });
    const products = data?.products || [];
    const user = useSelector(state => state.auth.user);
      const [showUpdate,setShowUpdate]=useState(false)
      const [productToUpdate,setProductToUpdate]=useState(null)
      const [quantities,setQuantities]= useState({})
      const [oldPrice, setOldPrice] = useState({});
      const [updateProduct]=useUpdateProductMutation()

      useEffect(() => {
        const savedOldPrices = localStorage.getItem("oldPrice");
        if (savedOldPrices) {
          setOldPrice(JSON.parse(savedOldPrices));
        }
      }, []);

       if (isLoading) return <div className="loading">Loading...</div>;
       if (isError) return <div className="error">Error: {error.toString()}</div>;
//סינון מוצרי sale
    const saleProducts = products.filter(p => oldPrice[p._id] !== undefined);

    const handBasket = (product) => {
        const quantity = quantities[product._id] || 1
        dispatch(addToBasket({ ...product, quantity }))
        toast.success("המוצר נוסף לסל בהצלחה!")
    }
//פונקציית הסייל - מפעילה ומכבה סייל
  const handleSale = async (product) => {
  //בודק האם המוצר במבצע
  const isCurrentlyOnSale = oldPrice[product._id] !== undefined;
  //אם כן - ביטול סייל
  if (isCurrentlyOnSale) {
    //שולף את המחיר הקודם ומעדכן את השרת
    const prevPrice = Number(oldPrice[product._id])
    try {
    await updateProduct({
      id: product._id,
      formData: { price: prevPrice }
    }).unwrap()
    // מוחקים את המוצר שלא בסייל כבר
    setOldPrice(prev => {
      const { [product._id]: _, ...rest } = prev
      localStorage.setItem("oldPrice", JSON.stringify(rest))
      return rest
    })
     toast.info("המבצע בוטל בהצלחה! המחיר הקודם הוחזר.")
    } catch (err) {
      console.error("Update error:", err)
      toast.error("שגיאה בעדכון המחיר!")
    }
    return
  }
  // אם המוצר לא במבצע- מפעילים סייל
  setOldPrice(prev => {
    const newPrice = { ...prev, [product._id]: product.price }
    localStorage.setItem("oldPrice", JSON.stringify(newPrice))
    return newPrice
  })
  setProductToUpdate(product)
  setShowUpdate(true)
}

  const handleChangeQuantities=(productItem,value,unitType)=>{
    let newValue=value
    if(unitType==="יח'"){
     newValue= Math.max(1,Math.round(value))
    }else{
     newValue= Math.max(0.5,value)
    }
    setQuantities((prev)=>({
      ...prev,
    [productItem]:newValue,
    }))
  }
    
    return(<div className="products-wrapper">
    <h1 className="products-title">🔥 מוצרים במבצע 🔥</h1>
    <ProductGrid
    products={saleProducts}
    user={user}
  quantities={quantities}
  handleChangeQuantities={handleChangeQuantities}
  handBasket={handBasket}
  handleSale={handleSale}
  oldPrice={oldPrice}
    />
    </div>
    )
}
export default Sale