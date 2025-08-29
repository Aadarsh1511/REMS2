import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, Star, Users, Zap, Shield, Bell, MapPin } from "lucide-react";

const MobileApps = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Search",
      description: "Find properties instantly with AI-powered search and smart filters"
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Discover neighborhoods with detailed insights and nearby amenities"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for price drops, new listings, and property updates"
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "Browse only authenticated properties with verified documents"
    },
    {
      icon: Users,
      title: "Expert Connect",
      description: "Chat directly with verified agents and property experts"
    },
    {
      icon: Star,
      title: "Personalized Experience",
      description: "AI recommendations based on your preferences and behavior"
    }
  ];

  const appStats = [
    { number: "5M+", label: "Downloads", icon: Download },
    { number: "4.8★", label: "App Rating", icon: Star },
    { number: "50K+", label: "Properties", icon: MapPin },
    { number: "99%", label: "User Satisfaction", icon: Users }
  ];

  const screenshots = [
    { title: "Home Search", desc: "Intuitive search with smart filters" },
    { title: "Property Details", desc: "Comprehensive property information" },
    { title: "Virtual Tours", desc: "360° virtual property tours" },
    { title: "Agent Chat", desc: "Direct communication with experts" },
    { title: "Saved Properties", desc: "Organize your favorite listings" },
    { title: "Market Insights", desc: "Real-time market data and trends" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Mobile Apps</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Real Estate at Your Fingertips
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Download our award-winning mobile apps for iOS and Android to search, explore, and manage properties on the go.
            </p>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-foreground rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">iOS</span>
                </div>
                Download for iPhone
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                Download for Android
              </Button>
            </div>

            {/* QR Codes */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">iOS App QR Code</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Android App QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Statistics */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {appStats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-none bg-background/80 backdrop-blur">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Property Search</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center h-full">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">App Interface Preview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {screenshots.map((screenshot, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <Smartphone className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{screenshot.title}</h3>
                <p className="text-xs text-muted-foreground">{screenshot.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                rating: 5,
                review: "Found my dream home in just 2 weeks! The app's search filters and virtual tours saved so much time."
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                rating: 5,
                review: "Excellent app with verified listings. The agent chat feature made communication so easy."
              },
              {
                name: "Anita Patel",
                location: "Bangalore",
                rating: 5,
                review: "Love the price trend analysis and market insights. Helped me make an informed investment decision."
              }
            ].map((review, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full"></div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Comparison */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Platform</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* iOS App */}
            <Card className="p-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">iOS</span>
                </div>
                <CardTitle>RealEstate Pro for iPhone</CardTitle>
                <p className="text-muted-foreground">Optimized for iOS 15.0 and later</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>App Size</span>
                    <span className="font-medium">67.2 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="font-medium">4.8.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="font-medium">4.8 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviews</span>
                    <span className="font-medium">12.5K</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Face ID & Touch ID support
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Apple Pay integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Siri Shortcuts
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Apple Watch companion
                  </li>
                </ul>
                <Button className="w-full">Download from App Store</Button>
              </CardContent>
            </Card>

            {/* Android App */}
            <Card className="p-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <CardTitle>RealEstate Pro for Android</CardTitle>
                <p className="text-muted-foreground">Requires Android 7.0 and up</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>App Size</span>
                    <span className="font-medium">42.8 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="font-medium">4.7.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="font-medium">4.7 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviews</span>
                    <span className="font-medium">28.3K</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Fingerprint authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Google Pay integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Google Assistant support
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Wear OS compatibility
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Download from Play Store</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <Smartphone className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Start Your Property Journey Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
            Join millions of users who trust our mobile apps for their real estate needs. Download now and find your perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download iOS App
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Android App
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileApps;