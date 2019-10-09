module.exports = function greetFactory(namesList) {

    var namesGreeted = namesList || {};
    function greet(userName, language) {
        if(userName === ""){
            return 
        }
         else if (language === ""){
            return
        }
        var name = userName.toUpperCase().charAt(0) + userName.slice(1) 
        var name1 = userName.toLowerCase();
        if (namesGreeted[name1] === undefined) {
            namesGreeted[name1] = 1; 
      
          
        
        } else {
             namesGreeted[name1] = namesGreeted[name1] + 1;
         
        }

        if (language === "English") {
            return "Hello, " + name + "!";
        }
        else if (language === "Afrikaans") {
            return "Hallo, " + name + "!";
        }
        if (language === "IsiXhosa") {
            return "Molo, " + name + "!";
        }
    }

    function getName() {
        return namesGreeted;
    }

    function clear(){
        namesGreeted = {};
    }

    function getCounter() {
        console.log(Object.keys(namesGreeted).length);
        return Object.keys(namesGreeted).length;

    }
    

    return {
        clear,
        getName,
        greet,
        getCounter,
    }
}