import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  Building, 
  User, 
  Settings, 
  Phone, 
  FileText, 
  Calculator,
  TrendingUp,
  BookOpen,
  Shield,
  AlertTriangle,
  Smartphone,
  Receipt,
  MessageSquare,
  HelpCircle,
  Map,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  const sitemapData = [
    {
      category: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", path: "/", description: "Main landing page" },
        { name: "Property Search", path: "/property-search", description: "Find your perfect property" },
        { name: "About Us", path: "/about", description: "Learn about our company" },
        { name: "Contact Us", path: "/contact", description: "Get in touch with us" }
      ]
    },
    {
      category: "Property Services",
      icon: Building,
      links: [
        { name: "Add Property", path: "/add-property", description: "List your property" },
        { name: "Post Property", path: "/post-property", description: "Create property listing" },
        { name: "Property Details", path: "/property-detail", description: "Detailed property information" },
        { name: "Book Visit", path: "/book-visit", description: "Schedule property viewing" },
        { name: "Request Info", path: "/request-info", description: "Get property information" }
      ]
    },
    {
      category: "User Dashboard",
      icon: User,
      links: [
        { name: "Dashboard", path: "/dashboard", description: "User dashboard overview" },
        { name: "Owner Dashboard", path: "/owner-dashboard", description: "Property owner panel" },
        { name: "Agent Dashboard", path: "/agent-dashboard", description: "Real estate agent panel" },
        { name: "Admin Dashboard", path: "/admin-dashboard", description: "Administrative panel" },
        { name: "Profile", path: "/profile", description: "User profile management" },
        { name: "Login", path: "/login", description: "User authentication" }
      ]
    },
    {
      category: "Tools & Calculators",
      icon: Calculator,
      links: [
        { name: "Area Converter", path: "/area-converter", description: "Convert between area units" },
        { name: "Price Trends", path: "/price-trends", description: "Real estate market trends" },
        { name: "Rent Receipt", path: "/rent-receipt", description: "Generate rent receipts" }
      ]
    },
    {
      category: "Investment & Research",
      icon: TrendingUp,
      links: [
        { name: "Real Estate Investments", path: "/real-estate-investments", description: "Investment opportunities" },
        { name: "Builders in India", path: "/builders-india", description: "Top real estate developers" },
        { name: "Articles", path: "/articles", description: "Real estate insights and news" }
      ]
    },
    {
      category: "Legal & Compliance",
      icon: Shield,
      links: [
        { name: "Terms & Conditions", path: "/terms", description: "Terms of service" },
        { name: "Privacy Policy", path: "/privacy", description: "Privacy and data policy" },
        { name: "Summons & Notices", path: "/summons-notices", description: "Legal notifications" },
        { name: "Safety Guide", path: "/safety-guide", description: "Property safety guidelines" }
      ]
    },
    {
      category: "Support & Help",
      icon: HelpCircle,
      links: [
        { name: "Customer Service", path: "/customer-service", description: "Get support and help" },
        { name: "Feedback", path: "/feedback", description: "Share your feedback" },
        { name: "Grievances", path: "/grievances", description: "File complaints and grievances" },
        { name: "Report Problem", path: "/report-problem", description: "Report technical issues" },
        { name: "Testimonials", path: "/testimonials", description: "Customer success stories" }
      ]
    },
    {
      category: "Company Information",
      icon: FileText,
      links: [
        { name: "Our Services", path: "/our-services", description: "Complete service overview" },
        { name: "Careers", path: "/careers", description: "Job opportunities" },
        { name: "Mobile Apps", path: "/mobile-apps", description: "Download our mobile apps" }
      ]
    }
  ];

  const quickStats = [
    { label: "Total Pages", value: "32", icon: FileText },
    { label: "Main Categories", value: "8", icon: Building },
    { label: "User Tools", value: "6", icon: Calculator },
    { label: "Support Pages", value: "5", icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sitemap
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Navigate through all pages and features of our platform
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search pages..."
                    className="pl-10 h-12"
                  />
                </div>
                <Button className="h-12">Find</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Site Structure</h2>
            <p className="text-muted-foreground">All pages organized by category for easy navigation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sitemapData.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      {section.category}
                      <Badge variant="secondary" className="ml-auto">
                        {section.links.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.path}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex-1">
                          <div className="font-medium group-hover:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {link.path}
                          </code>
                          <ChevronRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Pages</h2>
            <p className="text-muted-foreground">Most visited sections of our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/property-search">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Search className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Property Search</h3>
                  <p className="text-sm text-muted-foreground">Find properties</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/post-property">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Post Property</h3>
                  <p className="text-sm text-muted-foreground">List your property</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/price-trends">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Price Trends</h3>
                  <p className="text-sm text-muted-foreground">Market analysis</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/customer-service">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-sm text-muted-foreground">Get help</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">External Resources</h2>
            <p className="text-muted-foreground">Helpful external links and resources</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <ExternalLink className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Government Portals</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• RERA Registration Portal</li>
                  <li>• Property Registration</li>
                  <li>• Municipal Corporation</li>
                  <li>• Revenue Department</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Legal Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Property Laws Guide</li>
                  <li>• Document Templates</li>
                  <li>• Legal Consultation</li>
                  <li>• Court Judgments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Calculator className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Financial Tools</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• EMI Calculators</li>
                  <li>• Tax Calculators</li>
                  <li>• Loan Eligibility</li>
                  <li>• Investment Returns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding Something?</h2>
          <p className="text-xl mb-8">Contact our support team for assistance</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/customer-service">
              <Button size="lg" variant="secondary">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
            <Link to="/feedback">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Sitemap;