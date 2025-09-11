import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Bug,
  Info,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CircleDollarSign,
  ListChecks,
  MessageSquare,
  Calendar,
  CheckSquare,
  AlertCircle,
  Type as TypeIcon,
  Building,
  Users,
  DollarSign,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const { toast } = useToast();

  const handleViewUsers = () => {
    toast({ title: "Users", description: "Loading user management panel..." });
    // Navigate to users page
  };

  const handleViewProperties = () => {
    toast({
      title: "Properties",
      description: "Loading properties management...",
    });
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
  const [loading, setLoading] = useState(true);

  // State for Problem Reports
  const [problemReports, setProblemReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportEditMode, setIsReportEditMode] = useState(false);
  const [editReportForm, setEditReportForm] = useState({
    problem_type: "",
    name: "",
    email: "",
    problem_summary: "",
    detailed_description: "",
    priority: "",
  });

  // State for Request Info
  const [requestInfoList, setRequestInfoList] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRequestInfoDialogOpen, setIsRequestInfoDialogOpen] = useState(false);
  const [isRequestInfoEditMode, setIsRequestInfoEditMode] = useState(false);
  const [editRequestInfoForm, setEditRequestInfoForm] = useState({
    info_types: "",
    full_name: "",
    email: "",
    phone_number: "",
  });

  const fetchProblemReports = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/report-problems/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProblemReports(data.results || data || []);
      } else {
        console.error("Failed to fetch problem reports:", response.status);
      }
    } catch (error) {
      console.error("Error fetching problem reports:", error);
    }
  };

  const fetchRequestInfo = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8000/api/request-info/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequestInfoList(data.results || data || []);
      } else {
        console.error("Failed to fetch request info:", response.status);
      }
    } catch (error) {
      console.error("Error fetching request info:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchProblemReports(), fetchRequestInfo()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  // --- Problem Report Functions ---
  const handleReportClick = (report) => {
    setSelectedReport(report);
    setEditReportForm({
      problem_type: report.problem_type || "",
      name: report.name || "",
      email: report.email || "",
      problem_summary: report.problem_summary || "",
      detailed_description: report.detailed_description || "",
      priority: report.priority || "low",
    });
    setIsReportDialogOpen(true);
    setIsReportEditMode(false);
  };

  const handleSaveReportEdit = async () => {
    if (!selectedReport) return;
    const token = localStorage.getItem("access_token");
    try {
      const payload = {
        ...selectedReport, // a good practice to not lose fields
        ...editReportForm,
      };

      const response = await fetch(
        `http://127.0.0.1:8000/api/report-problems/${selectedReport.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "Report updated successfully!",
        });
        setIsReportDialogOpen(false);
        fetchProblemReports();
      } else {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        toast({
          title: "Error",
          description: `Failed to update: ${JSON.stringify(errorData)}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating report",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReport = async (slug) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/report-problems/${slug}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        toast({
          title: "Success",
          description: "Report deleted successfully!",
        });
        setIsReportDialogOpen(false);
        fetchProblemReports();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete report",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting report",
        variant: "destructive",
      });
    }
  };

  // --- Request Info Functions ---
  // const handleRequestInfoClick = (request) => {
  //   setSelectedRequest(request);
  //   setEditRequestInfoForm({
  //     info_types: (request.info_types || []).join(", "),
  //     full_name: request.full_name || "",
  //     email: request.email || "",
  //     phone_number: request.phone_number || "",
  //   });
  //   setIsRequestInfoDialogOpen(true);
  //   setIsRequestInfoEditMode(false);
  // };

  const handleRequestInfoClick = (request) => {
    setSelectedRequest(request);
    setEditRequestInfoForm({
      info_types: Array.isArray(request.info_types)
        ? request.info_types.join(", ")
        : request.info_types || "",
      full_name: request.full_name || "",
      email: request.email || "",
      phone_number: request.phone_number || "",
    });
    setIsRequestInfoDialogOpen(true);
    setIsRequestInfoEditMode(false);
  };

  const handleSaveRequestInfoEdit = async () => {
    if (!selectedRequest) return;
    const token = localStorage.getItem("access_token");
    const identifier = selectedRequest.slug;
    try {
      const payload = {
        full_name: editRequestInfoForm.full_name.trim(),
        email: editRequestInfoForm.email.trim(),
        phone_number: editRequestInfoForm.phone_number.trim(),
        info_types: editRequestInfoForm.info_types
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        `http://localhost:8000/api/request-info/${identifier}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "Request info updated successfully!",
        });
        setIsRequestInfoDialogOpen(false);
        fetchRequestInfo();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to update: ${JSON.stringify(errorData)}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating request info",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRequestInfo = async (slug) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/request-info/${slug}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 204) {
        toast({
          title: "Success",
          description: "Request info deleted successfully!",
        });
        setIsRequestInfoDialogOpen(false);
        fetchRequestInfo();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete request info",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting request info",
        variant: "destructive",
      });
    }
  };

  const renderDetailRow = (Icon, label, value, fullWidth = false) => (
    <div className={`py-2 ${fullWidth ? "md:col-span-2" : ""}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
        <div className="flex flex-col w-full">
          <span className="font-semibold text-sm text-muted-foreground">
            {label}
          </span>
          <span className="text-base break-words">{value || "N/A"}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              className="card-hover cursor-pointer"
              onClick={handleViewUsers}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,543</div>
                <Badge className="bg-success text-success-foreground">
                  +12%
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="card-hover cursor-pointer"
              onClick={handleViewProperties}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,921</div>
                <Badge className="bg-success text-success-foreground">
                  +8%
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
                <div className="text-3xl font-bold">₹2.1Cr</div>
                <Badge className="bg-success text-success-foreground">
                  +15%
                </Badge>
              </CardContent>
            </Card>

            <Card
              className="card-hover cursor-pointer"
              onClick={handlePendingApprovals}
            >
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
                    <Badge className="bg-success text-success-foreground">
                      Online
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Database</span>
                    <Badge className="bg-success text-success-foreground">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Services</span>
                    <Badge className="bg-success text-success-foreground">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ReportProblem and RequestInfo */}
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1  gap-8 items-start">
            {/* Problem Reports Section */}
            <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bug className="h-6 w-6 text-red-500" />
                  <span className="text-xl font-bold">
                    Recent Problem Reports
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p>Loading reports...</p>
                ) : problemReports.length > 0 ? (
                  problemReports.slice(0, 5).map((report) => (
                    <div
                      key={report.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                      onClick={() => handleReportClick(report)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-base mb-1 pr-2">
                          {report.problem_summary}
                        </p>
                        <Badge
                          variant={
                            report.priority === "high" ||
                            report.priority === "critical"
                              ? "destructive"
                              : "outline"
                          }
                          className="capitalize flex-shrink-0"
                        >
                          {report.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-3">
                        {report.detailed_description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{report.name}</span>
                        <span>
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No problem reports yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Request Info Section */}
            <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-bold">
                    Recent Information Requests
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p>Loading requests...</p>
                ) : requestInfoList.length > 0 ? (
                  requestInfoList.slice(0, 5).map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                      onClick={() => handleRequestInfoClick(request)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-base mb-1 pr-2">
                          {request.property_type} in{" "}
                          {request.preferred_location}
                        </p>
                        <Badge variant="default" className="flex-shrink-0">
                          Request
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-3">
                        Budget: {request.budget_range}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium">{request.full_name}</span>
                        <span>
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No information requests yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Problem Report Detail Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="sm:max-w-3xl p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Bug className="text-red-500" /> Problem Report
              </DialogTitle>
              <DialogDescription>
                View, edit, or delete the problem report.
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="py-4 border-t">
                {isReportEditMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">User Name</Label>
                      <Input
                        id="name"
                        value={editReportForm.name}
                        onChange={(e) =>
                          setEditReportForm({
                            ...editReportForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">User Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editReportForm.email}
                        onChange={(e) =>
                          setEditReportForm({
                            ...editReportForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="problem_type">Problem Type</Label>
                      <Input
                        id="problem_type"
                        value={editReportForm.problem_type}
                        onChange={(e) =>
                          setEditReportForm({
                            ...editReportForm,
                            problem_type: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={editReportForm.priority}
                        onValueChange={(value) =>
                          setEditReportForm({
                            ...editReportForm,
                            priority: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="problem_summary">Summary</Label>
                      <Input
                        id="problem_summary"
                        value={editReportForm.problem_summary}
                        onChange={(e) =>
                          setEditReportForm({
                            ...editReportForm,
                            problem_summary: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="detailed_description">Description</Label>
                      <Textarea
                        id="detailed_description"
                        value={editReportForm.detailed_description}
                        onChange={(e) =>
                          setEditReportForm({
                            ...editReportForm,
                            detailed_description: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </div>
                    <DialogFooter className="md:col-span-2 pt-6">
                      <Button
                        variant="outline"
                        onClick={() => setIsReportEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveReportEdit}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-4">
                    {renderDetailRow(User, "User Name", selectedReport.name)}
                    {renderDetailRow(Mail, "User Email", selectedReport.email)}
                    {renderDetailRow(
                      TypeIcon,
                      "Problem Type",
                      selectedReport.problem_type
                    )}
                    {renderDetailRow(
                      AlertCircle,
                      "Priority",
                      selectedReport.priority
                    )}
                    {renderDetailRow(
                      ListChecks,
                      "Summary",
                      selectedReport.problem_summary,
                      true
                    )}
                    {renderDetailRow(
                      ListChecks,
                      "Description",
                      selectedReport.detailed_description,
                      true
                    )}
                    <DialogFooter className="md:col-span-2 pt-8 gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteReport(selectedReport.slug)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setIsReportEditMode(true)}
                      >
                        Edit Report
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Request Info Detail Dialog */}
        <Dialog
          open={isRequestInfoDialogOpen}
          onOpenChange={setIsRequestInfoDialogOpen}
        >
          <DialogContent className="border sm:max-w-3xl ">
            {selectedRequest && (
              <div className=" ">
                {isRequestInfoEditMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
                    <div className="space-y-2 ">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={editRequestInfoForm.full_name}
                        onChange={(e) =>
                          setEditRequestInfoForm({
                            ...editRequestInfoForm,
                            full_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editRequestInfoForm.email}
                        onChange={(e) =>
                          setEditRequestInfoForm({
                            ...editRequestInfoForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone</Label>
                      <Input
                        id="phone_number"
                        value={editRequestInfoForm.phone_number}
                        onChange={(e) =>
                          setEditRequestInfoForm({
                            ...editRequestInfoForm,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="info_types">
                        Info Types (comma-separated)
                      </Label>
                      <Input
                        id="info_types"
                        value={editRequestInfoForm.info_types}
                        onChange={(e) =>
                          setEditRequestInfoForm({
                            ...editRequestInfoForm,
                            info_types: e.target.value,
                          })
                        }
                      />
                    </div>
                    <DialogFooter className="md:col-span-2 pt-6">
                      <Button
                        variant="outline"
                        onClick={() => setIsRequestInfoEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveRequestInfoEdit}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-4">
                    {renderDetailRow(
                      User,
                      "Full Name",
                      selectedRequest.full_name
                    )}
                    {renderDetailRow(Mail, "Email", selectedRequest.email)}
                    {renderDetailRow(
                      Phone,
                      "Phone",
                      selectedRequest.phone_number
                    )}
                    {renderDetailRow(MapPin, "City", selectedRequest.city)}
                    {renderDetailRow(
                      Building2,
                      "Property Type",
                      selectedRequest.property_type
                    )}
                    {renderDetailRow(
                      CircleDollarSign,
                      "Budget",
                      selectedRequest.budget_range
                    )}
                    {renderDetailRow(
                      TypeIcon,
                      "Info Types",
                      (selectedRequest.info_types || []).join(", ")
                    )}
                    {renderDetailRow(
                      MessageSquare,
                      "Contact Method",
                      selectedRequest.communication_method
                    )}
                    {renderDetailRow(
                      Calendar,
                      "Timeline",
                      selectedRequest.timeline
                    )}
                    {renderDetailRow(
                      CheckSquare,
                      "Consent",
                      selectedRequest.consent ? "Yes" : "No"
                    )}
                    {renderDetailRow(
                      MapPin,
                      "Preferred Location",
                      selectedRequest.preferred_location,
                      true
                    )}
                    {renderDetailRow(
                      ListChecks,
                      "Requirements",
                      selectedRequest.specific_requirements,
                      true
                    )}
                    <DialogFooter className="md:col-span-2 pt-8 gap-2">
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDeleteRequestInfo(
                            selectedRequest.slug 
                          )
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setIsRequestInfoEditMode(true)}
                      >
                        Edit{" "}
                      </Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminDashboard;
