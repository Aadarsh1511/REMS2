import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Eye, Heart, Share2, Search, BookOpen, TrendingUp, Home, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Articles = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = () => {
    toast({ title: "Search", description: `Searching for "${searchTerm}"...` });
    // Perform search
  };

  const handleReadArticle = (title: string) => {
    toast({ title: "Reading Article", description: `Opening "${title}"...` });
    // Navigate to article
  };

  const handleLikeArticle = (title: string) => {
    toast({ title: "Liked", description: `Added "${title}" to favorites!` });
    // Handle like
  };

  const handleShareArticle = (title: string) => {
    toast({ title: "Share", description: `Sharing "${title}"...` });
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    }
  };

  const handleSubscribe = () => {
    toast({ title: "Subscribed", description: "You've been subscribed to our newsletter!" });
    // Handle subscription
  };

  const handleLoadMore = () => {
    toast({ title: "Loading", description: "Loading more articles..." });
    // Load more articles
  };

  const featuredArticle = {
    title: "Real Estate Market Outlook 2024: What Homebuyers Need to Know",
    excerpt: "Discover the key trends shaping India's real estate market in 2024, from price predictions to emerging investment hotspots.",
    author: "Priya Sharma",
    date: "January 15, 2024",
    readTime: "8 min read",
    views: "15.2K",
    image: "/placeholder.svg",
    category: "Market Analysis",
    tags: ["Market Trends", "Investment", "2024 Outlook"]
  };

  const articles = [
    {
      title: "Top 10 Emerging Localities in Bangalore for Property Investment",
      excerpt: "Explore the most promising areas in Bangalore that offer excellent growth potential for real estate investors.",
      author: "Rajesh Kumar",
      date: "January 12, 2024",
      readTime: "6 min read",
      views: "8.5K",
      category: "Investment",
      tags: ["Bangalore", "Investment", "Localities"]
    },
    {
      title: "Home Loan Interest Rates: Complete Guide for 2024",
      excerpt: "Everything you need to know about current home loan rates, eligibility criteria, and how to get the best deals.",
      author: "Anita Gupta",
      date: "January 10, 2024",
      readTime: "5 min read",
      views: "12.1K",
      category: "Finance",
      tags: ["Home Loans", "Interest Rates", "Finance"]
    },
    {
      title: "Vastu Tips for Your New Home: Ancient Wisdom for Modern Living",
      excerpt: "Learn how to apply Vastu principles when buying or designing your new home for prosperity and peace.",
      author: "Dr. Suresh Nair",
      date: "January 8, 2024",
      readTime: "7 min read",
      views: "6.8K",
      category: "Lifestyle",
      tags: ["Vastu", "Home Design", "Traditional"]
    },
    {
      title: "RERA Compliance: What Every Property Buyer Should Know",
      excerpt: "Understanding your rights under RERA and how to ensure your property purchase is legally protected.",
      author: "Advocate Meera Joshi",
      date: "January 5, 2024",
      readTime: "9 min read",
      views: "9.3K",
      category: "Legal",
      tags: ["RERA", "Legal", "Property Rights"]
    },
    {
      title: "Smart Home Technology: Transforming Indian Real Estate",
      excerpt: "How IoT and smart home features are becoming essential in modern Indian homes and their impact on property values.",
      author: "Tech Guru Arjun",
      date: "January 3, 2024",
      readTime: "6 min read",
      views: "7.2K",
      category: "Technology",
      tags: ["Smart Homes", "Technology", "IoT"]
    },
    {
      title: "Sustainable Living: Eco-Friendly Homes in Urban India",
      excerpt: "Discover the growing trend of sustainable construction and green homes in major Indian cities.",
      author: "Eco Expert Kavya",
      date: "December 30, 2023",
      readTime: "8 min read",
      views: "5.9K",
      category: "Sustainability",
      tags: ["Green Homes", "Sustainability", "Environment"]
    }
  ];

  const categories = [
    { id: "all", name: "All Articles", icon: BookOpen, count: 45 },
    { id: "market", name: "Market Analysis", icon: TrendingUp, count: 12 },
    { id: "investment", name: "Investment", icon: Building, count: 8 },
    { id: "finance", name: "Finance", icon: Home, count: 10 },
    { id: "lifestyle", name: "Lifestyle", icon: Heart, count: 7 },
    { id: "legal", name: "Legal", icon: BookOpen, count: 5 },
    { id: "technology", name: "Technology", icon: TrendingUp, count: 3 }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           article.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real Estate Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed with expert analysis, market trends, and practical advice for your property journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button className="h-12 px-6" onClick={handleSearch}>Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Article</h2>
            <p className="text-muted-foreground">Editor's pick for this week</p>
          </div>

          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-muted flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-muted-foreground" />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredArticle.category}</Badge>
                <h3 className="text-2xl font-bold mb-4 leading-tight">{featuredArticle.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarFallback>{featuredArticle.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{featuredArticle.author}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredArticle.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredArticle.views}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredArticle.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => handleReadArticle(featuredArticle.title)}>Read Article</Button>
                  <Button variant="outline" size="icon" onClick={() => handleLikeArticle(featuredArticle.title)}>
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleShareArticle(featuredArticle.title)}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
                <h3 className="text-xl font-bold mb-6">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {category.name}
                        <Badge variant="secondary" className="ml-auto">
                          {category.count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">
                    {selectedCategory === "all" ? "Latest Articles" : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
                  </h3>
                  <p className="text-muted-foreground">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-3">{article.category}</Badge>
                        <h4 className="text-lg font-bold mb-3 leading-tight">{article.title}</h4>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{article.excerpt}</p>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {article.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{article.author}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                              <span>•</span>
                              <span>{article.views} views</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" onClick={() => handleReadArticle(article.title)}>Read More</Button>
                          <Button variant="outline" size="sm" onClick={() => handleLikeArticle(article.title)}>
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleShareArticle(article.title)}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg" onClick={handleLoadMore}>
                    Load More Articles
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get the latest real estate insights delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input 
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button variant="secondary" onClick={handleSubscribe}>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Articles;