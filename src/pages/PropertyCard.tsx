// import {
//   Heart,
//   MapPin,
//   Home,
//   Car,
//   Wifi,
//   Shield,
//   Camera,
//   Search,
//   Mic,
//   Plus,
//   Eye,
//   Star,
//   Bed,
//   Bath,
//   Square,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import villa from "../../public/villa.jpg";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "@/hooks/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@radix-ui/react-select";
// import { Input } from "@/components/ui/input";

// interface PropertyCardProps {
//   id: string;
//   image: string;
//   title: string;
//   builder: string;
//   location: string;
//   bhkOptions: { bhk: string; price: string }[];
//   description: string;
//   badges: string[];
//   ribbon: string;
//   amenities: string[];
//   isWishlisted?: boolean;
//   onWishlistToggle?: (id: string) => void;
// }

// const amenityIcons: { [key: string]: any } = {
//   Parking: Car,
//   Wifi: Wifi,
//   Security: Shield,
//   Camera: Camera,
// };

// export function PropertyCard({
//   id,
//   image,
//   title,
//   builder,
//   location,
//   bhkOptions = [],
//   description,
//   badges,
//   ribbon,
//   amenities,
//   isWishlisted = false,
//   onWishlistToggle,
// }: PropertyCardProps) {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState([0, 1000000]);
//   const [propertyType, setPropertyType] = useState("");

//   const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//   const [favorites, setFavorites] = useState<number[]>([]);

//   const handleVoiceSearch = () => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         (window as any).SpeechRecognition ||
//         (window as any).webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();

//       recognition.onstart = () => {
//         toast({
//           title: "Voice Search Active",
//           description: "Listening... Please speak your search query.",
//         });
//       };

//       recognition.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setSearchTerm(transcript);
//         toast({
//           title: "Voice Recognized",
//           description: `Searching for: "${transcript}"`,
//         });
//       };

//       recognition.onerror = () => {
//         toast({
//           title: "Voice Search Error",
//           description: "Please try again or use text search.",
//           variant: "destructive",
//         });
//       };

//       recognition.start();
//     } else {
//       toast({
//         title: "Voice Search Not Supported",
//         description: "Please use text search instead.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleSearch =async() => {
//     const token = localStorage.getItem("access_token");
//     const url = "http://127.0.0.1:8000/api/properties/";
//     let response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     response = await response.json();
//     setproperties(Array.isArray(response) ? response : []);
//     console.log(response);

//     toast({
//       title: "Searching Properties",
//       description: `Found ${properties.length} properties matching your criteria.`,
//     });
//   };

//   const handleFilterApply = () => {
//     toast({
//       title: "Filters Applied",
//       description: "Search results updated based on your preferences.",
//     });
//   };

//   const toggleFavorite = (propertyId: number) => {
//     setFavorites((prev) =>
//       prev.includes(propertyId)
//         ? prev.filter((id) => id !== propertyId)
//         : [...prev, propertyId]
//     );
//     toast({
//       title: favorites.includes(propertyId)
//         ? "Removed from Favorites"
//         : "Added to Favorites",
//       description: favorites.includes(propertyId)
//         ? "Property removed from your wishlist."
//         : "Property saved to your wishlist.",
//     });
//   };

//   const handleContactOwner = (propertyId: number) => {
//     toast({
//       title: "Connecting to Owner",
//       description: "Opening contact options...",
//     });
//     // You could open a modal or navigate to contact page
//   };

//   const handleQuickFilter = (filterType: string) => {
//     toast({
//       title: "Quick Filter Applied",
//       description: `Filtering for ${filterType}...`,
//     });
//   };

//   const handleBedroomSelect = (bedrooms: string) => {
//     setSelectedBedrooms((prev) =>
//       prev.includes(bedrooms)
//         ? prev.filter((b) => b !== bedrooms)
//         : [...prev, bedrooms]
//     );
//   };

