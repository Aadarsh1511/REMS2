import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Bug, Globe, Smartphone, CreditCard, FileText, Phone, Clock } from "lucide-react";

const ReportProblem = () => {
  const problemTypes = [
    { value: "technical", label: "Technical Issue", icon: Bug, description: "Website bugs, errors, or glitches" },
    { value: "account", label: "Account Problem", icon: FileText, description: "Login, profile, or account-related issues" },
    { value: "payment", label: "Payment Issue", icon: CreditCard, description: "Transaction, billing, or payment problems" },
    { value: "mobile", label: "Mobile App", icon: Smartphone, description: "Mobile app crashes or functionality issues" },
    { value: "listing", label: "Property Listing", icon: Globe, description: "Issues with property listings or data" },
    { value: "other", label: "Other", icon: AlertTriangle, description: "Any other problem not listed above" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Low", description: "Minor inconvenience, doesn't block usage" },
    { value: "medium", label: "Medium", description: "Affects functionality but has workarounds" },
    { value: "high", label: "High", description: "Significantly impacts user experience" },
    { value: "critical", label: "Critical", description: "Complete system failure or security issue" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Technical Support</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Report a Problem
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encountered an issue? Let us know and we'll work to resolve it quickly. Your reports help us improve our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Emergency Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Critical issues requiring immediate attention</p>
              <Button variant="outline" size="sm">Call +91 98765 43210</Button>
            </Card>
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">Get instant help from our support team</p>
              <Button variant="outline" size="sm">Start Chat</Button>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Status Page</h3>
              <p className="text-sm text-muted-foreground mb-3">Check current system status and known issues</p>
              <Button variant="outline" size="sm">View Status</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Report Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Before reporting, please check our <strong>FAQ section</strong> and <strong>known issues page</strong> to see if your problem has already been addressed.
              </AlertDescription>
            </Alert>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">Describe Your Problem</CardTitle>
                <p className="text-muted-foreground">Please provide as much detail as possible to help us resolve your issue quickly.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Problem Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">What type of problem are you experiencing?</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {problemTypes.map((type) => (
                      <Card key={type.value} className="p-4 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50">
                        <div className="flex items-start gap-3">
                          <type.icon className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Priority Level</label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {urgencyLevels.map((level) => (
                      <Card key={level.value} className="p-3 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50">
                        <div className="text-center">
                          <div className={`font-medium mb-1 ${
                            level.value === 'critical' ? 'text-red-600' :
                            level.value === 'high' ? 'text-orange-600' :
                            level.value === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>{level.label}</div>
                          <div className="text-xs text-muted-foreground">{level.description}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name *</label>
                    <Input placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input type="tel" placeholder="+91 98765 43210" />
                </div>

                {/* Problem Details */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Problem Summary *</label>
                  <Input placeholder="Brief description of the problem" required />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Detailed Description *</label>
                  <Textarea
                    placeholder="Please describe the problem in detail. Include:&#10;- What you were trying to do&#10;- What happened instead&#10;- Error messages (if any)&#10;- When did this start happening"
                    rows={6}
                    required
                  />
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Steps to Reproduce</label>
                  <Textarea
                    placeholder="Please list the exact steps to reproduce this problem:&#10;1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. See error"
                    rows={4}
                  />
                </div>

                {/* Technical Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Browser/App Version</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select browser/app" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chrome">Chrome</SelectItem>
                        <SelectItem value="firefox">Firefox</SelectItem>
                        <SelectItem value="safari">Safari</SelectItem>
                        <SelectItem value="edge">Edge</SelectItem>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Operating System</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="macos">macOS</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                        <SelectItem value="ios">iOS</SelectItem>
                        <SelectItem value="android">Android</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Screen Size */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Device Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="mobile">Mobile Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Additional Information</label>
                  <Textarea
                    placeholder="Any other relevant information that might help us resolve this issue..."
                    rows={3}
                  />
                </div>

                {/* File Upload Note */}
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    If you have screenshots, error logs, or other files that would help us understand the problem, please email them to support@realestatepro.com with your ticket reference number.
                  </AlertDescription>
                </Alert>

                <Button className="w-full" size="lg">
                  Submit Problem Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Follow-up Information */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Ticket Created</h3>
                <p className="text-muted-foreground text-sm">We'll create a support ticket and send you a reference number via email.</p>
              </Card>
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Initial Response</h3>
                <p className="text-muted-foreground text-sm">Our team will acknowledge your report within 24 hours and begin investigation.</p>
              </Card>
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Resolution</h3>
                <p className="text-muted-foreground text-sm">We'll work to resolve the issue and keep you updated throughout the process.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportProblem;