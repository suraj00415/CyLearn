
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { fetchLabById } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LabMachine from '@/components/labs/LabMachine';
import { toast } from 'sonner';
import { Lab } from '@/types/lab';

const StartLab = () => {
  const { labId } = useParams();
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [objectives, setObjectives] = useState([
    { id: 1, title: 'Access the target machine', completed: false },
    { id: 2, title: 'Identify vulnerabilities', completed: false },
    { id: 3, title: 'Exploit web application', completed: false },
    { id: 4, title: 'Retrieve the flag', completed: false }
  ]);
  const [activeTab, setActiveTab] = useState('lab');

  // Fetch lab details
  // const { data: lab, isLoading, error } = useQuery({
  //   queryKey: ['lab', labId],
  //   queryFn: () => fetchLabById(labId as string),
  // });

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format elapsed time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Complete an objective
  const completeObjective = (id: number) => {
    setObjectives(prev =>
      prev.map(obj =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );

    toast.success('Objective completed!');
  };

  // Calculate progress
  const progress = Math.round((objectives.filter(obj => obj.completed).length / objectives.length) * 100);

  // If we failed to load the lab data, let's use a fallback
  // useEffect(() => {
  //   if (error) {
  //     console.error('Error loading lab:', error);
  //     toast.error('Could not load lab data. Using fallback data.');
  //   }
  // }, [error]);

  // If the labId is not valid or we can't fetch it, use fallback data
  const labData = {
    _id: labId || "1",
    title: "Cybersecurity Training Lab",
    description: "Hands-on practice with cybersecurity concepts",
    difficulty: "medium" as const,
    category: "Web Security",
    estimatedTime: "2 hours",
    attackMachineUrl: "https://example.com/attack-vm/1",
    targetMachineUrl: "https://example.com/target-vm/1"
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col min-h-screen">
  //       <Navbar />
  //       <div className="flex-1 flex items-center justify-center">
  //         <div className="text-center">
  //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
  //           <p className="text-muted-foreground">Loading lab...</p>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 px-4 md:px-6 bg-muted/30 mt-20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/labs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Labs
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">{labData.title}</h1>
              <Badge variant={
                labData.difficulty === 'easy' ? 'default' :
                  labData.difficulty === 'medium' ? 'secondary' : 'destructive'
              }>
                {labData.difficulty.charAt(0).toUpperCase() + labData.difficulty.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="lab">Lab</TabsTrigger>
                  <TabsTrigger value="guide">Guide</TabsTrigger>
                  <TabsTrigger value="hints">Hints</TabsTrigger>
                </TabsList>
                <TabsContent value="lab" className="mt-4">
                  <LabMachine
                    labId={Number(labId)}
                    isAttackerMachine isTargetMachine
                  />
                </TabsContent>
                <TabsContent value="guide" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lab Guide</CardTitle>
                      <CardDescription>Follow these steps to complete the lab</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>In this lab, you will learn how to identify and exploit vulnerabilities in a web application. Your goal is to penetrate the target system and retrieve the flag.</p>

                      <div className="space-y-2">
                        <h3 className="font-semibold">Getting Started</h3>
                        <p>Begin by exploring the target machine and identifying potential vulnerabilities.</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">Main Tasks</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Scan for open ports and services</li>
                          <li>Discover web application vulnerabilities</li>
                          <li>Exploit identified vulnerabilities</li>
                          <li>Obtain unauthorized access</li>
                          <li>Retrieve the flag file</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="hints" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hints</CardTitle>
                      <CardDescription>Use only if you're stuck</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">Hint 1</h3>
                        <p>Check for common web vulnerabilities like SQL injection and XSS.</p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-semibold">Hint 2</h3>
                        <p>Try default credentials on the login page.</p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-semibold">Hint 3</h3>
                        <p>The flag is located in the /root directory.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lab Progress</CardTitle>
                  <CardDescription>
                    {progress}% completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2 mb-4" />

                  <div className="space-y-4">
                    {objectives.map((objective) => (
                      <div
                        key={objective.id}
                        className="flex items-start justify-between gap-2 group"
                      >
                        <div className="flex items-start gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 mt-0.5"
                            onClick={() => completeObjective(objective.id)}
                          >
                            {objective.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                            )}
                          </Button>
                          <span className={objective.completed ? "line-through text-muted-foreground" : ""}>
                            {objective.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={progress < 100}
                    onClick={() => {
                      if (progress === 100) {
                        toast.success("Congratulations! You've completed the lab!");
                        navigate(`/labs/${labId}`);
                      } else {
                        toast.error("Complete all objectives to finish the lab");
                      }
                    }}
                  >
                    {progress === 100 ? "Complete Lab" : "Complete All Objectives"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartLab;
