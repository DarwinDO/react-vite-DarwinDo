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

const handleUploadFiles = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload";
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData;
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)

}

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI, handleUploadFiles, updateUserAvatarAPI };