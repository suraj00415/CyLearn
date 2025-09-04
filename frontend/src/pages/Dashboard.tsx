import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Sipnner from '@/components/ui/Sipnner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLogoutMutation } from '@/state/auth/authApi';
import { selectCurrentUser, setLogout } from '@/state/auth/authSlice';
import { User as UserInterface } from '@/types/auth';
import { Activity, Award, BookOpen, Building, Clock, GraduationCap, LogOut, Server, Shield, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserInfo {
  name: string;
  avatarUrl: string;
  role: string;
}

const Dashboard = () => {
  const user: UserInterface = useSelector(selectCurrentUser)
  const stakeholderType = user.stakeHolderType
  const [progress, setProgress] = useState(65);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    avatarUrl: '',
    role: '',
  });
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigation = useNavigate()

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Simulate loading user info based on stakeholder type
    const getUserInfo = () => {
      switch (stakeholderType) {
        case 'student':
          return {
            name: 'Alex Johnson',
            avatarUrl: '/placeholder.svg',
            role: 'Student',
          };
        case 'educator':
          return {
            name: 'Cyber University',
            avatarUrl: '/placeholder.svg',
            role: 'Educational Institution',
          };
        case 'company':
          return {
            name: 'SecureTech Inc.',
            avatarUrl: '/placeholder.svg',
            role: 'Company',
          };
        case 'group':
          return {
            name: 'Hack Defenders',
            avatarUrl: '/placeholder.svg',
            role: 'Learning Group',
          };
        default:
          return {
            name: 'User',
            avatarUrl: '/placeholder.svg',
            role: 'User',
          };
      }
    };

    setUserInfo(getUserInfo());
  }, [stakeholderType]);

  const getStakeholderIcon = () => {
    switch (stakeholderType) {
      case 'student': return <GraduationCap className="w-8 h-8 text-primary" />;
      case 'educator': return <BookOpen className="w-8 h-8 text-primary" />;
      case 'company': return <Building className="w-8 h-8 text-primary" />;
      case 'group': return <Users className="w-8 h-8 text-primary" />;
      default: return <User className="w-8 h-8 text-primary" />;
    }
  };

  const getRecommendedLabs = () => {
    // Different lab recommendations based on stakeholder type
    switch (stakeholderType) {
      case 'student':
        return [
          { id: '1', title: 'Network Basics', difficulty: 'Beginner', duration: '1 hour', category: 'Networking' },
          { id: '2', title: 'Introduction to Cryptography', difficulty: 'Beginner', duration: '2 hours', category: 'Cryptography' },
          { id: '3', title: 'Web Application Security', difficulty: 'Intermediate', duration: '3 hours', category: 'Web Security' },
        ];
      case 'educator':
        return [
          { id: '1', title: 'Classroom Network Security Setup', difficulty: 'Intermediate', duration: '2 hours', category: 'Education' },
          { id: '2', title: 'Teaching Encryption Concepts', difficulty: 'Intermediate', duration: '3 hours', category: 'Education' },
          { id: '3', title: 'Student Progress Analytics', difficulty: 'Advanced', duration: '1 hour', category: 'Analytics' },
        ];
      case 'company':
        return [
          { id: '1', title: 'Enterprise Network Security', difficulty: 'Advanced', duration: '4 hours', category: 'Enterprise' },
          { id: '2', title: 'Employee Security Training', difficulty: 'Intermediate', duration: '2 hours', category: 'Training' },
          { id: '3', title: 'Incident Response Planning', difficulty: 'Advanced', duration: '3 hours', category: 'Incident Response' },
        ];
      case 'group':
        return [
          { id: '1', title: 'Collaborative CTF Challenges', difficulty: 'Varied', duration: '4 hours', category: 'Teamwork' },
          { id: '2', title: 'Group Penetration Testing', difficulty: 'Advanced', duration: '5 hours', category: 'Pen Testing' },
          { id: '3', title: 'Security Research Methodology', difficulty: 'Intermediate', duration: '3 hours', category: 'Research' },
        ];
      default:
        return [
          { id: '1', title: 'Introduction to Cybersecurity', difficulty: 'Beginner', duration: '1 hour', category: 'Basics' },
          { id: '2', title: 'Common Security Threats', difficulty: 'Beginner', duration: '2 hours', category: 'Threats' },
          { id: '3', title: 'Basic Security Tools', difficulty: 'Beginner', duration: '2 hours', category: 'Tools' },
        ];
    }
  };

  const handleLogout = async () => {
    const logoutResponse = await logout(null).unwrap()
    console.log(logoutResponse)

  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(setLogout())
      navigation('/login')
      toast.success('Successfully logged out');
    }
    if (isError) {
      toast.error('Error logging out');
    }
  }, [isSuccess, isError])

  // Create path variables for navigation based on stakeholder type
  const continueUrl = stakeholderType === 'student' ? '/labs' :
    stakeholderType === 'educator' ? '/manage-labs' :
      stakeholderType === 'company' ? '/team-dashboard' :
        '/group-labs';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Navigation */}
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-xl text-gradient">CyberLabs</Link>
            <span className="text-sm px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {userInfo.role}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
              {isLoading && <Sipnner />}
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium hidden md:inline-block">{user.name}</span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {getStakeholderIcon()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 glass-card overflow-hidden border-0 bg-background/50">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center flex-wrap gap-4 sm:gap-6">
              <div className="p-3 rounded-full bg-primary/10">
                {getStakeholderIcon()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                <p className="text-muted-foreground">
                  {stakeholderType === 'student' && "Continue your cybersecurity learning journey"}
                  {stakeholderType === 'educator' && "Manage your cybersecurity curriculum"}
                  {stakeholderType === 'company' && "Enhance your team's security skills"}
                  {stakeholderType === 'group' && "Lead your group to cybersecurity mastery"}
                </p>
              </div>
              <div className="ml-auto">
                <Button asChild>
                  <Link to={continueUrl}>
                    {stakeholderType === 'student' && "Continue Learning"}
                    {stakeholderType === 'educator' && "Manage Labs"}
                    {stakeholderType === 'company' && "Team Dashboard"}
                    {stakeholderType === 'group' && "Group Labs"}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Overview Stats */}
          <div className="space-y-8">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  {stakeholderType === 'student' && "Your learning progress"}
                  {stakeholderType === 'educator' && "Course development progress"}
                  {stakeholderType === 'company' && "Team training progress"}
                  {stakeholderType === 'group' && "Group completion rate"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 " color={progress > 30 ? progress > 70 ? 'bg-blue-500' : 'bg-brand-500' : 'bg-red-500'} />

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Labs Completed</span>
                      <span>12 of 20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {stakeholderType === 'student' && "Certificates Earned"}
                        {stakeholderType === 'educator' && "Courses Published"}
                        {stakeholderType === 'company' && "Teams Trained"}
                        {stakeholderType === 'group' && "Group Achievements"}
                      </span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Points Earned</span>
                      <span>1,250</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">4.5 hrs</span>
                    <span className="text-xs text-muted-foreground">This Week</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">3</span>
                    <span className="text-xs text-muted-foreground">Achievements</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Middle and Right Columns Combined - Tabs Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="recommended">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="space-y-6">
                <h3 className="text-lg font-medium">Recommended Labs</h3>
                {getRecommendedLabs().map((lab) => (
                  <Card key={lab.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="block p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">{lab.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <Shield className="h-3.5 w-3.5 mr-1" />
                                {lab.difficulty}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {lab.duration}
                              </span>
                              <span className="flex items-center">
                                <Server className="h-3.5 w-3.5 mr-1" />
                                {lab.category}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/labs/${lab.id}`}>Start</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/labs">View All Labs</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="inprogress" className="space-y-6">
                <h3 className="text-lg font-medium">In Progress Labs</h3>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="block p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground">Advanced Network Security</h4>
                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <span className="flex items-center">
                              <Shield className="h-3.5 w-3.5 mr-1" />
                              Advanced
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              3 hours
                            </span>
                          </div>
                          <div className="w-full mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-1.5" />
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/labs/100">Continue</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground pb-2">You have 1 lab in progress</p>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <h3 className="text-lg font-medium">Completed Labs</h3>
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="block p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">
                              {i === 1 ? "Introduction to Firewalls" : "Basic Encryption Techniques"}
                            </h4>
                            <div className="flex items-center text-sm text-muted-foreground space-x-4">
                              <span className="flex items-center">
                                <Shield className="h-3.5 w-3.5 mr-1" />
                                Beginner
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                1 hour
                              </span>
                              <span className="text-primary font-medium">Completed</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/labs/${i + 200}`}>Review</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/completed-labs">View All Completed Labs</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
