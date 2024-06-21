window.onload = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(token, user_id);

  if (!token && !user_id) {
    window.location.href = "login.html";
    return;
  }

  if (token && user_id) {
    const toggler = document.getElementById("dash-togle");
    const menus = document.getElementById("dash-menu");
    const back = document.getElementById("dash-back");
    // const banner_text =document.getElementById("banner-text");

    toggler.addEventListener("click", () => {
      // console.log("hey");
      menus.classList.toggle("hidden");
    });
    back.addEventListener("click", () => {
      // console.log("hey");
      menus.classList.toggle("hidden");
      // banner_text.classList.toggle("hidden");
    });
  }
  // user API fetch
  const dash_profile_details = document.getElementById("dash-profile-details");
  fetch(`https://fashion-api-g1d6.onrender.com/user/${user_id}/`)
    .then((res) => res.json())
    .then((data) => {
      handleAccountInstance(data);
      dash_profile_details.innerHTML = `
      <h1 class="font-semibold text-2xl py-1">Username :  ${data.username}</h1>
      <h2 class="font-semibold text-2xl py-1">Full Name :  ${data.first_name} ${data.last_name}</h2>
      <h3 class="font-semibold text-2xl py-1">Email :  ${data.email}</h3>
    `;
    })
    .catch((err) => console.error(err));

  //  user details API fetch
  const admin_panel = document.getElementById("admin-panel");
  const user_image = document.getElementById("dash-left-img");
  const dash_user_image = document.getElementById("dash-user-image");

  const add_category = document.getElementById("add_category");
  const add_product = document.getElementById("add_product")
  fetch(
    `https://fashion-api-g1d6.onrender.com/account/details/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      handleDetailsInstance(data);
      if (data[0].account_type === "User") {
        admin_panel.style.display = "none";
        add_category.style.display = "none";
        add_product.style.display = "none";
      }
      user_image.innerHTML = `
      <img class="w-20 h-20 mx-auto rounded-full border-2 border-blue-500" src="${data[0].image}" alt="user-image">
    `;
      document.getElementById(
        "dash-user-type"
      ).innerText = `${data[0].account_type}`;

      dash_user_image.innerHTML = `
      <img class="w-40 mx-auto rounded-2xl border-2 border-blue-500" src="${data[0].image}" alt="user-image">
    `;
    });
    // .catch((err) => console.error(err));

  // user address API fetch
  fetch(
    `https://fashion-api-g1d6.onrender.com/account/address/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length);
      // address_id = data[0].id;
      if(data.length === 0){
        return;
      }
      else{
        handleAddressInstance(data);
      }
      
    });
    // .catch((err) => console.error(err));



    handleCategory();

};




const addCategories=(event)=>{
  event.preventDefault();
  const name = document.getElementById("category_name").value;
  const slug = generateSlug(name);
  console.log(slug);
  console.log(name);

  fetch("https://fashion-api-g1d6.onrender.com/category/list/", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name, slug}),
  }).then((res)=>res.json()).then((data)=>{
    console.log(data);
  }).catch((err)=>console.error(err));
};


const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};




const handleCategory=()=>{
  const select_category = document.getElementById("category");
  // const div = document.createElement("div");
  fetch("https://fashion-api-g1d6.onrender.com/category/list/").then((res)=>res.json()).then((data)=>{
    // console.log(data);
    data.forEach((shop)=>{
      const option = document.createElement("option");
      option.value = shop.id;
      option.innerText = shop.name;
      select_category.appendChild(option);
    });
  });  //.catch((err)=>console.error(err));
};


const getSize=()=>{
  // const checkbox = document.querySelectorAll('input[name="sizes"]:checked');
  const checkbox = document.getElementsByName("sizes");
  let selected_size = [];
  const selected_Checkbox = Array.from(checkbox).forEach((box)=>{
    // console.log(box.value);
    selected_size.push(box.value);
  });
  // console.log(selected_size);
  return selected_size;
};


const addProduct=(event)=>{
  event.preventDefault();
  // console.log(event);
  const name = document.getElementById("product_name").value;
  const product_type = document.getElementById("product_type").value;
  const product_number = document.getElementById("product_number").value;
  const brand_number = document.getElementById("brand_number").value;
  const image = document.getElementById("product_image").files[0];
  const gender_type = document.getElementById("gender_type").value;
  // const gender_type = gender_type.options[gender_type.selectedIndex].value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const sizes = getSize();

  const user_id = localStorage.getItem("user_id");

  const product = {
    name, product_type, product_number, brand_number, sizes, image, gender_type, price, description, category
  }
  console.log(product);

  const productData = new FormData();
  sizes.forEach((size)=>{
    productData.append("size", size)
  });
  // productData.append("size", size.forEach((s)=>s));
  productData.append("name", name);
  productData.append("image", image);
  productData.append("product_number", product_number);
  productData.append("brand_number", brand_number);
  productData.append("price", price);
  productData.append("product_type", product_type);
  productData.append("gender_type", gender_type);
  productData.append("description", description);
  productData.append("user", user_id);
  productData.append("category", category);

  

  fetch("https://fashion-api-g1d6.onrender.com/product/list/", {
    method:"POST",
    body:productData,
  }).then((res)=>res.json()).then((data)=>{
    console.log(data);
  }).catch((err)=>console.error(err));

};




