document.writeln('Hello')

//
// method method
// Function.prototype.method = function (name, func)
// {
//   this.prototype[name] = func;
//   return this;
// };

// obsolete comments are worse than no comments

// Math.floor() converts number into integer
// 'cat'.toUpperCase() === 'CAT'

// A block is a set of statements wrapped in curly brackets {}

// to test if property name is truly part of the object chain for loop
//
// for (myVar in obj){
//   if(obj.hasOwnProperty(myVar)){
//
//   }
// }

// = means assignment
// === means equality operator
// += can add or concatenate links together in chain or series

// % remainder assignement

// ? ternary operator :
// isTrue ? 'wasTrue' : 'wasFalse'

// Object literal
// name : 'value',

// Array literal
// [ name: 'value', ]


//Objects
// An object is a container or properties, that contain a name and a value

//Object Literal
var empty_object = {}
var stooge = {
  "first-name": "Jeremy",
  "last-name": "Howard"
}

stooge["first-name"] = "Casey"

// the || operator can fill in default values
var middle = stooge["middle-name"] || "None"

document.querySelector('.stooge').innerHTML = stooge["first-name"]

// Object prototypes are created everytime an object is created. prototype link is used only in retrieval

// REFLECTION
// typeof is very helpful for determining the type of property
console.log(typeof stooge["first-name"])
// hasOwnProperty() is also helpful for reflection
console.log(stooge.hasOwnProperty('first-name'))

// ENUMERATION
// this is great for checking all of the properties in an object
var i
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
]

// delete removes the property and replaces with undefined
delete stooge["last-name"]

for (let i = 0; i < properties.length; i++) {
  document.writeln(properties[i] + ':' + stooge[properties[i]])
}

//GLOBAL VARIABLES
var MYAPP = {};
// this can be a container for your entire app
// MYAPP.stooge = {... }
// It prevents bad interactions with other widgets / libraries / etc.

//FUNCTIONS
//Functions are objects. Can be stored in variables, arrays, and other objects.
//Functions can be invoked

//create a variable called add and store a function in it that adds two numbers

//function literal
var add = function (a,b) {
  return a + b
}

document.writeln(add(1,2))

//INVOCATION
//when a function is stored in the property of an object, then it is a method
//when a method is invoked, 'this' is applied to that object

//Create myObject. It has a value and an increment method. The increment method takes an optional parameter. If the argument is not a number, then 1 is used as the default.
var myObject = {
  value: 0,
  increment: function (inc) { //this is a method now
    this.value += typeof inc === 'number' ? inc: 1;
  }
}

myObject.increment(10)
document.writeln(myObject.value)

//Augment myobject with double method
myObject.double = function() {
  var that = this;
  var helper = function () {
    that.value = add(that.value, that.value)
  }
  helper()
}
myObject.double()
document.writeln(myObject.value)


// create a constructor function called quo.
// it makes an object with a status property
var Quo = function(string) {
  this.status = string
}
//give all instances of Quo a public method
// called get_status

Quo.prototype.get_status = function() {
  return this.status
}
//make an instance of Quo
var myQuo = new Quo("confused")

document.writeln(myQuo.get_status())

//Apply Invocation Pattern

//make an array of 2 numbers and add them.
//use the apply method to create an array of arguments used to invoke a function.
var array = [3,4]
var sum = add.apply(null,array)

//make an object with a status member
var statusObject = {
  status: 'A-OK'
}
// statusObject does not inherit from Quo.prototype, but we can invoke the get_status method on statusObject even though statusObject does not have a get_status method.
var status = Quo.prototype.get_status.apply(statusObject)

const numbers = [0,3,50,25]
console.log(Math.max.apply(null,numbers))

//arguments in a function (I did not know this)
var sum = function() {
  var i, sum = 0;
  for(let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}
console.log(sum(2,2))

//Exceptions
// fat arrow functions cannot use this, and cannot use the new property. only callable, not constructable
var add = function (a,b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'typeerror',
      message: 'add needs numbers'
    }
    return a + b
  }
}
// make a try_it function that calls the new add function incorrectly
var try_it = function() {
  try {
    add('seven');
  } catch (e) {
    document.writeln(e.name + ':' + e.message)
  }
}

try_it()

//Augmenting types
//make method available to all functions, and not have to use prototype anymore
Function.prototype.method = function(name,func) {
  this.prototype[name] = func;
  return this;
}

// add integer method to Number.prototype
Number.method('integer', function () {
  return Math[this < 0 ? 'ceil': 'floor'](this);
})
document.writeln((-10/3).integer())

