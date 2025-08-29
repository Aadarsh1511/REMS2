import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building, DollarSign, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleViewUsers = () => {
    toast({ title: "Users", description: "Loading user management panel..." });
    // Navigate to users page
  };

  const handleViewProperties = () => {
    toast({ title: "Properties", description: "Loading properties management..." });
    // Navigate to properties page
  };

  const handleViewRevenue = () => {
    toast({ title: "Revenue", description: "Loading revenue analytics..." });
    // Navigate to revenue page
  };

  const handlePendingApprovals = () => {
    toast({ title: "Approvals", description: "Loading pending approvals..." });
    // Navigate to approvals page
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-hover cursor-pointer" onClick={handleViewUsers}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12,543</div>
              <Badge className="bg-success text-success-foreground">+12%</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handleViewProperties}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,921</div>
              <Badge className="bg-success text-success-foreground">+8%</Badge>
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
              <div className="text-3xl font-bold">₹2.1Cr</div>
              <Badge className="bg-success text-success-foreground">+15%</Badge>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer" onClick={handlePendingApprovals}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <Badge variant="destructive">Action Required</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>New property listing</span>
                  <Badge variant="secondary">2 min ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>User verification</span>
                  <Badge variant="secondary">5 min ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment processed</span>
                  <Badge variant="secondary">10 min ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Server Status</span>
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Database</span>
                  <Badge className="bg-success text-success-foreground">Healthy</Badge>
                </div>
                <div className="flex justify-between">
                  <span>AI Services</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;