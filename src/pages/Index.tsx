import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { 
  Building2, Search, MapPin, TrendingUp, Users, Star, ArrowRight, Sparkles, 
  Home, Calculator, PieChart, BarChart3, Play, Phone, Mail, MessageSquare,
  CheckCircle, Award, Shield, Clock, IndianRupee, Mic, Camera, Video
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropertyCard from "@/components/ui/PropertyCard";
import SearchInterface from "@/components/ui/SearchInterface";
import PropertyCategories from "@/components/ui/PropertyCategories";
import BuyRentSell from "@/components/ui/BuyRentSell";
import VideoTours from "@/components/ui/VideoTours";
import PropertyListings from "@/components/ui/PropertyListings";
import AIFeatures from "@/components/ui/AIFeatures";
import {TopDest} from "@/components/ui/top_dest";
import Browse_exp from "@/components/ui/browse_exp";
import { FeaturesGrid } from "@/components/ui/features-grid";
import { createPortal } from "react-dom";
import Header from "@/components/Header";





const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    propertyType: '',
    budget: '',
    location: '',
    message: ''
  });

  // Function to handle phone calls
  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Initiating Call",
      description: `Calling ${phoneNumber}...`,
    });
  };

  // Function to handle WhatsApp
  const handleWhatsApp = (phoneNumber: string, message = "Hi, I'm interested in your property services.") => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Opening WhatsApp",
      description: "Redirecting to WhatsApp...",
    });
  };

  // Function to handle email
  const handleEmail = (emailAddress: string, subject = "Property Inquiry") => {
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    toast({
      title: "Opening Email",
      description: `Composing email to ${emailAddress}...`,
    });
  };

  // Function to handle voice search
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => {
        toast({
          title: "Voice Search Active",
          description: "Listening... Please speak your search query.",
        });
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        toast({
          title: "Voice Recognized",
          description: `Searching for: "${transcript}"`,
        });
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
      };
      
      recognition.onerror = () => {
        toast({
          title: "Voice Search Error",
          description: "Please try again or use text search.",
          variant: "destructive"
        });
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice Search Not Supported",
        description: "Please use text search instead.",
        variant: "destructive"
      });
    }
  };

  // Function to handle image search
  const handleImageSearch = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "Image Upload",
          description: "Processing image for property search...",
        });
        // Here you would typically upload to a service and get search results
        setTimeout(() => {
          toast({
            title: "Image Search Complete",
            description: "Found similar properties! Redirecting to results...",
          });
          navigate('/search?type=image');
        }, 2000);
      }
    };
    input.click();
  };

  // Function to handle virtual tour
  const handleVirtualTour = () => {
    toast({
      title: "Virtual Tour",
      description: "Redirecting to virtual tour platform...",
    });
    navigate('/book-visit?type=virtual');
  };

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Callback Requested",
      description: "Our team will contact you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      propertyType: '',
      budget: '',
      location: '',
      message: ''
    });
  };

  // Function to handle quick search filters
  const handleQuickFilter = (filterType: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('filter', filterType);
    navigate(`/search?${searchParams.toString()}`);
    toast({
      title: "Quick Filter Applied",
      description: `Searching for ${filterType}...`,
    });
  };

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "Bandra West, Mumbai",
      price: "₹2,50,00,000",
      rent: "₹85,000/month",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      rating: 4.8,
      tag: "Featured",
      type: "sale",
      bhk: "3 BHK",
      area: "1,250 sq ft",
      furnished: "Fully Furnished"
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Whitefield, Bangalore",
      price: "₹1,80,00,000",
      rent: "₹45,000/month",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      rating: 4.9,
      tag: "Premium",
      type: "sale",
      bhk: "4 BHK",
      area: "2,100 sq ft",
      furnished: "Semi Furnished"
    },
    {
      id: 3,
      title: "Cozy 2BHK Flat",
      location: "Koregaon Park, Pune",
      price: "₹95,00,000",
      rent: "₹32,000/month",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
      rating: 4.6,
      tag: "Best Value",
      type: "rent",
      bhk: "2 BHK",
      area: "950 sq ft",
      furnished: "Furnished"
    },
    {
      id: 4,
      title: "Studio Apartment",
      location: "Gachibowli, Hyderabad",
      price: "₹45,00,000",
      rent: "₹18,000/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      rating: 4.4,
      tag: "Ready to Move",
      type: "rent",
      bhk: "1 BHK",
      area: "600 sq ft",
      furnished: "Fully Furnished"
    },
    {
      id: 5,
      title: "Penthouse Suite",
      location: "Cyber City, Gurgaon",
      price: "₹4,50,00,000",
      rent: "₹1,20,000/month",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
      rating: 4.9,
      tag: "Luxury",
      type: "sale",
      bhk: "4 BHK",
      area: "3,200 sq ft",
      furnished: "Designer Furnished"
    },
    {
      id: 6,
      title: "Service Apartment",
      location: "Indiranagar, Bangalore",
      price: "₹75,00,000",
      rent: "₹28,000/month",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      rating: 4.7,
      tag: "New Launch",
      type: "rent",
      bhk: "2 BHK",
      area: "1,100 sq ft",
      furnished: "Fully Furnished"
    }
  ];

  const agents = [
    {
      id: 1,
      name: "Rajesh Sharma",
      specialization: "Luxury Properties",
      experience: "8+ Years",
      rating: 4.9,
      deals: "500+ Deals",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      phone: "+91 98765 43210",
      email: "rajesh@realestate.com"
    },
    {
      id: 2,
      name: "Priya Patel",
      specialization: "Residential & Commercial",
      experience: "6+ Years",
      rating: 4.8,
      deals: "350+ Deals",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=200",
      phone: "+91 87654 32109",
      email: "priya@realestate.com"
    },
    {
      id: 3,
      name: "Amit Kumar",
      specialization: "Investment Properties",
      experience: "10+ Years",
      rating: 4.9,
      deals: "600+ Deals",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      phone: "+91 76543 21098",
      email: "amit@realestate.com"
    }
  ];

  const propertyServices = [
    {
      icon: Calculator,
      title: "EMI Calculator",
      description: "Calculate your monthly EMI with our advanced calculator",
      color: "text-purple-500"
    },
    {
      icon: PieChart,
      title: "Property Valuation",
      description: "Get instant property value estimates using AI",
      color: "text-green-500"
    },
    {
      icon: BarChart3,
      title: "Market Trends",
      description: "Analyze real estate market trends and predictions",
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Legal Verification",
      description: "Complete legal verification and documentation support",
      color: "text-orange-500"
    }
  ];


