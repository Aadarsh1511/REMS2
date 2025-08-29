import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Key, DollarSign, TrendingUp, MapPin, Camera, Play } from "lucide-react";
import { useState } from "react";

const BuyRentSell = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const buyProperties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      price: "₹11,25,0000",
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 4,
      area: "4,200 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
      hasVideo: true,
      featured: true,
      priceChange: 12.5
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      price: "₹8,90,000",
      location: "Manhattan, NY",
      beds: 3,
      baths: 3,
      area: "2,800 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      hasVideo: false,
      featured: false,
      priceChange: 8.2
    },
    {
      id: 3,
      title: "Waterfront Mansion",
      price: "₹22,10,000",
      location: "Miami Beach, FL",
      beds: 6,
      baths: 5,
      area: "5,500 sq ft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
      hasVideo: true,
      featured: true,
      priceChange: 15.8
    }
  ];

  const rentProperties = [
    {
      id: 4,
      title: "Cozy Studio Apartment",
      price: "₹2,80,000",
      location: "SoHo, NY",
      beds: 1,
      baths: 1,
      area: "850 sq ft",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
      hasVideo: false,
      featured: false
    },
    {
      id: 5,
      title: "Modern Family Home",
      price: "₹4,20,000",
      location: "Austin, TX",
      beds: 4,
      baths: 3,
      area: "2,400 sq ft",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500",
      hasVideo: true,
      featured: true
    },
    {
      id: 6,
      title: "Luxury Loft",
      price: "₹5,80,000",
      location: "Chicago, IL",
      beds: 2,
      baths: 2,
      area: "1,800 sq ft",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500",
      hasVideo: true,
      featured: false
    }
  ];

  const sellServices = [
    {
      icon: Home,
      title: "Free Property Valuation",
      description: "Get an accurate market value of your property with our AI-powered valuation tool",
      color: "text-primary"
    },
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality photos and virtual tours to showcase your property at its best",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Comprehensive market insights to price your property competitively",
      color: "text-real-estate-success"
    }
  ];

  const renderPropertyGrid = (properties: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <Card key={property.id} className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
          <div className="relative overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Video overlay */}
            {property.hasVideo && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="lg" className="bg-white/90 text-primary hover:bg-white rounded-full w-16 h-16 p-0">
                  <Play className="w-6 h-6" />
                </Button>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {property.featured && (
                <Badge className="bg-gradient-hero text-white border-0 shadow-lg">
                  Featured
                </Badge>
              )}
              {property.hasVideo && (
                <Badge className="bg-background/90 text-foreground border-0 shadow-md">
                  <Play className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>

            {/* Price change for buy properties */}
            {property.priceChange && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-real-estate-success bg-green-600 text-white border-0 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{property.priceChange}%
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-2  text-blue-500" />
              <span className="text-sm">{property.location}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold bg-gradient-hero bg-clip-text text-blue-700">
                {property.price}
              </span>
              {activeTab === "rent" && <span className="text-sm text-muted-foreground">/month</span>}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
              <div>
                <div className="font-bold text-foreground">{property.beds}</div>
                <div className="text-muted-foreground">Beds</div>
              </div>
              <div>
                <div className="font-bold text-foreground">{property.baths}</div>
                <div className="text-muted-foreground">Baths</div>
              </div>
              <div>
                <div className="font-bold text-foreground">{property.area}</div>
                <div className="text-muted-foreground">Area</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm">View Details</Button>
              <Button size="sm" className="bg-gradient-hero bg-blue-400 text-white border-0">
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-52 h-52 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Buy, Rent, or 
            <span className="block bg-gradient-hero bg-clip-text text-blue-700 mt-5 ">Sell Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're looking to buy your dream home, find the perfect rental, or sell your property, we've got you covered
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-2 border border-border/50 shadow-card">
            {[
              { id: "buy", label: "Buy Properties", icon: Home },
              { id: "rent", label: "Rent Properties", icon: Key },
              { id: "sell", label: "Sell Property", icon: DollarSign }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-lg rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "bg-gradient-hero text-blue-700 shadow-glow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="animate-fade-in">
          {activeTab === "buy" && renderPropertyGrid(buyProperties)}
          {activeTab === "rent" && renderPropertyGrid(rentProperties)}
          {activeTab === "sell" && (
            <div className="space-y-16">
              {/* Sell Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sellServices.map((service, index) => (
                  <Card key={index} className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-background to-secondary/20 border border-border/30 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-background to-secondary shadow-elegant flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 ${service.color}`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* CTA for selling */}
              <div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border border-border/30">
                <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Sell Your Property?</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get a free property valuation and connect with our expert agents to sell your property quickly and at the best price
                </p>
                <Button size="lg" className="bg-gradient-hero text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-12 py-6 text-lg">
                  Get Free Valuation
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* View More Button */}
        {(activeTab === "buy" || activeTab === "rent") && (
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-hero bg-blue-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-12 py-6 text-lg">
              View All {activeTab === "buy" ? "Properties for Sale" : "Rental Properties"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyRentSell;