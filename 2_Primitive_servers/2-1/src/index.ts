// 1. 
function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}


// 2. 
function getUserNamings(a: {name: string, surname: string}) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3.
function getAllProductNames(a: {products : {name: string}[]}) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1
function hey(a: {name: () => string, [a: string]: unknown} ) {
    return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 })
hey({ name: () => "vasya", coolness: 100 })

// 4.2
abstract class Pet {
    petName : string;
    constructor(name: string) {
        this.petName = name;
    }

    name(): string {
        return this.petName;
    }
}

class Cat extends Pet {
    cute: boolean;
    constructor(name: string, cute: boolean) {
        super(name);
        this.cute = cute;
    }
}

class Dog extends Pet {
    funny: number;
    constructor(name: string, funny: number) {
        super(name);
        this.funny = funny;
    }
}

function heyPet(abstractPet: Pet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat ("myavchik", true)
let b = new Dog("gavchik", 333)
heyPet(a)
heyPet(b)

// 4.3
interface HomePet {
    name: () => string;
    type: "cat" | "dog";
    cuteness?: number;
    coolness?: number;
}
function heyHomePet(a: HomePet) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness))
}
heyHomePet({ name: () => "roma", type: "cat", cuteness: 100 })
heyHomePet({ name: () => "vasya", type: "dog", coolness: 100 })

// 5.
function stringEntries(a: {[key: string]: string[]}) {
    return Array.isArray(a) ? a : Object.keys(a)
}

// 6.
async function world(a: number): Promise<string> {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))