const handleAccountInstance = (user_data) => {
  // console.log(user_data.username);
  document.getElementById("username").value = user_data.username;
  document.getElementById("first_name").value = user_data.first_name;
  document.getElementById("last_name").value = user_data.last_name;
  document.getElementById("email").value = user_data.email;
};




const handleDetailsInstance = (details_data) => {
  // console.log(details_data[0].gender);
  // document.getElementById("image").files[0] = address_data[0].image;
  document.getElementById("gender").value = details_data[0].gender;
  document.getElementById("account_type").value = details_data[0].account_type;
  document.getElementById("date_of_birth").value =
    details_data[0].date_of_birth;
};




const handleAddressInstance = (address_data) => {
  // console.log(address_data[0].street_address);
  document.getElementById("street_address").value =address_data[0].street_address;
  document.getElementById("city").value = address_data[0].city;
  document.getElementById("postal_code").value = address_data[0].postal_code;
  document.getElementById("country").value = address_data[0].country;
};




const handleUserDetails = async (event) => {
  event.preventDefault();
  // console.log("hello");

  const user_id = localStorage.getItem("user_id");

  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const image = document.getElementById("image").files[0];
  const gender = document.getElementById("gender").value;
  const account_type = document.getElementById("account_type").value;
  const date_of_birth = document.getElementById("date_of_birth").value;
  const street_address = document.getElementById("street_address").value;
  const city = document.getElementById("city").value;
  const postal_code = document.getElementById("postal_code").value;
  const country = document.getElementById("country").value;

  const allUser = {
    username,
    first_name,
    last_name,
    email,
    image,
    gender,
    account_type,
    date_of_birth,
    street_address,
    city,
    postal_code,
    country,
  };
  console.log(allUser);

  fetch(`https://fashion-api-g1d6.onrender.com/user/${user_id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: user_id,
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(err));

  const DetailsForm = new FormData();
  DetailsForm.append("image", image);
  DetailsForm.append("gender", gender);
  DetailsForm.append("account_type", account_type);
  DetailsForm.append("date_of_birth", date_of_birth);
  DetailsForm.append("user", user_id);

  fetch(
    `https://fashion-api-g1d6.onrender.com/account/details/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      
      fetch(`https://fashion-api-g1d6.onrender.com/account/details/${data[0].id}/`, {
        method: "PUT",
        body: DetailsForm,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
      
    });

  fetch(`https://fashion-api-g1d6.onrender.com/account/address/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.length===0){
        console.log("yes empty");
        fetch(`https://fashion-api-g1d6.onrender.com/account/address/`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              // "id": 1,
              street_address: street_address,
              city: city,
              postal_code: postal_code,
              country: country,
              user: user_id,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Updated",
              text: "Your Data Up to Date",
            });
            location.reload();
          });
      }
      else{
        console.log("not empty");
        fetch(
          `https://fashion-api-g1d6.onrender.com/account/address/${data[0].id}/`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              // "id": 1,
              street_address: street_address,
              city: city,
              postal_code: postal_code,
              country: country,
              user: user_id,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              icon: "success",
              title: "Updated",
              text: "Your Data Up to Date",
            });
            // location.reload();
          });
      }
      
    });
};





const showPassword = () => {
  const old_passwordInput = document.getElementById("old_password");
  const new_passwordInput = document.getElementById("new_password");
  const confirm_passwordInput = document.getElementById("confirm_password");
  if (old_passwordInput.type === "password" | new_passwordInput.type === "new_password" | confirm_passwordInput.type === "confirm_password") {
    old_passwordInput.type = "text";
    new_passwordInput.type = "text";
    confirm_passwordInput.type = "text";
  } else {
    old_passwordInput.type = "password";
    new_passwordInput.type = "password";
    confirm_passwordInput.type = "password";
  }
};

const changePasword = (event) =>{
  event.preventDefault();
  const user_id = localStorage.getItem("user_id");
  // const id = 2;
  const old_password = document.getElementById("old_password").value;
  const password = document.getElementById("new_password").value;
  const password2 = document.getElementById("confirm_password").value;
  const passwordes = {
    user_id, old_password, password, password2
  }

  console.log(passwordes);

  if(password === password2){
    fetch("https://fashion-api-g1d6.onrender.com/account/change_password/", {
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify(passwordes),
    }).then((res)=>res.json()).then((data)=>{
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "checked",
        text:`${data.message}`,
      });
    });
  }
  else{
    Swal.fire({
      icon: "error",
      title: "Try Again!",
      text: "New Password And Confirm Password Does Not Matched!",
    });
  }
  
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
