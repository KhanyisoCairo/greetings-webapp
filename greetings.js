module.exports = function greetFactory(pool) {

    var namesGreeted = {};
    var name;
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
        if (namesGreeted[name] === undefined) {
            namesGreeted[name] = 1;
            var store = await pool.query('select * from greeted WHERE greet_name = $1', [name])
            if (store.rowCount === 1) {
                await pool.query('UPDATE greeted greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1', [name]);
            }
            else {
                await pool.query('insert into greeted (greet_name, greet_count) values ($1, $2)', [name, 1]);
            }
        } else {
            //update counter
            await pool.query('UPDATE greeted greet_name SET greet_count = greet_count + 1 WHERE greet_name = $1', [name]);

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
    async function getTotalCounter(names) {
        var namesOnDB = await pool.query('select greet_count from greeted where greet_name = $1', [names])
        if (namesOnDB.rows.length > 0) {
            return namesOnDB.rows[0].greet_count;
        }
        else {
            return false
        }
    }

    async function getCounter() {
        var counter = await pool.query('select count(*) from greeted')
        for (var i = 0; i < counter.rows.length; i++) {
            var checkCount = counter.rows[i]
        }
        return checkCount.count
    }
    async function resetDataBase() {
        let reset = await pool.query('DELETE FROM greeted')
        return reset.rows
    }
    async function get_names() {
        let get = await pool.query('SELECT * FROM greeted')
        return get.rows
    }
    async function getError(name, language) {

        if (name === "" || name === undefined) {
            return "please enter valid name";
        }
        else if (language === "" || language === undefined) {
            return "please select a language"
        }
    }
    return {
        clear,
        getName,
        greet,
        getCounter,
        resetDataBase,
        get_names,
        getTotalCounter,
        getError
    }
}