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

//4.



