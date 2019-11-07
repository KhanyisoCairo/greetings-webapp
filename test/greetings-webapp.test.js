let assert = require("assert");
let greetings = require("../greetings");


const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:delaan@localhost/greet';

const pool = new Pool({
    connectionString
});
describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greeted;");
        // await pool.query("delete from greet_count;");
    });

    it('should  return Molo Cairo if you have selected language as IsiXhosa and your name is Cairo ',async function () {
        var greetName =  greetings(pool);

        let results =await greetName.greet("Cairo", "IsiXhosa");
        assert.equal(results, 'Molo, Cairo!');
    });
    it('should  return Hallo John if you have selected language as Afrikaans and your name is Bass John',async function () {
        var greetName =  greetings(pool);

        let results = await greetName.greet("John", "Afrikaans")

        assert.equal( results, 'Hallo, John!');
    });
    it('should  return Hello Siya if you have selected language as English and your name is Siya',async function () {
        var greetName =  greetings(pool);

        let results = await greetName.greet("Siya", "English")

        assert.equal(results, 'Hello, Siya!');
    });
    it('The counter should return zero if you dont select name and language',async function () {
        var greetName =  greetings(pool);

        let results =await greetName.getCounter()
        assert.equal(results, 0);
    });
    it('should return 5 as the number of counter if you greeted 5 diffirent users',async function () {
        var greetName = greetings(pool);


     await   greetName.greet("Siya", "IsiXhosa");
     await   greetName.greet("Sino", "English");
     await   greetName.greet("Siwe", "Afrikaans");
     await   greetName.greet("Odwa", "IsiXhosa");
     await   greetName.greet("Cairo", "English");

        assert.equal(await greetName.getCounter(), 5)
    });
    it('should  return empty string when there is no name or number',async function () {
        var greetName =  greetings(pool);


        await  greetName.greet("", "");
        assert.equal( await greetName.getCounter(), 0)
    });
    it('the counter should return 1 if u greeted Siya two times ',async function () {
        var greetName =  greetings(pool);


        await   greetName.greet("Siya", "IsiXhosa");
        await  greetName.greet("Siya", "English");
          assert.equal( await greetName.getCounter(), 1)

    });
    it('the counter should return 1 if you write makho with upperCase or LowerCase ',async function () {
        var greetName =  greetings(pool);

        await   greetName.greet("Makho", "English")
        await  greetName.greet("MakhO", "English")

        assert.equal(await greetName.getCounter(), 1);

    });
    after(function(){
        pool.end();
    })

});