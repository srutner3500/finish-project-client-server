
const ProductGrid = ({
  products= [],
  user,
  quantities = {},
  handleChangeQuantities = () => {},
  handBasket = () => {},
  handDelete = () => {},
  handleOpenUpdate = () => {},
  handleSale = () => {},
  oldPrice = {},
}) => {
  return (
         <div className="products-wrapper">
         <div className="products-grid">
        {products
        .map((product) => {
          const quentity=quantities[product._id]||1
          return(
          <div key={product._id} className="product-container">

            {/* תמונת sale */}
            {oldPrice[product._id] && (
              <img className="sale-image" src="/sale.png" alt="sale" />
            )}
         
            {/* תמונה */}
              <img className="product-image" src={`http://127.0.0.1:9636${product.image}`} alt={product.productName} />
              <div className="product-info">
              {/* שם מוצר */}
              <h2 className="product-name">{product.productName}</h2>
              {/* תאור */}
              <p className="product-description">{product.description}</p>
              {/* כמות */}
              <div className="field">
              <div className="controler">
                {product.unitType === "יח'" ? "'יח" : "'קג"}
                <input id="quantity" name="quantity" type="number" min={1} step={product.unitType === "יח'" ? 1 : 0.5} value={quentity} onChange={(e)=>{
                let val = Number(e.target.value)
                  if (product.unitType === "יח'") {
                    val = Math.max(1, Math.round(val)) // עיגול למספר שלם למוצרים ביחידות
                  } else {
                    val = Math.max(0.5, val) // מינימום 0.5 לקילו
                  }
                  handleChangeQuantities(product._id,val,product.unitType)
                }}/>
              </div>
              </div>
              {/* מחיר */}
              {/* הצגת מחיר ישן וחדש -סייל  */}
              <div className="product-price">
                {oldPrice[product._id] && oldPrice[product._id] > product.price && (
                  <span style={{
                    color: "red",
                    textDecoration: "line-through",
                    marginRight: "8px",
                    fontSize: "16px"
                  }}>
                    ₪{oldPrice[product._id]}
                  </span>
                )}
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  ₪{product.price}
                </span>
              </div>
              {/* מלאי */}
              <div className="product-inventory">
               <h2>  ({product.inventory}) מלאי</h2>
              </div>

              {user?.roles==="User"&&(
              <button className="basket-btn" onClick={()=>{handBasket(product)}}>הוסף לסל ➕</button>
              )}
             {user?.roles==="Seller"&&(
              <>
              <button className="delete-btn" onClick={()=>{handDelete(product)}}>מחיקה 🗑️</button>
              <button className="update-btn" onClick={()=>{handleOpenUpdate(product)}}>עדכון ✏️</button>
              <button className="sale-btn" onClick={()=>{handleSale(product)}}>Sale ✨</button>
              </>
              )}
            </div>
          </div>
          )
        })}
      </div>
      </div>
  )
}

export default ProductGrid