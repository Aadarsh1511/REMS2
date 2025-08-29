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

const sampleProperties = [
  {
    id: "1",
    image: " ",
    title: "Luxury Skyline Apartments",
    builder: "DLF Limited",
    location: "Sector 54, Gurgaon",
    bhkOptions: [
      { bhk: "2 BHK", price: "90 L" },
      { bhk: "3 BHK", price: "1.2 Cr" },
    ],
    description:
      "Premium apartments with modern amenities and excellent connectivity to business districts. Features include clubhouse, swimming pool, and 24/7 security.",
    badges: ["Zero Brokerage", "RERA Approved"],
    ribbon: "Ready to Move – Dec 2024",
    amenities: ["Parking", "Security", "Wifi", "Camera"],
  },
  {
    id: "2",
    image: " ",
    title: "Emerald Villa Estates",
    builder: "Prestige Group",
    location: "Whitefield, Bangalore",
    bhkOptions: [
      { bhk: "3 BHK Villa", price: "1.8 Cr" },
      { bhk: "4 BHK Villa", price: "2.5 Cr" },
    ],
    description:
      "Luxurious independent villas with private gardens and premium finishes. Located in the heart of Bangalore's IT corridor with excellent schools nearby.",
    badges: ["New Booking", "Premium Location"],
    ribbon: "Completion in 2025",
    amenities: ["Parking", "Security", "Camera"],
  },
  {
    id: "3",
    image: " ",
    title: "Metro Heights Residency",
    builder: "Godrej Properties",
    location: "Dwarka, Delhi",
    bhkOptions: [
      { bhk: "1 BHK", price: "75 L" },
      { bhk: "2 BHK", price: "95 L" },
      { bhk: "3 BHK", price: "1.4 Cr" },
    ],
    description:
      "Modern high-rise apartments with metro connectivity. Features state-of-the-art amenities and green building certification.",
    badges: ["Metro Connected", "Green Building"],
    ribbon: "Ready to Move – Aug 2024",
    amenities: ["Parking", "Wifi", "Security"],
  },
  {
    id: "4",
    image: " ",
    title: "Tech Hub Commercial Plaza",
    builder: "Tata Housing",
    location: "Hinjewadi, Pune",
    bhkOptions: [
      { bhk: "Office Space", price: "65 L" },
      { bhk: "Retail Shop", price: "45 L" },
    ],
    description:
      "Premium commercial spaces in Pune's leading IT hub. Perfect for businesses looking for modern infrastructure and connectivity.",
    badges: ["Commercial", "IT Hub Location"],
    ribbon: "Ready for Possession – Sep 2024",
    amenities: ["Parking", "Security", "Wifi"],
  },
];

const featuredProperties = [
  {
    id: "5",
    image: " ",
    title: "Royal Garden Residency",
    builder: "Lodha Group",
    location: "Palava City, Mumbai",
    bhkOptions: [
      { bhk: "2 BHK", price: "1.1 Cr" },
      { bhk: "3 BHK", price: "1.6 Cr" },
    ],
    description:
      "Award-winning residential project with world-class amenities and sustainable living features in India's first smart city.",
    badges: ["Featured", "Smart City"],
    ribbon: "Limited Units Available",
    amenities: ["Parking", "Security", "Wifi", "Camera"],
  },
  {
    id: "6",
    image: " ",
    title: "Infinity Sky Towers",
    builder: "Brigade Group",
    location: "Electronic City, Bangalore",
    bhkOptions: [
      { bhk: "3 BHK", price: "1.8 Cr" },
      { bhk: "4 BHK", price: "2.4 Cr" },
    ],
    description:
      "Luxury high-rise apartments with panoramic city views and premium clubhouse facilities in Bangalore's IT hub.",
    badges: ["Featured", "High Rise"],
    ribbon: "Possession by Mar 2025",
    amenities: ["Parking", "Security", "Wifi"],
  },
];

const readyToMoveProperties = [
  {
    id: "7",
    image: " ",
    title: "Green Valley Apartments",
    builder: "Mahindra Lifespace",
    location: "Kandivali West, Mumbai",
    bhkOptions: [
      { bhk: "2 BHK", price: "85 L" },
      { bhk: "3 BHK", price: "1.2 Cr" },
    ],
    description:
      "Eco-friendly apartments with lush green surroundings and excellent connectivity to Western Express Highway.",
    badges: ["Ready to Move", "Eco-Friendly"],
    ribbon: "Immediate Possession Available",
    amenities: ["Parking", "Security", "Camera"],
  },
  {
    id: "8",
    image: " ",
    title: "Urban Square Complex",
    builder: "Puravankara Limited",
    location: "Noida Extension, Delhi NCR",
    bhkOptions: [
      { bhk: "2 BHK", price: "78 L" },
      { bhk: "3 BHK", price: "1.1 Cr" },
    ],
    description:
      "Modern residential complex with shopping mall, food court and entertainment facilities within the premises.",
    badges: ["Ready to Move", "Integrated Complex"],
    ribbon: "Keys Ready - Move in Today",
    amenities: ["Parking", "Wifi", "Security"],
  },
];

