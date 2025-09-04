
export type StakeholderType = 'student' | 'educator' | 'company' | 'group';

export interface Stakeholder {
  id: string;
  type: StakeholderType;
  name: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isVerified: boolean;
  refreshToken: string;
  stakeHolderType: StakeholderType;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
