import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import UnifiedPropertySearch from "@/components/UnifiedPropertySearch";
import { useSearch } from "@/context/SearchContext";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Star,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const PropertySearch = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const { searchParams } = useSearch();
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const [originalProperties, setOriginalProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [propertyImages, setPropertyImages] = useState({});
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  // useEffect for client-side filtering based on local search term
  useEffect(() => {
    const filtered = originalProperties.filter(property => {
      const searchTerm = localSearchTerm.toLowerCase();
      if (!searchTerm) return true; // If no search term, show all

      return (
        property.title?.toLowerCase().includes(searchTerm) ||
        property.location?.toLowerCase().includes(searchTerm) ||
        property.address?.toLowerCase().includes(searchTerm) ||
        property.builder?.toLowerCase().includes(searchTerm) ||
        property.bedrooms?.toString().includes(searchTerm)
      );
    });
    setFilteredProperties(sortProperties(filtered, sortBy));
  }, [localSearchTerm, originalProperties, sortBy]);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("access_token");
      const url = new URL("http://127.0.0.1:8000/api/properties/");
      
      if (searchParams.keyword) {
        url.searchParams.append("search", searchParams.keyword);
      }
      if (searchParams.propertyType && searchParams.propertyType !== 'all') {
        url.searchParams.append("property_type", searchParams.propertyType);
      }

      try {
        const response = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        const propertiesList = data?.results || (Array.isArray(data) ? data : []);
        setOriginalProperties(propertiesList);
        // setFilteredProperties(sortProperties(propertiesList, sortBy)); // This will be handled by the other useEffect
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({ title: "Error", description: "Could not fetch properties." });
        setOriginalProperties([]);
        setFilteredProperties([]);
      }
    };

    fetchProperties();
  }, [searchParams]); // Removed sortBy dependency to prevent re-fetching on sort change


  const sortProperties = (properties, sortType) => {
    const sorted = [...properties];
    switch (sortType) {
      case "price-low":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "newest":
        return sorted.sort((a, b) => new Date(b.listed_on).getTime() - new Date(a.listed_on).getTime());
      case "relevance":
      default:
        return sorted.sort((a, b) => (b.ai_recommended_score || 0) - (a.ai_recommended_score || 0));
    }
  };

  

  const handleSortChange = (value) => {
    setSortBy(value);
    if (onFilterChange) {
      onFilterChange({ sortBy: value, priceRange });
    }
  };

  const getPropertyImageURL = (property) => {
    const images = propertyImages[property.slug];
    if (!images || !Array.isArray(images) || images.length === 0) {
      return '/placeholder.svg';
    }
    const primaryImage = images.find(img => img.is_primary);
    if (primaryImage && primaryImage.image) {
      return primaryImage.image;
    }
    return images[0]?.image || '/placeholder.svg';
  };

  const toggleFavorite = (e, propertySlug) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(propertySlug)
        ? prev.filter((slug) => slug !== propertySlug)
        : [...prev, propertySlug]
    );
    toast({
      title: favorites.includes(propertySlug) ? "Removed from Favorites" : "Added to Favorites",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Find Your Perfect Property</h2>
          <p className="text-muted-foreground mb-4">Search across thousands of listings with advanced filters.</p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Type to filter by title, location, builder..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
        
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-muted-foreground">{filteredProperties.length} properties found</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/add-property")} className="btn-property">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>Grid</Button>
                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>List</Button>
              </div>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
            {filteredProperties.map((property) => (
              <Card
                key={property.slug}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20 group"
                onClick={() => navigate(`/property/${property.slug}`)}
              >
                <div className="relative h-56">
                  <img
                    src={getPropertyImageURL(property)}
                    alt={property.title || "Property"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{property.category}</Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                    onClick={(e) => toggleFavorite(e, property.slug)}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(property.slug) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold truncate">{property.title}</h3>
                    <p className="text-sm flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {property.location}</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-extrabold text-primary">₹{parseFloat(property.price).toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{property.ai_recommended_score ? (property.ai_recommended_score * 5).toFixed(1) : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex justify-around items-center text-center border-t border-b py-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Bed className="h-5 w-5 text-primary/80" /><span>{property.bedrooms} Beds</span></div>
                    <div className="flex items-center gap-2"><Bath className="h-5 w-5 text-primary/80" /><span>{property.bathrooms} Baths</span></div>
                    <div className="flex items-center gap-2"><Square className="h-5 w-5 text-primary/80" /><span>{property.area_sqft} sqft</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(property.tags || []).slice(0, 4).map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;