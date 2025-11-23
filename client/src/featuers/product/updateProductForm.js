import React, { useState, useEffect } from 'react'
import { useUpdateProductMutation } from './productApiSlice'

const UpdateProductForm = ({ product, onClose }) => {
    const [updateProduct] = useUpdateProductMutation()
    const [form, setForm] = useState({
        productName: "",
        image: "",
        price: "",
        description: "",
        kategory: "",
        inventory: "",
        unitType: ""
    })

    useEffect(() => {
        if (product) {
            setForm({
                productName: product.productName || "",
                image: product.image || "",
                price: product.price || "",
                description: product.description || "",
                kategory: product.kategory || "",
                inventory: product.inventory || "",
                unitType: product.unitType || ""
            })
        }
    }, [product])

      const handleChange=(e)=>{
             const { name, value, type, files } = e.target;
        setForm((product) => ({
            ...product,
            [name]: type === "file" ? files[0] : value
        }));
    }

    const handleSubmit =async (e) => {
        console.log("form לפני שליחה:", form)
        console.log(product._id)
        e.preventDefault()

        const data = new FormData()
        data.append("productName", form.productName)
        data.append("price", form.price)
        data.append("description", form.description)
        data.append("kategory", form.kategory)
        data.append("inventory", form.inventory)
        data.append("unitType", form.unitType)
  if (form.image instanceof File) {
    data.append("image", form.image)
  }
        try {
            await updateProduct({ id: product._id, formData: data }).unwrap();
            onClose?.()
        } catch (err) {
            console.log("שגיאה בעדכון מוצר:", err);
        }

        setForm({
            productName: "",
            image: "",
            price: "",
            description: "",
            kategory: "",
            inventory: "",
            unitType: ""
        })
    }
    return (
        <div className='update-product-form'>
            <form onSubmit={handleSubmit} className="update-product-form" encType="multipart/form-data">
                <h2 className="form-title">עדכון מוצר</h2>

                <div className="field">
                    <label htmlFor="productName">שם מוצר</label>
                    <div className="control"><input id="productName" name="productName" type="text" value={form.productName} onChange={handleChange} /></div>
                </div>


                <div className="field">
                    <label htmlFor="image">תמונה</label>
                    <div className="control"><input id="image" name="image" type="file" accept="image/*" onChange={handleChange} /></div>
                </div>


                <div className="field">
                    <label htmlFor="unitType">סוג מידה</label>
                    <div className="control">
                        <select
                            id="unitType"
                            name="unitType"
                            value={form.unitType}
                            onChange={handleChange}
                        >
                            <option value="קג'">קילו</option>
                            <option value="יח'">יחידה</option>
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="price">מחיר</label>
                    <div className="control"><input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} /></div>
                </div>


                <div className="field">
                    <label htmlFor="description">תיאור</label>
                    <div className="control"><textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange}></textarea></div>
                </div>


                <div className="field">
                    <label htmlFor="kategory">קטגוריה</label>
                    <div className="control">
                        <select id="kategory" name="kategory"
                            value={form.kategory}
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
                    <div className="control"><input id="inventory" name="inventory" type="number" value={form.inventory} onChange={handleChange} /></div>
                </div>


                <div className="actions">
                    <button type="submit" className="btn save">שמור/סגור טופס</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProductForm