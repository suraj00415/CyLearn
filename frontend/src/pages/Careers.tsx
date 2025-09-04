
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Clock, Briefcase, ArrowRight, Building, Users, Shield, Code, Rocket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  department: string;
  description: string;
  requirements: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Cybersecurity Engineer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Security',
    description: 'We are looking for a Senior Cybersecurity Engineer to help design and implement security solutions for our platform.',
    requirements: [
      '5+ years of experience in cybersecurity or related field',
      'Strong knowledge of network security, encryption, and security protocols',
      'Experience with security assessment tools and techniques',
      'Ability to develop and implement security policies and procedures',
      'Certifications such as CISSP, CEH, or OSCP are a plus'
    ]
  },
  {
    id: '2',
    title: 'Security Content Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Education',
    description: 'Create engaging and technical cybersecurity lab content for our educational platform.',
    requirements: [
      'Strong technical writing skills with attention to detail',
      'Experience in cybersecurity or related field',
      'Ability to break down complex concepts into clear, step-by-step instructions',
      'Familiarity with virtualization technologies',
      'Experience in developing training materials is a plus'
    ]
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    location: 'Boston, MA',
    type: 'Full-time',
    department: 'Product',
    description: 'Design intuitive and engaging user experiences for our cybersecurity education platform.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Strong portfolio demonstrating user-centered design approach',
      'Proficiency with design tools such as Figma or Adobe XD',
      'Experience designing for web applications',
      'Understanding of accessibility standards and best practices'
    ]
  },
  {
    id: '4',
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build modern, responsive user interfaces for our cybersecurity education platform.',
    requirements: [
      'Strong proficiency in React, TypeScript, and modern frontend technologies',
      'Experience with state management libraries like Redux or Zustand',
      'Knowledge of modern CSS practices and frameworks like Tailwind CSS',
      'Understanding of frontend performance optimization',
      'Ability to write clean, maintainable code with proper documentation'
    ]
  },
  {
    id: '5',
    title: 'Customer Success Manager',
    location: 'New York, NY',
    type: 'Full-time',
    department: 'Customer Success',
    description: 'Drive customer satisfaction, retention, and growth through excellent relationship management.',
    requirements: [
      '3+ years of experience in customer success or account management',
      'Strong communication and interpersonal skills',
      'Ability to understand customer needs and provide appropriate solutions',
      'Experience with CRM tools like Salesforce',
      'Background in cybersecurity or education is a plus'
    ]
  },
  {
    id: '6',
    title: 'Security Researcher (Internship)',
    location: 'Remote',
    type: 'Part-time',
    department: 'Research',
    description: 'Research and analyze emerging cybersecurity threats and vulnerabilities for our educational content.',
    requirements: [
      'Currently pursuing a degree in Computer Science, Cybersecurity, or related field',
      'Strong analytical and problem-solving skills',
      'Basic understanding of cybersecurity concepts and principles',
      'Ability to document findings in a clear and concise manner',
      'Self-motivated with the ability to work independently'
    ]
  }
];

const benefits = [
  {
    icon: <Building className="h-6 w-6" />,
    title: "Flexible Work Environment",
    description: "Work from home, office, or anywhere that suits you best."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Work-Life Balance",
    description: "Flexible hours and generous time off to recharge and spend time on what matters."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Comprehensive Health Benefits",
    description: "Medical, dental, and vision coverage for you and your dependents."
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Professional Development",
    description: "Learning stipends, conference attendance, and certification reimbursements."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Inclusive Culture",
    description: "A workplace that values diversity, equity, and belonging."
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Leading-Edge Technology",
    description: "Work with the latest tools and technologies in cybersecurity."
  }
];

const CareersPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-muted/30">
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission to Secure the Digital World</h1>
            <p className="text-xl text-muted-foreground mb-8">
              At CyberLabs, we're building the future of cybersecurity education. Help us empower the next generation of security professionals.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" asChild>
                <a href="#open-positions">View Open Positions</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn About Our Culture</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-card">
                  <CardHeader>
                    <div className="mb-4 p-2 bg-primary/10 w-fit rounded-md">
                      {benefit.icon}
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="open-positions" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Open Positions</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Join our team and help us build the future of cybersecurity education. We're looking for passionate people to join us on our mission.
            </p>
            
            <Tabs defaultValue="all">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Departments</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="product">Product</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="space-y-6">
                {jobPostings.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="engineering" className="space-y-6">
                {jobPostings.filter(job => job.department === 'Engineering').map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                {jobPostings.filter(job => job.department === 'Security' || job.department === 'Research').map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="education" className="space-y-6">
                {jobPostings.filter(job => job.department === 'Education').map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="product" className="space-y-6">
                {jobPostings.filter(job => job.department === 'Product').map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See a Perfect Fit?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:careers@cyberlabs.com">Send Your Resume</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const JobCard = ({ job }: { job: JobPosting }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="flex flex-wrap gap-4">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {job.type}
              </span>
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {job.department}
              </span>
            </CardDescription>
          </div>
          <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{job.description}</p>
        <h4 className="font-semibold mb-2">Requirements:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="ml-auto">
          <Link to={`/careers/${job.id}`} className="flex items-center">
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareersPage;
