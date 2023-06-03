import axios from 'axios';

export const Services = {
    in: async (data) => {
        try {
            const response = await axios.post("http://nodecard-production-f98e.up.railway.app/user/create", data)
            return response.data; 
        } catch (error) {
            console.log("errrr", error);
        }
    },
    get: () => {
        return axios.get("http://nodecard-production-f98e.up.railway.app/user");
    },
    delete: (id) => {
        return axios.delete("http://nodecard-production-f98e.up.railway.app/user/delete/" + id)
    },
    edit: (id,data) => {
        console.log("1111>>>",id,data);
        return axios.put("http://nodecard-production-f98e.up.railway.app/user/update/"+ id,data);
    }
};
