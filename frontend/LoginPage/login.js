const email = document.querySelector('#email')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('#loginBtn')

loginBtn.addEventListener('click', (e)=>{
  e.preventDefault()

  if(email.value === '')
  {
    email.placeholder ="please enter the email";
    email.classList.add('empty')
  }
   if(password.value==='')
   {
    password.placeholder='please enter the password';
    password.classList.add('empty')
   }

   else
   {
    let userDetails=
    {
        email:email.value,password:password.value
    }
    console.log(userDetails);
     axios.post('http://localhost:5000/login' , userDetails)
     .then((res)=>{
        console.log(res.status)
        
        alert("login successfull")
        if(res.status == 200)
        {
            localStorage.setItem('token' ,  res.data.token);
            localStorage.setItem('userDetails' , JSON.stringify({name:res.data.name , email : res.data.email}))
            window.location.replace('../HomePage/home.html')

        }


     }).catch(err =>{
        console.log(err)
     })
   // console.log(userDetails);

   }
})
function showPopupMessage(flag)
{
    const popContainer = document.querySelector('.popup-container')
    const popmessage = document.querySelector(".popup-message")

    if (flag)
    {
        popmessage.innerHTML =
        `<p>user doesn't exist</p>
        <p> please Signup to create account </p>`
    }

    else
    {
        popmessage.innerHTML = `<p> Sign up to create acccount</p>`
    }

    popContainer.classList.add("active") ;

    setTimeout(() => {
        popContainer.classList.remove('active')

    },3000)
}
