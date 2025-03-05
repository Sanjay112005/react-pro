


const BASE_URL = 'http://127.0.0.1:8000';

export const Dog ={


    register :(data) =>
        fetch(`${BASE_URL}/admin_console/create/`,{
           method:"POST" ,
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify(data),
           credentials:"include",
        
        }),

        verifyAccount : (token) =>
            fetch(`${BASE_URL}/admin_console/verify-account/?token=${token}`, {
            method:"POST",
            credentials:"include",
            }).then((res)=>{
               if(!res.ok) throw new Error("verfication ffalied")
               return res.json()
            }),

            resendVerification: (data) =>
               fetch(`${BASE_URL}/admin_console/resend-verification/`, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(data),
                   credentials: 'include',
               }).then((res) => {
                   if (!res.ok) throw new Error('Failed to send verification email');
                   return res.json();
               }),
               
           
         forgotpassword : (email) =>
            fetch(`${BASE_URL}/admin_console/forgotpassword/`,{
               method:"POST",
               headers :{'Content-Type':'application/json'},
               body:JSON.stringify({email}),
               credentials:"include",
            }),

         resetPassword : (token,data) =>
            fetch(`${BASE_URL}/admin_console/reset-password/?token=${token}`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(data),
               credentials: 'include',

            }),

         login : (data) =>
            fetch(`${BASE_URL}/admin_console/login/`,{
               method:"POST",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(data),
               credentials:"include",
            }),

         logout : ()=> 
            fetch(`${BASE_URL}/admin_console/logout/`,{
             method:"GET",
             credentials:"include"
            }),
         
         getProducts : (query = '') =>
            fetch(`${BASE_URL}/product/get/${query ? `?q=${encodeURIComponent(query)}` : ''}`, {
               method:'GET',
               credentials: 'include',
            }),

            addToCart: (productId, quantity = 1) =>
               fetch(`${BASE_URL}/cart_mgmt/add/`, {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ product_id: productId, quantity }), // Send both product_id and quantity
                   credentials: 'include'
               }),
            getCart :()=>
               fetch(`${BASE_URL}/cart_mgmt/view/`, {
                  method:"GET",
                  credentials:"include",
               }),

            deleteCartItem :(itemId) =>
               fetch(`${BASE_URL}/cart_mgmt/remove/${itemId}/`, {
                  method: 'DELETE',
                  credentials: 'include',
              }),  

              checkout: () =>
               fetch(`${BASE_URL}/cart_mgmt/checkout/`, {
                   method: 'POST',
                   credentials: 'include', // Include cookies in the request
               }).then((response) => response.json()),
               
           makePayment: (orderId) =>
               fetch(`${BASE_URL}/cart_mgmt/payment/${orderId}/`, {
                   method: 'POST',
                   credentials: 'include', // Include cookies in the request
               }).then((response) => response.json()),
             
             OrderHistory: ()=>
                  fetch(`${BASE_URL}/cart_mgmt/order-history/`, {
                       method:"POST",
                       credentials:"include",
                  }),

               createProfile: (data) =>
                  fetch(`${BASE_URL}/user_mgmt/profile/create/`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                      credentials: 'include',
                  }),
              
              updateProfile: (data) =>
                  fetch(`${BASE_URL}/user_mgmt/profile/update/`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                      credentials: 'include',
                  }),
              
              getProfile: () =>
                  fetch(`${BASE_URL}/user_mgmt/profile/`, {
                      method: 'GET',
                      credentials: 'include',
                  }),

                  changePassword: (data) =>
                     fetch(`${BASE_URL}/user_mgmt/profile/change_password/`, {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify(data),
                         credentials: 'include',
                     }),
               
                  deactivateAccount: () =>
                     fetch(`${BASE_URL}/user_mgmt/profile/deactivate/`, {
                         method: 'PUT',
                         credentials: 'include',
                     }),
                 
                     reactivateVerification: (data) =>
                         fetch(`${BASE_URL}/admin_console/reactivate-verification/`, {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify(data),
                             credentials: 'include',
                         }),
                     
                     reactivateAccount: (token) =>
                         fetch(`${BASE_URL}/admin_console/activate-account/?token=${token}`, {
                             method: 'POST',
                             credentials: 'include',
                         }),
              
           


            }
