
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Essential cybersecurity training for beginners',
    price: '$0',
    features: [
      'Access to 5 basic labs',
      'Community forum access',
      'Basic lab tracking',
      'Email support',
    ],
    buttonText: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Advanced training for security professionals',
    price: '$49',
    popular: true,
    features: [
      'Access to all 50+ labs',
      'Advanced lab tracking',
      'Priority email support',
      'Certificates of completion',
      'Exclusive webinars',
      'Progress reports',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    id: 'team',
    name: 'Teams',
    description: 'Complete solution for organizations and educators',
    price: '$149',
    features: [
      'All Professional features',
      'Team management dashboard',
      'Custom lab creation',
      'Dedicated support',
      'Advanced analytics',
      'Custom integrations',
      'Training for trainers',
    ],
    buttonText: 'Contact Sales',
  },
];

const PricingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to enhance your cybersecurity skills with practical, hands-on labs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.id !== 'free' && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/register">{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto grid gap-6">
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2">Do you offer discounts for students?</h3>
                <p className="text-muted-foreground">Yes, we offer special discounts for students and educational institutions. Please contact our support team with valid student ID for more information.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2">How does the team plan work?</h3>
                <p className="text-muted-foreground">The team plan allows you to add multiple users under a single account. Each user gets their own access to labs, while administrators can track progress and manage permissions.</p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground">Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service. No questions asked.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
