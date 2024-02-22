# [ Programming Fundamentals ]()

Programming fundamentals form the cornerstone of computer programming, providing the essential building blocks for writing code. These foundational concepts are universal across programming languages and are crucial for anyone entering the world of software development.

## [Introduction](#Introduction)

> Computer programming (often shortened to programming) is a process that leads from an original formulation of a computing problem to executable computer programs. Programming involves activities such as analysis; developing understanding; generating algorithms; verifying the requirements of algorithms, including their correctness and resources consumption; and implementation (commonly referred to as coding) of algorithms in a target programming language.

### Table of Contents

-  **[Variable Declaration]()**
-  **[Basic Syntax]()**

## [1. Variable Declaration](#1-variable-declaration)

Variables are containers for storing data values, a memory location for a data type. Variables are created using a declaration or keyword that varies across languages.

Variable names are usually alphanumeric, that is, they contain a-z and 0-9. They can also include special characters like underscore or the dollar sign.

Variables can hold values of any data type supported by the programming language. This value may change during program execution.

**Some variable types across several programming languages are:**

-  **[Constant variable :- ](#constant-variable)** You can use constant variables to store data whose value doesn't change throughout the program.

-  **[ Global variable :- ](#global-variable)** You can declare global variables outside a function. These variables are accessible throughout the program.
-  **[Class variable :- ](#class-variable)** You can access class variables within a specified class. These variables are accessible by specifying their class names.
-  **[Instance variable :- ](#instance-variable)** You can declare instance variables inside a class but outside a method. These variables are accessible throughout the class in which you've declared them.
-  **[Local variable :- ](#locla-variable)** You can declare local variables in classes, methods, or instances. You can access these variables only within the specified class or method.

> Examples:

Here are examples of variable declarations in five different programming languages:

### 1. **Python:**

```python
# Variable declaration in Python
age = 25
name = "John"
is_student = True
```

### 2. **JavaScript:**

```javascript
// Variable declaration in JavaScript
let age = 25;
let name = "John";
let isStudent = true;
```

### 3. **Java:**

```java
// Variable declaration in Java
int age = 25;
String name = "John";
boolean isStudent = true;
```

### 4. **C++:**

```cpp
// Variable declaration in C++
int age = 25;
std::string name = "John";
bool isStudent = true;
```

### 5. **Ruby:**

```ruby
# Variable declaration in Ruby
age = 25
name = "John"
is_student = true
```

These examples showcase variable declarations in Python, JavaScript, Java, C++, and Ruby. Note that each language may have different syntax and conventions for declaring variables, but the fundamental concept remains consistent across these examples.

## [2. Basic Syntax ](#2-basic-syntax)

Every programming language has its syntax, and you must learn the fundamental syntax of the language you are learning.

Syntax refers to the set of rules that define the structure of a language. It is almost impossible to read or understand a programming language without its syntax.

For example, let us declare a variable named greet and assign the value “Hello World” to it:

> Examples:

### 1. **Python:**

```python
greet = "Hello World";
```

### 2. **JavaScript:**

```javascript
let greet = "Hello World";
```

### 3. **Java:**

```java
String greet = "Hello World";
```

### 4. **C++:**

```cpp
#include <iostream>
using namespace std;

int main() {
  // your code goes here
  string greet;
  greet = "Hello World";
  cout << greet;
  return 0;
}
```

## [3. Data type and structures](#3-data-type-and-structures)

In programming, data types define the type of data that a variable can hold. Different programming languages support various data types, but some common ones include:

### Integer

-  **Definition:** Represents whole numbers without any fractional part.
-  **Examples:** 1, 100, -5, etc.
-  **Usage:**
   -  **C/C++:** `int num = 5;`
   -  **Java:** `int num = 5;`
   -  **Python:** `num = 5`
   -  **JavaScript:** `let num = 5;`

### Float (Floating-point number)

-  **Definition:** Represents real numbers with a fractional part.
-  **Examples:** 3.14, -0.001, 2.71828, etc.
-  **Usage:**
   -  **C/C++:** `float num = 3.14;`
   -  **Java:** `float num = 3.14;`
   -  **Python:** `num = 3.14`
   -  **JavaScript:** `let num = 3.14;`

### Double

-  **Definition:** Similar to float but with double precision. It can hold larger numbers with more decimal places.
-  **Usage:**
   -  **C/C++:** `double num = 3.14159265359;`
   -  **Java:** `double num = 3.14159265359;`
   -  **Python:** `num = 3.14159265359`
   -  **JavaScript:** Not explicitly specified; the language uses the `number` type for floating-point numbers.

### Boolean

-  **Definition:** Represents a binary value, either true or false.
-  **Usage:**
   -  **C/C++:** `bool flag = true;`
   -  **Java:** `boolean flag = true;`
   -  **Python:** `flag = True`
   -  **JavaScript:** `let flag = true;`

### Character (char)

-  **Definition:** Represents a single character.
-  **Examples:** 'a', 'Z', '@', etc.
-  **Usage:**
   -  **C/C++:** `char ch = 'A';`
   -  **Java:** `char ch = 'A';`
   -  **Python:** `ch = 'A'`
   -  **JavaScript:** `let ch = 'A';`

### String

-  **Definition:** Represents a sequence of characters.
-  **Examples:** "hello", "world", "123", etc.
-  **Usage:**
   -  **C/C++:** `std::string str = "Hello";`
   -  **Java:** `String str = "Hello";`
   -  **Python:** `str = "Hello"`
   -  **JavaScript:** `let str = "Hello";`

### Array

-  **Definition:** Represents a collection of elements of the same data type stored in contiguous memory locations.
-  **Usage:**
   -  **C/C++:** `int arr[5] = {1, 2, 3, 4, 5};`
   -  **Java:** `int[] arr = {1, 2, 3, 4, 5};`
   -  **Python:** `arr = [1, 2, 3, 4, 5]`
   -  **JavaScript:** `let arr = [1, 2, 3, 4, 5];`

### Struct/Record

-  **Definition:** Represents a collection of different data types grouped together under one name.
-  **Usage:**
   -  **C/C++:** `struct Person { char name[50]; int age; };`
   -  **Java:** `class Person { String name; int age; }`
   -  **Python:** `class Person: def __init__(self, name, age): self.name = name self.age = age`
   -  **JavaScript:** Often achieved using objects.

### Pointer

-  **Definition:** Stores the memory address of another variable.
-  **Usage:**
   -  **C/C++:** `int* ptr = &num;`
   -  **Java:** No explicit pointers, but references can be used.
   -  **Python:** No explicit pointers.
   -  **JavaScript:** No explicit pointers.

### Enumeration (enum)

-  **Definition:** Represents a set of named integer constants.
-  **Usage:**
   -  **C/C++:** `enum Days { MON, TUE, WED, THU, FRI, SAT, SUN };`
   -  **Java:** `enum Days { MON, TUE, WED, THU, FRI, SAT, SUN };`
   -  **Python:** No direct equivalent, but you can use constants or a class.
   -  **JavaScript:** No direct equivalent.

### Void

-  **Definition:** Represents the absence of a data type or as a placeholder for a function that returns nothing.
-  **Usage:**
   -  **C/C++:** `void function() { /* do something */ }`
   -  **Java:** `void function() { /* do something */ }`
   -  **Python:** No explicit `void`.
   -  **JavaScript:** `function myFunction() { /* no return */ }`

### User defined types

-  **Definition :** Some programming languages allow developers to create their own custom data types.
-  **Usage:**
   -  **C/C++:** `/* do something */ `
   -  **Java:** `/* do something */ `
   -  **Python:** `/* do something */ `.
   -  **JavaScript:** `/* do something */ `

These are just some of the common data types found in programming languages, and different languages may have additional or specialized data types tailored to their specific needs. Understanding data types is crucial for writing efficient and bug-free code.

<!-- Variable declaration
Basic syntax
Data type and structures
Flow control structures (Conditionals and loops)
Functional programming
Object-oriented programming
Debugging
IDEs and coding environments -->
