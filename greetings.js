module.exports = function greetFactory(namesList) {

    var namesGreeted = namesList || {};
    function greet(userName, language) {
        if (userName === "" || userName === undefined) {
            return
        }
        else if (language === "") {
            return
        }
        userName = userName.toLowerCase();
        var name = userName.toUpperCase().charAt(0) + userName.slice(1)
        if (namesGreeted[name] === undefined) { // name not greeted nefore
            namesGreeted[name] = 1;

        } else {
            //update counter
            namesGreeted[name] = namesGreeted[name] + 1;
        }

        if (language === "English") {
            return "Hello, " + name + "!";
        }
        else if (language === "Afrikaans") {
            return "Hallo, " + name + "!";
        }
        else if (language === "IsiXhosa") {
            return "Molo, " + name + "!";
        }


    }

    function getName() {
        return namesGreeted;
    }




    function clear() {
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
        getCounter
        
    }
}