//remove spaces from the end of a string!
String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g,'');
});
document.writeln('"' + "  neat ".trim() + '"' );

// Add a method conditionally
Function.prototype.method = function(name,func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this
  }
}

//Recursion
// A recursive function calls itself to solve its subproblems
// Towers of Hanoi
const hanoi = function hanoi(disc, src, dst, aux) {
  if (disc > 0) {
    document.writeln('Move disc' + disc + 'from' + src + ' to ' + dst)
    hanoi(disc - 1, aux, src, dst)
  }
}
hanoi(3, 'Src', 'Aux', 'Dst')

//lets walk the DOM
//visits every node of the tree in html source order, starting from some given node
//invokes a function, passing it each node in turn walk_the_dom callls itself to process each of the child nodes
var walk_the_DOM = function walk(node,func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node,func);
    node = node.nextSibling;
  }
}
//define a getElementsByAttribut function. it takes an attribute name string and an optional matching value.
//it calls walk_the_dom passing it a function that looks for an attribute name in the node.
//the matching nodes are accumulated in a results array

var getElementsByAttribute = function(att,value) {
  var results = [];
  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node)
    }
  });
  return results
}

//factorial function with tail recursion
//multiply all whole numbers from our chosen number down to 1.
//4!
var factorial = function factorial(i,a) {
  a = a || 1;
  if(i < 2) {
    return a
  }
  return factorial(i - 1, a * i)
}
document.writeln(factorial(4))

//Scope
//Controls the visibility and lifetimes of variables and parameters.
// important because it reduces naming collisions and automatic memory management
var foo = function () {
  var a = 3, b = 5;
  var bar = function () {
    var b = 7, c = 11;
    //at this point, a is 3, b is 7, and c is 11
    a += b + c
    //at this point, a is 21, b is 7, and c is 11
  }
  //at this point, a is 3, b is 5, and c is not definede
  bar();
  //at this point, a is 21, b is 5
}

//javascript does not have block scope

//Closure

// initialize myObject by calling a function that returns an object literal.
//that function defines a value variable.
//the functions score keeps it hiddeen from the rest of the program

var myObject = (function() {
  var value = 0;
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value
    }
  };
}());

var myObject = (function() {
  var value = 0;
  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc: 1;

    },
    getValue: function () {
        return value
    }
  }
}());

// create a maker function called quo it makes an
// object with a get_status method and a private
// status property.

var quo = function (status) {
  return {
    get_status: function () {
      return status;
    }
  }
}

// Make an instance of quo.
var myQuo = quo("amazed")
document.writeln(myQuo.get_status())

// define a function that sets a DOM node's color
// to yellow and then fades it to white

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16)
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100)
    }
  }
  setTimeout(step, 100)
}
//fade(document.body)

// Make a function that assigns event handler functions to an array of nodes
// When you click on a node, an alert box will display the ordinal of the node.

var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      alert(i)
    }
  }
  var i;
  for (i = 0; i < nodes.length; i++) {
    nodes[i].onclick = helper(i)
  }
}

//MODULE
// A module is a function or object that presents an interface but hides it's state and implementation
// it removes the need to use global variables.
//global variables are EVIL

