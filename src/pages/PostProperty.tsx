import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, MapPin, Home, DollarSign, FileText, CheckCircle, Star, AlertCircle } from "lucide-react";
import { useState } from "react";

const PostProperty = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form data state
  const [formData, setFormData] = useState({
    listingType: "",
    propertyType: "",
    propertyTitle: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    address: "",
    amenities: [],
    price: "",
    negotiable: "",
    security: "",
    maintenance: "",
    ownerName: "",
    phone: "",
    email: "",
    terms: false,
    images: [],
  });

  // Show toast-like messages
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Update formData on input change
  const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Amenities handler
  const handleAmenityChange = (amenity, checked) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  // Select handler
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // File upload handler
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 10) {
        showMessage("error", "Maximum 10 images allowed");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
      setUploadedImages(files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name
      })));
      showMessage("success", `${files.length} images uploaded`);
    };
    input.click();
  };

  // Form validation
  const validateForm = () => {
    const required = ['listingType', 'propertyType', 'propertyTitle', 'description', 'address', 'price', 'ownerName', 'phone', 'email'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      showMessage("error", `Please fill: ${missing.join(', ')}`);
      return false;
    }
    
    if (!formData.terms) {
      showMessage("error", "Please accept terms and conditions");
      return false;
    }
    
    if (formData.images.length === 0) {
      showMessage("error", "Please upload at least one image");
      return false;
    }
    
    return true;
  };

  // API Integration with improved error handling
  const handlePostProperty = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => {
            submitData.append('images', image);
          });
        } else if (key === 'amenities') {
          submitData.append('amenities', JSON.stringify(formData.amenities));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      
      const token = "AccessToken"; 
      
      console.log("Submitting property data:", Object.fromEntries(submitData.entries()));
      
      // Simulate API call
      const response = await fetch("http://127.0.0.1:8000/api/properties/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          // Don't set Content-Type for FormData - browser sets it with boundary
        },
        body: submitData,
      });

      if (response.ok) {
        const result = await response.json();
        showMessage("success", "Property posted successfully!");
        
        // Reset form
        setFormData({
          listingType: "",
          propertyType: "",
          propertyTitle: "",
          description: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          address: "",
          amenities: [],
          price: "",
          negotiable: "",
          security: "",
          maintenance: "",
          ownerName: "",
          phone: "",
          email: "",
          terms: false,
          images: [],
        });
        setUploadedImages([]);
        
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        
        // Handle specific error codes
        if (response.status === 401) {
          showMessage("error", "Authentication failed. Please log in again.");
        } else if (response.status === 400) {
          showMessage("error", errorData?.message || "Invalid data submitted");
        } else {
          showMessage("error", "Failed to post property. Please try again.");
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      showMessage("error", "Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoosePackage = (packageName) => {
    showMessage("success", `${packageName} package selected`);
  };

  const benefits = [
    { icon: <CheckCircle className="w-6 h-6" />, title: "Free Listing", desc: "Post your property for free" },
    { icon: <Star className="w-6 h-6" />, title: "Premium Exposure", desc: "Get maximum visibility" },
    { icon: <Camera className="w-6 h-6" />, title: "Professional Photos", desc: "Free photography service" },
    { icon: <FileText className="w-6 h-6" />, title: "Legal Assistance", desc: "Expert legal guidance" },
  ];

  const packages = [
    {
      name: "Basic",
      price: "Free",
      features: ["Basic listing", "5 photos", "30 days validity", "Email support"],
      popular: false
    },
    {
      name: "Premium",
      price: "₹999",
      features: ["Featured listing", "20 photos", "90 days validity", "Priority support", "Social media promotion"],
      popular: true
    },
    {
      name: "Ultra",
      price: "₹1999",
      features: ["Top featured listing", "Unlimited photos", "180 days validity", "24/7 support", "Professional photography", "Virtual tour"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Message Display */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          message.type === 'success' ? 'bg-green-500 text-white' : 
          message.type === 'error' ? 'bg-red-500 text-white' : 
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Post Your Property
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sell or rent your property with India's most trusted real estate platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white/50 rounded-lg backdrop-blur-sm">
                  <div className="text-primary mb-3">{benefit.icon}</div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-muted-foreground">Select the perfect plan to showcase your property</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-primary scale-105' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2" variant="default">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className="w-full mt-6" 
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handleChoosePackage(pkg.name)}
                  >
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Property Details</h2>
            <p className="text-muted-foreground">Fill in the details to list your property</p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-5 w-full mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="listingType">I want to *</Label>
                      <Select
                        value={formData.listingType}
                        onValueChange={(v) => handleSelectChange("listingType", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sell">Sell</SelectItem>
                          <SelectItem value="rent">Rent/Lease</SelectItem>
                          <SelectItem value="pg">PG/Co-living</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(v) => handleSelectChange("propertyType", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">Independent House</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="plot">Plot/Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyTitle">Property Title *</Label>
                    <Input
                      id="propertyTitle"
                      value={formData.propertyTitle}
                      onChange={handleInputChange}
                      placeholder="Enter a descriptive title for your property"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Property Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your property in detail..."
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Property Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={formData.bedrooms} onValueChange={(v) => handleSelectChange("bedrooms", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        value={formData.bathrooms}
                        onValueChange={(v) => handleSelectChange("bathrooms", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (sq ft)</Label>
                      <Input 
                        id="area" 
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Enter area"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea 
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter complete address with landmarks"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {["Parking", "Swimming Pool", "Gym", "Security", "Lift", "Power Backup", "Garden", "Club House", "Water Supply"].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox 
                            id={amenity.toLowerCase()} 
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                          />
                          <Label htmlFor={amenity.toLowerCase()} className="text-sm">{amenity}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Expected Price *</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                        type="number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="negotiable">Price Negotiable</Label>
                      <Select
                        value={formData.negotiable}
                        onValueChange={(v) => handleSelectChange("negotiable", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.listingType === "rent" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="security">Security Deposit</Label>
                        <Input 
                          id="security" 
                          value={formData.security}
                          onChange={handleInputChange}
                          placeholder="Enter security deposit"
                          type="number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maintenance">Maintenance</Label>
                        <Input 
                          id="maintenance" 
                          value={formData.maintenance}
                          onChange={handleInputChange}
                          placeholder="Enter maintenance charges"
                          type="number"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Property Photos *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Property Photos</h3>
                    <p className="text-muted-foreground mb-4">Add up to 10 high-quality images (Max 5MB each)</p>
                    <Button variant="outline" className="gap-2" onClick={handleFileUpload}>
                      <Upload className="w-4 h-4" />
                      Choose Files
                    </Button>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {uploadedImages.length} image(s) uploaded
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={image.url} 
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner Name *</Label>
                      <Input 
                        id="ownerName" 
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Enter owner name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, terms: !!checked }))
                       }/>
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms & Conditions and Privacy Policy *
                    </Label>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handlePostProperty}
                    disabled={isLoading}
                  >
                    {isLoading ? "Posting Property..." : "Post Property"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default PostProperty;