const val = document.getElementById("email")
const btn  = document.getElementById("resetBtn")

btn.addEventListener("click" , (e) =>{
    e.preventDefault()
    console.log(val.value);
    let email = val.value; 
    
    axios.post("http://localhost:5000/forgotpassword" ,{email})
    .then((data) =>{
        console.log(data.data)
    })
    .catch((err) =>{
        console.log(err);
    })
})

