
import axios from 'axios';
import { Lab, LeaderboardEntry } from '@/types/lab';

// API base URL - adjust based on your environment
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLabs = async (): Promise<Lab[]> => {
  try {
    const response = await api.get('/labs');
    return response.data;
  } catch (error) {
    console.error('Error fetching labs:', error);
    throw error;
  }
};

export const fetchLabById = async (id: string): Promise<Lab> => {
  try { 
    // Check for invalid ID
    if (!id || id === ':labId') {
      throw new Error('Invalid lab ID');
    }
    
    const response = await api.get(`/labs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lab with ID ${id}:`, error);
    throw error;
  }
};

export const startLab = async (labId: string): Promise<Lab> => {
  try {
    // In a real app, this would be an API call
    // const response = await api.post(`/labs/${labId}/start`);
    // return response.data;
    
    // For now, simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 800));
    return { status: 'in_progress' } as Lab;
  } catch (error) {
    console.error(`Error starting lab ${labId}:`, error);
    throw error;
  }
};

// Mock leaderboard data generator (to be replaced with actual API call)
export const fetchLabLeaderboard = async (labId: string): Promise<LeaderboardEntry[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await api.get(`/labs/${labId}/leaderboard`);
    // return response.data;
    
    // For now, return mock data
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        userId: "user1",
        username: "Alice Cooper",
        completionTime: 720000, // 12 minutes in ms
        score: 95,
        date: new Date(Date.now() - 86400000 * 2) // 2 days ago
      },
      {
        userId: "user2",
        username: "Bob Smith",
        completionTime: 840000, // 14 minutes in ms
        score: 90,
        date: new Date(Date.now() - 86400000 * 3) // 3 days ago
      },
      {
        userId: "user3",
        username: "Charlie Davis",
        completionTime: 900000, // 15 minutes in ms
        score: 88,
        date: new Date(Date.now() - 86400000 * 1) // 1 day ago
      },
      {
        userId: "user4",
        username: "Diana Evans",
        completionTime: 1020000, // 17 minutes in ms
        score: 82,
        date: new Date(Date.now() - 86400000 * 4) // 4 days ago
      },
      {
        userId: "user5",
        username: "Ethan Williams",
        completionTime: 780000, // 13 minutes in ms
        score: 80,
        date: new Date(Date.now() - 86400000 * 5) // 5 days ago
      }
    ];

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockLeaderboard;
  } catch (error) {
    console.error(`Error fetching leaderboard for lab ${labId}:`, error);
    throw error;
  }
};

export const fetchGlobalLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await api.get('/leaderboard/global');
    // return response.data;
    
    // For now, return mock data
    const mockGlobalLeaderboard: LeaderboardEntry[] = [
      {
        userId: "user1",
        username: "Alice Cooper",
        completionTime: 720000,
        score: 95,
        date: new Date(Date.now() - 86400000 * 2),
        labId: "1",
        labTitle: "Introduction to Network Security"
      },
      {
        userId: "user2",
        username: "Bob Smith",
        completionTime: 840000,
        score: 90,
        date: new Date(Date.now() - 86400000 * 3),
        labId: "2",
        labTitle: "Web Application Penetration Testing"
      },
      {
        userId: "user3",
        username: "Charlie Davis",
        completionTime: 900000,
        score: 88,
        date: new Date(Date.now() - 86400000 * 1),
        labId: "3",
        labTitle: "Cryptography Fundamentals"
      },
      {
        userId: "user6",
        username: "Frank Johnson",
        completionTime: 960000,
        score: 85,
        date: new Date(Date.now() - 86400000 * 6),
        labId: "1",
        labTitle: "Introduction to Network Security"
      },
      {
        userId: "user7",
        username: "Grace Lee",
        completionTime: 1050000,
        score: 82,
        date: new Date(Date.now() - 86400000 * 7),
        labId: "4",
        labTitle: "Advanced Malware Analysis"
      },
      {
        userId: "user8",
        username: "Henry Wilson",
        completionTime: 930000,
        score: 87,
        date: new Date(Date.now() - 86400000 * 8),
        labId: "5",
        labTitle: "IoT Security Challenges"
      },
      {
        userId: "user9",
        username: "Ivy Chen",
        completionTime: 810000,
        score: 92,
        date: new Date(Date.now() - 86400000 * 9),
        labId: "6",
        labTitle: "Cloud Security Architecture"
      },
      {
        userId: "user10",
        username: "Jack Brown",
        completionTime: 870000,
        score: 89,
        date: new Date(Date.now() - 86400000 * 10),
        labId: "2",
        labTitle: "Web Application Penetration Testing"
      },
      {
        userId: "user4",
        username: "Diana Evans",
        completionTime: 1020000,
        score: 82,
        date: new Date(Date.now() - 86400000 * 4),
        labId: "5",
        labTitle: "IoT Security Challenges"
      },
      {
        userId: "user5",
        username: "Ethan Williams",
        completionTime: 780000,
        score: 80,
        date: new Date(Date.now() - 86400000 * 5),
        labId: "3",
        labTitle: "Cryptography Fundamentals"
      }
    ];

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return mockGlobalLeaderboard;
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
    throw error;
  }
};

export default api;
