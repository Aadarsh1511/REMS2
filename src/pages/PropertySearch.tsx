import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import UnifiedPropertySearch from "@/components/UnifiedPropertySearch";
import { searchPropertyTypes } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  Star,
  Mic,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { addWeeks } from "date-fns";

const PropertySearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [propertyType, setPropertyType] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onstart = () => {
        toast({
          title: "Voice Search Active",
          description: "Listening... Please speak your search query.",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        toast({
          title: "Voice Recognized",
          description: `Searching for: "${transcript}"`,
        });
      };

      recognition.onerror = () => {
        toast({
          title: "Voice Search Error",
          description: "Please try again or use text search.",
          variant: "destructive",
        });
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Search Not Supported",
        description: "Please use text search instead.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = () => {
    toast({
      title: "Searching Properties",
      description: `Found ${properties.length} properties matching your criteria.`,
    });
  };

  const handleFilterApply = () => {
    toast({
      title: "Filters Applied",
      description: "Search results updated based on your preferences.",
    });
  };

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
    toast({
      title: favorites.includes(propertyId)
        ? "Removed from Favorites"
        : "Added to Favorites",
      description: favorites.includes(propertyId)
        ? "Property removed from your wishlist."
        : "Property saved to your wishlist.",
    });
  };

  const handleContactOwner = (propertyId: number) => {
    toast({
      title: "Connecting to Owner",
      description: "Opening contact options...",
    });
    // You could open a modal or navigate to contact page
  };

  const handleQuickFilter = (filterType: string) => {
    toast({
      title: "Quick Filter Applied",
      description: `Filtering for ${filterType}...`,
    });
  };

  const handleBedroomSelect = (bedrooms: string) => {
    setSelectedBedrooms((prev) =>
      prev.includes(bedrooms)
        ? prev.filter((b) => b !== bedrooms)
        : [...prev, bedrooms]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // const properties = [
  //   {
  //     id: 1,
  //     title: "Luxury 3BHK Apartment",
  //     location: "Bandra West, Mumbai",
  //     price: "₹2,50,00,000",
  //     type: "Apartment",
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: "1,200 sq ft",
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
  //     rating: 4.8,
  //     views: 245,
  //     featured: true,
  //     tags: ["Luxury", "Prime Location", "Ready to Move"]
  //   },
  //   {
  //     id: 2,
  //     title: "Modern Villa with Garden",
  //     location: "Whitefield, Bangalore",
  //     price: "₹1,80,00,000",
  //     type: "Villa",
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     area: "2,400 sq ft",
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
  //     rating: 4.9,
  //     views: 189,
  //     featured: false,
  //     tags: ["Garden", "Modern", "Family Friendly"]
  //   },
  //   {
  //     id: 3,
  //     title: "Cozy 2BHK Flat",
  //     location: "Koregaon Park, Pune",
  //     price: "₹95,00,000",
  //     type: "Apartment",
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     area: "850 sq ft",
  //     image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500",
  //     rating: 4.6,
  //     views: 156,
  //     featured: false,
  //     tags: ["Affordable", "Well Connected"]
  //   },
  // ];
  const [properties, setproperties] = useState<any[]>([]);

  const getuserdata = async () => {
    const token = localStorage.getItem("access_token");
    const url = "http://127.0.0.1:8000/api/properties/";
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response = await response.json();
    setproperties(Array.isArray(response) ? response : []);
    console.log(response);
  };

  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      {/* Hero Search Section */}
      <div className="hero-gradient py-16">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-xl opacity-90">
              Discover the perfect home with our AI-powered search
            </p>
          </div>

          <Card className="backdrop-blur-xl border-white/20 max-w-4xl mx-auto bg-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by location, keyword, or property type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 text-lg py-6"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 text-primary hover:bg-primary/10"
                    onClick={handleVoiceSearch}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="lg:w-48 bg-white/90">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="btn-hero lg:w-32 py-6"
                  size="lg"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleQuickFilter("3BHK under 50L")}
                >
                  🏠 3BHK under 50L
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleQuickFilter("Luxury Apartments")}
                >
                  🌟 Luxury Apartments
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleQuickFilter("Near Metro")}
                >
                  🏖️ Near Metro
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleQuickFilter("Premium Locations")}
                >
                  💎 Premium Locations
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Property Type Search Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Search Property Types</h2>
          <p className="text-muted-foreground">Find properties by type with instant search</p>
        </div>
        <UnifiedPropertySearch 
          onSearchChange={(query) => {
            setSearchTerm(query);
            getuserdata();
          }}
          onPropertyTypeSelect={(typeId) => {
            setPropertyType(typeId.toString());
            getuserdata();
          }}
        />
      </div>

      {/* Filters and Results */}
   <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         
          <div className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Price Range: ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹
                    {(priceRange[1] / 100000).toFixed(1)}L
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    min={0}
                    step={100000}
                    className="mt-2"
                  />
                </div>

              
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((bed) => (
                      <Button
                        key={bed}
                        variant={
                          selectedBedrooms.includes(bed.toString())
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="aspect-square"
                        onClick={() => handleBedroomSelect(bed.toString())}
                      >
                        {bed}+
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Parking",
                      "Garden",
                      "Security",
                      "Elevator",
                    ].map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full btn-property"
                  onClick={handleFilterApply}
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-sm">🤖 AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium">Based on your search:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Properties in Bandra are trending ↗️</li>
                    <li>• 3BHK apartments have high ROI 📈</li>
                    <li>• Consider nearby Metro stations 🚇</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

         
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Search Results</h2>
                <p className="text-muted-foreground">
                  {properties.length} properties found
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => navigate("/add-property")}
                  className="btn-property"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>

         
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20"
                >
                  <div className="property-image relative h-48">
                    <img
                      src={property.description}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.featured && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        ⭐ Featured
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 ${
                        favorites.includes(property.id)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-white/80 hover:bg-white"
                      }`}
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(property.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <div className="absolute bottom-3 left-3 flex items-center text-white bg-primary/80 px-2 py-1 rounded text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {property.views}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {property.rating}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>

                    <div className="text-2xl font-bold text-primary mb-3">
                      {property.price}
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <Bed className="h-3 w-3 mr-1" />
                        {property.bedrooms} Bed
                      </span>
                      <span className="flex items-center">
                        <Bath className="h-3 w-3 mr-1" />
                        {property.bathrooms} Bath
                      </span>
                      <span className="flex items-center">
                        <Square className="h-3 w-3 mr-1" />
                        {property.area}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {(property.tags ?? []).map(
                        (tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="flex-1 btn-property"
                        onClick={() => handleContactOwner(property.id)}
                      >
                        Contact Owner
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

           
            <div className="flex justify-center pt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div> 
      {/* <Footer /> */}
    </div>
  );
};

export default PropertySearch;


