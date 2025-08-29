import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Clock, CheckCircle, AlertCircle, Phone, Mail, FileText, Users } from "lucide-react";

const Grievances = () => {
  const grievances = [
    {
      id: "GRV001",
      title: "Property Documentation Issue",
      category: "Documentation",
      status: "In Progress",
      priority: "High",
      date: "2024-01-15",
      description: "Missing NOC certificate for property registration",
      progress: 60
    },
    {
      id: "GRV002",
      title: "Agent Unprofessional Behavior",
      category: "Service Quality",
      status: "Under Review",
      priority: "Medium",
      date: "2024-01-12",
      description: "Agent was not responsive and provided incorrect information",
      progress: 30
    },
    {
      id: "GRV003",
      title: "Payment Gateway Issue",
      category: "Technical",
      status: "Resolved",
      priority: "Low",
      date: "2024-01-10",
      description: "Payment was deducted but transaction failed",
      progress: 100
    }
  ];

  const grievanceStats = [
    { label: "Total Grievances", value: "2,456", icon: MessageSquare, trend: "+12%" },
    { label: "Resolved", value: "2,180", icon: CheckCircle, trend: "+8%" },
    { label: "In Progress", value: "234", icon: Clock, trend: "-5%" },
    { label: "Avg Resolution Time", value: "3.2 days", icon: AlertCircle, trend: "-15%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Customer Support</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Grievance Resolution
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Report issues, track complaints, and get timely resolution for all your concerns related to our services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {grievanceStats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Badge variant="outline" className="mt-2 text-xs">{stat.trend}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* File New Grievance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-center text-2xl">File a New Grievance</CardTitle>
                <p className="text-center text-muted-foreground">We're here to help resolve your concerns quickly and efficiently</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grievance-category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grievance category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service-quality">Service Quality</SelectItem>
                        <SelectItem value="documentation">Documentation Issues</SelectItem>
                        <SelectItem value="technical">Technical Problems</SelectItem>
                        <SelectItem value="payment">Payment Issues</SelectItem>
                        <SelectItem value="agent-behavior">Agent Behavior</SelectItem>
                        <SelectItem value="property-listing">Property Listing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="grievance-title">Grievance Title *</Label>
                  <Input id="grievance-title" placeholder="Brief title describing your issue" required />
                </div>
                <div>
                  <Label htmlFor="grievance-description">Detailed Description *</Label>
                  <Textarea 
                    id="grievance-description" 
                    placeholder="Please provide detailed information about your grievance..."
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property-id">Property ID (if applicable)</Label>
                    <Input id="property-id" placeholder="Enter property ID" />
                  </div>
                  <div>
                    <Label htmlFor="transaction-id">Transaction ID (if applicable)</Label>
                    <Input id="transaction-id" placeholder="Enter transaction ID" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="supporting-evidence">Supporting Evidence</Label>
                  <Input id="supporting-evidence" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
                  <p className="text-sm text-muted-foreground mt-1">Upload relevant documents, screenshots, or images</p>
                </div>
                <Button className="w-full" size="lg">Submit Grievance</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Track Existing Grievances */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Track Your Grievances</h2>
          
          {/* Search/Filter */}
          <Card className="p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search-grievance">Grievance ID</Label>
                <Input id="search-grievance" placeholder="Enter grievance ID" />
              </div>
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="service-quality">Service Quality</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Search</Button>
              </div>
            </div>
          </Card>

          {/* Grievance List */}
          <div className="space-y-6">
            {grievances.map((grievance) => (
              <Card key={grievance.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{grievance.title}</h3>
                      <Badge variant={grievance.status === 'Resolved' ? 'default' : grievance.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {grievance.status}
                      </Badge>
                      <Badge variant={grievance.priority === 'High' ? 'destructive' : 'outline'}>
                        {grievance.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{grievance.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {grievance.id}</span>
                      <span>Category: {grievance.category}</span>
                      <span>Filed: {grievance.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{grievance.progress}%</span>
                  </div>
                  <Progress value={grievance.progress} className="h-2" />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Add Comment</Button>
                  {grievance.status === 'Resolved' && (
                    <Button variant="outline" size="sm">Provide Feedback</Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Need Immediate Assistance?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
              <p className="text-muted-foreground mb-4">Speak directly with our support team</p>
              <p className="font-semibold text-primary mb-4">1800-XXX-XXXX</p>
              <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM</p>
            </Card>
            <Card className="p-6 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us detailed information</p>
              <p className="font-semibold text-primary mb-4">grievances@realestatepro.com</p>
              <p className="text-sm text-muted-foreground">24-48 hours response</p>
            </Card>
            <Card className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with our support agents</p>
              <Button className="w-full">Start Live Chat</Button>
              <p className="text-sm text-muted-foreground mt-2">Available 24/7</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Escalation Process */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Grievance Resolution Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Submit", desc: "File your grievance with details" },
                { step: "2", title: "Review", desc: "Our team reviews your case" },
                { step: "3", title: "Investigate", desc: "We investigate and work on resolution" },
                { step: "4", title: "Resolve", desc: "Issue resolved and feedback collected" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Grievances;