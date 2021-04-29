
var inputname= document.getElementById("ProductName");
var inputprice= document.getElementById("ProductPrice");
var inputcategory= document.getElementById("ProductCategory");
var inputdescription= document.getElementById("ProductDescription");
//var mainbtn=document.getElementById("mainbtn");
var products;
var id;

// اول مااعمل ريفريش لازم اساله لو في داتا في اللوكل استورج خدها وضيفها علي الاراي واعرضها عشان مايبداش من الاول والاراي فاضي
if(localStorage.getItem("mystorage")==null){
    products =[];

}
else{
products=JSON.parse(localStorage.getItem("mystorage"));
display();
}
function Add(){

if( document.getElementById("mainbtn").innerHTML == " Add Product "){
var regex1=/^[A-Z][a-z]+[0-9]$/;
var valuename=inputname.value; 
var valueprice=inputprice.value;
var valuecategory=inputcategory.value;
var valuedescription=inputdescription.value;
    if(regex1.test(valuename)){

var product={name : valuename, price : valueprice, category : valuecategory, description : valuedescription};

products.push(product);
localStorage.setItem("mystorage", JSON.stringify(products));
//console.log(products);
display();
clearinput();
}
else{
    window.alert("Sorry Not Validation");
}
}
else if(document.getElementById("mainbtn").innerHTML=="Update"){
    // var updatename=inputname.value;
    // var updateprice=inputprice.value;
    // var updatecategory=inputcategory.value;
    // var updatedescription=inputdescription.value;
    // var updateproduct={name : updatename, price : updateprice, category : updatecategory, description : updatedescription};
    // products.splice(id,1,updateproduct);
     products[id].name=inputname.value;
   products[id].price= inputprice.value;
    products[id].category= inputcategory.value ;
    products[id].description=inputdescription.value;
    localStorage.setItem("mystorage", JSON.stringify(products));
    display();
    clearinput();
}
}

function clearinput(){
   
    inputname.value ="";
    inputprice.value="";
    inputcategory.value="";
    inputdescription.value="";
}

function display(){
    var x =``;
    
    for(var i=0 ;i< products.length ;i++  ) 
    {
        x += `<tr> 
                        <td>` + i + `</td>
                        <td>` +  products[i].name +`</td>
                        <td>` +  products[i].price +`</td>
                        <td>` +  products[i].category +`</td>
                        <td>` +  products[i].description +`</td>
                        <td><button onclick="Deleteproduct(` + i + `)" class="btn btn-danger">Delete</button></td>
                        <td><button onclick="Updateproduct(` + i + `)" class="btn btn-warning">Update</button></td>
                    </tr>`
    }
     document.getElementById("tabledata").innerHTML = x;

}
function Deleteproduct(indexi){
products.splice(indexi,1);
display();
localStorage.setItem("mystorage",JSON.stringify(products))

}

function Updateproduct(indexi){
    document.getElementById("mainbtn").innerHTML="Update";
    inputname.value= products[indexi].name ;
    inputprice.value= products[indexi].price;
    inputcategory.value= products[indexi].category ;
    inputdescription.value=products[indexi].description;
    id=indexi;


}

// function Searchproduct(userword){
// for(var i=0;i<products.length;i++){
//     if(products[i].name==userword)
//     {
//         existproducts.push(products[i]);
//     }
// }

// }
function Searchproduct(userword){
    var existproducts = [];
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(userword.toLowerCase()) )
        {  
            var newobject=products[i]; //newobject={name: ,price: category: ,des: }
            newobject["Searchindex"]=i;  //create new proberty(searchindex) in the object(newobject)and set this =i
             //newobject={name: ,price: category: ,des: ,searchindex: i }
            existproducts.push(newobject);   
        }
    }
    var x =``;
        
        for(var i=0 ;i< existproducts.length ;i++  ) 
        {
            x += `<tr> 
                            <td>` + existproducts[i].Searchindex + `</td>
                            <td>` +  existproducts[i].name +`</td>
                            <td>` +  existproducts[i].price +`</td>
                            <td>` +  existproducts[i].category +`</td>
                            <td>` +  existproducts[i].description +`</td>
                            <td><button onclick="Deleteproduct(` + existproducts[i].Searchindex  + `)" class="btn btn-danger">Delete</button></td>
                            <td><button onclick="Updateproduct(` + existproducts[i].Searchindex  + `)" class="btn btn-warning">Update</button></td>
                        </tr>`
        }
         document.getElementById("tabledata").innerHTML = x;
    
    }
    