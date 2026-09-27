var nameInput = document.getElementById("FullName")
var phoneInput = document.getElementById("Phone")
var emailInput = document.getElementById("EmailAddress")
var addressInput = document.getElementById("Address")
var groupInput = document.getElementById("Group")
var notesInput = document.getElementById("Notes")
var checkInput = document.getElementById("CheckDefault")
var descInput = document.getElementById("ProductDefault")

var productList =  localStorage.getItem('myproduct')     ?JSON.parse(localStorage.getItem('myproduct')):[] ;
function handleaddproduct(){
    
    var product ={
        title:nameInput.value ,
        phone:Number(phoneInput.value) ,
        email:emailInput.value ,
        address:addressInput.value ,
        group:groupInput.value ,
        notes:notesInput.value ,
        check:checkInput.checked  ,
        desc:descInput.checked  ,

    }
    console.log(product);
    console.log(productList);
    productList.push(product)
    Swal.fire({
  title: "ADDED!",
  text: "Contact has been added successfully.",
  icon: "success",
   showConfirmButton: false,
  timer: 1500
});
    localStorage.setItem("myproduct",JSON.stringify(productList));
    console.log(productList);
    document.getElementById("cancelBtn").click();
    handleDisplay()
    
}

function handleDisplay(){
       

    var temp = "";
    document.getElementById("datafavorites").innerHTML = "";
     document.getElementById("dataemergency").innerHTML = "";
    if(productList.length<=0){
        temp=`
         <div class="empty-state">

                        <div class="empty-icon">
                            <i class="fa-solid fa-address-book fa-sm " style="color: rgba(31, 30, 30, 0.322);"></i>
                        </div>

                        <div class="empty-title">
                            No contacts found
                        </div>

                        <div class="empty-description">
                            Click "Add Contact" to get started
                        </div>

                    </div>
        `
          document.getElementById("datafavorites").innerHTML = `No favorites yet`
          document.getElementById("dataemergency").innerHTML = `No emergency contacts`
    }else{
        for (let index = 0; index < productList.length; index++) {
            temp+=`
          <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${productList[index].title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${productList[index].phone}</h6>
    <p class="card-text">${productList[index].email}</p>
    <p class="card-text">${productList[index].address}</p>
    <p class="card-text">${productList[index].group}</p>

  </div> 
  <div class="card-footer text-muted">
   <button onClick='deleteFunction(${index})'>
   <i class="fa-solid fa-trash" style="color: rgb(199, 48, 48);"></i> 
       </button>    
  </div>
</div>
            `
            if(productList[index].check){

                document.getElementById("datafavorites").innerHTML+=`
                <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${productList[index].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${productList[index].phone}</h6>
        
    
      </div>
    </div>
                `
            }else{
                
                document.getElementById("dataemergency").innerHTML+=`
                <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${productList[index].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${productList[index].phone}</h6>
        
    
      </div>
    </div>
                `
            }
            
        }
    }
    document.getElementById("mydata").innerHTML = temp;
     document.getElementById("mytotal").innerHTML = productList.length
     document.getElementById("myFavoritesCount").innerHTML = productList.filter(x=>x.check).length
     document.getElementById("myEmergencyCount").innerHTML =  productList.filter(x=>x.desc).length

}
function deleteFunction(index){
Swal.fire({
  title: "<strong>Delete Contact?</strong>",
  icon: "info",
  html: `
   Are you sure you want to delete qraf? This action cannot be undone.

  `,
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: `
    Yes,delete it!
  `,
  confirmButtonColor: "#d33",

  cancelButtonText: `
    No
  `,
    cancelButtonColor: "#3085d6",


}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
 productList = productList.filter((x,ind)=>ind!=index);
        localStorage.setItem("myproduct",JSON.stringify(productList));
        handleDisplay();
  }
  
});
   

}
handleDisplay();