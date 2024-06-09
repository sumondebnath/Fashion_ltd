

const handleLogin=(event)=>{
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    
    fetch("https://fashion-api-g1d6.onrender.com/account/login/", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username, password}),
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        if(data.error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${data.error}`,
            });
        }
        if(data.token && data.user_id){
            Swal.fire({
                icon: "success",
                title: "Welcome...",
                text: "Log In Successfully",
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "index.html";
        }
    }).catch((err)=>console.error(err));
};