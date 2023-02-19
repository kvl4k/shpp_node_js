const IPIFY_URL: string = "https://api.ipify.org/?format=json";
const RANDOM_NAME_URL: string = "https://random-data-api.com/api/name/random_name";
const RANDOM_USER_URL: string ="https://random-data-api.com/api/users/random_user";

// 1 & 2 part.
async function getIp(address: string): Promise<string> {
        const response: Response = await fetch(address);
        const { ip } = await response.json();
        return ip;
}

getIp(IPIFY_URL).then((ip) => console.log("ip:", ip + "\n"));

// 3 part.
// 3.1
async function getNames(address: string): Promise<Promise<string>[]> {
        const names = Promise.all([
                //TODO забрати повторення
                await (await fetch(address)).json(),
                await (await fetch(address)).json(),
                await (await fetch(address)).json()
        ])
                .then((n) => n.map((current) => current.name));
        return names;
}

getNames(RANDOM_NAME_URL)
        .then((names) => console.log("Random names with async/await + Promise.all:", names + "\n"));

//3.2
async function getNames1(address: string): Promise<Promise<string>[]> {
        let names: Promise<string>[] = [];
        for (let i = 0; i < 3; i++) {
                names.push(
                        await (await fetch(address))
                                .json()
                                .then((currName) => currName.name)
                )
        }
        return names;
}

getNames1(RANDOM_NAME_URL)
        .then((names) => console.log("Random names with async/await:", names + "\n"));

//3.3
const getNames2 = new Promise((resolve) => {
        const names: Promise<string>[] = [];

        fetch(RANDOM_NAME_URL).then((res) => res.json())
                .then((res) => {
                        names.push(res.name)
                        fetch(RANDOM_NAME_URL).then((res) => res.json())
                                .then((res) => {
                                        names.push(res.name)
                                        fetch(RANDOM_NAME_URL).then((res) => res.json())
                                                .then((res) => {
                                                        names.push(res.name)
                                                        resolve(names);
                                                })
                                })
                })
})

getNames2.then((names) => console.log("Random names without async/await + Promise.all: " + names + "\n"));

//4 part
//4.1
function getFemaleUser(address: string): Promise<string> {
        return fetch(address)
                .then((res) => res.json())
                .then((user) => user.gender === "Female" ? user : getFemaleUser(address))
}
getFemaleUser(RANDOM_USER_URL);

//4.2
async function getFemaleUser1(address: string): Promise<string> {
        let currGender: string = "";
        let currUser: Promise<any>;
        do {
                const response: Response = await fetch(address);
                const user = await response.json();
                currGender = user.gender;
                currUser = user;
        } while (currGender !== "Female")
        return currUser;
}
getFemaleUser1(RANDOM_USER_URL);

// 5part
function firstFunc(callback: (ip: string) => void): void {
        fetch(IPIFY_URL)
                .then((res) => res.json())
                .then((res) => callback(res.ip))
}
async function secondFunc() {
        firstFunc((ip) => console.log(ip));
}
secondFunc();

// 6 part
async function firstPart(): Promise<string> {
        const response: Response = await fetch(IPIFY_URL);
        const { ip } = await response.json();
        return ip;
}

async function secondPart(callback: (ip: string) => void) {
        await firstPart()
                .then((ip) => callback(ip));
}

secondPart((func) => console.log(func));
