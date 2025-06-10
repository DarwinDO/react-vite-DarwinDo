import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)

}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)

}

const deleteUserAPI = (_id) => {
    // Note: In a DELETE request, the data is usually sent in the body, but some APIs may require it in the URL.
    // Here, we are sending the _id in the body as per your original code.
    // If your API requires the _id in the URL, you can modify the URL accordingly.
    // For example: const URL_BACKEND = `/api/v1/user/${_id}`;
    const URL_BACKEND = `/api/v1/user/${_id}`
    return axios.delete(URL_BACKEND)

}

const fetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND)
}

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI };