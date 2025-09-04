
export interface Lab {
  _id: string;
  id?: number; // For backward compatibility with the frontend
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: string;
  completionRate: number;
  participants: number;
  learningObjectives?: string[];
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  attackMachineUrl?: string;
  targetMachineUrl?: string;
  leaderboard?: LeaderboardEntry[];
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface LeaderboardEntry {
  _id?: string;
  userId: string;
  username: string;
  completionTime: number;
  score: number;
  date: Date;
  labId?: string;
  labTitle?: string;
}

export interface Technique {
  title: string;
  steps: string[];
  commands: string[];
}

export interface LabNew {
  id: number;
  title: string;
  description: string;
  keyConcepts: string[];
  accessInfo: {
    username?: string;
    password?: string;
    [key: string]: any;
  };
  techniques: Technique[];
  bonusTip: string;
  footerNote: string;
  difficulty: string;
  category: string;
  estimatedTime: string;
  completionRate: number;
  participants: number;
  attackMachineUrl: string;
  targetMachineUrl: string;
}