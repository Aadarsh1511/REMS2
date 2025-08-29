import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, FileText, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const RequestInfo = () => {
  const infoTypes = [
    { id: "property-details", label: "Property Details & Pricing", icon: Info },
    { id: "market-analysis", label: "Market Analysis Report", icon: FileText },
    { id: "investment-guide", label: "Investment Opportunities", icon: CheckCircle },
    { id: "loan-assistance", label: "Loan & Finance Assistance", icon: FileText },
    { id: "legal-guidance", label: "Legal Documentation Help", icon: FileText },
    { id: "site-visit", label: "Site Visit Arrangement", icon: CheckCircle },
  ];

  const propertyTypes = [
    "Residential Apartment",
    "Independent House/Villa",
    "Plot/Land",
    "Commercial Office",
    "Retail Space",
    "Warehouse/Industrial",
    "Agricultural Land",
    "Other"
  ];

  const budgetRanges = [
    "Under ₹10 Lakhs",
    "₹10-25 Lakhs",
    "₹25-50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "₹1-2 Crores",
    "₹2-5 Crores",
    "Above ₹5 Crores"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Get Information</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Request Information
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get detailed information about properties, market trends, investment opportunities, and expert guidance tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Request Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">What information do you need?</CardTitle>
                  <p className="text-muted-foreground">Fill out the form below and our experts will get back to you with detailed information.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Information Type Selection */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Select Information Type (You can select multiple)</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {infoTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <Checkbox id={type.id} />
                          <type.icon className="h-4 w-4 text-primary" />
                          <label htmlFor={type.id} className="text-sm cursor-pointer flex-1">
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input type="email" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                      <Input type="tel" placeholder="+91 98765 43210" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <Input placeholder="Your city" />
                    </div>
                  </div>

                  {/* Property Requirements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Property Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Budget Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range.toLowerCase().replace(/\s+/g, '-')}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Location</label>
                    <Input placeholder="Enter preferred areas/localities" />
                  </div>

                  {/* Specific Requirements */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Specific Requirements/Questions</label>
                    <Textarea 
                      placeholder="Please describe what specific information you're looking for, any particular requirements, timeline, or questions you have..."
                      rows={5}
                    />
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Preferred Communication Method</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "email", label: "Email", icon: Mail },
                        { id: "phone", label: "Phone Call", icon: Phone },
                        { id: "whatsapp", label: "WhatsApp", icon: Phone },
                      ].map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox id={method.id} />
                          <method.icon className="h-4 w-4 text-primary" />
                          <label htmlFor={method.id} className="text-sm cursor-pointer">
                            {method.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">When are you looking to buy/invest?</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="within-1-month">Within 1 month</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-12-months">6-12 months</SelectItem>
                        <SelectItem value="just-exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to receive information via email, phone, or WhatsApp and consent to being contacted by RealEstate Pro regarding my inquiry.
                    </label>
                  </div>

                  <Button className="w-full" size="lg">
                    Submit Information Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Response Time */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-6 w-6 text-primary" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">General Inquiries</span>
                      <Badge variant="secondary">2-4 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Property Details</span>
                      <Badge variant="secondary">1-2 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Reports</span>
                      <Badge variant="secondary">24 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Investment Analysis</span>
                      <Badge variant="secondary">48 hours</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What You'll Receive */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl">What You'll Receive</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Detailed property information and pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Market analysis and trends report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Investment ROI calculations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Legal documentation guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Financing options and assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Expert consultation call</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Call us directly</p>
                      <p className="text-primary font-semibold">+91 98765 43210</p>
                      <p className="text-xs text-muted-foreground">Mon-Sat 9:00 AM to 9:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">WhatsApp</p>
                      <p className="text-primary font-semibold">+91 98765 43210</p>
                      <p className="text-xs text-muted-foreground">24/7 Quick responses</p>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Start Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestInfo;