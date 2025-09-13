import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterSidebar } from "./FilterSidebar";
import { PropertyCard } from "./PropertyCard";
import { NewLaunchesCarousel } from "./NewLaunchesCarousel";
import { useNavigate } from "react-router-dom";

export const Index2 = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wishlistedProperties, setWishlistedProperties] = useState<string[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Filter properties based on FilterSidebar selections
  const handleFilterChange = (filters: any) => {
    let filtered = [...properties];

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          property.location
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          property.address
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          property.description
            ?.toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter((property) => {
        const propertyTitle = property.title?.toLowerCase() || "";
        const propertyDescription = property.description?.toLowerCase() || "";

        return filters.propertyTypes.some(
          (type) =>
            propertyTitle.includes(type.toLowerCase()) ||
            propertyDescription.includes(type.toLowerCase()) ||
            (type.toLowerCase() === "apartment" &&
              (propertyTitle.includes("apartment") ||
                propertyTitle.includes("flat"))) ||
            (type.toLowerCase() === "villa" &&
              propertyTitle.includes("villa")) ||
            (type.toLowerCase() === "house" &&
              propertyTitle.includes("house")) ||
            (type.toLowerCase() === "commercial" &&
              propertyTitle.includes("commercial"))
        );
      });
    }

    // Filter by location
    if (filters.locations.length > 0) {
      filtered = filtered.filter((property) => {
        const propertyLocation = property.location || property.address || "";
        return filters.locations.some(
          (location) =>
            propertyLocation.toLowerCase().includes(location.toLowerCase()) ||
            property.title?.toLowerCase().includes(location.toLowerCase())
        );
      });
    }

    // Filter by BHK
    if (filters.bhkOptions.length > 0) {
      filtered = filtered.filter((property) =>
        filters.bhkOptions.some(
          (bhk) =>
            property.bedrooms?.toString() === bhk.replace(/[^0-9]/g, "") ||
            property.bhkOptions?.some((option) => option.bhk?.includes(bhk))
        )
      );
    }

    // Filter by price range (convert lakhs to actual price)
    const minPrice = filters.priceRange[0] * 100000;
    const maxPrice = filters.priceRange[1] * 100000;

    filtered = filtered.filter((property) => {
      const price = parseFloat(property.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) =>
        filters.amenities.some((amenity) =>
          (property.amenities || []).some((propAmenity) =>
            typeof propAmenity === "string"
              ? propAmenity.includes(amenity)
              : (propAmenity.amenity || propAmenity.name || "").includes(
                  amenity
                )
          )
        )
      );
    }

    setFilteredProperties(filtered);
  };

  // Fetch property types on component mount
  useEffect(() => {
    fetchPropertyTypes();
    fetchProperties(); // Initial load of all properties
    setTimeout(() => {
      if (propertyTypes.length === 0) {
        console.log("🔄 Adding fallback property types...");
        setPropertyTypes([
          { id: 1, name: "Apartment" },
          { id: 2, name: "Villa" },
          { id: 3, name: "House" },
          { id: 4, name: "Commercial" },
          { id: 5, name: "Plot" },
        ]);
      }
    }, 3000); // Wait 3 seconds for API response
  }, []);
  useEffect(() => {
    console.log("📋 PropertyTypes State Updated:", propertyTypes);
  }, [propertyTypes]);

  // Copy-paste this in your browser console to test API directly

  const fetchPropertyTypes = async () => {
    // console.log("🚀 Starting fetchPropertyTypes...");

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("❌ No access token found");
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive",
        });
        return;
      }

      // console.log("🔑 Making API call to property-types...");

      const response = await fetch(
        "http://127.0.0.1:8000/api/property-types/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("📡 Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
      });

      if (response.ok) {
        const rawData = await response.text(); // Get raw text first
        // console.log("📄 Raw response text:", rawData);

        try {
          const data = JSON.parse(rawData);
          // console.log("📊 Parsed JSON data:", data);

          // Handle different response structures
          let propertyTypesArray = [];

          if (Array.isArray(data)) {
            propertyTypesArray = data;
          } else if (data.results && Array.isArray(data.results)) {
            propertyTypesArray = data.results;
          } else if (data.data && Array.isArray(data.data)) {
            propertyTypesArray = data.data;
          } else if (
            data.property_types &&
            Array.isArray(data.property_types)
          ) {
            propertyTypesArray = data.property_types;
          }

          console.log("🏠 Final property types array:", propertyTypesArray);

          setPropertyTypes(propertyTypesArray);

          if (propertyTypesArray.length === 0) {
            console.warn("⚠️ Property types array is empty");
            toast({
              title: "No Property Types",
              description: "No property types found in the system",
            });
          }
        } catch (parseError) {
          console.error("❌ JSON Parse Error:", parseError);
          console.error("❌ Raw response was:", rawData);

          toast({
            title: "Data Format Error",
            description: "Invalid response format from server",
            variant: "destructive",
          });
        }
      } else {
        const errorText = await response.text();
        console.error("❌ HTTP Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        if (response.status === 401) {
          toast({
            title: "Authentication Failed",
            description: "Please log in again",
            variant: "destructive",
          });
          // Redirect to login or refresh token
        } else if (response.status === 404) {
          toast({
            title: "API Endpoint Not Found",
            description: "Property types endpoint not available",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Server Error",
            description: `HTTP ${response.status}: ${response.statusText}`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("💥 Network/General Error:", error);
      toast({
        title: "Network Error",
        description: `Failed to connect: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Create a centralized API helper function

  const makeAuthenticatedRequest = async (
    url: string,
    options: RequestInit = {}
  ) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found");
    }

    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const requestOptions: RequestInit = {
      method: "GET",
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    // console.log("🔑 Making request to:", url);
    console.log("🔑 With headers:", requestOptions.headers);

    return fetch(url, requestOptions);
  };

  // Update your fetchProperties function
  const fetchProperties = async (search = "", type = "") => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search?.trim()) queryParams.append("search", search.trim());
      if (type && type !== "all" && type !== "") {
        queryParams.append("property_type", type);
      }

      const url = `http://127.0.0.1:8000/api/properties/?${queryParams}`;
      console.log("🌐 API URL:", url);

      const response = await makeAuthenticatedRequest(url);

      if (response.ok) {
        const data = await response.json();
        const propertiesArray = Array.isArray(data) ? data : data.results || [];
        console.log("📊 Properties received:", propertiesArray.length);
        setProperties(propertiesArray);
        setFilteredProperties(propertiesArray); // Initialize filtered properties
      } else {
        console.error("❌ API Error:", response.status);
        setProperties([]);
        setFilteredProperties([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertiesAPIFiltered = async (
    search = "",
    type: number | string = ""
  ) => {
    console.log("🔍 Search parameters:", { search, type });
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (search && search.trim()) {
        queryParams.append("search", search.trim());
      }

      if (type && type !== "" && type !== "all") {
        queryParams.append("property_type", type.toString());
      }

      const url = `http://127.0.0.1:8000/api/properties/${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;

      console.log("🌐 API URL:", url);

      const response = await makeAuthenticatedRequest(url);

      if (response.ok) {
        const data = await response.json();
        console.log("📊 API Response:", data);

        // Extract properties array
        let propertiesArray = [];
        if (Array.isArray(data)) {
          propertiesArray = data;
        } else if (data.results) {
          propertiesArray = data.results;
        } else if (data.data) {
          propertiesArray = data.data;
        }

        console.log("🏠 Properties to display:", propertiesArray);

        // Trust the API completely - no client-side filtering
        setProperties(propertiesArray);

        toast({
          title: "Search Results",
          description: `Found ${propertiesArray.length} properties`,
        });
      } else {
        console.error("❌ API Error - Status:", response.status);
        const errorText = await response.text();
        console.error("❌ Error details:", errorText);
        setProperties([]);

        toast({
          title: "Search Error",
          description: "Failed to fetch properties. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("💥 Network Error:", error);
      setProperties([]);

      toast({
        title: "Network Error",
        description: "Unable to connect to server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertiesSimplified = async (
    search = "",
    type: number | string = ""
  ) => {
    console.log("🔍 Search parameters:", { search, type });
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (search && search.trim()) {
        queryParams.append("search", search.trim());
      }

      if (type && type !== "" && type !== "all") {
        queryParams.append("property_type", type.toString());
      }

      const url = `http://127.0.0.1:8000/api/properties/${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;

      // console.log("🌐 API URL:", url);

      const response = await makeAuthenticatedRequest(url);

      if (response.ok) {
        const data = await response.json();
        console.log("📊 Complete API Response:", data);

        // Extract properties array
        let propertiesArray = [];
        if (Array.isArray(data)) {
          propertiesArray = data;
        } else if (data.results) {
          propertiesArray = data.results;
        } else if (data.data) {
          propertiesArray = data.data;
        }

        console.log("🏠 Final properties to display:", propertiesArray);
        console.log("📈 Properties count:", propertiesArray.length);

        // Trust the API - no client-side filtering
        setProperties(propertiesArray);

        toast({
          title: "Search Results",
          description: `Found ${propertiesArray.length} properties`,
        });
      } else {
        console.error("❌ API Error - Status:", response.status);
        const errorText = await response.text();
        console.error("❌ Error details:", errorText);
        setProperties([]);
      }
    } catch (error) {
      console.error("💥 Network Error:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (propertyId: string) => {
    setWishlistedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

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
        // Automatically trigger search with voice input
        fetchProperties(transcript, propertyType);
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

  const handleClearFilters = () => {
    setSearchTerm("");
    setPropertyType("");
    setProperties([]);

    // Fetch all properties without any filters
    fetchProperties("", "");

    toast({
      title: "Filters Cleared",
      description: "Showing all available properties",
    });
  };

  const handleSearch = () => {
    console.log("🔍 Manual search triggered with:", {
      searchTerm,
      propertyType,
    });
    setSearchLoading(true);

    // Clear current results
    setProperties([]);

    const apiValue =
      propertyType === "all" || propertyType === ""
        ? ""
        : parseInt(propertyType, 10);

    fetchProperties(searchTerm, apiValue.toString()).finally(() => {
      setSearchLoading(false);
    });
  };

  // Handle property type change
  const handlePropertyTypeChange = (value: string) => {
    console.log("📌 Selected propertyType value:", value);
    setPropertyType(value);

    console.log("🔄 Fetching with search:", searchTerm, "and type:", value);
    fetchProperties(searchTerm, value);
  };

  // Handle Enter key press in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  function handleQuickFilter(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  const getuserdata = async () => {
    const token = localStorage.getItem("access_token");
    const url = "http://127.0.0.1:8000/api/properties/";
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const propertiesData = await response.json();
      const propertiesArray = Array.isArray(propertiesData)
        ? propertiesData
        : [];

      // Fetch amenities for each property
      const propertiesWithAmenities = await Promise.all(
        propertiesArray.map(async (property) => {
          try {
            const amenitiesResponse = await fetch(
              `http://127.0.0.1:8000/api/property-amenities/?property=${property.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const amenitiesData = await amenitiesResponse.json();
            const amenitiesArray = Array.isArray(amenitiesData)
              ? amenitiesData
              : [];

            return {
              ...property,
              amenities: [
                ...new Set(
                  amenitiesArray.map((amenity) =>
                    typeof amenity === "string"
                      ? amenity
                      : amenity.amenity || amenity.name || "Unknown"
                  )
                ),
              ],
            };
          } catch (error) {
            console.error(
              `Failed to fetch amenities for property ${property.id}:`,
              error
            );
            return {
              ...property,
              amenities: [],
            };
          }
        })
      );

      setProperties(propertiesWithAmenities);
      setFilteredProperties(propertiesWithAmenities); // Initialize filtered properties
      console.log("Properties with amenities:", propertiesWithAmenities);
      if (propertiesWithAmenities.length > 0) {
        console.log(
          "First property amenities:",
          propertiesWithAmenities[0].amenities
        );
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };

  useEffect(() => {
    getuserdata();
    getanimities();
  }, []);

  const [getaminitie, setgetaminitie] = useState<any[]>([]);
  const getanimities = async () => {
    const token = localStorage.getItem("access_token");
    const url = "http://127.0.0.1:8000/api/property-amenities/";
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response = await response.json();
    setgetaminitie(Array.isArray(response) ? response : []);
    // console.log("aminities:",response);
  };

  return (
    <>
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
                    onKeyPress={handleSearchKeyPress}
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
                <Select
                  value={propertyType}
                  onValueChange={handlePropertyTypeChange}
                >
                  <SelectTrigger className="lg:w-48 bg-white/90">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Property Types</SelectItem>
                    {propertyTypes.length > 0 ? (
                      propertyTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="1">Apartment</SelectItem>
                        <SelectItem value="2">Villa</SelectItem>
                        <SelectItem value="3">House</SelectItem>
                        <SelectItem value="4">Commercial</SelectItem>
                        <SelectItem value="5">Plot</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Button
                  className="btn-hero lg:w-32 py-6"
                  size="lg"
                  onClick={handleSearch}
                  disabled={searchLoading}
                >
                  {searchLoading ? "Searching..." : "Search"}
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

      <div className="min-h-screen bg-gradient-surface">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-soft">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Zenith Home Findr
                </h1>
              </div>

              {/* Mobile Filter Toggle */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 pb-0">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-6">
                    <FilterSidebar
                      onFilterChange={handleFilterChange}
                      properties={properties}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-80 flex-shrink-0">
              <FilterSidebar
                onFilterChange={handleFilterChange}
                properties={properties}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-8">
              {/* Search Results from API */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Search Results</h2>
                    <p className="text-muted-foreground">
                      {loading
                        ? "Loading..."
                        : `${
                            filteredProperties.length > 0
                              ? filteredProperties.length
                              : properties.length
                          } properties found`}
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
                        {propertyTypes.length > 0 ? (
                          propertyTypes.map((type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.name}
                            </SelectItem>
                          ))
                        ) : (
                          // Fallback options
                          <>
                            <SelectItem value="1">Apartment</SelectItem>
                            <SelectItem value="2">Villa</SelectItem>
                            <SelectItem value="3">House</SelectItem>
                            <SelectItem value="4">Commercial</SelectItem>
                            <SelectItem value="5">Plot</SelectItem>
                          </>
                        )}
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

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">
                      Loading properties...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(filteredProperties.length > 0
                      ? filteredProperties
                      : properties
                    ).length > 0 ? (
                      (filteredProperties.length > 0
                        ? filteredProperties
                        : properties
                      ).map((property) => (
                        <PropertyCard
                          key={property.id}
                          id={property.id.toString()}
                          image={
                            property.images?.find((img: any) => img.is_primary)
                              ?.image ||
                            property.images?.[0]?.image ||
                            ""
                          }
                          title={property.title || property.name}
                          builder={property.builder || "N/A"}
                          location={property.location || property.address}
                          bhkOptions={property.bhkOptions || []}
                          description={property.description}
                          badges={property.badges || []}
                          ribbon={property.ribbon || ""}
                          bedrooms={property.bedrooms}
                          bathrooms={property.bathrooms}
                          price={property.price}
                          amenities={property.amenities || []}
                          isWishlisted={wishlistedProperties.includes(
                            property.id.toString()
                          )}
                          onWishlistToggle={handleWishlistToggle}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No properties found matching your criteria.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchTerm("");
                            setPropertyType("");
                            setFilteredProperties([]);
                            fetchProperties();
                          }}
                          className="mt-4"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
