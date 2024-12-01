import config from "./config";
const apiBaseUrl = config.apiBaseUrl;
export async function create(item) {
    const response = await fetch(apiBaseUrl + "/v1/api/item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(item),

    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data
}

export async function getAddressData(pincode) {


    const response = await fetch(apiBaseUrl + "/v1/api/item/" + pincode, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

    });

    if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
    }

    const data = await response.json();
    // console.log("fetch  successful:", data);
    return data

}