const premiumProjects = [
  {
    id: "9",
    image: " ",
    title: "Platinum Heights",
    builder: "Oberoi Realty",
    location: "Worli, Mumbai",
    bhkOptions: [
      { bhk: "3 BHK", price: "4.5 Cr" },
      { bhk: "4 BHK", price: "6.8 Cr" },
    ],
    description:
      "Ultra-luxury residences with private elevators, concierge services and breathtaking views of Arabian Sea.",
    badges: ["Premium", "Sea View"],
    ribbon: "Ultra-Luxury Collection",
    amenities: ["Parking", "Security", "Wifi", "Camera"],
  },
  {
    id: "10",
    image: " ",
    title: "Diamond District Villas",
    builder: "Hiranandani Group",
    location: "Powai, Mumbai",
    bhkOptions: [
      { bhk: "4 BHK Villa", price: "5.2 Cr" },
      { bhk: "5 BHK Villa", price: "7.5 Cr" },
    ],
    description:
      "Exclusive collection of luxury villas with private gardens, swimming pools and premium security in gated community.",
    badges: ["Premium", "Gated Community"],
    ribbon: "Exclusive Launch - Limited Edition",
    amenities: ["Parking", "Security", "Camera"],
  },
];

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
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

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

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found");
    }

    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const requestOptions = {
      method: "GET",
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
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
    } else {
      console.error("❌ API Error:", response.status);
      setProperties([]);
    }
  } catch (error) {
    console.error("Error:", error);
    setProperties([]);
  } finally {
    setLoading(false);
  }
};






const fetchPropertiesAPIFiltered = async (search = "", type: number | string = "") => {
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

const fetchPropertiesSimplified = async (search = "", type: number | string = "") => {
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

    fetchProperties(searchTerm, apiValue).finally(() => {
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
      const propertiesArray = Array.isArray(propertiesData) ? propertiesData : [];
      
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
            const amenitiesArray = Array.isArray(amenitiesData) ? amenitiesData : [];
            
            return {
              ...property,
              amenities: amenitiesArray.map(amenity => amenity.amenity || amenity)
            };
          } catch (error) {
            console.error(`Failed to fetch amenities for property ${property.id}:`, error);
            return {
              ...property,
              amenities: []
            };
          }
        })
      );
      
      setProperties(propertiesWithAmenities);
      console.log("Properties with amenities:", propertiesWithAmenities);
      if (propertiesWithAmenities.length > 0) {
        console.log("First property amenities:", propertiesWithAmenities[0].amenities);
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

    const [getaminitie,setgetaminitie]=useState<any[]>([])
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
    console.log("aminities:",response);
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
                    <FilterSidebar />
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
              <FilterSidebar />
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
                        : `${properties.length} properties found`}
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
                    {properties.length > 0 ? (
                      properties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          id={property.id.toString()}
                          image={property.cover_image || ""}
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

              {/* Sample Properties Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Featured Listings
                    <span className="text-sm text-muted-foreground font-normal ml-2">
                      ({sampleProperties.length} properties)
                    </span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {sampleProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      {...property}
                      isWishlisted={wishlistedProperties.includes(property.id)}
                      onWishlistToggle={handleWishlistToggle}
                    />
                  ))}
                </div>
              </div>

              {/* New Launches Carousel */}
              <NewLaunchesCarousel />

              {/* Featured Properties Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Featured Properties
                    <span className="text-sm text-muted-foreground font-normal ml-2">
                      ({featuredProperties.length} featured properties)
                    </span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {featuredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      {...property}
                      isWishlisted={wishlistedProperties.includes(property.id)}
                      onWishlistToggle={handleWishlistToggle}
                    />
                  ))}
                </div>
              </div>

              {/* Ready to Move Properties Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Ready to Move Properties
                    <span className="text-sm text-muted-foreground font-normal ml-2">
                      ({readyToMoveProperties.length} ready properties)
                    </span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {readyToMoveProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      {...property}
                      isWishlisted={wishlistedProperties.includes(property.id)}
                      onWishlistToggle={handleWishlistToggle}
                    />
                  ))}
                </div>
              </div>

              {/* Premium Projects Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Premium Projects
                    <span className="text-sm text-muted-foreground font-normal ml-2">
                      ({premiumProjects.length} premium projects)
                    </span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {premiumProjects.map((property) => (
                    <PropertyCard
                      key={property.id}
                      {...property}
                      isWishlisted={wishlistedProperties.includes(property.id)}
                      onWishlistToggle={handleWishlistToggle}
                    />
                  ))}
                </div>
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
