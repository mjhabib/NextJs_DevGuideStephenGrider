// bash commands
// tsc -v  == ts version
// tsc == to run any ts files it finds in the root folder
// tsc filename.ts == run the file
// tsc --watch == to report any changes during development
// tsc --init == create a tsconfig.json file

// Basic Types
let id: number = 6;
let company: string = "Traversy Media";
let isPublished: boolean = true;
let x: any = "Hello";

let ids: number[] = [1, 2, 3, 4, 5];
let arr: any[] = [1, true, "Hello"];

// Tuple
let person: [number, string, boolean] = [1, "Brad", true];
// Tuple Array
let employees: [number, string][];

employees = [
  [1, "Brad"],
  [2, "John"],
  [3, "Jill"],
];

// Union
let pid: string | number;
pid = "22";

// Enum
enum Direction1 {
  Up = 1,
  Down,
  Left,
  Right,
}

enum Direction2 {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

// Objects
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: "John",
};

// Type Assertion
let cid: any = 1;
// let customerId = <number>cid
let customerId = cid as number;

// Functions
function addNum(x: number, y: number): number {
  return x + y;
}

// Void
function log(message: string | number): void {
  console.log(message);
}
// The void type represents a function's return type when it doesn't return any data

// Interfaces
interface UserInterface {
  readonly id: number;
  name: string;
  age?: number;
}
// interfaces are only for 'objects' to make sure we're not violating the object's structure (compare to types)
// 'readonly' means we can't change its value
// '?' means it's optional so we don't get an error

const user1: UserInterface = {
  id: 1,
  name: "John",
};

// using interface with a function
interface MathFunc {
  (x: number, y: number): number;
}
// as long as we're not violating the function's structure we're good to go
const add: MathFunc = (x: number, y: number): number => x + y;
const sub: MathFunc = (x: number, y: number): number => x - y;

interface PersonInterface {
  id: number;
  name: string;
  register(): string;
}

// Classes
class Person implements PersonInterface {
  id: number;
  name: string;
  // the 'id' and 'name' here are public but if we label them as private/protected (ex: private id) we get an error outside of this class since we are only able to access them inside this class or extended classes from this class.

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  register() {
    return `${this.name} is now registered`;
  }
}

const brad = new Person(1, "Brad Traversy");
const mike = new Person(2, "Mike Jordan");

// Subclasses
class Employee extends Person {
  position: string;

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this.position = position;
  }
}

const emp = new Employee(3, "Shawn", "Developer");

// Generics
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items);
}

let numArray = getArray<number>([1, 2, 3, 4]);
let strArray = getArray<string>(["brad", "John", "Jill"]);

// strArray.push(1) // Throws error
