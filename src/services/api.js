// api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8088/bfapi/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});



export const getProjectList = async (page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get('/project-list', {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project list:', error);
        throw error;
    }
};

export const getTopStrategies = async (page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get('/top-strategies', {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top strategies:', error);
        throw error;
    }
};

export const getProjectDetail = async (projectId) => {
    try {
        const response = await apiClient.get(`/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project detail for project ID ${projectId}:`, error);
        throw error;
    }
};

export const downloadProject = async (projectId) => {
    try {
        const response = await apiClient.get(`/download/${projectId}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${projectId}.csv`);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error(`Error downloading project for project ID ${projectId}:`, error);
        throw error;
    }
};

export const getBlogs = async (page = 1, pageSize = 10) => {
    try {
        const response = await apiClient.get('/blogs', {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}