import { useState } from "react";
import { Search, MapPin, Home, IndianRupee, Calendar, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  className?: string;
}

const locations = ["Mumbai", "Delhi", "Bangalore", "Gurgaon", "Pune", "Hyderabad"];
const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "plot", label: "Plot" },
  { id: "commercial", label: "Commercial" }
];

const bhkOptions = ["1", "2", "3", "4+"];
const possessionStatus = ["Ready to Move", "Under Construction", "New Launch"];
const amenities = ["Parking", "Pool", "Gym", "Garden", "Security", "Power Backup"];

const smartSuggestions = [
  "Properties under 1 Cr with 3BHK in Delhi",
  "Ready to move apartments near Metro",
  "New launches in Smart City zones",
  "Luxury villas with swimming pools"
];

export function FilterSidebar({ className }: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [selectedPossession, setSelectedPossession] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleSelection = (value: string, selected: string[], setter: (values: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(item => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  return (
    <div className={`bg-gradient-surface p-6 rounded-xl shadow-soft border h-fit sticky top-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* AI Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Ask AI to find your property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
          />
          <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4" />
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Smart Suggestions</Label>
        <div className="space-y-2">
          {smartSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left text-xs h-auto p-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
              onClick={() => setSearchQuery(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </Label>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant={selectedLocations.includes(location) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedLocations.includes(location)
                  ? "bg-gradient-primary text-white hover:opacity-90"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
              onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2">
          <Home className="w-4 h-4" />
          Property Type
        </Label>
        <div className="space-y-3">
          {propertyTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => toggleSelection(type.id, selectedTypes, setSelectedTypes)}
              />
              <Label htmlFor={type.id} className="text-sm">{type.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* BHK Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">BHK</Label>
        <div className="grid grid-cols-4 gap-2">
          {bhkOptions.map((bhk) => (
            <Badge
              key={bhk}
              variant={selectedBHK.includes(bhk) ? "default" : "outline"}
              className={`cursor-pointer text-center py-2 transition-all ${
                selectedBHK.includes(bhk)
                  ? "bg-gradient-primary text-white"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
              onClick={() => toggleSelection(bhk, selectedBHK, setSelectedBHK)}
            >
              {bhk}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2">
          <IndianRupee className="w-4 h-4" />
          Price Range
        </Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={10}
            step={10}
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{priceRange[0]} L</span>
            <span>₹{priceRange[1]} L</span>
          </div>
        </div>
      </div>

      {/* Possession Status */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Possession Status
        </Label>
        <div className="flex flex-wrap gap-2">
          {possessionStatus.map((status) => (
            <Badge
              key={status}
              variant={selectedPossession.includes(status) ? "default" : "outline"}
              className={`cursor-pointer transition-all text-xs ${
                selectedPossession.includes(status)
                  ? "bg-gradient-primary text-white"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
              onClick={() => toggleSelection(status, selectedPossession, setSelectedPossession)}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => (
            <Badge
              key={amenity}
              variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
              className={`cursor-pointer transition-all text-xs ${
                selectedAmenities.includes(amenity)
                  ? "bg-gradient-primary text-white"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary"
              }`}
              onClick={() => toggleSelection(amenity, selectedAmenities, setSelectedAmenities)}
            >
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Builder Name */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Builder/Developer</Label>
        <Input
          placeholder="Search builder..."
          className="bg-background/50 backdrop-blur-sm border-border/50"
        />
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium shadow-glow">
        <Sparkles className="w-4 h-4 mr-2" />
        Apply Filters
      </Button>
    </div>
  );
}