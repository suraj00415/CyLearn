
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StakeholderSelect from '@/components/ui/StakeholderSelect';
import { StakeholderType } from '@/types/auth';
import { toast } from 'sonner';
import { useLoginMutation } from '@/state/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredientials } from '@/state/auth/authSlice';
import Sipnner from '../ui/Sipnner';

const LoginForm = () => {
  const [stakeholderType, setStakeholderType] = useState<StakeholderType | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const location = useLocation();

  const handleSelectStakeholder = (type: StakeholderType) => {
    setStakeholderType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stakeholderType) {
      toast.error('Please select your account type');
      return;
    }

    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const data = {
        username,
        password,
      }
      const userData = await login(data).unwrap()
      dispatch(setCredientials(userData))
      console.log(userData)
      console.log("RedirectPath:", location.state?.from?.pathname)
      const redirectPath = location.state?.from?.pathname || `/dashboard/${stakeholderType}`;
      console.log("RedirectPath2:", redirectPath)
      navigation(redirectPath, { replace: true });
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const getDashboardLink = () => {
    const demoAccounts = {
      student: { username: 'student@example.com', password: 'password' },
      educator: { username: 'educator@example.com', password: 'password' },
      company: { username: 'company@example.com', password: 'password' },
      group: { username: 'group@example.com', password: 'password' },
    };

    return stakeholderType ? demoAccounts[stakeholderType] : null;
  };

  const demoAccount = getDashboardLink();

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue learning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="account-type">Account Type</Label>
            <StakeholderSelect
              selected={stakeholderType}
              onChange={handleSelectStakeholder}
            />
          </div>

          {stakeholderType && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
        </div>

        {stakeholderType && demoAccount && (
          <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border">
            <p className="font-medium text-foreground mb-1">Demo Account</p>
            <p>username: {demoAccount.username}</p>
            <p>Password: {demoAccount.password}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !stakeholderType}
        >
          {isLoading ? <Sipnner /> : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
