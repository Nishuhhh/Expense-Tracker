var addExenseBtn = document.querySelector(".submit-btn")
var itemList = document.getElementById('items') ;
var filter = document.querySelector("#filter")
let premiumDiv = document.getElementById('premium-feature')

addExenseBtn.addEventListener("click" , addItem)
 itemList.addEventListener("click" , removeElement)
//filter.addEventListener("keyup" , filterItems)

let amount = document.querySelector("#amount")
let description = document.querySelector("#description")
let category = document.querySelector('#category')
console.log(category);

window.addEventListener('DOMContentLoaded' , (e) => 
{
   const token = localStorage.getItem('token')
   console.log(token);
   axios.get('http://localhost:5000/home',{headers : {Authorization : token}})
   .then(user => {
     console.log(user);
    let isPremium = user.data.premium ;
    console.log(isPremium);

    if(isPremium)

    {
        console.log(premiumDiv);
        premiumDiv.innerHTML = `
        <li><a href="../leaderBoard/leaderboard.html" id="leaderboard">Leaderboard</a></li>
        <li><button id="darkmode">Dark Mode</button></li>
        `
        premiumDiv.style.display="block";
        let leaderboardBtn = document.querySelector('#leaderboard')
        let darkModeBtn = document.querySelector('#darkmode')
    }
   
    
   })

   axios.get('http://localhost:5000/home/getExpenses'  , {headers : {Authorization : token}})
   .then(res => {
    console.log(res.data)

    let expnses = res.data.expenses

    for(let i=0 ; i<expnses.length ; i++)
    {
        let expAmount = expnses[i].amount ;
        let expCategory = expnses[i].category ;
        let expDescription = expnses[i].description ;
        
        displayExpense(expAmount , expCategory , expDescription)

    }
   })
})

const btn = document.getElementById("btn")
const nav = document.getElementById("nav")


btn.addEventListener("click" , () =>{
    nav.classList.toggle("active");
    btn.classList.toggle("active");

})
 


function addItem(e)
{

    e.preventDefault()
     
    let  expense = {amount : amount.value , description: description.value , category : category.value}
    console.log(expense);
    const token = localStorage.getItem('token')
    axios.post('http://localhost:5000/home/addExpense' ,{expense} ,{headers:{"Authorization" : token}})
    .then(res=>{
        let addedExpense = res.data.result ;
        console.log(addedExpense);
        
        displayExpense(addedExpense.amount , addedExpense.category , addedExpense.description)
    })
    .catch(err =>{
        console.log(err);
    })


}

function removeElement(e)
{
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure")){
            var li = e.target.parentElement
        itemList.removeChild(li);
    }
        }
        

}
function displayExpense(expAmount, expCategory , expDescription)
{
    let newExpense = `${expAmount} : ${expCategory} , ${expDescription}`

    var li = document.createElement(li)
    li.className = "list-group-item" 

    li.appendChild(document.createTextNode(newExpense))

    var delBtn = document.createElement("button")
    delBtn.className = "btn btn-danger btn-sm float-right delete"
    delBtn.appendChild(document.createTextNode('X'))

    li.appendChild(delBtn) ;

    itemList.appendChild(li);
}


let premiumBtn = document.getElementById('premium')

premiumBtn.addEventListener("click" , buyPremium)

async function buyPremium(e)
{
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:5000/home/purchasePremium', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:5000/home/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
//   alert(response.error.code);
//   alert(response.error.description);
//   alert(response.error.source);
//   alert(response.error.step);
//   alert(response.error.reason);
//   alert(response.error.metadata.order_id);
//   alert(response.error.metadata.payment_id);
  });
}
let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('../LoginPage/login.html')
})



