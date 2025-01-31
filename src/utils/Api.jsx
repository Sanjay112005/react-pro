


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
           
         forgotpassword : (email) =>
            fetch(`${BASE_URL}/admin_console/forgotpassword/`,{
               method:"POST",
               headers :{'Content-Type':'application/json'},
               body:JSON.stringify({email}),
               credentials:"include",
            }),

         resetPassword : (token,data) =>
            fetch(`${BASE_URL}/admin_console/reset-password/?token=${token}`,{
              method:"POST",
              headers:{'content-Type':'application/json'},
              body:JSON.stringify(data) ,
              credentials:"include",

            }),

         login : (data) =>
            fetch(`${BASE_URL}/admin_console/login/`,{
               method:"POST",
               headers:{"Content-Type":"application/json"},
               body:JSON.stringify(data),
               credentials:"include",
            }),
         
         

} 