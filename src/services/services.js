import axios from 'axios';

export const Services = {
    in: async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/user/create", data)
            return response.data; 
        } catch (error) {
            console.log("errrr", error);
        }
    },
    get: () => {
        return axios.get("http://localhost:8000/user");
    },
    delete: (id) => {
        return axios.delete("http://localhost:8000/user/delete/" + id)
    },
    edit: (id,data) => {
        console.log("1111>>>",id,data);
        return axios.put("http://localhost:8000/user/update/"+ id,data);
    }
};
