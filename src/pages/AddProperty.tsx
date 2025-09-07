import { useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToastContainer } from "react-toastify";
import {
  Upload,
  MapPin,
  Building,
  Bed,
  Bath,
  Square,
  DollarSign,
  Camera,
  FileText,
  Sparkles,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    amenities: [] as string[],
  });

  const steps = [
    { title: "Basic Info", icon: Building },
    { title: "Property Details", icon: Square },
    { title: "Location", icon: MapPin },
    { title: "Images & Documents", icon: Camera },
    { title: "Pricing", icon: DollarSign },
    { title: "Review", icon: Eye },
  ];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/api/properties/",
  //       formData,  // yaha aapka form data jayega
  //       {
  //         headers: {
  //           "Content-Type": "application/json",

  //         }
  //       }
  //     );
  //     console.log("Property Added:", response.data);
  //     alert("Property added successfully!");
  //     localStorage.setItem("token", response.data.token);
  //   } catch (error) {
  //     console.error("Error while adding property:", error);
  //     alert("Failed to add property");
  //   }
  // };
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    { name: string; file: File }[]
  >([]);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setDocumentFiles((prev) => [...prev, ...fileArray]);

      const docArray = fileArray.map((file) => ({ name: file.name, file }));
      setUploadedDocuments((prev) => [...prev, ...docArray]);
    }
  };
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles((prev) => [...prev, ...fileArray]); // Store actual files

      // Also create preview URLs
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // const handleSubmit = async (e?: React.FormEvent) => {
  //   e?.preventDefault();

  //   try {
  //     const token = localStorage.getItem("access_token");

  //     if (!token) {
  //       alert("authentication Error");
  //       return;
  //     }

  //     if (imageFiles.length === 0) {
  //       alert("Please upload at least one image");
  //       return;
  //     }

  //     const formDataToSend = new FormData();
  //     formDataToSend.append("title", formData.title);
  //     formDataToSend.append("description", formData.description);
  //     formDataToSend.append("price", formData.price);
  //     formDataToSend.append("bedrooms", formData.bedrooms);
  //     formDataToSend.append("bathrooms", formData.bathrooms);
  //     formDataToSend.append("cover_image", imageFiles[0]);

  //     // Fix amenities - send as individual items instead of JSON string
  //     formData.amenities.forEach((amenity, index) => {
  //       formDataToSend.append(`amenities[${index}]`, amenity);
  //     });

  //     const apiResponse = await axios.post(
  //       "http://127.0.0.1:8000/api/properties/",
  //       formDataToSend,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Property added:", apiResponse.data);
  //     alert("Property added successfully!");

  //     // Clear form and navigate
  //     setFormData({
  //       title: "",
  //       description: "",
  //       propertyType: "",
  //       price: "",
  //       area: "",
  //       bedrooms: "",
  //       bathrooms: "",
  //       address: "",
  //       city: "",
  //       state: "",
  //       pincode: "",
  //       amenities: [],
  //     });

  //     setUploadedImages([]);
  //     setImageFiles([]);
  //     navigate("/");

  //   } catch (error: any) {
  //     console.error("Error:", error.response?.data);
  //     alert("Failed to add property");
  //   }
  // };

