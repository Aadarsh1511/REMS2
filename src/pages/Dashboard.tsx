import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, DollarSign, Eye, Heart, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const handleScheduleMeeting = () => {
    toast({ title: "Meeting", description: "Opening calendar to schedule meeting..." });
    // Open calendar interface
  };

  const handleAddProperty = () => {
    toast({ title: "Add Property", description: "Redirecting to add property page..." });
    window.location.href = '/add-property';
  };

  const handleManageClients = () => {
    toast({ title: "Clients", description: "Loading client management..." });
    // Navigate to clients page
  };

  const handleViewAnalytics = () => {
    toast({ title: "Analytics", description: "Loading analytics dashboard..." });
    // Navigate to analytics page
  };

  const handleMessages = () => {
    toast({ title: "Messages", description: "Opening message center..." });
    // Navigate to messages page
  };

  const stats = [
    { title: "Total Properties", value: "1,234", icon: Building2, change: "+12%" },
    { title: "Active Users", value: "5,678", icon: Users, change: "+8%" },
    { title: "Revenue", value: "$123,456", icon: DollarSign, change: "+15%" },
    { title: "Views This Month", value: "45,678", icon: Eye, change: "+22%" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gradient">Dashboard Overview</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Welcome back! Here's what's happening with your properties.
            </p>
          </div>
          <Button className="btn-hero" onClick={handleScheduleMeeting}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover interactive-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 card-gradient">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "New inquiry", property: "3BHK Apartment in Mumbai", time: "2 hours ago", icon: MessageCircle },
                { action: "Property viewed", property: "Villa in Goa", time: "4 hours ago", icon: Eye },
                { action: "Added to favorites", property: "2BHK Flat in Pune", time: "6 hours ago", icon: Heart },
                { action: "Site visit scheduled", property: "Penthouse in Delhi", time: "1 day ago", icon: Calendar },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.property}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="property" className="w-full justify-start" size="lg" onClick={handleAddProperty}>
                <Building2 className="mr-3 h-5 w-5" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg" onClick={handleManageClients}>
                <Users className="mr-3 h-5 w-5" />
                Manage Clients
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg" onClick={handleViewAnalytics}>
                <TrendingUp className="mr-3 h-5 w-5" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg" onClick={handleMessages}>
                <MessageCircle className="mr-3 h-5 w-5" />
                Messages
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;