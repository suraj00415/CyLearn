
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding SQL Injection Attacks and Prevention",
    excerpt: "Learn how SQL injection attacks work and how to secure your applications against this common vulnerability.",
    date: "May 15, 2023",
    author: "Jane Smith",
    category: "Web Security",
    tags: ["SQL Injection", "Web Security", "OWASP"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "2",
    title: "The Rise of Ransomware: Trends and Defense Strategies",
    excerpt: "Explore the evolution of ransomware attacks and learn effective strategies to protect your organization.",
    date: "April 22, 2023",
    author: "Michael Johnson",
    category: "Ransomware",
    tags: ["Ransomware", "Threat Intelligence", "Incident Response"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    title: "Introduction to Penetration Testing Methodologies",
    excerpt: "A comprehensive guide to penetration testing methodologies and best practices for ethical hackers.",
    date: "March 10, 2023",
    author: "Alex Rodriguez",
    category: "Penetration Testing",
    tags: ["Penetration Testing", "Ethical Hacking", "Methodology"],
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "4",
    title: "Securing Cloud Infrastructure: AWS Security Best Practices",
    excerpt: "Learn essential security practices to protect your AWS cloud infrastructure from common threats.",
    date: "February 18, 2023",
    author: "Sarah Williams",
    category: "Cloud Security",
    tags: ["AWS", "Cloud Security", "Infrastructure"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "5",
    title: "Zero Trust Architecture: Principles and Implementation",
    excerpt: "Explore the fundamentals of Zero Trust security models and how to implement them in your organization.",
    date: "January 5, 2023",
    author: "David Chen",
    category: "Security Architecture",
    tags: ["Zero Trust", "Security Architecture", "Network Security"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
];

const categories = ["All", "Web Security", "Ransomware", "Penetration Testing", "Cloud Security", "Security Architecture"];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                        
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cybersecurity Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest insights, guides, and news from the cybersecurity world
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-3">
              <div className="mb-8 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="p-0 h-auto text-primary" asChild>
                        <Link to={`/blog/${post.id}`} className="flex items-center">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No posts found matching your search criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
                      <Badge key={tag} variant="outline" className="cursor-pointer">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Latest Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={`recent-${post.id}`}>
                      <Link to={`/blog/${post.id}`} className="font-medium hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      {post.id !== "3" && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Subscribe to our newsletter to get the latest updates and cybersecurity tips.</p>
                  <div className="space-y-4">
                    <Input placeholder="Your email" type="email" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
