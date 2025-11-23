import apiSlice from "../../app/apiSlice";

const apiAuthSlice=apiSlice.injectEndpoints({
    endpoints:(build)=>({
        register:build.mutation({
            query:(registerUser)=>({
                url:'/api/auth/register',
                method:"POST",
                body:registerUser
            })
        }),
        login:build.mutation({
            query:(loginUser)=>({
                url:'/api/auth/login',
                method:"POST",
                body:loginUser,
            })
        }),
        updateUser: build.mutation({
            query: ({ id, data }) => ({
                url: `/api/user/${id}`,   
                method: 'PUT',           
                body: data             
            }),
            invalidatesTags: ['user']
}),
        getUser:build.query({
            query:(id)=>`/api/user/${id}`,
        })
    })
})
export const {useRegisterMutation,useLoginMutation,useGetUserQuery,useUpdateUserMutation}=apiAuthSlice