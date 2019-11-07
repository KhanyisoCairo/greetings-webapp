document.addEventListener('DOMContentLoaded', function(){
let errorMassageElem = document.querySelector('.error')
if(errorMassageElem.innerHTML !== "" ){
    setTimeout(function(){
        errorMassageElem.innerHTML = "";
    },3000)
}
});
