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
import { toast } from 'react-toastify';

interface PropertyCardProps {
  id: string;
  slug: string; // Add slug to the interface
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
  isProfileView?: boolean; // New prop
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
  slug,
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
  isProfileView = false, // New prop with default value
  // API specific props
  price,

  area,
  views,
  rating,
  tags = [],
  featured = false,
}: PropertyCardProps) {
  const navigate = useNavigate();

  const handleContactOwner = (propertyId: string) => {
    toast.info("Connecting to Owner: Opening contact options...");
    // You could open a modal or navigate to contact page
  };

  const handleViewDetails = () => {
    navigate(`/property/${id}`);
  };

  

 

  return (
    <>
      <Card className="first-card group overflow-hidden bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-border/50">
        <div className={isProfileView ? "flex flex-col" : "flex flex-col md:flex-row"}>
          {/* Image Section */}
          <div className="relative md:w-80 h-64 md:h-auto overflow-hidden">
            <img
              src={image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500'}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500';
              }}
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
                isWishlisted
                  ? "bg-destructive/90 text-white hover:bg-destructive"
                  : "bg-background/80 hover:bg-background"
              }`}
              onClick={() => onWishlistToggle && onWishlistToggle(id)}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-current" : ""
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
    </>
  );
}
