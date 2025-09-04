
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  Award, 
  Server, 
  BookOpen, 
  Zap, 
  ChevronRight 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted z-0"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-300/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-400/20 text-brand-500 animate-fade-in">
                Welcome to the Future of Cybersecurity Education
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-slide-in-bottom" style={{ animationDelay: '100ms' }}>
                Learn <span className="text-gradient">Cybersecurity</span> Through Interactive Labs
              </h1>
              
              <p className="text-lg text-muted-foreground animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
                Master practical cybersecurity skills with hands-on labs designed for students, educators, 
                companies, and learning groups. Learn by doing in real-world scenarios.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom" style={{ animationDelay: '300ms' }}>
                <Button asChild size="lg" className="h-12 px-8 font-medium ">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 font-medium">
                  <Link to="/labs">Explore Labs</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full mt-8 animate-scale-in" style={{ animationDelay: '400ms' }}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-gradient">150+</div>
                  <p className="text-sm text-muted-foreground">Hands-on Labs</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-gradient">25k+</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-gradient">100+</div>
                  <p className="text-sm text-muted-foreground">Universities</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-gradient">50+</div>
                  <p className="text-sm text-muted-foreground">Company Partners</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Platform Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Why Choose Our Platform?</h2>
              <p className="text-muted-foreground mt-4">
                Our platform is built with the latest technology to provide an immersive and effective learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<ShieldCheck className="w-10 h-10 text-primary" />}
                title="Real-world Scenarios"
                description="Practice in environments that simulate real-world cybersecurity challenges and threats."
              />
              <FeatureCard 
                icon={<Clock className="w-10 h-10 text-primary" />}
                title="Learn at Your Pace"
                description="Self-paced learning designed to accommodate your schedule and learning speed."
              />
              <FeatureCard 
                icon={<Server className="w-10 h-10 text-primary" />}
                title="Isolated Environments"
                description="Practice in secure, isolated lab environments with no risk to real systems."
              />
              <FeatureCard 
                icon={<Users className="w-10 h-10 text-primary" />}
                title="Team Collaboration"
                description="Collaborate with peers in group labs designed for team-based learning."
              />
              <FeatureCard 
                icon={<BookOpen className="w-10 h-10 text-primary" />}
                title="Comprehensive Curriculum"
                description="Structured learning paths covering all aspects of modern cybersecurity."
              />
              <FeatureCard 
                icon={<Award className="w-10 h-10 text-primary" />}
                title="Earn Certificates"
                description="Demonstrate your skills with certificates upon completion of learning paths."
              />
            </div>
          </div>
        </section>
        
        {/* For Different Stakeholders */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                For Everyone
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4">Tailored for Your Needs</h2>
              <p className="text-muted-foreground mt-4">
                Our platform offers specialized experiences for different types of users.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StakeholderCard 
                title="For Students"
                description="Build practical cybersecurity skills that employers are looking for. Learn through hands-on labs, track your progress, and earn certificates."
                cta="Start Learning"
                link="/register?type=student"
                bgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
              />
              <StakeholderCard 
                title="For Educators"
                description="Enhance your cybersecurity curriculum with hands-on labs. Monitor student progress, assign lab work, and provide feedback in real-time."
                cta="Empower Your Students"
                link="/register?type=educator"
                bgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
              />
              <StakeholderCard 
                title="For Companies"
                description="Train your team in the latest cybersecurity practices with hands-on labs. Track skills development and identify talent within your organization."
                cta="Train Your Team"
                link="/register?type=company"
                bgClass="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20"
              />
              <StakeholderCard 
                title="For Learning Groups"
                description="Perfect for study groups, clubs, and teams. Learn together with collaborative labs that encourage teamwork and knowledge sharing."
                cta="Collaborate Now"
                link="/register?type=group"
                bgClass="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="absolute top-1/3 right-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Cybersecurity Journey?</h2>
              <p className="text-muted-foreground mt-4 mb-8">
                Join thousands of students, educators, companies, and groups who are building practical cybersecurity skills with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="h-12 px-8 font-medium">
                  <Link to="/register">Create Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 font-medium">
                  <Link to="/labs">Browse Labs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="glass-card overflow-hidden border-0 bg-background/50">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface StakeholderCardProps {
  title: string;
  description: string;
  cta: string;
  link: string;
  bgClass: string;
}

const StakeholderCard = ({ title, description, cta, link, bgClass }: StakeholderCardProps) => {
  return (
    <div className={`rounded-xl p-8 border border-border/50 ${bgClass}`}>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button asChild variant="outline" className="group">
        <Link to={link}>
          {cta}
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
};

export default Index;
