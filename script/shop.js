

const handleShop=()=>{
    fetch("https://fashion-api-g1d6.onrender.com/product/list/").then((res)=>res.json()).then((data)=>{
        console.log(data);
    }).catch((err)=>console.error(err));
};

handleShop();