window.onload = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  // console.log(token, user_id);

  if (!token && !user_id) {
    window.location.href = "login.html";
  }

  if(token && user_id){
    const toggler = document.getElementById("dash-togle");
    const menus = document.getElementById("dash-menu");
    const back = document.getElementById("dash-back");
    // const banner_text =document.getElementById("banner-text");

    toggler.addEventListener("click", ()=>{
      // console.log("hey");
        menus.classList.toggle("hidden");

    });
    back.addEventListener("click", ()=>{
      // console.log("hey");
        menus.classList.toggle("hidden");
        // banner_text.classList.toggle("hidden");

    });
  }

  const dash_profile_details = document.getElementById("dash-profile-details");
  fetch(`https://fashion-api-g1d6.onrender.com/user/${user_id}/`).then((res)=>res.json()).then((data)=>{
    console.log(data);
    dash_profile_details.innerHTML = `
      <h1 class="font-semibold text-2xl py-1">Username :  ${data.username}</h1>
      <h2 class="font-semibold text-2xl py-1">Full Name :  ${data.first_name} ${data.last_name}</h2>
      <h3 class="font-semibold text-2xl py-1">Email :  ${data.email}</h3>
    `;
  }).catch((err)=>console.error(err));


  const admin_panel = document.getElementById("admin-panel");
  const user_image = document.getElementById("dash-left-img");
  const dash_user_image = document.getElementById("dash-user-image");
  fetch(`https://fashion-api-g1d6.onrender.com/account/details/?user_id=${user_id}`).then((res)=>res.json()).then((data)=>{
    console.log(data);
    if(data[0].account_type === "User"){
      admin_panel.style.display = "none";
    }
    user_image.innerHTML = `
      <img class="w-20 h-20 mx-auto rounded-full border-2 border-blue-500" src="${data[0].image}" alt="user-image">
    `;
    document.getElementById("dash-user-type").innerText = `${data[0].account_type}`;

    dash_user_image.innerHTML = `
      <img class="w-40 mx-auto rounded-2xl border-2 border-blue-500" src="${data[0].image}" alt="user-image">
    `;
  }).catch((err)=>console.error(err));

};




const handleUser=()=>{
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);

  

  // fetch(`https://fashion-api-g1d6.onrender.com/account/details/?user_id=${user_id}`).then((res)=>res.json()).then((data)=>{
  //   console.log(data);
  //   console.log(data[0].account_type);
  // }).catch((err)=>console.error(err));
};







const handleLogout = () => {
  const token = localStorage.getItem("token");

  fetch("https://fashion-api-g1d6.onrender.com/account/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${data.detail}`,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      window.location.href = "login.html";
    });
};


handleUser();