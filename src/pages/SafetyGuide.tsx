import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, FileCheck, Users, Phone } from "lucide-react";

const SafetyGuide = () => {
  const safetyTips = [
    {
      icon: Eye,
      title: "Property Verification",
      tips: [
        "Always verify property ownership documents",
        "Check RERA registration for under-construction projects",
        "Verify clear title and no pending legal disputes",
        "Confirm property tax payments are up to date"
      ]
    },
    {
      icon: Users,
      title: "Dealing with Agents",
      tips: [
        "Work only with verified and licensed agents",
        "Check agent's track record and reviews",
        "Avoid paying advance without proper documentation",
        "Get all promises in writing"
      ]
    },
    {
      icon: Lock,
      title: "Financial Safety",
      tips: [
        "Never pay large amounts in cash",
        "Use secure payment methods with proper receipts",
        "Verify bank account details before transfers",
        "Get loan pre-approval from reputed banks"
      ]
    },
    {
      icon: FileCheck,
      title: "Document Security",
      tips: [
        "Keep original documents safe",
        "Make notarized copies for sharing",
        "Verify all signatures and stamps",
        "Use legal experts for document review"
      ]
    }
  ];

  const warningSignsData = [
    {
      category: "Property Red Flags",
      signs: [
        "Seller rushing to close the deal",
        "Asking for full payment before registration",
        "No proper documentation available",
        "Property price significantly below market rate",
        "Multiple owners claiming the same property"
      ]
    },
    {
      category: "Agent Red Flags", 
      signs: [
        "No proper license or credentials",
        "Asking for high advance payments",
        "Avoiding direct property visits",
        "Providing fake or manipulated documents",
        "No clear fee structure"
      ]
    },
    {
      category: "Financial Red Flags",
      signs: [
        "Insisting on cash-only transactions",
        "No proper receipts or documentation",
        "Unusual payment methods",
        "Asking for money transfers to personal accounts",
        "Hidden charges not disclosed upfront"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Your Safety First</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real Estate Safety Guide
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Protect yourself from fraud and make informed decisions with our comprehensive safety guidelines for real estate transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Download Safety Checklist</Button>
              <Button variant="outline" size="lg">Report Suspicious Activity</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Statistics */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "99.8%", label: "Safe Transactions", icon: Shield },
              { number: "50K+", label: "Verified Properties", icon: CheckCircle },
              { number: "24/7", label: "Safety Monitoring", icon: Eye },
              { number: "500+", label: "Fraud Cases Prevented", icon: AlertTriangle }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Safety Tips */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Essential Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safetyTips.map((category, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Warning Signs to Watch Out For</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {warningSignsData.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <span className="font-semibold">{category.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-4">
                      {category.signs.map((sign, signIndex) => (
                        <li key={signIndex} className="flex items-start gap-3">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Document Verification Guide */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Document Verification Checklist</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>For Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Sale Deed / Title Documents",
                    "Property Tax Receipts",
                    "NOC from Society/Builder",
                    "Encumbrance Certificate",
                    "Approved Building Plan",
                    "Completion Certificate",
                    "RERA Registration (if applicable)"
                  ].map((doc, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader>
                <CardTitle>For Renters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Rent Agreement",
                    "Owner's ID Proof",
                    "Property Ownership Documents",
                    "Society NOC (if required)",
                    "Utility Bills",
                    "Security Deposit Receipt",
                    "Police Verification Form"
                  ].map((doc, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Emergency Contacts & Reporting</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Fraud Reporting Helpline</h3>
              <p className="text-2xl font-bold text-primary mb-2">1800-XXX-FRAUD</p>
              <p className="text-muted-foreground">Available 24/7 for fraud reporting</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">RERA Authority</h3>
              <p className="text-2xl font-bold text-primary mb-2">1800-XXX-RERA</p>
              <p className="text-muted-foreground">For RERA related complaints</p>
            </Card>
            
            <Card className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Police Cybercrime</h3>
              <p className="text-2xl font-bold text-primary mb-2">1930</p>
              <p className="text-muted-foreground">For cybercrime and online fraud</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Safety Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Safety Checklist PDF", desc: "Complete safety checklist for buyers and renters" },
              { title: "Document Templates", desc: "Standard agreement and verification templates" },
              { title: "Legal Expert Network", desc: "Connect with verified legal professionals" },
              { title: "Fraud Alert System", desc: "Stay updated with latest fraud patterns" }
            ].map((resource, index) => (
              <Card key={index} className="p-6 text-center">
                <FileCheck className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.desc}</p>
                <Button variant="outline" size="sm">Download</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Stay Safe, Stay Informed
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
            Your safety is our priority. Follow these guidelines and report any suspicious activity immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">Report Fraud</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Safety Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyGuide;