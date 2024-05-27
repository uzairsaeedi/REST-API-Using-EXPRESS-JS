import axios from 'axios';

const usersUrl = 'http://localhost:8081';

export const getUsers = async (id) => {
    id = id || '';
    try {
        return await axios.get(`${usersUrl}/${id}`);
    } catch (error) {
        console.error('There was an error fetching the users!', error);
        throw error;
    }
}

export const addUser = async (user) => {
    try {
        return await axios.post(`${usersUrl}/add`, user);
    } catch (error) {
        console.error('There was an error adding the user!', error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${usersUrl}/${id}`);
    } catch (error) {
        console.error('There was an error deleting the user!', error);
        throw error;
    }
}

export const editUser = async (id, user) => {
    try {
        return await axios.put(`${usersUrl}/${id}`, user);
    } catch (error) {
        console.error('There was an error editing the user!', error);
        throw error;
    }
}
