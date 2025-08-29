import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Eye, Heart, DollarSign, Plus, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OwnerDashboard = () => {
  const { toast } = useToast();

  const handleAddProperty = () => {
    toast({ title: "Add Property", description: "Redirecting to add property page..." });
    window.location.href = '/add-property';
  };

  const handleMessage = (inquiry: string) => {
    toast({ title: "Message", description: `Opening chat for ${inquiry}...` });
    // Open messaging interface
  };

  const handleViewProperties = () => {
    toast({ title: "Properties", description: "Loading your properties..." });
    // Navigate to properties page
  };

  const handleViewViews = () => {
    toast({ title: "Views", description: "Loading property views analytics..." });
    // Navigate to analytics page
  };

  const handleViewInterested = () => {
    toast({ title: "Interested Buyers", description: "Loading interested buyers list..." });
    // Navigate to interested buyers page
  };

  const handleViewRevenue = () => {
    toast({ title: "Revenue", description: "Loading revenue report..." });
    // Navigate to revenue page
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gradient">Owner Dashboard</h1>
          <Button className="btn-hero" onClick={handleAddProperty}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-hover cursor-pointer" onClick={handleViewProperties}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <Badge className="bg-success text-success-foreground">2 sold</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewViews}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,247</div>
              <Badge className="bg-success text-success-foreground">+15%</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewInterested}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Interested Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <Badge className="bg-warning text-warning-foreground">8 new</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewRevenue}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹45L</div>
              <Badge className="bg-success text-success-foreground">Last 6 months</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">3BHK Apartment - Bandra</p>
                    <p className="text-sm text-muted-foreground">156 views this week</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Hot</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Villa - Goa</p>
                    <p className="text-sm text-muted-foreground">89 views this week</p>
                  </div>
                  <Badge variant="secondary">Good</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Site visit request</p>
                    <p className="text-sm text-muted-foreground">For Bandra Apartment</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleMessage("price negotiation")}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Price negotiation</p>
                    <p className="text-sm text-muted-foreground">For Pune Flat</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleMessage("site visit request")}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;