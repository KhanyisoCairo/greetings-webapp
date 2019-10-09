let assert = require("assert");
let greetings = require("../greetings");

describe('Greet Function', function () {
    it('should  return Molo Cairo if you have selected language as IsiXhosa and your name is Cairo ', function () {
        var greetName = greetings();
        
        let results = greetName.greet("Cairo", "IsiXhosa");

        console.log(results);

        assert.equal(results,'Molo, Cairo!');
    });
    it('should  return Hallo John if you have selected language as Afrikaans and your name is Bass John', function () {
        var greetName = greetings();
      
        let results = greetName.greet("John","Afrikaans")

        assert.equal(results,'Hallo, John!');
    });
    it('should  return Hello Siya if you have selected language as English and your name is Siya', function () {
        var greetName = greetings();
        
        let results = greetName.greet("Siya","English")

        assert.equal(results,'Hello, Siya!');
    });
    it('The counter should return zero if you dont select name and language', function () {
        var greetName = greetings();
      
        let results = greetName.getCounter()
        assert.equal(results, 0);
    });
    it('should return 5 as the number of counter if you greeted 5 diffirent users', function () {
        var greetName = greetings();
        
        
        greetName.greet("Siya", "IsiXhosa");
        greetName.greet("Sino", "English");
        greetName.greet("Siwe", "Afrikaans");
        greetName.greet("Odwa", "IsiXhosa");
        greetName.greet("Cairo", "English");

         assert.equal(greetName.getCounter(),5)
    });
    it('should  return empty string when there is no name or number', function () {
        var greetName = greetings();
        

        greetName.greet("","");
        assert.equal(greetName.getCounter(),0)
    });
    it('the counter should return 1 if u greeted Siya two times ', function () {
        var greetName = greetings();
    
        
        greetName.greet("Siya", "IsiXhosa");
        greetName.greet("Siya", "English");
        assert.equal(greetName.getCounter(),1)
       
    });
    it('the counter should return 1 if you write makho with upperCase or LowerCase ', function () {
        var greetName = greetings();
    
        greetName.greet("Makho", "English")
        greetName.greet("MakhO", "English")

        assert.equal(greetName.getCounter(),1);
       
   });

});