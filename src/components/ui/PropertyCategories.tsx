import { Card, CardContent } from "@/components/ui/card";
import { Home, Building, TreePine, Factory, Store, MapPin, Tent, Mountain, Warehouse } from "lucide-react";

const PropertyCategories = () => {
  const categories = [
    {
      icon: Home,
      title: "Houses",
      count: "12,450+",
      color: "text-primary",
      bgColor: "bg-primary/10",
      hoverColor: "hover:bg-primary/20"
    },
    {
      icon: Building,
      title: "Apartments",
      count: "8,920+",
      color: "text-accent",
      bgColor: "bg-accent/10",
      hoverColor: "hover:bg-accent/20"
    },
    {
      icon: TreePine,
      title: "Plots",
      count: "5,680+",
      color: "text-real-estate-success",
      bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-real-estate-success/20"
    },
    {
      icon: Factory,
      title: "Commercial",
      count: "3,240+",
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/10",
      hoverColor: "hover:bg-primary-glow/20"
    },
    {
      icon: Store,
      title: "Retail",
      count: "2,850+",
      color: "text-real-estate-warning",
      bgColor: "bg-real-estate-warning/10",
      hoverColor: "hover:bg-real-estate-warning/20"
    },
    {
      icon: MapPin,
      title: "Farmhouse",
      count: "1,920+",
      color: "text-accent",
      bgColor: "bg-accent/10",
      hoverColor: "hover:bg-accent/20"
    },
    {
      icon: Tent,
      title: "Vacation",
      count: "1,450+",
      color: "text-primary",
      bgColor: "bg-primary/10",
      hoverColor: "hover:bg-primary/20"
    },
    {
      icon: Mountain,
      title: "Villa",
      count: "980+",
      color: "text-real-estate-success",
      bgColor: "bg-real-estate-success/10",
      hoverColor: "hover:bg-real-estate-success/20"
    },
    {
      icon: Warehouse,
      title: "Industrial",
      count: "720+",
      color: "text-primary-glow",
      bgColor: "bg-primary-glow/10",
      hoverColor: "hover:bg-primary-glow/20"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden mt-10">
      {/* Background Elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore by 
            <span className="bg-gradient-hero bg-clip-text  text-blue-600 "> Property Type</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect property from our diverse collection of real estate options
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-secondary/20 border border-border/30 animate-fade-in ${category.hoverColor}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;