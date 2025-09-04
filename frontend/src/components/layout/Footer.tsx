
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">CyberLabs</h3>
            <p className="text-muted-foreground text-sm">
              The premier platform for cybersecurity learning through hands-on labs, designed for
              individuals, educators, companies, and learning groups.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/labs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Labs
                </Link>
              </li>
              <li>
                <Link
                  to="/learning-paths"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">For</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/students"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Students
                </Link>
              </li>
              <li>
                <Link
                  to="/educators"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Educators
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/groups"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learning Groups
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} CyberLabs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
