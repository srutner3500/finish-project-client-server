import { useState } from "react";
import "../../App.css";
import { useCreateProductMutation } from "./productApiSlice";

const AddProductForm = ({ onClose }) => {

    const[AddProduct]=useCreateProductMutation()
    const[formAddProduct,setFormAddProduct]=useState({
        productName: "",
        image:"",
        price:"",
        description:"",
        kategory:"",
        inventory:"",
        unitType:""
    })
    const handleChange=(e)=>{
             const { name, value, type, files } = e.target;
        setFormAddProduct((product) => ({
            ...product,
            [name]: type === "file" ? files[0] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const data = new FormData();
        data.append("productName", formAddProduct.productName);
        data.append("image", formAddProduct.image); // קובץ
        data.append("price", formAddProduct.price);
        data.append("description", formAddProduct.description);
        data.append("kategory", formAddProduct.kategory);
        data.append("inventory", formAddProduct.inventory);
        data.append("unitType", formAddProduct.unitType);

        AddProduct(data)
        setFormAddProduct({
        productName: "",
        image:"",
        price:"",
        description:"",
        kategory:"",
        inventory:"",
        unitType:""
        })

        if (onClose) onClose()
    }
return (
<div className="add-product-page">
<form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
<h2 className="form-title">הוספת מוצר</h2>


<div className="field">
<label htmlFor="productName">שם מוצר</label>
<div className="control"><input id="productName" name="productName" type="text"  value={formAddProduct.productName} onChange={handleChange}/></div>
</div>


<div className="field">
<label htmlFor="image">תמונה</label>
<div className="control"><input id="image" name="image" type="file" accept="image/*"  onChange={handleChange}/></div>
</div>


<div className="field">
  <label htmlFor="unitType">סוג מידה</label>
  <div className="control">
    <select
      id="unitType"
      name="unitType"
      value={formAddProduct.unitType}
      onChange={handleChange}
    >
      <option value="קג'">קילו</option>
      <option value="יח'">יחידה</option>
    </select>
  </div>
</div>

<div className="field">
<label htmlFor="price">מחיר</label>
<div className="control"><input id="price" name="price" type="number" step="0.01"   value={formAddProduct.price} onChange={handleChange} /></div>
</div>


<div className="field">
<label htmlFor="description">תיאור</label>
<div className="control"><textarea id="description" name="description" rows="3"   value={formAddProduct.description} onChange={handleChange}></textarea></div>
</div>


<div className="field">
<label htmlFor="kategory">קטגוריה</label>
<div className="control">
<select id="kategory" name="kategory"
value={formAddProduct.kategory}
onChange={handleChange}
>
<option value="">בחר/י קטגוריה</option>
<option>פרות</option>
<option>ירקות</option>
<option>עלים</option>
</select>
</div>
</div>


<div className="field">
<label htmlFor="inventory">מלאי</label>
<div className="control"><input id="inventory" name="inventory" type="number"   value={formAddProduct.inventory} onChange={handleChange} /></div>
</div>


<div className="actions">
<button type="submit" className="btn save">שמור/סגור טופס</button>
</div>
</form>
</div>
);
};


export default AddProductForm;