import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Calendar, MessageCircle, TrendingUp, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AgentDashboard = () => {
  const { toast } = useToast();

  const handleCall = (number: string) => {
    toast({ title: "Calling", description: `Initiating call to ${number}...` });
    window.open(`tel:${number}`, '_self');
  };

  const handleMessage = (contact: string) => {
    toast({ title: "Message", description: `Opening chat with ${contact}...` });
    // Open messaging interface
  };

  const handleViewListings = () => {
    toast({ title: "Listings", description: "Loading your property listings..." });
    // Navigate to listings page
  };

  const handleViewLeads = () => {
    toast({ title: "Leads", description: "Loading active leads..." });
    // Navigate to leads page
  };

  const handleViewSchedule = () => {
    toast({ title: "Schedule", description: "Loading your schedule..." });
    // Navigate to schedule page
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gradient">Agent Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-hover cursor-pointer" onClick={handleViewListings}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
              <Badge className="bg-success text-success-foreground">3 new</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewLeads}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Active Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <Badge className="bg-warning text-warning-foreground">5 urgent</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewSchedule}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Site Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <Badge variant="secondary">This week</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹1.2L</div>
              <Badge className="bg-success text-success-foreground">This month</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Property Visit - Bandra</p>
                    <p className="text-sm text-muted-foreground">10:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleCall("+91-98765-43210")}>
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Client Meeting</p>
                    <p className="text-sm text-muted-foreground">2:00 PM</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleMessage("Client")}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
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
                    <p className="font-medium">3BHK Apartment Interest</p>
                    <p className="text-sm text-muted-foreground">John Doe</p>
                  </div>
                  <Badge variant="secondary">2 min ago</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Villa Viewing Request</p>
                    <p className="text-sm text-muted-foreground">Sarah Wilson</p>
                  </div>
                  <Badge variant="secondary">5 min ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;