//   const handleAmenityToggle = (amenity: string) => {
//     setSelectedAmenities((prev) =>
//       prev.includes(amenity)
//         ? prev.filter((a) => a !== amenity)
//         : [...prev, amenity]
//     );
//   };
//   const [properties, setproperties] = useState<any[]>([]);

//   const getuserdata = async () => {
//     const token = localStorage.getItem("access_token");
//     const url = "http://127.0.0.1:8000/api/properties/";
//     let response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     response = await response.json();
//     setproperties(Array.isArray(response) ? response : []);
//     console.log(response);
//   };

//   useEffect(() => {
//     getuserdata();
//   }, []);

//   return (
//     <>

//       <Card className="group overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
//         <div className="flex flex-col md:flex-row">
//           {/* Image Section */}
//           {
//             <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
//               <img
//                 src={villa}
//                 alt={title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />

//               {/* Badges Overlay */}
//               <div className="absolute top-3 left-3 flex flex-col gap-2">
//                 {badges.map((badge, index) => (
//                   <Badge
//                     key={index}
//                     className="bg-success text-success-foreground text-xs font-medium px-2 py-1"
//                   >
//                     {badge}
//                   </Badge>
//                 ))}
//               </div>

//               {/* Wishlist Button */}
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm ${
//                   isWishlisted
//                     ? "bg-destructive/90 text-white hover:bg-destructive"
//                     : "bg-background/80 hover:bg-background"
//                 }`}
//                 onClick={() => onWishlistToggle?.(id)}
//               >
//                 <Heart
//                   className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
//                 />
//               </Button>

//               {/* Ribbon */}
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-primary text-white text-xs font-medium py-2 px-3">
//                 {ribbon}
//               </div>
//             </div>
//           }

//           {/* Content Section */}
//           <CardContent className="flex-1 p-6">
//             <div className="space-y-4">
//               {/* Title & Builder */}
//               <div>
//                 <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
//                   {title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">by {builder}</p>
//               </div>

//               {/* Location */}
//               <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 <MapPin className="w-4 h-4" />
//                 <span>{location}</span>
//               </div>

//               {/* BHK Options */}
//               <div className="grid grid-cols-2 gap-3">
//                 {bhkOptions.map((option, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Home className="w-4 h-4 text-primary" />
//                       <span className="font-medium text-sm">{option.bhk}</span>
//                     </div>
//                     <span className="font-semibold text-sm text-primary">
//                       ₹{option.price}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Description */}
//               <p className="text-sm text-muted-foreground line-clamp-2">
//                 {description}
//               </p>

//               {/* Amenities */}
//               <div className="flex flex-wrap gap-2">
//                 {amenities.slice(0, 4).map((amenity, index) => {
//                   const IconComponent = amenityIcons[amenity];
//                   return (
//                     <div
//                       key={index}
//                       className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
//                     >
//                       {IconComponent && <IconComponent className="w-3 h-3" />}
//                       <span>{amenity}</span>
//                     </div>
//                   );
//                 })}
//                 {amenities.length > 4 && (
//                   <div className="flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
//                     +{amenities.length - 4} more
//                   </div>
//                 )}
//               </div>

//               {/* CTA Buttons */}
//               <div className="grid grid-cols-3 gap-3">
//                 <Button className="bg-gradient-primary hover:opacity-90 text-white font-medium shadow-glow text-xs">
//                   View Number
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="border-primary text-primary hover:bg-primary/10 font-medium text-xs"
//                 >
//                   Contact Agent
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="bg-secondary hover:bg-secondary/80 font-medium text-xs"
//                 >
//                   Brochure
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </div>
//       </Card>
//       {properties.map((property) => (
//                 <Card
//                   key={property.id}
//                   className="hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20"
//                 >
//                   <div className="property-image relative h-48">
//                     <img
//                       src={property.description}
//                       alt={property.title}
//                       className="w-full h-full object-cover"
//                     />
//                     {property.featured && (
//                       <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
//                         ⭐ Featured
//                       </Badge>
//                     )}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className={`absolute top-3 right-3 ${
//                         favorites.includes(property.id)
//                           ? "bg-primary text-primary-foreground hover:bg-primary/90"
//                           : "bg-white/80 hover:bg-white"
//                       }`}
//                       onClick={() => toggleFavorite(property.id)}
//                     >
//                       <Heart
//                         className={`h-4 w-4 ${
//                           favorites.includes(property.id) ? "fill-current" : ""
//                         }`}
//                       />
//                     </Button>
//                     <div className="absolute bottom-3 left-3 flex items-center text-white bg-primary/80 px-2 py-1 rounded text-xs">
//                       <Eye className="h-3 w-3 mr-1" />
//                       {property.views}
//                     </div>
//                   </div>

//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-semibold text-lg">
//                         {property.title}
//                       </h3>
//                       <div className="flex items-center text-sm text-muted-foreground">
//                         <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
//                         {property.rating}
//                       </div>
//                     </div>

//                     <p className="text-muted-foreground text-sm mb-3 flex items-center">
//                       <MapPin className="h-3 w-3 mr-1" />
//                       {property.location}
//                     </p>

//                     <div className="text-2xl font-bold text-primary mb-3">
//                       {property.price}
//                     </div>

//                     <div className="flex justify-between text-sm text-muted-foreground mb-4">
//                       <span className="flex items-center">
//                         <Bed className="h-3 w-3 mr-1" />
//                         {property.bedrooms} Bed
//                       </span>
//                       <span className="flex items-center">
//                         <Bath className="h-3 w-3 mr-1" />
//                         {property.bathrooms} Bath
//                       </span>
//                       <span className="flex items-center">
//                         <Square className="h-3 w-3 mr-1" />
//                         {property.area}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap gap-1 mb-4">
//                       {(property.tags ?? []).map(
//                         (tag: string, index: number) => (
//                           <Badge
//                             key={index}
//                             variant="secondary"
//                             className="text-xs"
//                           >
//                             {tag}
//                           </Badge>
//                         )
//                       )}
//                     </div>

//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         className="flex-1"
//                         onClick={() => navigate(`/property/${property.id}`)}
//                       >
//                         View Details
//                       </Button>
//                       <Button
//                         className="flex-1 btn-property"
//                         onClick={() => handleContactOwner(property.id)}
//                       >
//                         Contact Owner
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//     </>
//   );
// }

import {
  Heart,
  MapPin,
  Home,
  Car,
  Wifi,
  Shield,
  Camera,
  Search,
  Mic,
  Plus,
  Eye,
  Star,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import villa from "../../public/villa.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  builder: string;
  location: string;
  bhkOptions: { bhk: string; price: string }[];
  description: string;
  badges: string[];
  ribbon: string;
  amenities: string[];
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  // Additional props that might come from API
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  views?: number;
  rating?: number;
  tags?: string[];
  featured?: boolean;
}

const amenityIcons: { [key: string]: any } = {
  Parking: Car,
  Wifi: Wifi,
  Security: Shield,
  Camera: Camera,
};

export function PropertyCard({
  id,
  image,
  title,
  builder,
  location,
  bhkOptions = [],
  description,
  badges = [],
  ribbon,
  bedrooms,
  bathrooms,
  amenities = [],
  isWishlisted = false,
  onWishlistToggle,
  // API specific props
  price,

  area,
  views,
  rating,
  tags = [],
  featured = false,
}: PropertyCardProps) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );

    // Call parent wishlist toggle if provided
    if (onWishlistToggle) {
      onWishlistToggle(propertyId);
    }

    toast({
      title: favorites.includes(propertyId)
        ? "Removed from Favorites"
        : "Added to Favorites",
      description: favorites.includes(propertyId)
        ? "Property removed from your wishlist."
        : "Property saved to your wishlist.",
    });
  };

  const handleContactOwner = (propertyId: string) => {
    toast({
      title: "Connecting to Owner",
      description: "Opening contact options...",
    });
    // You could open a modal or navigate to contact page
  };

  const handleViewDetails = () => {
    navigate(`/property/${id}`);
  };

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
    // console.log(response);
  };

  useEffect(() => {
    getuserdata();
  }, []);

  // const getuserdata=async()=>{
  //     const url = "http://127.0.0.1:8000/api/property-images/"
  // }

  return (
    <>
      <Card className="first-card group overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {featured && (
                <Badge className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1">
                  ⭐ Featured
                </Badge>
              )}

              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  className="bg-success text-success-foreground text-xs font-medium px-2 py-1"
                >
                  {badge}
                </Badge>
              ))}

              {}
            </div>

            {/* Views and Rating */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {views && (
                <div className="flex items-center text-white bg-primary/80 px-2 py-1 rounded text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  {views}
                </div>
              )}
              {rating && (
                <div className="flex items-center text-white bg-primary/80 px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {rating}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              size="icon"
              variant="ghost"
              className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm ${
                isWishlisted || favorites.includes(id)
                  ? "bg-destructive/90 text-white hover:bg-destructive"
                  : "bg-background/80 hover:bg-background"
              }`}
              onClick={() => toggleFavorite(id)}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted || favorites.includes(id) ? "fill-current" : ""
                }`}
              />
            </Button>

            {/* Ribbon */}
            {ribbon && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-primary text-white text-xs font-medium py-2 px-3">
                {ribbon}
              </div>
            )}
          </div>

          {/* Content Section */}
          <CardContent className="flex-1 p-6">
            <div className="space-y-4">
              {/* Title & Builder */}
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                {builder && (
                  <p className="text-sm text-muted-foreground">by {builder}</p>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>

              {/* Price (for API data) */}
              {price && (
                <div className="text-2xl font-bold text-primary">{price}</div>
              )}

              {/* BHK Options (for sample data) */}
              {bhkOptions && bhkOptions.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {bhkOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
                    >
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">
                          {option.bhk}
                        </span>
                      </div>
                      <span className="font-semibold text-sm text-primary">
                        ₹{option.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Property Details (for API data) */}
              {(bedrooms || bathrooms || area) && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  {bedrooms && (
                    <span className="flex items-center">
                      <Bed className="h-3 w-3 mr-1" />
                      {bedrooms} Bed
                    </span>
                  )}
                  {bathrooms && (
                    <span className="flex items-center">
                      <Bath className="h-3 w-3 mr-1" />
                      {bathrooms} Bath
                    </span>
                  )}
                  {area && (
                    <span className="flex items-center">
                      <Square className="h-3 w-3 mr-1" />
                      {area}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>

              {/* Amenities */}
              {/* Amenities */}
              {amenities && amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {amenities.slice(0, 4).map((amenityItem, index) => {
                    const amenityName =
                      typeof amenityItem === "string"
                        ? amenityItem
                        : (amenityItem as any).amenity ||
                          (amenityItem as any).name ||
                          amenityItem;
                    const IconComponent = amenityIcons[amenityName];

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                      >
                        {IconComponent && <IconComponent className="w-3 h-3" />}
                        <span>{amenityName}</span>
                      </div>
                    );
                  })}

                  {amenities.length > 4 && (
                    <div className="flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                      +{amenities.length - 4} more
                    </div>
                  )}
                </div>
              )}
              {/* Tags (for API data) */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  className="bg-gradient-primary hover:opacity-90 text-white font-medium shadow-glow text-xs"
                  onClick={() => handleViewDetails()}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 font-medium text-xs"
                  onClick={() => handleContactOwner(id)}
                >
                  Contact Owner
                </Button>
                <Button
                  variant="secondary"
                  className="bg-secondary hover:bg-secondary/80 font-medium text-xs"
                >
                  Brochure
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {properties.map((property) => (
          <Card
            key={property.id}
            className=" second-card hover:shadow-lg transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20"
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
                <h3 className="font-semibold text-lg">{property.title}</h3>
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
                {(property.tags ?? []).map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
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
      </div> */}
    </>
  );
}
