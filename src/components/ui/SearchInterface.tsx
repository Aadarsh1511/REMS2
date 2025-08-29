import { useState } from "react";
import { Search, MapPin, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SearchInterface = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [activeSearchTab, setActiveSearchTab] = useState("Buy");

  const mainTabs = ["Buy", "Rent", "Sell", "Commercial"];
  const searchTabs = ["Buy", "Rent", "New Launch", "Commercial", "Plots/Land", "Projects", "Post Property"];
  const popularSearches = [
    "Jersey City", "Journal square", "Hoboken", "Bryant park", 
    "Tribeca", "Dumbo", "kumbo", "kunming"
  ];

  const getPlaceholderText = () => {
    switch (activeSearchTab) {
      case "Buy":
        return 'Search "Hyderabad"';
      case "Rent":
        return 'Search for rental properties "Mumbai"';
      case "New Launch":
        return 'Search new projects "Bangalore"';
      case "Commercial":
        return 'Search commercial spaces "Delhi"';
      case "Plots/Land":
        return 'Search plots/land "Chennai"';
      case "Projects":
        return 'Search projects "Pune"';
      case "Post Property":
        return 'Enter property details';
      default:
        return 'Search location';
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
          { value: "plots", label: "Plots" }
        ];
      case "New Launch":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "apartments", label: "Apartment Projects" },
          { value: "villas", label: "Villa Projects" }
        ];
      case "Commercial":
        return [
          { value: "all-commercial", label: "All Commercial" },
          { value: "office", label: "Office Space" },
          { value: "retail", label: "Retail Space" },
          { value: "warehouse", label: "Warehouse" }
        ];
      case "Plots/Land":
        return [
          { value: "all-plots", label: "All Plots/Land" },
          { value: "residential-plots", label: "Residential Plots" },
          { value: "commercial-plots", label: "Commercial Plots" },
          { value: "agricultural", label: "Agricultural Land" }
        ];
      case "Projects":
        return [
          { value: "all-projects", label: "All Projects" },
          { value: "ongoing", label: "Ongoing Projects" },
          { value: "completed", label: "Completed Projects" }
        ];
      case "Post Property":
        return [
          { value: "property-type", label: "Select Property Type" },
          { value: "residential", label: "Residential" },
          { value: "commercial", label: "Commercial" }
        ];
      default:
        return [
          { value: "all-residential", label: "All Residential" }
        ];
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
    switch (activeSearchTab) {
      case "Post Property":
        return "Post Free Ad";
      default:
        return "Search";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Interface */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-search">
        {/* Search Tabs */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 border-b pb-4">
          {searchTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeSearchTab === tab ? "default" : "ghost"}
              className={cn(
                "relative text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2",
                activeSearchTab === tab 
                  ? "text-primary border-b-2 border-primary bg-transparent hover:bg-transparent rounded-none"
                  : "text-gray-600 hover:text-primary rounded-none"
              )}
              onClick={() => setActiveSearchTab(tab)}
            >
              {tab}
              {tab === "New Launch" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {tab === "Post Property" && (
                <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                  FREE
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Location Search */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
              </div>
              <Input
                placeholder={getPlaceholderText()}
                className="pl-10 sm:pl-10 pr-16 sm:pr-20 h-10 sm:h-12 border-gray-200 focus:border-primary text-gray-600 text-sm sm:text-base"
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
            <Select value={getDropdownValue()} onValueChange={(value) => console.log('Selected:', value)}>
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
            <Button className="bg-primary hover:bg-primary/90 h-10 sm:h-12 px-6 sm:px-8 w-full sm:w-auto">
              {getButtonText()}
            </Button>
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Popular Search</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {popularSearches.map((search, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-gray-600 border-gray-200 hover:border-primary hover:text-primary rounded-full text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;