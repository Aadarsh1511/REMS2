import { useState } from "react";
import { Search, MapPin, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SearchInterface = () => {
  const [activeSearchTab, setActiveSearchTab] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownValue, setDropdownValue] = useState("all-residential");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTabs = ["Buy", "Rent", "New Launch", "Commercial", "Plots/Land", "Projects", "Post Property"];
  const popularSearches = ["Jaipur", "Bangalore", "Chennai", "Mumbai", "Hyderabad", "Pune", "Delhi NCR", "Ahmedabad"];

  const getPlaceholderText = () => {
    switch (activeSearchTab) {
      case "Buy": return 'Search "Hyderabad"';
      case "Rent": return 'Search for rental properties "Mumbai"';
      case "New Launch": return 'Search new projects "Bangalore"';
      case "Commercial": return 'Search commercial spaces "Delhi"';
      case "Plots/Land": return 'Search plots/land "Chennai"';
      case "Projects": return 'Search projects "Pune"';
      case "Post Property": return 'Enter property details';
      default: return 'Search location';
    }
  };

  const getDropdownOptions = () => {
    switch (activeSearchTab) {
      case "Buy":
      case "Rent":
        return [
          { value: "all-residential", label: "All Residential" },
          { value: "apartments", label: "Apartments" },
          { value: "villas", label: "Villas" },
          { value: "plots", label: "Plots" },
        ];
      case "New Launch":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "apartments", label: "Apartment Projects" },
          { value: "villas", label: "Villa Projects" },
        ];
      case "Commercial":
        return [
          { value: "all-commercial", label: "All Commercial" },
          { value: "office", label: "Office Space" },
          { value: "retail", label: "Retail Space" },
          { value: "warehouse", label: "Warehouse" },
        ];
      case "Plots/Land":
        return [
          { value: "all-plots", label: "All Plots/Land" },
          { value: "residential-plots", label: "Residential Plots" },
          { value: "commercial-plots", label: "Commercial Plots" },
          { value: "agricultural", label: "Agricultural Land" },
        ];
      case "Projects":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "ongoing", label: "Ongoing Projects" },
          { value: "completed", label: "Completed Projects" },
        ];
      case "Post Property":
        return [
          { value: "property-type", label: "Select Property Type" },
          { value: "residential", label: "Residential" },
          { value: "commercial", label: "Commercial" },
        ];
      default:
        return [{ value: "all-residential", label: "All Residential" }];
    }
  };

  const getDropdownValue = () => {
    switch (activeSearchTab) {
      case "Buy":
      case "Rent":
        return "all-residential";
      case "New Launch":
      case "Projects":
        return "all-projects";
      case "Commercial":
        return "all-commercial";
      case "Plots/Land":
        return "all-plots";
      case "Post Property":
        return "property-type";
      default:
        return "all-residential";
    }
  };

  const getButtonText = () => {
    return activeSearchTab === "Post Property" ? "Post Free Ad" : "Search";
  };

  // API call for search
 const handleSearch = async () => {
  setLoading(true);
  setResults([]);

  try {
    const token = localStorage.getItem("access_token");
    console.log("Token from localStorage:", token);

    const response = await fetch(
      `http://127.0.0.1:8000/api/properties/search/?q=${encodeURIComponent(searchQuery)}&type=${dropdownValue}&tab=${activeSearchTab}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // ya 'Token' depending on backend
        }
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setResults(data.results || data);
  } catch (error) {
    console.error("API Error:", error);
    setResults([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-search">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 border-b pb-4 justify-center">
          {searchTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeSearchTab === tab ? "default" : "ghost"}
              className={cn(
                "text-xs sm:text-sm px-3 py-1 sm:py-2 rounded-none",
                activeSearchTab === tab
                  ? "text-primary border-b-2 border-primary bg-transparent hover:bg-transparent"
                  : "text-gray-600 hover:text-primary"
              )}
              onClick={() => {
                setActiveSearchTab(tab);
                setDropdownValue(getDropdownValue());
              }}
            >
              {tab}
              {tab === "New Launch" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {tab === "Post Property" && (
                <span className="ml-1 px-1 sm:px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  FREE
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Search Fields */}
        <div className="flex flex-col gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getPlaceholderText()}
                className="pl-10 pr-16 sm:pr-20 h-10 sm:h-12 border-gray-200 focus:border-primary text-sm sm:text-base"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100">
                  <MapPin className="h-3 sm:h-4 w-3 sm:w-4 text-primary" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100">
                  <Mic className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
                </Button>
              </div>
            </div>

            <Select
              value={dropdownValue}
              onValueChange={(value) => setDropdownValue(value)}
            >
              <SelectTrigger className="w-full sm:w-48 h-10 sm:h-12 border-gray-200 focus:border-primary text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getDropdownOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              className="bg-primary hover:bg-primary/90 h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : getButtonText()}
            </Button>
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Popular Search</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-gray-600 border-gray-200 hover:border-primary hover:text-primary rounded-full text-xs sm:text-sm px-3 py-1.5"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="mt-6">
          {loading && <div className="text-center text-gray-500">Loading...</div>}
          {!loading && results.length > 0 && (
            <div className="grid gap-4">
              {results.map((property, idx) => (
                <div key={property.id || idx} className="border rounded-lg p-4 shadow-sm">
                  <div className="font-semibold text-lg">{property.title || property.propertyTitle}</div>
                  <div className="text-sm text-gray-600">{property.location || property.address}</div>
                  <div className="text-sm text-gray-500">{property.price ? `₹${property.price}` : ""}</div>
                  {/* Add more property info as needed */}
                </div>
              ))}
            </div>
          )}
          {/* {!loading && results.length === 0 && (
            <div className="text-center text-gray-400">No properties found.</div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
