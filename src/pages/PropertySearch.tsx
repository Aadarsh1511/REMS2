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

const PropertySearch = ({ initialFilters, onFilterChange }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialFilters?.searchTerm || "");
  const [priceRange, setPriceRange] = useState(initialFilters?.priceRange || [0, 1000000]);
  const [propertyType, setPropertyType] = useState(initialFilters?.propertyType || "");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || "relevance");
  
  // Separate state for original and filtered properties
  const [originalProperties, setOriginalProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onstart = () => {
        toast({
          title: "Voice Search Active",
          description: "Listening... Please speak your search query.",
        });
      };

      recognition.onresult = (event) => {
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

  const toggleFavorite = (propertyId) => {
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

  const handleContactOwner = (propertyId) => {
    toast({
      title: "Connecting to Owner",
      description: "Opening contact options...",
    });
  };

  // Apply search filter
  const applySearchFilter = () => {
    let filtered = [...originalProperties];

    // Apply search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(property =>
        (property.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (property.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (property.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (property.type?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Apply property type filter
    if (propertyType && propertyType !== "all") {
      filtered = filtered.filter(property => 
        (property.type?.toLowerCase() || '').includes(propertyType.toLowerCase())
      );
    }

    // Apply sorting
    filtered = sortProperties(filtered, sortBy);
    setFilteredProperties(filtered);
  };
  // Fetch properties from API
  const getUserData = async () => {
    const token = localStorage.getItem("access_token");
    const url = "http://127.0.0.1:8000/api/properties/";
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response = await response.json();
      const properties = Array.isArray(response) ? response : [];
      setOriginalProperties(properties);
      setFilteredProperties(properties); // Initialize filtered properties
    } catch (error) {
      console.error("Error fetching properties:", error);
      setOriginalProperties([]);
      setFilteredProperties([]);
    }
  };

  // Sorting function
  const sortProperties = (properties, sortType) => {
    if (!properties || properties.length === 0) return properties;

    const sorted = [...properties];

    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[₹,]/g, '') || "0");
          const priceB = parseFloat(b.price?.replace(/[₹,]/g, '') || "0");
          return priceA - priceB;
        });
      case "price-high":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[₹,]/g, '') || "0");
          const priceB = parseFloat(b.price?.replace(/[₹,]/g, '') || "0");
          return priceB - priceA;
        });
      case "newest":
        return sorted.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
      case "relevance":
      default:
        return sorted.sort((a, b) => a.id - b.id);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getUserData();
  }, []);

  // Sync with initial filters from Dashboard
  useEffect(() => {
    if (initialFilters) {
      setSearchTerm(initialFilters.searchTerm || "");
      setPriceRange(initialFilters.priceRange || [0, 1000000]);
      setPropertyType(initialFilters.propertyType || "all");
      setSortBy(initialFilters.sortBy || "relevance");
    }
  }, [initialFilters]);

  // Apply search filter when search term or property type changes
  useEffect(() => {
    if (originalProperties.length > 0) {
      applySearchFilter();
    }
  }, [searchTerm, propertyType, originalProperties]);

  // Apply sorting when sortBy changes
  useEffect(() => {
    if (originalProperties.length > 0) {
      applySearchFilter();
    }
  }, [sortBy]);

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value);
    
    // Notify parent component of filter change
    if (onFilterChange) {
      onFilterChange({
        sortBy: value,
        priceRange,
        propertyType,
        searchTerm
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Property Type Search Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Search Property Types</h2>
          <p className="text-muted-foreground">
            Find properties by type with instant search
          </p>
        </div>
        <UnifiedPropertySearch
          onSearchChange={(query) => {
            setSearchTerm(query);
          }}
          onPropertyTypeSelect={(typeId) => {
            setPropertyType(typeId.toString());
          }}
        />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-muted-foreground">
                {filteredProperties.length} properties found
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
              <Select
                value={sortBy}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
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
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20"
              >
                <div className="property-image relative h-48">
                  <img
                    src={property.image || property.description || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"}
                    alt={property.title || "Property"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500";
                    }}
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
                    {property.views || 0}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      {property.title || "Untitled Property"}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {property.rating || "4.0"}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location || "Location not specified"}
                  </p>

                  <div className="text-2xl font-bold text-primary mb-3">
                    {property.price ? `₹${property.price}` : "Price on request"}
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Bed className="h-3 w-3 mr-1" />
                      {property.bedrooms || 0} Bed
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-3 w-3 mr-1" />
                      {property.bathrooms || 0} Bath
                    </span>
                    <span className="flex items-center">
                      <Square className="h-3 w-3 mr-1" />
                      {property.area || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {(property.tags || []).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
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

          {filteredProperties.length === 0 && originalProperties.length > 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try different search terms or clear filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setPropertyType("");
                }}
              >
                Clear Search
              </Button>
            </div>
          )}

          {originalProperties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                No properties available at the moment
              </p>
            </div>
          )}

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
  );
};

export default PropertySearch;
