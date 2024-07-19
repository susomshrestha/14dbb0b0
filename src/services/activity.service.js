import axios from 'axios';

const BASE_URL = 'https://aircall-backend.onrender.com';

export const getAllActivities = async (data) => {
	return await axios.get(`${BASE_URL}/activities`);
};

export const resetActivities = async (data) => {
	return await axios.patch(`${BASE_URL}/reset`);
};

export const getActivityById = async (id) => {
	return await axios.get(`${BASE_URL}/activities/${id}`);
};

export const updateActivity = async (id, is_archived) => {
	return await axios.patch(`${BASE_URL}/activities/${id}`, {
		is_archived,
	});
};
