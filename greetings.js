module.exports = function greetFactory(pool) {

    var namesGreeted = {};
    var name;
    var table;
    async function greet(userName, language) {
        table = await pool.query('select distinct greet_name, greet_count from greeted')

        if (userName === "" || userName === undefined) {
            return
        }
        else if (language === "") {
            return
        }
        userName = userName.toLowerCase();
        name = userName.toUpperCase().charAt(0) + userName.slice(1)
        if (namesGreeted[name] === undefined) { // name not greeted nefore
            namesGreeted[name] = 1;
            var store = await pool.query('select * from greeted WHERE greet_name = $1', [name])
                    
                    
                if (store.rowCount === 1) {
                    await pool.query('UPDATE greeted greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1', [name])
                }
                else {
                    await pool.query('insert into greeted (greet_name, greet_count) values ($1, $2)', [name, 1]);
                }


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

    // function getCounter() {
    //     console.log(Object.keys(namesGreeted).length);
    //     return Object.keys(namesGreeted).length;

    // }
    async function getCounter() {
        var counter = await pool.query('select count(*) from greeted')
        for (var i = 0; i < counter.rows.length; i++) {
            var checkCount = counter.rows[i]
        }
        return checkCount.count
    }

//     async function storedGreetedNames(names) {
//    //  name = names.charAt(0).toUpperCase() + names.slice(1).toLowerCase();
//         // var myNames = regex.test(myNames)

//         if (myNames === false) {
//             known = await pool.query('select distinct greet_name, greet_count from greeted ORDER BY greet_name')

//             if (myNames.length > 0) {
//                 var store = await pool.query('select * from greeted WHERE greet_name = $1', [name])
                    
                    
//                 if (store.rowCount === 1) {
//                     await pool.query('UPDATE greeted greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1', [name])
//                 }
//                 else {
//                     await pool.query('insert into greeted (greet_name, greet_count) values ($1, $2)', [name, 1]);
//                 }
//             }
//         }
//     }
    async function getData() {
        known = await pool.query('select distinct greet_name, greet_count from greeted')
        console.log(known.rows);
        return known.rows
        
    }
    async function resetDb() {
        await pool.query('DELETE from greeted')
    }

    return {
        clear,
        getName,
        greet,
        getCounter,
        // storedGreetedNames,
        getData,
        resetDb

    }
}