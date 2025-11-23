import { useGetProductsQuery ,useDeleteProductMutation} from "./productApiSlice";
import { addToBasket } from "../basket/basketSlice";
import "../../App.css";
import AddProductForm from './addProductForm'
import UpdateProductForm from "./updateProductForm";
import { useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductGrid from "./productGrid";
import { useUpdateProductMutation } from "./productApiSlice";

const ProductList = () => {

  const dispatch=useDispatch()
  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState([])
  const [search,setSearch]=useState("")
  const { data, isLoading, isError, error } = useGetProductsQuery({ page, limit: 10 });
  const [deleteProduct]=useDeleteProductMutation()
  const [showAdd,setShowAdd]=useState(false)
  const [showUpdate,setShowUpdate]=useState(false)
  const [productToUpdate,setProductToUpdate]=useState(null)
  const [quantities,setQuantities]= useState({})
  const [selectCategory, setSelectCategory] = useState("all");
  const [oldPrice, setOldPrice] = useState({});
  const [updateProduct] = useUpdateProductMutation();
  const [hasMore, setHasMore] = useState(true);

  const user=useSelector(state=>state.auth.user)
//שמירת המחירים הישנים
useEffect(() => {
  const savedOldPrices = localStorage.getItem("oldPrice");
  if (savedOldPrices) {
    setOldPrice(JSON.parse(savedOldPrices));
  }
}, []);
//מציג את המוצרים כל פעם שpage או  data משתנה מציג בלי כפילות מוצרים
useEffect(() => {
  if (data?.products) {
    if (page === 1) {
      setAllProducts(data.products)
    } else {
      setAllProducts(prev => {
        const existingIds = new Set(prev.map(p => p._id))
        const newProducts = data.products.filter(p => !existingIds.has(p._id))
        return [...prev, ...newProducts]
      })
    }
    setHasMore(data.hasMore)
  }
}, [data, page]);

  console.log("Current user:", user);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error: {error.toString()}</div>;

  const handDelete=(productItem)=>{
    deleteProduct(productItem._id)
  }
  
  const handleOpenAdd=()=>{setShowAdd(true)}
  const handleCloseAdd=()=>{setShowAdd(false)}

  const handleOpenUpdate=(product)=>{
    setProductToUpdate(product)
    setShowUpdate(true)
  }
  const handleCloseUpdate=()=>{
    setProductToUpdate(null)
    setShowUpdate(false)
  }

  const handBasket=(product)=>{
    const quantity=quantities[product._id]||1
    dispatch(addToBasket({...product, quantity }))
    toast.success("המוצר נוסף לסל בהצלחה!")
  }
 const handleSale = async (product) => {
  const isCurrentlyOnSale = oldPrice[product._id] !== undefined;

  if (isCurrentlyOnSale) {
    const prevPrice = oldPrice[product._id];

    // מוחקים מחיר ישן
    setOldPrice(prev => {
      const { [product._id]: _, ...rest } = prev;
      localStorage.setItem("oldPrice", JSON.stringify(rest));
      return rest;
    });

    try {
      console.log("Sending update:", { _id: product._id, price: prevPrice });
      // מחזירים מחיר לשרת
     const result= await updateProduct({
  id: product._id,
  formData: { price: prevPrice } // body של PUT
}).unwrap();

      console.log("Server response:", result);
     toast.info("המבצע בוטל בהצלחה! המחיר הקודם הוחזר.");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("שגיאה בעדכון המחיר!");
    }

    return;
  }
  // הפעלת סייל — שמירת מחיר ישן
  setOldPrice(prev => {
    const newPrice = { ...prev, [product._id]: product.price };
    localStorage.setItem("oldPrice", JSON.stringify(newPrice));
    return newPrice;
  })
  setProductToUpdate(product);
  setShowUpdate(true);
}
//שומר על החוקיות של הכמות 1 ליח ו0.5 לקילו
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
    console.log("user roles:", user?.roles)
    
  return (
    <div className="products-wrapper">
      {user?.roles==="Seller"&&<button className="add-btn" onClick={()=>{handleOpenAdd()}}>הוסף מוצר ➕</button>}
      {showAdd&&<AddProductForm onClose={handleCloseAdd}/>}
      {showUpdate&&<UpdateProductForm product={productToUpdate} onClose={handleCloseUpdate}/>}

<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
  <button className="kategory" onClick={() => setSelectCategory("all")}>הכול 🍇</button>
  <button className="kategory" onClick={() => setSelectCategory("פרות")}>פירות 🍎</button>
  <button className="kategory" onClick={() => setSelectCategory("ירקות")}>ירקות 🥕</button>
  <button className="kategory" onClick={() => setSelectCategory("עלים")}>עלים 🥬</button>
</div>

<input className="search" id="search" name="search" type="text" placeholder="חפש מוצר 🔍" value={search} onChange={(e) => setSearch(e.target.value)}></input>

      <h1 className="products-title">🍍 טרי לי 🍍</h1>
<ProductGrid
  products={allProducts.filter(
    (p) =>
      (selectCategory === "all" || p.kategory === selectCategory) &&
      p.productName.toLowerCase().includes(search.toLowerCase())
  )}
  user={user}
  quantities={quantities}
  handleChangeQuantities={handleChangeQuantities}
  handBasket={handBasket}
  handDelete={handDelete}
  handleOpenUpdate={handleOpenUpdate}
  handleSale={handleSale}
  oldPrice={oldPrice}
/>

{hasMore && (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <button 
      className="add-btn" 
      onClick={() => setPage(prev => prev + 1)}
      disabled={isLoading}
    >
      {isLoading ? 'טוען...' : 'הצג עוד מוצרים 📦'}
    </button>
  </div>
)}

    </div>
  );
};

export default ProductList