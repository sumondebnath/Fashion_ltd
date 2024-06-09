


window.onload = () =>{
    const toggler = document.getElementById("togle");
    const menus = document.getElementById("menu");
    // const banner_text =document.getElementById("banner-text");

    toggler.addEventListener("click", ()=>{
        menus.classList.toggle("hidden");
        // banner_text.classList.toggle("hidden");

    });

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    if(token && user_id){
        document.getElementById("user-tag").style.display="none";
    }
    else{
        document.getElementById("cart-tag").style.display="none";
    }

    console.log(token, user_id);

};