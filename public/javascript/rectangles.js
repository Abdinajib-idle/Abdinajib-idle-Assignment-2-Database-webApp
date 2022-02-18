//This Js file is gonna be shared by multiple files to execute command
function goBack(){
        window.history.back() 
}
var redirect=document.getElementById("goback");
redirect.addEventListener('click',function goBack(){
        window.history.back() 
})