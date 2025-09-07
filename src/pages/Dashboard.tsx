import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, TrendingUp, DollarSign, Eye, Heart, Calendar, MessageCircle, Clock, MapPin, User, Edit, Trash2, Save, X, AlertTriangle, Bug, FileText, CreditCard, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import PropertySearch from "./PropertySearch";

const Dashboard = () => {
  const { toast } = useToast();
  const [visits, setVisits] = useState([]);
  const [problemReports, setProblemReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    preferred_time: '',
    status: '',
    property: ''
  });
  
  // Filter state for PropertySearch
  const [filterState, setFilterState] = useState({
    sortBy: 'relevance',
    priceRange: [0, 1000000],
    propertyType: '',
    searchTerm: ''
  });

  // Fetch user visits
  const fetchUserVisits = async () => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/visits/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVisits(data);
        console.log("Visits fetched:", data);
      } else {
        console.error("Failed to fetch visits:", response.status);
      }
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch problem reports
  const fetchProblemReports = async () => {
    const token = localStorage.getItem("access_token");
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/report-problems/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProblemReports(data.results || data || []);
        console.log("Problem reports fetched:", data);
      } else {
        console.error("Failed to fetch problem reports:", response.status);
      }
    } catch (error) {
      console.error("Error fetching problem reports:", error);
    }
  };

  useEffect(() => {
    fetchUserVisits();
    fetchProblemReports();
  }, []);

  // Edit visit function
  const handleEditVisit = async (visit) => {
    setEditMode(true);
    setEditFormData({
      preferred_time: visit.preferred_time.slice(0, 16), // Format for datetime-local input
      status: visit.status,
      property: visit.property.toString()
    });
    console.log("Editing visit:", visit);
  };

  // Save edited visit
  const handleSaveEdit = async (visit) => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to save changes",
        variant: "destructive"
      });
      return;
    }

    try {
      const updateData = {
        preferred_time: editFormData.preferred_time,
        status: editFormData.status,
        user: visit.user,
        property: parseInt(editFormData.property)
      };

      const response = await fetch(`http://127.0.0.1:8000/api/visits/${visit.slug}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        toast({
          title: "Visit Updated",
          description: "Visit has been successfully updated.",
        });
        
        setEditMode(false);
        fetchUserVisits(); // Refresh list
      } else {
        const errorData = await response.json();
        console.error("Update Error:", errorData);
        toast({
          title: "Update Failed",
          description: "Failed to update visit. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditFormData({
      preferred_time: '',
      status: '',
      property: ''
    });
  };

  // Delete visit function
  const handleDeleteVisit = async (visit) => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to delete visit",
        variant: "destructive"
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this visit?")) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/visits/${visit.slug}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        toast({
          title: "Visit Deleted",
          description: "Visit has been successfully deleted.",
        });
        
        // Refresh visits list
        fetchUserVisits();
      } else {
        const errorData = await response.json();
        console.error("Delete Error:", errorData);
        toast({
          title: "Delete Failed",
          description: "Failed to delete visit. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast({
        title: "Network Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive"
      });
    }
  };

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
    <>
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
              {loading ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Loading visits...</p>
                </div>
              ) : visits.length > 0 ? (
                visits.slice(0, 4).map((visit, index) => (
                  <Dialog key={visit.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Visit Scheduled</p>
                          <p className="text-sm text-muted-foreground">
                            Status: {visit.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">
                            {new Date(visit.preferred_time).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(visit.preferred_time).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          Visit Details
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {editMode ? (
                          // Edit Form
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Visit ID</Label>
                                <p className="font-medium text-muted-foreground">{visit.id} (Read-only)</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <Select value={editFormData.status} onValueChange={(value) => setEditFormData({...editFormData, status: value})}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium">Preferred Time</Label>
                              <Input 
                                type="datetime-local"
                                value={editFormData.preferred_time}
                                onChange={(e) => setEditFormData({...editFormData, preferred_time: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Property ID</Label>
                              <Input 
                                type="number"
                                value={editFormData.property}
                                onChange={(e) => setEditFormData({...editFormData, property: e.target.value})}
                              />
                            </div>

                            <div>
                              <Label className="text-sm font-medium">User ID</Label>
                              <p className="text-xs text-muted-foreground break-all">{visit.user} (Read-only)</p>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                              <Button 
                                className="flex-1"
                                onClick={() => handleSaveEdit(visit)}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={handleCancelEdit}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          </>
                        ) : (
                          // View Mode
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-2 border rounded-lg">
                                <label className="text-sm font-medium text-muted-foreground">Visit ID</label>
                                <p className="font-semibold text-lg">#{visit.id}</p>
                              </div>
                              <div className="p-2 border rounded-lg">
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <Badge variant={visit.status === 'Pending' ? 'secondary' : 'default'} className="mt-1">
                                  {visit.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="p-2 border rounded-lg">
                              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Preferred Time
                              </label>
                              <p className="font-medium mt-1">
                                {new Date(visit.preferred_time).toLocaleDateString()} at {new Date(visit.preferred_time).toLocaleTimeString()}
                              </p>
                            </div>

                            <div className="p-2 border rounded-lg">
                              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Property ID
                              </label>
                              <p className="font-medium mt-1">#{visit.property}</p>
                            </div>

                            <div className="p-2 border rounded-lg">
                              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                <User className="h-4 w-4" />
                                User ID
                              </label>
                              <p className="font-medium text-xs break-all mt-1">{visit.user}</p>
                            </div>

                            <div className="p-2 border rounded-lg">
                              <label className="text-sm font-medium text-muted-foreground">Created At</label>
                              <p className="font-medium mt-1">
                                {new Date(visit.created_at).toLocaleDateString()} at {new Date(visit.created_at).toLocaleTimeString()}
                              </p>
                            </div>

                            <div className="p-2 border rounded-lg">
                              <label className="text-sm font-medium text-muted-foreground">Slug</label>
                              <p className="text-xs text-muted-foreground break-all mt-1">{visit.slug}</p>
                            </div>

                            {/* Edit and Delete Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleEditVisit(visit)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Visit
                              </Button>
                              <Button 
                                variant="destructive" 
                                className="flex-1"
                                onClick={() => handleDeleteVisit(visit)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Visit
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                // Fallback to static data if no visits
                [
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
                ))
              )}
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

        {/* Problem Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <Card className="lg:col-span-2 card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Recent Problem Reports
              </CardTitle>
              <CardDescription>Latest issues reported by users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {problemReports.length > 0 ? (
                problemReports.slice(0, 5).map((report, index) => (
                  <div key={report.id || index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-full ${
                      report.priority_level === 'critical' ? 'bg-red-100 text-red-600' :
                      report.priority_level === 'high' ? 'bg-orange-100 text-orange-600' :
                      report.priority_level === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {report.problem_type === 'technical' ? <Bug className="h-4 w-4" /> :
                       report.problem_type === 'account' ? <FileText className="h-4 w-4" /> :
                       report.problem_type === 'payment' ? <CreditCard className="h-4 w-4" /> :
                       report.problem_type === 'mobile' ? <Smartphone className="h-4 w-4" /> :
                       <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{report.problem_summary}</p>
                      <p className="text-sm text-muted-foreground">
                        {report.name} • {report.problem_type} • {report.priority_level}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        report.priority_level === 'critical' ? 'destructive' :
                        report.priority_level === 'high' ? 'destructive' :
                        report.priority_level === 'medium' ? 'secondary' :
                        'outline'
                      }>
                        {report.priority_level}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'Just now'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No problem reports yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Problem Reports Stats */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Reports Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Reports</span>
                  <span className="font-semibold">{problemReports.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Critical</span>
                  <span className="font-semibold text-red-600">
                    {problemReports.filter(r => r.priority_level === 'critical').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Priority</span>
                  <span className="font-semibold text-orange-600">
                    {problemReports.filter(r => r.priority_level === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Medium Priority</span>
                  <span className="font-semibold text-yellow-600">
                    {problemReports.filter(r => r.priority_level === 'medium').length}
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    
    {/* Quick Filters for PropertySearch */}
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-muted-foreground">Quick Filters:</span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilterState({...filterState, sortBy: 'price-low'})}
        >
          Price: Low to High
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilterState({...filterState, sortBy: 'price-high'})}
        >
          Price: High to Low
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilterState({...filterState, sortBy: 'newest'})}
        >
          Newest First
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setFilterState({...filterState, sortBy: 'relevance'})}
        >
          Relevance
        </Button>
      </div>
    </div>
    
    <PropertySearch 
      initialFilters={filterState}
      onFilterChange={setFilterState}
    />
    </>
   
  );
};

export default Dashboard;