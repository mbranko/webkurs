//
//      8888888888                         888    d8b
//      888                                888    Y8P
//      888                                888
//      8888888 888  888 88888b.   .d8888b 888888 888  .d88b.  88888b.
//      888     888  888 888 "88b d88P"    888    888 d88""88b 888 "88b
//      888     888  888 888  888 888      888    888 888  888 888  888
//      888     Y88b 888 888  888 Y88b.    Y88b.  888 Y88..88P 888  888
//      888      "Y88888 888  888  "Y8888P  "Y888 888  "Y88P"  888  888
//



// To understand what is `this`, let's consider a function `fff` defined as:

        var fff = function () {
            var _type = typeof this;
            if ((_type === 'object' && this !== null) || _type === 'function')
                console.log(this.test); // print out the 'test' property of this
            else
                console.log('this is not an object');
        };


// When a function is called by a direct reference when not in strict mode,
// `this` is bound to the global object which contains all global variables

        fff();          // undefined is printed
        test = 777;
        fff();          // 777 is printed


// When a function is called as a method indirectly,
// `this` is bound to the object that contains the method

        var obj = {
            test: 888,
            ggg: fff
        };
        obj.ggg();      // 888 is printed


// When a function is called with `new` operator,
// `this` is bound to that newly created object

        fff.prototype.test = 999;
        var myobj = new fff();  // 999 is printed


// We can use `call()` to call a function with a specified this binding

        test = 777;
        obj = { test: 888, ggg: fff };
        fff();          // 777 is printed
        fff.call(obj);  // 888 is printed


// You can also pass arguments while using `call()`

        var foo = { a: 100, b: 200 };
        var bar = function (a, b) {
            this.a = a;
            this.b = b;
        };

        bar.call(foo, 'hello', 'world');
        foo.a; // 'hello'
        foo.b; // 'world'


// You can pass "an array" of arguments using `apply()`

        var foo = { a: 100, b: 200 };
        var bar = function (a, b) {
            this.a = a;
            this.b = b;
        };
        
        var args = [ 'hello', 'world' ];

        bar.apply(foo, args);
        foo.a; // 'hello'
        foo.b; // 'world'


// We can fix the `this` binding inside a function
// for all non-`new` function calls in the future using `bind()`
//
//
// When we write:
//
//      FuncB = FuncA.bind( obj );
//
// FuncB is a copy of FuncA, but when FuncB is invoked
// the `this` value in FuncB will always be `obj` no matter what

        var obj1 = {};
        var before = function () { return this; }; // this value depends
        var after = before.bind(obj1);             // this will always be obj1

        after() === obj1; // true

        var obj2 = { before: before, after: after };
        obj2.before() === obj2; // true
        obj2.after() === obj2; // false
        obj2.after() === obj1; // true


// These special methods we've just seen that are
// shared across all function objects are:

        Function.prototype.call
        Function.prototype.apply
        Function.prototype.bind


// Recall the OOP model with the "prototype" concept in JavaScript.
// Because `call`, `apply`, and `bind` listed above are inherited by
// all functions we created, we can access them in the form of
// `someFunc.call`, `someFunc.apply`, and `someFunc.bind`.


// About another special local variable----`arguments`
// You can get the "actual" number of arguments that get passed in 

        var bar = function (a, b) {
            return arguments.length;
        };
        bar();           // 0
        bar(9);          // 1
        bar(9, 8);       // 2
        bar(9, 8, 7, 6); // 4

// It is a special object (like an "array") containing all arguments that
// is actually passed into a function

        var bar = function (a, b) {
            return arguments[0] + arguments[1] + arguments[2];
        };
        bar(3, 4, 5); // 12


// Do not forget the fact that a JavaScript function is also a
// JavaScript object, which can store any number of properties.

        var funcIsAlsoAnObject = function () {};
        funcIsAlsoAnObject.someprop = 'test';
        funcIsAlsoAnObject.someprop;            // 'test'


// So, how about caching the ouputs of a function?  Note that
// in the following example code we are using "a named function
// expression" so that the function can refer to itself safely.

        var factorial = function factorial(n) {

            var undef;
            var cache = factorial.cacheTable;

            if (!Number.isInteger(n)) {
                throw new Error('n is not an integer');
            }
            if (n < 0) {
                throw new Error('n is negative');
            }
            if (cache[n] === undef) {
                cache[n] = n * factorial(n - 1);
            }
            return cache[n];
        };

        factorial.cacheTable = [ 0, 1 ]; // might be messed up outside the function


// Of course, we can achieve the same results by using a
// "closure" which might look cleaner and simpler.

        var factorial = (function () {

            var cache = [ 0, 1 ]; // Only accessible to functions inside this closure
                                  // after the surrounding anonymous function returns.

            return function factorial(n) {
                var undef;
                if (!Number.isInteger(n)) {
                    throw new Error('n is not an integer');
                }
                if (n < 0) {
                    throw new Error('n is negative');
                }
                if (cache[n] === undef) {
                    cache[n] = n * factorial(n - 1);
                }
                return cache[n];
            };

        }());