const headings = [
    <>
      Find <span className="text-purple-400">exclusive homes</span> that<br className="hidden sm:block" />
      <span className="block sm:inline">fit your life style</span>
    </>,
    <>
      Discover <span className="text-purple-400">dream apartments</span> for your comfort<br className="hidden sm:block" />
    </>,
    <>
      Explore <span className="text-purple-400">modern villas</span> near<br className="hidden sm:block" />
      <span className="block sm:inline">the cityscape</span>
    </>,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // hide before change
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length);
        setAnimate(true); // show after change
      }, 300); // animation hide time
    }, 3000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);


  return (


    <div className="bg-white   ">
      

      {/* Hero Section */}
      <section className="relative w-full min-h-screen h-screen overflow-hidden p-0 m-0">
  {/* Video Background */}
  <div className="absolute inset-0 w-full h-[91%] z-0 pointer-events-none">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="https://cdn.pixabay.com/video/2025/08/12/296958_large.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Content */}
  <div className="relative z-50 flex flex-col items-center justify-start h-full px-4 pt-48 pb-40 pointer-events-auto">
    {/* Main Heading */}
    <div className="text-center mb-8 max-w-4xl mx-auto h-48 flex items-center justify-center">
      <div
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-6xl font-bold text-white leading-tight px-4 mb-6 transition-all duration-700 ease-out ${
          animate ? "animate-slideIn opacity-100" : "opacity-0"
        }`}
      >
        {headings[currentIndex]}
      </div>
    </div>

    {/* Search Interface */}
    <div className="w-full max-w-4xl mx-auto px-4">
      <SearchInterface />
    </div>
  </div>
</section>

      <TopDest />
      
      <BuyRentSell />
      <PropertyCategories />


      {/* Video Tour Section */}
     <VideoTours />
     <Browse_exp />

      {/* Featured Properties with Enhanced Design */}
      <section className="py-20 bg-purple">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Premium <span className="text-purple-600">Properties</span></h2>
            <p className="text-xl text-muted-foreground">Handpicked properties for sale and rent</p>
            
            <div className="flex justify-center mt-8">
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Properties</TabsTrigger>
                  <TabsTrigger value="sale">For Sale</TabsTrigger>
                  <TabsTrigger value="rent">For Rent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProperties.map((property) => (
                <CarouselItem key={property.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 bg-gray-50">
                  <Card className="card-hover interactive-card overflow-hidden h-full">
                    <div className="property-image relative h-52">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        {property.tag}
                      </Badge>
                      <Badge className="absolute top-3 right-3 bg-purple-600 text-white">
                        {property.type === 'sale' ? 'Sale' : 'Rent'}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/70 text-white p-2 rounded text-sm">
                          <div className="flex justify-between">
                            <span>{property.bhk}</span>
                            <span>{property.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
                      <p className="text-muted-foreground mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Furnishing:</span>
                          <span>{property.furnished}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            {property.type === 'sale' ? property.price : property.rent}
                          </div>
                          {property.type === 'sale' && (
                            <div className="text-sm text-muted-foreground">
                              Rent: {property.rent}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{property.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-purple-500 text-white hover:bg-purple-600 "
                          onClick={() => handleCall("+91 98765 43210")}
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          className=" bg-purple-300 hover:bg-purple-400 text-black flex-1"
                          onClick={() => navigate(`/property/${property.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="text-center mt-12">
            <Link to="/search">
              <Button size="lg" className="btn-property bg-purple-500 text-white hover:bg-purple-600">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Property Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Property <span className="text-purple-600">Services</span> </h2>
            <p className="text-xl text-muted-foreground">Complete real estate solutions at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyServices.map((service, index) => (
              <Card key={index} className="card-hover text-center p-8 hover:shadow-xl transition-all bg-gray-50 duration-300">
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-purple-100 to-purple-50' :
                    index === 1 ? 'from-green-100 to-green-50' :
                    index === 2 ? 'from-purple-100 to-purple-50' :
                    'from-orange-100 to-orange-50'
                  }`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button 
                className="bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (service.title === "EMI Calculator") navigate('/emi-calculator');
                    else if (service.title === "Property Valuation") navigate('/property-valuation');
                    else if (service.title === "Market Trends") navigate('/price-trends');
                    else if (service.title === "Legal Verification") navigate('/our-services');
                  }}
                >
                  Try Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Agents Section */}
      <section className="py-20 bg-purple">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Meet Our <span className="text-purple-600">Expert Agents</span> </h2>
            <p className="text-xl text-muted-foreground">Trusted professionals to guide your property journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {agents.map((agent) => (
              <Card key={agent.id} className="card-hover text-center overflow-hidden">
                <CardContent className="p-8 bg-gray-50">
                  <div className="relative mb-6">
                    <img 
                      src={agent.image} 
                      alt={agent.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20"
                    />
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                  <p className="text-primary font-medium mb-2">{agent.specialization}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="text-muted-foreground">Experience</div>
                      <div className="font-semibold">{agent.experience}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Deals Closed</div>
                      <div className="font-semibold">{agent.deals}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-6">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{agent.rating}</span>
                    <span className="text-muted-foreground ml-1">(150+ reviews)</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => handleCall(agent.phone)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button 
                      size="sm" 
                      
                      className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
                      onClick={() => navigate(`/agent/${agent.id}`)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <PropertyListings />
      <FeaturesGrid />

      {/* Enquiry Form Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get Expert Consultation</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Connect with our property experts for personalized advice and assistance
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Free Property Consultation</h3>
                    <p className="text-muted-foreground">Get expert advice on buying, selling, or renting</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">24/7 Support</h3>
                    <p className="text-muted-foreground">Round-the-clock assistance for all your queries</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Trusted Professionals</h3>
                    <p className="text-muted-foreground">Verified agents with proven track records</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Request a Callback</CardTitle>
                <p className="text-muted-foreground">Fill in your details and we'll get back to you</p>
              </CardHeader>
              
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Enter your first name" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Enter your last name" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="propertyType">Property Interest</Label>
                    <Select onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Looking to Buy</SelectItem>
                        <SelectItem value="sell">Want to Sell</SelectItem>
                        <SelectItem value="rent">Looking for Rent</SelectItem>
                        <SelectItem value="lease">Want to Lease Out</SelectItem>
                        <SelectItem value="investment">Investment Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-50">Below ₹50 Lakhs</SelectItem>
                        <SelectItem value="50-100">₹50L - ₹1 Crore</SelectItem>
                        <SelectItem value="100-200">₹1Cr - ₹2 Crores</SelectItem>
                        <SelectItem value="200-500">₹2Cr - ₹5 Crores</SelectItem>
                        <SelectItem value="above-500">Above ₹5 Crores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                  
                  {/* <div>
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input 
                      id="location" 
                      placeholder="City, Area, or Landmark" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div> */}
                  
                  {/* <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your requirements..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div> */}
                  
                  <Button type="submit" className="w-full btn-property bg-purple-600 text-white hover:bg-purple-700">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Request Callback
                  </Button>
                  
                  <p className="text-sm text-center text-muted-foreground">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
      <AIFeatures />

      {/* Stats Section */}
      {/* <section className="py-20 bg-primary/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-muted-foreground">Trusted by thousands across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary mb-2">25K+</div>
              <div className="text-muted-foreground">Properties Listed</div>
              <div className="text-sm text-primary">+2.5K this month</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Happy Customers</div>
              <div className="text-sm text-primary">98% satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-muted-foreground">Expert Agents</div>
              <div className="text-sm text-primary">Verified professionals</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Cities Covered</div>
              <div className="text-sm text-primary">Across India</div>
            </div>
          </div>
        </div>
      </section> */}


 {/* Testimonials Section */}
      <section className="pb-10 py-10 bg-purple">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Real experiences from real people who found their dream homes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 bg-gray-50">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">5.0</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Amazing experience! Found my dream home in just 2 weeks. The virtual tour feature helped me narrow down my choices before visiting. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b287?w=50&h=50&fit=crop&crop=face" 
                    alt="Customer"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">Priya Sharma</div>
                    <div className="text-sm text-muted-foreground">Mumbai, Maharashtra</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-50">
              <CardContent className="p-6 ">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">5.0</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Professional service and transparent pricing. The EMI calculator helped me plan my budget perfectly. Got the keys to my new villa last month!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                    alt="Customer"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">Rajesh Kumar</div>
                    <div className="text-sm text-muted-foreground">Bangalore, Karnataka</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">4.8</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Great platform with genuine listings. The legal verification service gave me peace of mind. Smooth property registration process."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" 
                    alt="Customer"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">Anita Patel</div>
                    <div className="text-sm text-muted-foreground">Pune, Maharashtra</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button className="bg-purple-600 hover:bg-purple-500" size="lg">
                <Star className="mr-2 h-5 w-5" />
                View All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 hero-gradient  text-white">
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect property with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className=" bg-purple-600 text-white hover:bg-purple-500">
                <Users className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link to="/book-visit">
              <Button size="lg" variant="outline" className="bg-purple-400 border-white/20 text-white hover:bg-purple-500 hover:text-white">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
