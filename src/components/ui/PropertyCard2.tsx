import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  type: "sale" | "rent";
  featured?: boolean;
  priceChange?: number;
}

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  beds, 
  baths, 
  area, 
  image, 
  type, 
  featured = false,
  priceChange 
}: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 relative">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-hero text-white border-0 shadow-lg px-3 py-1 text-sm font-semibold">
              Featured
            </Badge>
          )}
          <Badge 
            variant={type === "sale" ? "default" : "secondary"} 
            className={`border-0 shadow-md px-3 py-1 text-sm font-semibold ${
              type === "sale" 
                ? "bg-background/90 text-primary" 
                : "bg-accent text-white"
            }`}
          >
            For {type === "sale" ? "Sale" : "Rent"}
          </Badge>
        </div>

        {/* Price Change Badge */}
        {priceChange && (
          <div className="absolute top-4 right-16">
            <Badge 
              className={`${
                priceChange > 0 
                  ? "bg-real-estate-success text-white" 
                  : "bg-real-estate-warning text-white"
              } border-0 flex items-center gap-1 shadow-md px-3 py-1`}
            >
              <TrendingUp className="w-3 h-3" />
              {priceChange > 0 ? "+" : ""}{priceChange}%
            </Badge>
          </div>
        )}

        {/* Heart Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-background/90 hover:bg-background shadow-lg backdrop-blur-sm w-10 h-10 rounded-full border border-border/20 transition-all ${
            isFavorited ? "text-red-500" : "text-foreground"
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
        
        {/* Quick View Button - appears on hover */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button className="w-full bg-background/95 text-foreground hover:bg-background backdrop-blur-sm border border-border/30">
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold bg-gradient-hero bg-clip-text text-blue-500">
                {price}
              </span>
              {type === "rent" && <span className="text-sm font-normal text-muted-foreground">/month</span>}
            </div>
            {type === "sale" && (
              <div className="text-right text-sm text-muted-foreground">
                <div>Est. Monthly</div>
                <div className="font-semibold">${Math.round(parseInt(price.replace(/[$,]/g, '')) * 0.004).toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{beds}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Bedrooms</div>
          </div>
          <div className="text-center border-l border-r border-border/30">
            <div className="text-lg font-bold text-foreground">{baths}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{area.replace(" sq ft", "")}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Sq Feet</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button variant="outline" className="flex-1 border-border/50 hover:bg-secondary/50 bg-yellow-500 text-white hover:bg-yellow-300 hover:text-yellow-800 transition-colors">
            View Details
          </Button>
          <Button className="flex-1 bg-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
            Contact Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;