//
//             d8888
//            d88888
//           d88P888
//          d88P 888 888d888 888d888 8888b.  888  888
//         d88P  888 888P"   888P"      "88b 888  888
//        d88P   888 888     888    .d888888 888  888
//       d8888888888 888     888    888  888 Y88b 888
//      d88P     888 888     888    "Y888888  "Y88888
//                                                888
//                                           Y8b d88P
//                                            "Y88P"
//



// Note that the methods of array objects which will be
// listed below are actually inherited from `Array.prototype`.


// Get the size of an array

        var arr = ['hello', 'world', 123];
        arr.length; // 3


// Extract an element

        var arr = ['hello', 'world', 123];
        arr[1]; // 'world'


// Forwards search an element starting from an index (default: 0)

        var arr = [3,4,5,3];
        arr.indexOf(3);     // 0
        arr.indexOf(5);     // 2
        arr.indexOf(7);     // -1
        arr.indexOf(3, 1);  // 3
        arr.indexOf(5, 1);  // 2


// Backwards search an element starting from an index (default: this.length-1)

        var arr = [3,4,5,3];
        arr.lastIndexOf(3);     // 3
        arr.lastIndexOf(3, 3);  // 3
        arr.lastIndexOf(3, 2);  // 0
        arr.lastIndexOf(3, -1); // 3
        arr.lastIndexOf(3, -2); // 0


// Concatenate current array with given values and/or given arrays of values

        var arr = [1,2,3];
        arr.concat(4,5,[6,7,8],[9],[]); // [1,2,3,4,5,6,7,8,9]
        arr;                            // [1,2,3]


// (In-place) Append new elements to the end of an array

        var arr = [3,4,5];
        arr.push(6,7,[8,9]); // 6
        arr;                 // [3,4,5,6,7,[8,9]]
        arr[0];              // 3
        arr[1];              // 4
        arr[2];              // 5
        arr[3];              // 6
        arr[4];              // 7
        arr[5];              // [8,9]
        arr.length;          // 6

        arr[6];              // undefined
        arr[7];              // undefined
        arr.length;          // 6

        arr[8] = 'NinthElm';
        arr[6];              // undefined
        arr[7];              // undefined
        arr[8];              // 'NinthElm'
        arr.length;          // 9


// (In-place) Prepend new elements to the beginning of an array

        var arr = [3,4,5];
        arr.unshift(6,7,[8,9]); // 6
        arr;                    // [6,7,[8,9],3,4,5]


// (In-place) Remove (and return) the last element in an array

        var arr = [3,4,5];
        arr.pop();         // 5
        arr;               // [3,4]


// (In-place) Remove (and return) the first element in an array

        var arr = [3,4,5];
        arr.shift();       // 3
        arr;               // [4,5]


// (In-place) Pop out some elements (and optionally insert new ones at the location)

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(3, 0); // []
        arr;              // [0,1,2,3,4,5,6,7,8,9]

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(3, 2); // [3,4]
        arr;              // [0,1,2,5,6,7,8,9]

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(3);    // [3,4,5,6,7,8,9]
        arr;              // [0,1,2]

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(-4);   // [6,7,8,9]
        arr;              // [0,1,2,3,4,5]

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(-4, 2);// [6,7]
        arr;              // [0,1,2,3,4,5,8,9]

        var arr = [0,1,2,3,4,5,6,7,8,9];
        arr.splice(3, 2, '3', [4], null); // [3,4]
        arr;                              // [0,1,2,'3',[4],null,5,6,7,8,9]


// filter() selects some elements from an array

        var arr = [1,2,3,4,5,7,9];
        var isOdd = function (n) { return n % 2 === 1 };
        arr.filter(isOdd); // [1,3,5,7,9]
        arr;               // [1,2,3,4,5,7,9]


// every() stops once it gets one false value
// some() stops once it gets one true value
// map() and forEach() go through the whole list

        var arr1 = [1,3,5,7,9];
        var arr2 = [1,2,5,7,9];

        var isOdd  = function (n) { return n % 2 === 1 };
        var isEven = function (n) { return n % 2 === 0 };
        arr1.every(isOdd); // true
        arr2.every(isOdd); // false
        arr1.some(isEven); // false
        arr2.some(isEven); // true

        var print = function (n) { console.log(n) };
        var addTen = function (n) { return n + 10 };
        arr1.forEach(print); // 1, 3, 5, 7, and 9 are printed
        arr1.map(addTen);    // [11,13,15,17,19]


// We can also get the current index within our functions during enumeration
// since those function are actually invoked with more arguments

        var arr = ['hello', 'world', 'js'];
        arr.map(function (elm, i, ref) {
            console.log(elm, i, ref === arr);
            return i + ' ' + elm;
        });
        //
        // The following three lines are printed:
        //      hello 0 true
        //      world 1 true
        //      js 2 true
        //
        // And the array is returned:
        //      ["0 hello", "1 world", "2 js"]


