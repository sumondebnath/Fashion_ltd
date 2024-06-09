window.onload = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(token, user_id);

  if (!token && !user_id) {
    window.location.href = "login.html";
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
