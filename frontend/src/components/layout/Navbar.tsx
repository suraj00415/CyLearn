
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setLogout } from '@/state/auth/authSlice';
import { User } from '@/types/auth';
import { useLogoutMutation } from '@/state/auth/authApi';
import Sipnner from '../ui/Sipnner';
import { toast } from 'sonner';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();
  const user: User = useSelector(selectCurrentUser)
  const navigation = useNavigate()

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-gradient">CyberLabs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          <Link
            to="/labs"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/labs') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Labs
          </Link>
          <Link
            to="/security-analyzer"
            className={cn(
              'flex items-center text-sm font-medium transition-colors hover:text-primary',
              isActive('/security-analyzer') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <ShieldCheck className="w-4 h-4 mr-1" /> Security Analyzer
          </Link>
          <Link
            to="/pricing"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/pricing') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive('/about') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        {!user ? (
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>) : (
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to={`/dashboard/${user.stakeHolderType}`}>Dashboard</Link>
            </Button>
            <Button onClick={handleLogout}>
              Logout
              {isLoading && <Sipnner />}
            </Button>
          </div>
        )
        }

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 z-20" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-background z-40 md:hidden transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6 text-lg">

          <Link
            to="/"
            className={cn(
              'text-2xl font-medium transition-colors hover:text-primary',
              isActive('/') ? 'text-primary' : 'text-foreground'
            )}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/labs"
            className={cn(
              'text-2xl font-medium transition-colors hover:text-primary',
              isActive('/labs') ? 'text-primary' : 'text-foreground'
            )}
            onClick={closeMobileMenu}
          >
            Labs
          </Link>
          <Link
            to="/security-analyzer"
            className={cn(
              'flex items-center text-2xl font-medium hover:text-primary ',
              isActive('/pricing') ? 'text-primary' : 'text-foreground'
            )} onClick={closeMobileMenu}
          >
            <ShieldCheck className="w-5 h-5 mr-2" /> Security Analyzer
          </Link>
          <Link
            to="/pricing"
            className={cn(
              'text-2xl font-medium transition-colors hover:text-primary',
              isActive('/pricing') ? 'text-primary' : 'text-foreground'
            )}
            onClick={closeMobileMenu}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={cn(
              'text-2xl font-medium transition-colors hover:text-primary',
              isActive('/about') ? 'text-primary' : 'text-foreground'
            )}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <div className="flex flex-col space-y-4 mt-8">
            <ThemeToggle />
            <Button variant="ghost" size="lg" asChild>
              <Link to="/login" onClick={closeMobileMenu}>Sign In</Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/register" onClick={closeMobileMenu}>Sign Up</Link>
            </Button>
          </div>
        </nav>

      </div>
    </header >
  );
};

export default Navbar;