// reduce() or reduceRight()

        var squareSumInit = 0;
        var squareSumReducer = function (accumulated, current) {
            return accumulated + current * current;
        };
        [1,2,3,4].reduce(squareSumReducer, squareSumInit); // 30

        var add = function (a, b) { return a + b; };
        var square = function (n) { return n * n; };
        [1,2,3,4].map(square).reduce(add, 0);              // 30


// (In-place) Sort an array

        var arr = ['b','d','a','c'];
        arr.sort();
        arr; // ['a','b','c','d']

        var nums = [2,10,4,1,3];
        nums.sort();
        nums; // [1,10,2,3,4]
        nums.sort(function(a,b){ return a-b });
        nums; // [1,2,3,4,10]


// (In-place) Reverse an array

        var arr = [3,4,5];
        arr.reverse();
        arr; // [5,4,3]


// Join array of strings into one string

        var arr = ['hello', 'JS', 'world'];
        arr.join();    // 'hello,JS,world'
        arr.join('$'); // 'hello$JS$world'
        arr.join('');  // 'helloJSworld'


// Extract a copy of subarray
//
//
//      Zero-based index vs Negative index
//
//         [ 'A', 'B', 'C', 'D', 'E' ]
//
//             0    1    2    3    4    -->
//      <--   -5   -4   -3   -2   -1
//

        var arr = [0,1,2,3,4];
        arr.slice();       // [0,1,2,3,4]
        arr.slice(0);      // [0,1,2,3,4]
        arr.slice(2);      // [2,3,4]
        arr.slice(-3);     // [2,3,4]
        arr.slice(1, 3);   // [1,2]
        arr.slice(1, -2);  // [1,2]
        arr.slice(-3, -1); // [2,3]








//
//       .d8888b.  888            d8b
//      d88P  Y88b 888            Y8P
//      Y88b.      888
//       "Y888b.   888888 888d888 888 88888b.   .d88b.
//          "Y88b. 888    888P"   888 888 "88b d88P"88b
//            "888 888    888     888 888  888 888  888
//      Y88b  d88P Y88b.  888     888 888  888 Y88b 888
//       "Y8888P"   "Y888 888     888 888  888  "Y88888
//                                                  888
//                                             Y8b d88P
//                                              "Y88P"
//



// Although a String value is primitive, the wrapper constructor `String` will
// be used automatically for "ToObject" conversion to create an anonymous
// temporary object that inherits many useful methods from `String.prototype`,
// so we can easily work with any String primitive value while having handy
// properties/methods just like we are dealing with an object.


// Get the length of a string  (similar to an array of characters)

        var str = 'Hello';
        str.length;     // 5
        'Hello'.length; // 5


// Extract a character from a string  (similar to an array of characters)

        'ABCDE'.charAt(3); // 'D'
        'ABCDE'[3];        // 'D'


// Extract a substring

        'ABCDE'.slice(2);      // 'CDE'
        'ABCDE'.slice(-3);     // 'CDE'
        'ABCDE'.slice(1, 3);   // 'BC'
        'ABCDE'.slice(1, -2);  // 'BC'
        'ABCDE'.slice(-3, -1); // 'CD'

        'ABCDE'.substr(2);     // 'CDE'
        'ABCDE'.substr(-3);    // 'CDE'
        'ABCDE'.substr(1, 2);  // 'BC'
        'ABCDE'.substr(-3, 2); // 'CD'

        'ABCDE'.substring(2);    // 'CDE'
        'ABCDE'.substring(1, 3); // 'BC'


// Get numeric Unicode value of a character

        'ABCDE'.charCodeAt(3); // 68


// From numeric Unicode value

        String.fromCharCode(68); // 'D'
        String.fromCharCode(65,66,67,68); // 'ABCD'


// Search for a substring

        'To be, or not to be'.indexOf('BE');         // -1
        'To be, or not to be'.indexOf('be');         // 3
        'To be, or not to be'.indexOf('be', 4);      // 17
        'To be, or not to be'.lastIndexOf('be');     // 17
        'To be, or not to be'.lastIndexOf('be', 16); // 3


// Find the first matched index for a RegExp

        'To be, or not to be'.search(/be/);      // 3
        'To be, or not to be'.search(/be(?!,)/); // 17


// Use RegExp to match a string

        'To be, or not to be'.match(/be/);  // ['be']
        'To be, or not to be'.match(/be/g); // ['be', 'be']
        'To be, or not to be'.match(/o./g); // ['o ', 'or', 'ot', 'o ']


// Split a string into an array

        'Apple,Berry,Cherry'.split(','); // [ 'Apple', 'Berry', 'Cherry' ]


// Concatenate multiple strings

        'Hello' + ' ' + 'world!'; // 'Hello world!'


// Transform between upper case and lower case

        'Hello'.toUpperCase(); // 'HELLO'
        'Hello'.toLowerCase(); // 'hello'


// Trim whitespaces from both ends

        '  Hello world!     '.trim(); // 'Hello world!'


// Replace a portion of a string using RegExp

        var str = 'Apples are round, and apples are juicy.';
        str.replace(/[Aa]pple/g, 'orange'); // 'oranges are round, and oranges are juicy.'