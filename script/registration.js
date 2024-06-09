const handleRegistration = (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const account_type = document.getElementById("account_type").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  const register = {
    username,
    first_name,
    last_name,
    email,
    account_type,
    password,
    confirm_password,
  };
  // console.log(register);

  if (password === confirm_password) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      console.log(register);
      fetch("https://fashion-api-g1d6.onrender.com/account/registration/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username && data.username.length > 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${data.username[0]}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: `${data.message}`,
              text: "Please Log In",
            });
            window.location.href = "login.html";
          }
        })
        .catch((err) => console.error(err));
    } else {
      Swal.fire({
        icon: "warning",
        title: "alart...",
        text: "Minimum eight characters, at least one letter, one number and one special character",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password and Confirm password Does not matched!",
    });
  }
};
