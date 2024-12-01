import config from "./config";
const apiBaseUrl = config.apiBaseUrl;
export async function login(user) {
    const response = await fetch(apiBaseUrl + "/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data
}

export async function createUser(user) {
    const response = await fetch(apiBaseUrl + "/v1/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data
}

export async function getAddressData(pincode) {
    fetch("http://www.postalpincode.in/api/pincode/535183", { mode: "no-cors" })
        .then((response) => console.log(response)) // Response will not have usable data
        .catch((error) => console.error(error));

}