import axios from "axios"

export const request = async (path, data, method) => {
    try {
        const option = {
            method: method,
            url: `https://identitytoolkit.googleapis.com/v1${path}`,
            headers: { 'Content-Type': 'application/json' }
        }
        if (method == 'GET') {
            option['params'] = data
        }
        else {
            option['data'] = data
        }
        const res = await axios(option)
        return res
    } catch (error) {
        // console.log("---->",error.response.data.error.message);
        return error.response
        // return error.response.data.error.message
    }
}

export const getRequest=(path,data)=> {request(path,data,'GET') }

export const postRequest=(path,data)=> {return request(path,data,'POST') }
