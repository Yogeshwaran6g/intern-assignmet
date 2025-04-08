
const base_url="http://localhost:3000/";

export async function userRegister(userData) {
    
    const response= await fetch(`${base_url}user/register`,{
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body:JSON.stringify({userData})
    });
    console.log(response)
    if(response.ok){
        var result=await response.json();
        return result;
    }       
}

export async function getDoctors(){


    try{
        const token = localStorage.getItem("token");
        if(!token)throw new error("please log into continue")
    
    const response=await fetch(`${base_url}doctor/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`},
    })
    if(!response.ok)throw new error("failed to fetch doctors");
        const result=await response.json();
        console.log(result);
        return result;
    }catch(err){
        return {"error":err.message || "failed to fetch"}
    }

}


export async function userLogin(userData) {
    console.log(userData)
    const response= await fetch(`${base_url}user/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({userData})
    });
    console.log("response",response)
    if(response.ok){
        const result=await response.json();
        console.log("result",result)
        return result
    }    
}



export default {userLogin,userRegister}
