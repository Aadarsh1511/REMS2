import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Heart, Eye, MessageCircle } from "lucide-react";
import { toast } from 'react-toastify';
import { getWishlist, WishlistItem } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { PropertyCard } from "./PropertyCard";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const getCurrentUserId = (): string | null => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: { user_id: string } = jwtDecode(token);
        return decoded.user_id;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchUserWishlist = async () => {
      setLoadingWishlist(true);
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          toast.error("Authentication Required: Please log in to view your wishlist.");
          setLoadingWishlist(false);
          return;
        }
        const data = await getWishlist();
        // Filter wishlist items to only show those belonging to the current user
        const userWishlist = data.filter(item => item.user === userId);
        setWishlist(userWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        toast.error("Failed to load wishlist.");
      } finally {
        setLoadingWishlist(false);
      }
    };

    fetchUserWishlist();
  }, []);

  const handleSaveChanges = () => {
    toast.success("Profile Updated: Your profile has been successfully updated!");
    console.log("Saving profile:", formData);
  };

  const handleViewSavedProperties = () => {
    toast.info("Saved Properties: Loading your saved properties...");
    // Navigate to saved properties
  };

  const handleViewPropertyViews = () => {
    toast.info("Property Views: Loading your viewed properties...");
    // Navigate to viewed properties
  };

  const handleViewInquiries = () => {
    toast.info("Inquiries: Loading your active inquiries...");
    // Navigate to inquiries
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">Property Enthusiast</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-gradient cursor-pointer" onClick={handleViewSavedProperties}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Saved Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loadingWishlist ? "..." : wishlist.length}</div>
              <p className="text-muted-foreground">Properties in wishlist</p>
            </CardContent>
          </Card>

          <Card className="card-gradient cursor-pointer" onClick={handleViewPropertyViews}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Property Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-muted-foreground">Properties viewed</p>
            </CardContent>
          </Card>

          <Card className="card-gradient cursor-pointer" onClick={handleViewInquiries}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={formData.email} 
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="mt-1" 
                />
              </div>
            </div>
            <Button className="btn-hero" onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Your Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingWishlist ? (
              <div className="text-center py-4">Loading your wishlist...</div>
            ) : wishlist.length === 0 ? (
              <div className="text-center py-4">No properties saved to your wishlist yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <PropertyCard
                    key={item.property} // Assuming property ID is unique
                    id={item.property.toString()}
                    slug={item.slug}
                    image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500" // Placeholder image
                    title={`Property ${item.property}`} // Placeholder title
                    builder="N/A"
                    location="N/A"
                    bhkOptions={[]}
                    description="N/A"
                    badges={[]}
                    ribbon=""
                    amenities={[]}
                    isWishlisted={true} // Always true for items in wishlist
                    onWishlistToggle={(propertyId) => {
                      console.log(`Toggle wishlist for property ${propertyId} from profile.`);
                      // In a real scenario, you'd call removeFromWishlist here
                      toast.info(`Wishlist Action: Property ${propertyId} would be removed from wishlist.`);
                    }}
                    isProfileView={true} // Pass the new prop
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;