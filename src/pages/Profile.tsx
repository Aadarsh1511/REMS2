import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Heart, Eye, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com"
  });

  const handleSaveChanges = () => {
    toast({ title: "Profile Updated", description: "Your profile has been successfully updated!" });
    console.log("Saving profile:", formData);
  };

  const handleViewSavedProperties = () => {
    toast({ title: "Saved Properties", description: "Loading your saved properties..." });
    // Navigate to saved properties
  };

  const handleViewPropertyViews = () => {
    toast({ title: "Property Views", description: "Loading your viewed properties..." });
    // Navigate to viewed properties
  };

  const handleViewInquiries = () => {
    toast({ title: "Inquiries", description: "Loading your active inquiries..." });
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
              <div className="text-2xl font-bold">12</div>
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
      </div>
    </div>
  );
};

export default Profile;