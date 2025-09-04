
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import StakeholderSelect from '@/components/ui/StakeholderSelect';
import { StakeholderType } from '@/types/auth';
import { toast } from 'sonner';
import { useRegisterUserMutation } from '@/state/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredientials } from '@/state/auth/authSlice';

const RegisterForm = () => {
  const [stakeholderType, setStakeholderType] = useState<StakeholderType | null>(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [register, { isLoading, isError }] = useRegisterUserMutation()
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const location = useLocation();

  const handleSelectStakeholder = (type: StakeholderType) => {
    setStakeholderType(type);
  };

  const getEntityNameLabel = () => {
    switch (stakeholderType) {
      case 'student': return 'Full Name';
      case 'educator': return 'Institution Name';
      case 'company': return 'Company Name';
      case 'group': return 'Group Name';
      default: return 'Full Name';
    }
  };

  const getEntityNamePlaceholder = () => {
    switch (stakeholderType) {
      case 'student': return 'Enter your full name';
      case 'educator': return 'Enter your institution name';
      case 'company': return 'Enter your company name';
      case 'group': return 'Enter your group name';
      default: return 'Enter your name';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stakeholderType) {
      toast.error('Please select your account type');
      return;
    }

    if (!fullName || !email || !password || !confirmPassword || !username) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      toast.error('You must accept the terms and conditions');
      return;
    }


    try {
      const data = {
        username,
        password,
        email,
        name: fullName,
        stakeHolderType: stakeholderType
      }
      const userData = await register(data).unwrap()
      console.log(userData)
      navigation("/login");
      toast.success('Registered successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Registered Failed! Please try again.');
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">
          Create your account to start learning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="account-type">I am a</Label>
            <StakeholderSelect
              selected={stakeholderType}
              onChange={handleSelectStakeholder}
            />
          </div>

          {stakeholderType && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName">{getEntityNameLabel()}</Label>
                <Input
                  id="fullName"
                  placeholder={getEntityNamePlaceholder()}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={'Enter your username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked as boolean);
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !stakeholderType}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
