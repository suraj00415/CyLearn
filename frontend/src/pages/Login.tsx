
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4 md:px-6 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white/10 z-0"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full mt-10 max-w-md bg-background rounded-xl shadow-xl border border-border/50 p-8 animate-scale-in">
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