String.method('deentityify', function() {
  //the entity table. it maps entity names to characters.
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  //return the deentityify method.
  return function() {
    //this is the deentityify method. it calls the string.
    //replace method, looking for substrings that start with '&' and end with ';'
    //if the characters in between are in the entity table, then replace
    //the entity with the character from the table. uses a regular expression.
    return this.replace(/&([^&;]+);/g, function(a,b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  };
}());

document.writeln('&lt;&quot;&gt;'.deentityify()); // <">
// only the deentityify method has acceess to the data structure

//A module is a function that defines private variables and functions.

//lets make an object that produces a serial number.
// var serial_maker = function () {
//   //produce an object that produces unique strings.
//   var prefix = '';
//   var seq = 0;
//   return {
//     set_prefix: function (p) {
//       prefix = String(p)
//     },
//     set_suq: function (s) {
//       seq = s;
//     },
//     gensym: function() {
//       var result = prefix + seq;
//       seq += 1;
//       return result;
//     }
//   }
// }
// var seqer = serial_maker();
// seqer.set_prefix('Q')
// seqer.set_seq(1000)
// var unique = seqer.gensym(); //unique is "Q1000"

//CASCADE
// A cascade can call many methods on the same object in sequence in a single statement.

// getElement('myBoxDiv')
//   .move(350,150)
//   .width(100)
//   .height(100)
//   .color('red')
//   .border('10px outset')
//   .padding('4px')
//   .appendText("please stand by")
//   .on('mousedown', function(m) {
//     this.startDrag(m, this.getNinth(m));
//   })
//   .on('mousemove', 'drag')
//   .on('mouseup', 'stopDrag')
//   .later (2000,function () {
//     this
//       .color('yellow'
//     .setHTML("What hath god wraught?")
//     .slide(400,40,200,200))
//   }).tip("This box is resizeable")

//Curry
// Currying allows us to produce a new function by combining a function and an argument.

Function.method('curry', function() {
  var slice = Array.prototype.slice,
  args = slice.apply(arguments),
  that = this;
  return function () {
    return that.apply(null,args.concat(slice.apply(arguments)))
  }
})

var add1 = add.curry(1);
console.log(add1(8))

//Memoization
//functions can use objects to remeember the results of previous operations, making it possible to avoid unnecessary work.
// F(n) = F(n-1) + f(n-2)
// golden ratio.
// 0 + 1 = 1; 1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8;
var fibonacci = (function () {
  var memo = [0,1];
  var fib = function (n) {
    var result = memo[n];
    if(typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2)
      memo[n] = result;
    }
    return result;
  }
  return fib;
})
//make memoized functions.
var memoizer = function (memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  }
  return recur;
}
//better fibonacci.
var fibonacci = memoizer([0,1], function(recur,n){
  return recur(n-1) + recur(n-2);
});


Function.method('new', function() {
  // create a new object the inherits from the constsructor's prototype
  var that = Object.create(this.prototype);
  // Invoke the constructor, binding -this- to the new object.
  var other = this.apply(that, arguments);
  // If its return value isn't an object, substitue the new object.
  return (typeof other === 'object' && other) || that;
})

var Mammal = function (name) {
  this.name = name;
}

Mammal.prototype.get_name = function () {
  return this.name;
}

Mammal.prototype.says = function () {
  return this.saying || '';
};

//Now we can make an instance;

var myMammal = new Mammal('herb the mammal')
var name = myMammal.get_name() // 'herb the mammal'

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
}

// Replace Cat.prototype with a new instance of Mammal

Cat.prototype = new Mammal();

// Augment the new prototype with purr and get_name methods.

Cat.prototype.purr = function (n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
}

var myCat = new Cat('Henrietta')
var says = myCat.says() // 'meow'
var purr = myCat.purr(5) // 'r-r-r-r-r'
var name = myCat.get_name() // 'Henrietta'

Function.method('inherits', function (Parent){
  this.prototype = new Parent();
  return this;
})

//OBJECT SPECIFIERS
// var myObject = maker({
//   first: f,
//   last: l,
//   middle: m,
//   state: s,
//   city: c
// })


//Prototypal
// var myMammal = {
//   name: 'Herb the Mammal',
//   get_name: function () {
//     return this.name;
//   }
//   says: function () {
//     return this.saying || '';
//   }
// }

//Functinonal
var mammal = function (spec) {
  var that = {};
  that.get_name = function () {
    return spec.name;
  }
  that.says = function () {
    return spec.saying || '';
  }
  return that
}
var myMammal = mammal({name: 'Herb'});


Object.method('superior', function(name){
  var that = this,
  method = that[name];
  return function() {
    return method.apply(that, arguments);
  }
})

var coolcat = function (spec) {
  var that = mammal(spec),
  super_get_name = that.superior('get_name');
  that.get_name = function (n) {
    return 'like ' + super_get_name() + ' baby';
  }
  return that;
}

//Parts
var eventuality = function (that) {
  var registry = {};
  that.fire = function (event) {
    var array, func, handler, i, _i, _len;
    if (registry.hasOwnProperty(event)) {
      array = registry[event];
      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
        handler = array[i];
        func = handler.method;
        if (typeof func === 'string') {
          func = this[func];
        }
        func.apply(this, handler.parameters);
      }
    }
    return this;
  }
}

  //Chapter 6 Arrays

  //array literals
  // the length property is the largest integer property name in the array plus one.

var myArray = [1,2,3,4,5];
document.writeln(myArray.length);

class Person {
  constructor(name) {
    this.name = name;
  }
  thisWorks = () => {
    return this.name;
  }
}

const person = new Person('Casey');

console.log(person.thisWorks())

// callback function is asyncrhonous
// practice try catch
// destructuring and spread operator

// template literals `${variable}`

//array methods
// map filter reduce sum every sort forEach includes indexOf lastIndexOf


