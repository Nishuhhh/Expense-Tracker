let name =  document.querySelector("#name");


let email = document.querySelector("#email")
let phone = document.querySelector("#phone");
let password = document.querySelector("#password") ;

const signupButton = document.querySelector('#button');

signupButton.addEventListener('click' , (e) =>{
    e.preventDefault();
     
    if(name.value === '')
    {
        name.placeholder = "please enter the username"
        name.classList.add("empty");
    }
    else if(email.value === '')
    {
        email.placeholder = "please enter the email"
        email.classList.add("empty");
    }
    else if(phone.value === '')
    {
        phone.placeholder = "please enter the phnnumber"
        phone.classList.add("empty");
    }

    else if(password.value === '')
    {
        password.placeholder = "please enter the phnnumber"
        password.classList.add("empty");
     }

     else{
        let userDetail={
            name :name.value ,email :email.value ,  phone: phone.value  , password : password.value 
        }
        console.log(userDetail)
        axios.post('http://localhost:5000/signup' , userDetail)
        .then((res) =>{
               console.log(res.data.flag)

               showPopupMessage(res.data.flag)
        }).catch(err => console.log(err))
     }

})

function showPopupMessage(flag)
{
    const popContainer = document.querySelector('.popup-conatiner')
    const popmessage = document.querySelector(".popup-message")

    if (flag)
    {
        popmessage.innerHTML =
        `<p>Signup Successfull</p>
        <p> please loginIN </p>`
    }

    else
    {
        popmessage.innerHTML = `<p> USer already exist ! please login</p>`
    }

    popContainer.classList.add("active") ;

    setTimeout(() => {
        popContainer.classList.remove('active')

    },3000)
}