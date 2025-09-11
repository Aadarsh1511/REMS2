import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Eye,
  Heart,
  DollarSign,
  Plus,
  MessageCircle,
  Info,
  User,
  AlertCircle,
} from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

const OwnerDashboard = () => {
  const { toast } = useToast();

  const handleAddProperty = () => {
    toast({
      title: "Add Property",
      description: "Redirecting to add property page...",
    });
    window.location.href = "/add-property";
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
    toast({
      title: "Views",
      description: "Loading property views analytics...",
    });
    // Navigate to analytics page
  };

  const handleViewInterested = () => {
    toast({
      title: "Interested Buyers",
      description: "Loading interested buyers list...",
    });
    // Navigate to interested buyers page
  };

  const handleViewRevenue = () => {
    toast({ title: "Revenue", description: "Loading revenue report..." });
    // Navigate to revenue page
  };

  const [GrievanceData, setGrievanceData] = useState([]);
  const [grievanceOpen, setGrievanceOpen] = useState(false);
  const [SelectedGrievance, setSelectedGrievance] = useState(null);
  const [grievanceDataEditMode, setGrievanceDataEditMode] = useState(false);

  const fetchGrievances = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/grievances/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const grievances = await response.json();
        setGrievanceData(grievances);
        console.log(grievances);
        toast({
          title: "Success",
          description: "grievances data fetched successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch grievances data",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to fetch grievances data  because of method is wrong",
      });
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  // Grievance Edit

  const [grievanceEdit, setGrievanceEdit] = useState({
    user: "",
    title: "",
    description: "",
    category: "",
    priority: "",
    property_id: "",
    transaction_id: "",
    evidence:null,
  });

  const handleGrievanceEditChange = (field, value) => {
    setGrievanceEdit((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrievanceEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGrievanceEdit((prev) => ({
      ...prev,
      evidence: file,
    }));
  };

  const handleGrievanceEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/grievances/${SelectedGrievance.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(grievanceEdit),
        }
      );
      if (response.ok) {
        const grievanceUpdate = await response.json();
        console.log(grievanceUpdate);
        setSelectedGrievance(grievanceUpdate);
        setGrievanceDataEditMode(false);
        // optionatly refresh the customer data list
        setGrievanceData((prev) =>
          prev.map((grievance) =>
            grievance.slug === grievanceUpdate.slug ? grievanceUpdate : grievance
          )
        );
        toast({
          title: "Success",
          description: "grievances data updated successfully",
        });
      } else {
        console.log("Failed to update grievances data");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to update grievances data because of method is wrong",
      });
    }
  };

  // Grievance Delete


    
  
  const handleGrievanceDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/grievances/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setGrievanceData((prev) =>
          prev.filter((grievances) => grievances.slug !== slug)
        );
        setGrievanceOpen(false);
        toast({
          title: "Success",
          description: "grievances data deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete grievances data",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to delete grievances data because of method is wrong",
      });
    }
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
          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewProperties}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <Badge className="bg-success text-success-foreground">
                2 sold
              </Badge>
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

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewInterested}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Interested Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <Badge className="bg-warning text-warning-foreground">
                8 new
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewRevenue}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹45L</div>
              <Badge className="bg-success text-success-foreground">
                Last 6 months
              </Badge>
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
                    <p className="text-sm text-muted-foreground">
                      156 views this week
                    </p>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    Hot
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Villa - Goa</p>
                    <p className="text-sm text-muted-foreground">
                      89 views this week
                    </p>
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
                    <p className="text-sm text-muted-foreground">
                      For Bandra Apartment
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessage("price negotiation")}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Price negotiation</p>
                    <p className="text-sm text-muted-foreground">
                      For Pune Flat
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMessage("site visit request")}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grievance fetched data card */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              <CardTitle>Grievance</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {GrievanceData &&
              GrievanceData.map((grievances, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedGrievance(grievances);
                      setGrievanceEdit(grievances)
                      setGrievanceOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{grievances.title}</p>
                      <p className="text-gray-500">{grievances.status}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-red-300 text-center">
                        {grievances.priority}
                      </p>
                      <p>
                        {new Date(grievances.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Grievance Edit and Delete */}
        <Dialog open={grievanceOpen} onOpenChange={setGrievanceOpen}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <div className="px-4 py-4 border-b bg-muted/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-base md:text-lg font-semibold">
                  Grievance Details
                </h2>
              </div>
            </div>
            {/* customer scrollbar content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {SelectedGrievance && (
                <div className="space-y-4">
                  {grievanceDataEditMode ? (
                    // Edit Mode
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="user" className="text-sm font-medium">
                          User Id
                        </Label>
                        <Input
                          id="user"
                          name="user"
                          value={grievanceEdit.user}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Category *
                        </Label>
                        <Select
                          value={grievanceEdit.category}
                          onValueChange={(value) =>
                            handleGrievanceEditChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grievance category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Service Quality">
                              Service Quality
                            </SelectItem>
                            <SelectItem value="Documentation">
                              Documentation Issues
                            </SelectItem>
                            <SelectItem value="Technical">
                              Technical Problems
                            </SelectItem>
                            <SelectItem value="Payment">
                              Payment Issues
                            </SelectItem>
                            <SelectItem value="Agent Behavior">
                              Agent Behavior
                            </SelectItem>
                            <SelectItem value="Property Listing">
                              Property Listing
                            </SelectItem>
                            <SelectItem value="Legal Documentation">
                              Legal Documentation
                            </SelectItem>
                            <SelectItem value="Site Visit">
                              Site Visit Issues
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* priority level */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="priority"
                          className="text-sm font-medium"
                        >
                          Priority Level
                        </Label>
                        <Select
                          value={grievanceEdit.priority}
                          onValueChange={(value) =>
                            handleGrievanceEditChange("priority", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Grievance Title *
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          value={grievanceEdit.title}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="what_went_well"
                          className="text-sm font-medium"
                        >
                          Detailed Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={grievanceEdit.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full resize-none"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="property_id"
                          className="text-sm font-medium"
                        >
                          Property ID
                        </Label>
                        <Input
                          id="property_id"
                          name="property_id"
                          type="text"
                          value={grievanceEdit.property_id}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="transaction_id"
                          className="text-sm font-medium"
                        >
                          Transaction ID
                        </Label>
                        <Input
                          id="transaction_id"
                          name="transaction_id"
                          type="text"
                          value={grievanceEdit.transaction_id}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="evidence"
                          className="text-sm font-medium"
                        >
                          Supporting Evidence (Optional)
                        </Label>
                        <Input
                          id="evidence"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>

                      <DialogFooter>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setGrievanceDataEditMode(false)}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleGrievanceEditSubmit}
                            className="w-full sm:w-auto"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </DialogFooter>
                    </div>
                  ) : (
                    // View Mode - AdminDashboard style
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x6">
                        {/* Using the same renderDetailRow function style from AdminDashboard */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <div className="flex flex-col w-full">
                              <span className="text-sm font-medium text-muted-foreground">
                                User ID
                              </span>
                              <p className="text-base font-medium break-words pl-6">
                                {SelectedGrievance.user || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* email */}

                        {/* category */}
                        <div className="py-2">
                          <div className="flex items-start gap-3">
                            <Building className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="font-semibold text-sm text-muted-foreground">
                                Category
                              </span>
                              <span className="text-base break-words">
                                {SelectedGrievance.category || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Priority Level
                              </span>
                              <span className="text-base break-words p-6">
                                {SelectedGrievance.priority || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Grievance Title
                              </span>
                              <span className="text-base break-words p-6">
                                {SelectedGrievance.title || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Detailed Description
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedGrievance.description || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Property ID
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedGrievance.property_id || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Trasaction ID
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedGrievance.transaction_id || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Evidence
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedGrievance.evidence || "N/A"}
                            </p>
                          </div>
                        </div>

                        <DialogFooter className="md:col-span-2 pt-8 gap-2">
                          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                            <Button
                              variant="destructive"
                              onClick={() => handleGrievanceDelete(SelectedGrievance.slug)}
                              className="w-full sm:w-auto"
                            >
                              Delete feedback
                            </Button>
                            <Button
                              variant="default"
                              onClick={() => {
                                setGrievanceEdit(SelectedGrievance);
                                setGrievanceDataEditMode(true);
                              }}
                              className="w-full sm:w-auto"
                            >
                              Edit Details
                            </Button>
                          </div>
                        </DialogFooter>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default OwnerDashboard;
function setGrievanceData(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}

function setGrievanceOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