const handleSubmit = async (e?: React.FormEvent) => {
  e?.preventDefault();

  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Authentication Error");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Step 1: Create the property first without amenities
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("bedrooms", formData.bedrooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    formDataToSend.append("cover_image", imageFiles[0]);

    console.log("Creating property with data:", {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      amenities: formData.amenities
    });

    // Create the property
    const propertyResponse = await axios.post(
      "http://127.0.0.1:8000/api/properties/",
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Property created successfully:", propertyResponse.data);
    const propertyId = propertyResponse.data.id;

    // Step 2: Create amenities separately if any are selected
    if (formData.amenities.length > 0) {
      console.log("Creating amenities for property:", propertyId);
      
      for (const amenity of formData.amenities) {
        try {
          const amenityResponse = await axios.post(
            "http://127.0.0.1:8000/api/property-amenities/",
            {
              property: propertyId,
              amenity: amenity
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(`Amenity "${amenity}" created:`, amenityResponse.data);
        } catch (amenityError) {
          console.error(`Failed to create amenity "${amenity}":`, amenityError);
        }
      }
    }

    toast.success("Property and amenities added successfully!");

    // Clear form data
    setFormData({
      title: "",
      description: "",
      propertyType: "",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      amenities: [],
    });

    // Clear images
    setUploadedImages([]);
    setImageFiles([]);
    
    // Navigate back to property list
    navigate("/");

  } catch (error: any) {
    console.error("Error adding property:", error);
    if (error.response?.data) {
      console.error("Backend error details:", error.response.data);
      toast.error(`Failed to add property: ${JSON.stringify(error.response.data)}`);
    } else {
      toast.error("Failed to add property. Please try again.");
    }
  }
};

  // const amenitiesList = [
  //   "Swimming Pool",
  //   "Gym",
  //   "Parking",
  //   "Garden",
  //   "Security",
  //   "Elevator",
  //   "Power Backup",
  //   "Water Supply",
  //   "Internet",
  //   "Balcony",
  //   "Terrace",
  //   "Maintenance",
  // ];

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     Array.from(files).forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         if (e.target?.result) {
  //           setUploadedImages(prev => [...prev, e.target!.result as string]);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // };

  const generateAIDescription = () => {
    const aiDescription = `Beautiful ${
      formData.bedrooms
    } bedroom ${formData.propertyType.toLowerCase()} 
    spanning ${formData.area} sq ft in ${
      formData.city
    }. This property offers modern amenities and 
    excellent connectivity. Perfect for families looking for comfort and convenience in a prime location.`;

    setFormData((prev) => ({ ...prev, description: aiDescription }));
  };

  const getSuggestedPrice = () => {
    // Mock AI price suggestion based on area and location
    const basePrice = parseInt(formData.area) * 25000; // ₹25k per sq ft
    return basePrice.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Add New Property
          </h1>
          <p className="text-muted-foreground text-lg">
            Create a comprehensive listing with our AI-powered tools
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-gradient sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
                <Progress
                  value={(currentStep / (steps.length - 1)) * 100}
                  className="mt-2"
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentStep
                          ? "bg-primary text-primary-foreground"
                          : index < currentStep
                          ? "bg-success/10 text-success"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          index === currentStep
                            ? "bg-primary-foreground/20"
                            : index < currentStep
                            ? "bg-success/20"
                            : "bg-muted/20"
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <step.icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className="font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card className="card-gradient">
              <CardContent className="p-8">
                {/* Step 0: Basic Info */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Building className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">
                        Basic Property Information
                      </h2>
                      <p className="text-muted-foreground">
                        Let's start with the essentials
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Luxury 3BHK Apartment in Bandra"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="propertyType">Property Type *</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              propertyType: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">
                              🏢 Apartment
                            </SelectItem>
                            <SelectItem value="villa">🏘️ Villa</SelectItem>
                            <SelectItem value="house">🏠 House</SelectItem>
                            <SelectItem value="penthouse">
                              🏙️ Penthouse
                            </SelectItem>
                            <SelectItem value="plot">🌳 Plot/Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="status">Listing Type *</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="For Sale or Rent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sale">💰 For Sale</SelectItem>
                            <SelectItem value="rent">🏠 For Rent</SelectItem>
                            <SelectItem value="both">📋 Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="description">
                            Property Description
                          </Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={generateAIDescription}
                            className="text-xs"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Generate
                          </Button>
                        </div>
                        <Textarea
                          id="description"
                          placeholder="Describe your property's key features, location benefits, and unique selling points..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Property Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Square className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">
                        Property Specifications
                      </h2>
                      <p className="text-muted-foreground">
                        Detailed property measurements and features
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="area">Total Area (sq ft) *</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="1200"
                          value={formData.area}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              area: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bedrooms">Bedrooms *</Label>
                        <Select
                          value={formData.bedrooms}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              bedrooms: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 BHK</SelectItem>
                            <SelectItem value="2">2 BHK</SelectItem>
                            <SelectItem value="3">3 BHK</SelectItem>
                            <SelectItem value="4">4 BHK</SelectItem>
                            <SelectItem value="5+">5+ BHK</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bathrooms">Bathrooms *</Label>
                        <Select
                          value={formData.bathrooms}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              bathrooms: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5+">5+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* <div>
                      <Label className="text-base font-medium mb-4 block">
                        Property Amenities
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {amenitiesList.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={amenity}
                              checked={formData.amenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    amenities: [...prev.amenities, amenity],
                                  }));
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    amenities: prev.amenities.filter(
                                      (a) => a !== amenity
                                    ),
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={amenity} className="text-sm">
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    {formData.amenities.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Selected Amenities:
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {formData.amenities.map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {amenity}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    amenities: prev.amenities.filter(
                                      (a) => a !== amenity
                                    ),
                                  }));
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">Property Location</h2>
                      <p className="text-muted-foreground">
                        Specify the exact location details
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Full Address *</Label>
                        <Textarea
                          id="address"
                          placeholder="Building name, street address, landmark..."
                          value={formData.address}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, state: value }))
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maharashtra">
                              Maharashtra
                            </SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input
                          id="pincode"
                          type="number"
                          placeholder="400050"
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              pincode: e.target.value,
                            }))
                          }
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* <div className="mt-8">
                      <Label className="text-base font-medium mb-4 block">
                        Map Location
                      </Label>
                      <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p>Interactive Map</p>
                          <p className="text-sm">Click to set exact location</p>
                          <Button variant="outline" className="mt-3" size="sm">
                            Use Current Location
                          </Button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}

                {/* Step 3: Images & Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Camera className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">Images </h2>
                      <p className="text-muted-foreground">
                        Upload high-quality photos 
                      </p>
                    </div>

                    <Tabs defaultValue="images" className="w-full">
                      <TabsList className="grid grid-cols-1 w-full ">
                        <TabsTrigger value="images">
                          Property Images
                        </TabsTrigger>
                        {/* <TabsTrigger value="documents">
                          Legal Documents
                        </TabsTrigger> */}
                      </TabsList>

                      <TabsContent value="images" className="space-y-6">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Upload Property Images
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Add high-quality photos to showcase your property.
                            First image will be the cover photo.
                          </p>

                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                            id="image-upload"
                          />

                          <Button
                            variant="outline"
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                            type="button"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Images
                          </Button>

                          <p className="text-xs text-muted-foreground mt-2">
                            Supported formats: JPG, PNG, WebP (Max 10 images,
                            5MB each)
                          </p>
                        </div>

                        {uploadedImages.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-4">
                              Uploaded Images ({uploadedImages.length})
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {uploadedImages.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border"
                                  />
                                  {index === 0 && (
                                    <Badge className="absolute top-2 left-2 text-xs">
                                      Cover
                                    </Badge>
                                  )}
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => {
                                      setUploadedImages((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                      setImageFiles((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      {/* <TabsContent value="documents" className="space-y-6">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Upload Legal Documents
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Upload property documents for verification and trust
                            building.
                          </p>

                          <input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx"
                            onChange={handleDocumentUpload}
                            style={{ display: "none" }}
                            id="document-upload"
                          />

                          <Button
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById("document-upload")
                                ?.click()
                            }
                            type="button"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Documents
                          </Button>

                          <p className="text-xs text-muted-foreground mt-2">
                            Supported formats: PDF, DOC, DOCX (Max 5MB each)
                          </p>
                        </div>

                        {uploadedDocuments.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-4">
                              Uploaded Documents ({uploadedDocuments.length})
                            </h4>
                            <div className="space-y-2">
                              {uploadedDocuments.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm">{doc.name}</span>
                                  </div>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      setUploadedDocuments((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                      setDocumentFiles((prev) =>
                                        prev.filter((_, i) => i !== index)
                                      );
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent> */}
                    </Tabs>
                  </div>
                )}

                {/* Step 4: Pricing */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <DollarSign className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">Property Pricing</h2>
                      <p className="text-muted-foreground">
                        Set competitive pricing with AI assistance
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="price">Selling Price (₹) *</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="25000000"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            className="mt-2 text-lg"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Price per sq ft: ₹
                            {formData.price && formData.area
                              ? Math.round(
                                  parseInt(formData.price) /
                                    parseInt(formData.area)
                                ).toLocaleString()
                              : "0"}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maintenance">
                              Maintenance (₹/month)
                            </Label>
                            <Input
                              id="maintenance"
                              type="number"
                              placeholder="5000"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="deposit">
                              Security Deposit (₹)
                            </Label>
                            <Input
                              id="deposit"
                              type="number"
                              placeholder="500000"
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Checkbox id="negotiable" />
                            <Label htmlFor="negotiable">Price Negotiable</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="loan" />
                            <Label htmlFor="loan">Loan Available</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Card className="bg-primary/5 border-primary/20">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                              <Sparkles className="mr-2 h-5 w-5 text-primary" />
                              AI Price Suggestion
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-2">
                                Recommended Price Range
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                ₹{formData.area ? getSuggestedPrice() : "0"}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Based on area, location, and market trends
                              </p>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Market Average</span>
                                <span>₹22,000/sq ft</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Your Price</span>
                                <span>
                                  ₹
                                  {formData.price && formData.area
                                    ? Math.round(
                                        parseInt(formData.price) /
                                          parseInt(formData.area)
                                      ).toLocaleString()
                                    : "0"}
                                  /sq ft
                                </span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Price Position</span>
                                <span className="text-success">
                                  Competitive
                                </span>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="w-full mt-4"
                              onClick={() => {
                                if (formData.area) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    price: (
                                      parseInt(formData.area) * 25000
                                    ).toString(),
                                  }));
                                }
                              }}
                            >
                              Use AI Suggestion
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-warning/5 border-warning/20">
                          <CardHeader>
                            <CardTitle className="text-lg">
                              💡 Pricing Tips
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              • Properties priced 5-10% below market rate sell
                              40% faster
                            </p>
                            <p>
                              • Round numbers (₹25L vs ₹24.8L) get more
                              inquiries
                            </p>
                            <p>• Consider nearby comparable properties</p>
                            <p>• Keep room for negotiation (10-15%)</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Eye className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h2 className="text-2xl font-bold">Review & Publish</h2>
                      <p className="text-muted-foreground">
                        Review your listing before publishing
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Preview */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Property Preview
                        </h3>
                        <Card className="card-hover">
                          <div className="relative h-48">
                            {uploadedImages.length > 0 ? (
                              <img
                                src={uploadedImages[0]}
                                alt="Property preview"
                                className="w-full h-full object-cover rounded-t-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted rounded-t-lg flex items-center justify-center">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                            <Badge className="absolute top-3 left-3">
                              Featured
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-lg mb-2">
                              {formData.title || "Property Title"}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-3 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {formData.city && formData.state
                                ? `${formData.city}, ${formData.state}`
                                : "Location"}
                            </p>
                            <div className="text-2xl font-bold text-primary mb-3">
                              ₹
                              {formData.price
                                ? parseInt(formData.price).toLocaleString()
                                : "0"}
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                              <span className="flex items-center">
                                <Bed className="h-3 w-3 mr-1" />
                                {formData.bedrooms || "0"} Bed
                              </span>
                              <span className="flex items-center">
                                <Bath className="h-3 w-3 mr-1" />
                                {formData.bathrooms || "0"} Bath
                              </span>
                              <span className="flex items-center">
                                <Square className="h-3 w-3 mr-1" />
                                {formData.area || "0"} sq ft
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                size="sm"
                              >
                                View Details
                              </Button>
                              <Button className="flex-1 btn-property" size="sm">
                                Contact Owner
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Summary */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Listing Summary
                        </h3>
                        <div className="space-y-4">
                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Basic Information
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Title:
                                </span>{" "}
                                {formData.title || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Type:
                                </span>{" "}
                                {formData.propertyType || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Price:
                                </span>{" "}
                                ₹
                                {formData.price
                                  ? parseInt(formData.price).toLocaleString()
                                  : "Not set"}
                              </p>
                            </div>
                          </Card>

                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Property Details
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Area:
                                </span>{" "}
                                {formData.area || "Not set"} sq ft
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Bedrooms:
                                </span>{" "}
                                {formData.bedrooms || "Not set"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Bathrooms:
                                </span>{" "}
                                {formData.bathrooms || "Not set"}
                              </p>
                              {/* <p>
                                <span className="text-muted-foreground">
                                  Amenities:
                                </span>{" "}
                                {formData.amenities.length} selected
                              </p> */}
                            </div>
                          </Card>

                          <Card className="p-4">
                            <h4 className="font-medium mb-2">
                              Media & Documents
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground">
                                  Images:
                                </span>{" "}
                                {uploadedImages.length} uploaded
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Documents:
                                </span>{" "}
                                Upload pending
                              </p>
                            </div>
                          </Card>

                          <div className="pt-4">
                            <div className="flex items-center space-x-2 mb-4">
                              <Checkbox id="terms" />
                              <Label htmlFor="terms" className="text-sm">
                                I agree to the Terms of Service and Privacy
                                Policy
                              </Label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="w-full">
                                <Save className="mr-2 h-4 w-4" />
                                Save Draft
                              </Button>
                              <Button className="w-full btn-hero">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Publish Listing
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>

                  <div className="flex gap-3">
                    <Button variant="ghost">
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>

                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={() =>
                          setCurrentStep(
                            Math.min(steps.length - 1, currentStep + 1)
                          )
                        }
                        className="btn-property"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button className="btn-hero" onClick={handleSubmit}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Publish Property
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

// function toast(arg0: { title: string; description: string; variant: string; }) {
//   throw new Error("Function not implemented.");
// }
