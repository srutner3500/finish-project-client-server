import apiSlice from "../../app/apiSlice";

const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        getProducts:build.query({
            query:(params = {})=>({
                url:"api/products/getAll",
                params
            }),
            providesTags: ["Product"],
                      serializeQueryArgs: ({ queryArgs }) => {
                return `products-${queryArgs.page || 1}`
            }

        }),
        createProduct:build.mutation({
            query:(product)=>({
                url:"api/products",
                method:"POST",
                body:product
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct:build.mutation({
            query:(id)=>({
                url:`api/products/${id}`,
                method:"DELETE",
                body:{id:id}
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct:build.mutation({
           query:({id,formData})=>({
               url:`api/products/${id}`,
               method:"PUT",
               body:formData
           }),
           invalidatesTags:["Product"]
        }),
        updateStock:build.mutation({
            query:(items)=>({
                url:"api/products/updateStock",
                method:"PUT",
                body:{items}
            }),
            invalidatesTags:["Product"]
        })
    })
})

export const{useGetProductsQuery, useDeleteProductMutation,useCreateProductMutation,useUpdateProductMutation,useUpdateStockMutation}=productApiSlice