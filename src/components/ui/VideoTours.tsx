import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Clock, MapPin } from "lucide-react";
import { useState } from "react";

const VideoTours = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoTours = [
    {
      id: 1,
      title: "Luxury Penthouse Tour",
      location: "Manhattan, New York",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
      duration: "3:45",
      views: "24.5K",
      featured: true,
      type: "360° Tour"
    },
    {
      id: 2,
      title: "Modern Villa Walkthrough",
      location: "Beverly Hills, CA",
      thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
      duration: "5:22",
      views: "18.2K",
      featured: false,
      type: "Video Tour"
    },
    {
      id: 3,
      title: "Waterfront Property Showcase",
      location: "Miami Beach, FL",
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
      duration: "4:18",
      views: "31.7K",
      featured: true,
      type: "Drone Tour"
    },
    {
      id: 4,
      title: "Downtown Loft Experience",
      location: "Chicago, IL",
      thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
      duration: "2:56",
      views: "12.8K",
      featured: false,
      type: "Virtual Tour"
    },
    {
      id: 5,
      title: "Family Home Interior",
      location: "Austin, TX",
      thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
      duration: "6:12",
      views: "22.1K",
      featured: false,
      type: "Live Tour"
    },
    {
      id: 6,
      title: "Luxury Estate Exploration",
      location: "Malibu, CA",
      thumbnail: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600",
      duration: "7:33",
      views: "45.3K",
      featured: true,
      type: "4K Tour"
    }
    ,
    {
      id: 7,
      title: "Cozy Cabin Tour",
      location: "Aspen, CO",
      thumbnail: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600",
      duration: "7:33",
      views: "45.3K",
      featured: true,
      type: "4K Tour"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-32 left-16 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-hero bg-clip-text text-purple-500 text-lg font-bold tracking-wider uppercase">Immersive Experience</span>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            Virtual Property 
            <span className="ml-3 bg-gradient-hero bg-clip-text text-purple-700 mt-3">Tours & Videos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience properties like never before with our immersive virtual tours, 360° walkthroughs, and professional video showcases
          </p>
        </div>

        {/* Featured Video */}
        <div className="mb-16">
          <Card className="overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 shadow-elegant">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div className="relative group cursor-pointer" onClick={() => setSelectedVideo(videoTours[0])}>
                <img
                  src={videoTours[0].thumbnail}
                  alt={videoTours[0].title}
                  className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                  <Button size="lg" className="bg-white/90 text-primary hover:bg-white rounded-full w-20 h-20 p-0 shadow-glow hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-gradient-hero text-white border-0 shadow-lg">
                    Featured
                  </Badge>
                  <Badge className="bg-background/90 text-foreground border-0 shadow-md">
                    {videoTours[0].type}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Badge className="bg-black/70 text-white border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {videoTours[0].duration}
                  </Badge>
                  <Badge className="bg-black/70 text-white border-0">
                    <Eye className="w-3 h-3 mr-1" />
                    {videoTours[0].views}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {videoTours[0].title}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-6">
                    <MapPin className="w-5 h-5 mr-2 text-accent" />
                    <span className="text-lg">{videoTours[0].location}</span>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Step inside this magnificent penthouse with our exclusive 360° virtual tour. Experience luxury living with panoramic city views, premium finishes, and world-class amenities.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button size="lg" className="bg-gradient-hero bg-purple-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Tour
                  </Button>
                  <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary/50">
                    Property Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {videoTours.slice(1).map((video, index) => (
            <Card 
              key={video.id} 
              className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-3 overflow-hidden bg-gradient-to-br from-background to-secondary/20 border border-border/50 cursor-pointer animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                  <Button size="lg" className="bg-white/90 text-primary hover:bg-white rounded-full w-16 h-16 p-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {video.featured && (
                    <Badge className="bg-gradient-hero text-white border-0 shadow-lg">
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-background/90 text-foreground border-0 shadow-md text-xs">
                    {video.type}
                  </Badge>
                </div>
                
                {/* Duration and Views */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Badge className="bg-black/70 text-white border-0 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                  <span className="text-sm truncate">{video.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {video.views} views
                  </div>
                  <Button size="sm" variant="ghost" className="text-purple-500 hover:bg-purple-600   hover:text-white ">
                    Watch Now →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-purple-100 rounded-3xl p-12 border border-border/30">
          <h3 className="text-3xl font-bold text-foreground mb-4">Want a Custom Virtual Tour?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a personalized virtual tour with our expert agents and explore properties from the comfort of your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero bg-purple-600 text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 px-8 py-6 text-lg">
              Schedule Virtual Tour
            </Button>
            <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary/50 px-8 py-6 text-lg">
              Book a Visit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTours;