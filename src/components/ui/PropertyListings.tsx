import PropertyCard from "./PropertyCard2";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List } from "lucide-react";

const PropertyListings = () => {
  const properties = [
    {
      id: "1",
      title: "Modern Downtown Apartment",
      price: "₹450,000",
      location: "Downtown, New York",
      beds: 2,
      baths: 2,
      area: "1,200 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
      type: "sale" as const,
      featured: true,
      priceChange: 5.2
    },
    {
      id: "2",
      title: "Luxury Villa with Pool",
      price: "₹850,000",
      location: "Beverly Hills, CA",
      beds: 4,
      baths: 3,
      area: "3,200 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      type: "sale" as const,
      priceChange: -2.1
    },
    {
      id: "3",
      title: "Cozy Studio Apartment",
      price: "₹2,800",
      location: "Manhattan, NY",
      beds: 1,
      baths: 1,
      area: "800 sq ft",
      image: "https://images.unsplash.com/photo-1506604151849-ccf1713ae85c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnwxMzAyOTIzfHxlbnwwfHx8fHw%3D",
      type: "rent" as const
    },
    {
      id: "4",
      title: "Family House with Garden",
      price: "₹3,500",
      location: "Brooklyn, NY",
      beds: 3,
      baths: 2,
      area: "1,800 sq ft",
      image:"https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjN8MTMwMjkyM3x8ZW58MHx8fHx8" ,
      type: "rent" as const,
      featured: true
    },
    {
      id: "5",
      title: "Penthouse with City View",
      price: "₹1,200,000",
      location: "Midtown, NY",
      beds: 3,
      baths: 3,
      area: "2,500 sq ft",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8MTMwMjkyM3x8ZW58MHx8fHx8",
      type: "sale" as const,
      priceChange: 8.7
    },
    {
      id: "6",
      title: "Modern Townhouse",
      price: "₹650,000",
      location: "Queens, NY",
      beds: 3,
      baths: 2,
      area: "2,000 sq ft",
      image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDh8MTMwMjkyM3x8ZW58MHx8fHx8",
      type: "sale" as const
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-gradient-hero bg-clip-text text-blue-600 text-lg font-semibold tracking-wide uppercase">Premium Collection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Featured 
            <span className="block bg-gradient-hero bg-clip-text text-blue-700">Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Handpicked luxury properties with the highest appreciation potential and premium amenities
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-background p-4 rounded-lg shadow-card">
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-500k">$0 - $500k</SelectItem>
                <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                <SelectItem value="1m+">$1M+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1+ Bed</SelectItem>
                <SelectItem value="2">2+ Beds</SelectItem>
                <SelectItem value="3">3+ Beds</SelectItem>
                <SelectItem value="4">4+ Beds</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {properties.slice(0, 6).map((property, index) => (
            <div 
              key={property.id} 
              className="animate-fade-in hover:scale-105 transition-all duration-500"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center space-y-6">
          <Button size="lg" className="bg-blue-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-12 py-6 text-lg">
            Explore All Properties
          </Button>
          <p className="text-muted-foreground">
            Join 50,000+ satisfied customers who found their dream homes
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;