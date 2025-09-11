import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Phone,
  Info,
  User,
  Mail,
  AlertCircle,
  MessageSquare,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AgentDashboard = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState([]);

  // Fetch leads on component mount and set interval for auto-refresh
  useEffect(() => {
    fetchLeads();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("access_token");
      // console.log("Fetching leads with token:", token ? "Token exists" : "No token");

      const response = await fetch("http://127.0.0.1:8000/api/leads/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Leads API response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Raw API response:", result);
        console.log("Response type:", typeof result);
        // console.log("Is array:", Array.isArray(result));

        // Handle different response structures
        let leadsData = result;
        if (result.results) {
          leadsData = result.results; // Paginated response
          console.log("Using paginated results:", leadsData);
        }

        console.log("Leads data to process:", leadsData);
        console.log("Total leads count:", leadsData.length);

        if (leadsData.length > 0) {
          console.log("First lead structure:", leadsData[0]);
          console.log("First lead created_at:", leadsData[0].created_at);
        }

        // Show all leads first (remove date filter for testing)
        console.log("Setting all leads in state for testing");
        setLeads(leadsData);
      } else {
        const errorText = await response.text();
        console.log(
          "Failed to fetch leads:",
          response.status,
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleCall = (number: string) => {
    toast({ title: "Calling", description: `Initiating call to ${number}...` });
    window.open(`tel:${number}`, "_self");
  };

  const handleMessage = (contact: string) => {
    toast({ title: "Message", description: `Opening chat with ${contact}...` });
    // Open messaging interface
  };

  const handleViewListings = () => {
    toast({
      title: "Listings",
      description: "Loading your property listings...",
    });
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

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [customerEditMode, setCustomerEditMode] = useState(false);
  const [customerdata, setCustomerData] = useState([]);
  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://127.0.0.1:8000/api/support-tickets/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCustomerData(data);
      } else {
        console.log("Failed to fetch customer data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // customer service edit

  const [customerEdit, setCustomerEdit] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    category: "",
    subject: "",
    message: "",
    priority: "",
  });
  const handleCustomerEditChange = (e: any) => {
    const { name, value } = e.target;
    setCustomerEdit({ ...customerEdit, [name]: value });
  };
  // Edit
  const handleCustomerEditSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedCustomer?.id) {
      console.error("No customer selected for edit!");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${selectedCustomer.id}/`, // 👈 numeric id use kar
        {
          method: "PATCH", // PATCH better than PUT
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerEdit),
        }
      );

      if (response.ok) {
        const update = await response.json();
        setCustomerData((prev) =>
          prev.map((c) => (c.id === update.id ? update : c))
        );
        setSelectedCustomer(update);
        setCustomerEditMode(false);
        toast({ title: "Success", description: "Customer updated!" });
      } else {
        const err = await response.json();
        console.log("Update error:", err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleCustomerDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${id}/`, // 👈 numeric id
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCustomerData((prev) => prev.filter((c) => c.id !== id));
        setOpen(false);
        toast({ title: "Success", description: "Customer deleted!" });
      } else {
        const err = await response.json();
        console.log("Delete error:", err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Feedback Fetching data
  const [SelectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedbackDataEditMode, setFeedbackDataEditMode] = useState(false);

  const fetchFeedbackData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const feeddata = await response.json();
        setFeedbackData(feeddata);
        console.log(feeddata);
        toast({
          title: "Success",
          description: "Feedback data fetched successfully",
        });
      } else {
        toast({ title: "Error", description: "Failed to fetch Feedback data" });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to fetch Feedback data  because of method is wrong",
      });
    }
  };
  // Feedback useEffect
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  // Feedback Edit
  const [rating, setRating] = useState(0);
  const [feedbackEdit, setFeedbackEdit] = useState({
    name: "",
    email: "",
    category: "",
    feedback_type: "",
    rating: 0,
    subject: "",
    detailed_feedback: "",
    what_went_well: "",
    how_to_improve: "",
    recommend_us: "",
  });

  const handleFeedbackEditChange = (e: any) => {
    const { name, value } = e.target;
    setFeedbackEdit({ ...feedbackEdit, [name]: value });
  };

  const handleFeedbackEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/feedback/${SelectedFeedback.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackEdit),
        }
      );
      if (response.ok) {
        const feedupdate = await response.json();
        console.log(feedupdate);
        setSelectedFeedback(feedupdate);
        setFeedbackDataEditMode(false);
        // optionatly refresh the customer data list
        setFeedbackData((prev) =>
          prev.map((feedback) =>
            feedback.slug === feedupdate.slug ? feedupdate : feedback
          )
        );
        toast({
          title: "Success",
          description: "Feedback data updated successfully",
        });
      } else {
        console.log("Failed to update Feedback data");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to update Feedback data because of method is wrong",
      });
    }
  };
  // Feedback Delete
  const handleFeedbackDelete = async (slug: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/feedback/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setFeedbackData((prev) =>
          prev.filter((feedback) => feedback.slug !== slug)
        );
        setFeedbackOpen(false);
        toast({
          title: "Success",
          description: "Feedback data deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete feedback data",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Failed to delete feedback data because of method is wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gradient">Agent Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewListings}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                My Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
              <Badge className="bg-success text-success-foreground">
                3 new
              </Badge>
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
              <Badge className="bg-warning text-warning-foreground">
                5 urgent
              </Badge>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer"
            onClick={handleViewSchedule}
          >
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
              <Badge className="bg-success text-success-foreground">
                This month
              </Badge>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Schedule</CardTitle>
              <Button size="sm" variant="outline" onClick={fetchLeads}>
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.length > 0 ? (
                  leads.map((lead, index) => (
                    <div
                      key={lead.id || index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {lead.name || "No Name"} -{" "}
                          {lead.source || "Unknown Source"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {lead.phone || "No Phone"} |{" "}
                          {lead.email || "No Email"}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {lead.status || "New"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Property: {lead.property || "N/A"} | Created:{" "}
                          {lead.created_at
                            ? new Date(lead.created_at).toLocaleString()
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCall(lead.phone || "")}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessage(lead.name || "Lead")}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">No leads found</p>
                      <p className="text-sm text-muted-foreground">
                        Check console for API response
                      </p>
                    </div>
                  </div>
                )}
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
                    <p className="text-sm text-muted-foreground">
                      Sarah Wilson
                    </p>
                  </div>
                  <Badge variant="secondary">5 min ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Service */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              <CardTitle>Customer Service Data</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {customerdata &&
              customerdata.map((customer, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setCustomerEdit(customer);
                      setOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{customer.full_name}</p>
                      <p className="text-gray-500">{customer.subject}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-blue-400 text-center">
                        {customer.priority}
                      </p>
                      <p>
                        {new Date(customer.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
        {/*  Replace your existing Dialog section with this AdminDashboard styled
        version */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <div className="px-4 py-4 border-b bg-muted/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-base md:text-lg font-semibold">
                  Customer Service Details
                </h2>
              </div>
            </div>
            {/* customer scrollbar content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {selectedCustomer && (
                <div className="space-y-4">
                  {customerEditMode ? (
                    // Edit Mode
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="full_name"
                          className="text-sm font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={customerEdit.full_name}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerEdit.email}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone_number"
                          className="text-sm font-medium"
                        >
                          Phone
                        </Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          value={customerEdit.phone_number}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          Category
                        </Label>
                        <Input
                          id="category"
                          name="category"
                          value={customerEdit.category}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="priority"
                          className="text-sm font-medium"
                        >
                          Priority
                        </Label>
                        <Select
                          value={customerEdit.priority}
                          onValueChange={(value) =>
                            setCustomerEdit({
                              ...customerEdit,
                              priority: value,
                            })
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
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={customerEdit.subject}
                          onChange={handleCustomerEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={customerEdit.message}
                          onChange={handleCustomerEditChange}
                          rows={4}
                          className="w-full resize-none"
                        />
                      </div>
                      <DialogFooter>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCustomerEditMode(false)}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCustomerEditSubmit}
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
                                Full Name
                              </span>
                              <p className="text-base font-medium break-words pl-6">
                                {selectedCustomer.full_name || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* email */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-blue-500 flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className=" font-medium text-sm text-muted-foreground">
                                Email
                              </span>
                              <p className="text-base break-words">
                                {selectedCustomer.email || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Phone
                              </span>
                              <p className="text-base break-words pl-6">
                                {selectedCustomer.phone_number || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* category */}
                        <div className="py-2">
                          <div className="flex items-start gap-3">
                            <Building className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="font-semibold text-sm text-muted-foreground">
                                Category
                              </span>
                              <span className="text-base break-words">
                                {selectedCustomer.category || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Priority
                              </span>
                              <span className="text-base break-words p-6">
                                {selectedCustomer.priority || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Created
                              </span>
                              <span className="text-base break-words">
                                {new Date(
                                  selectedCustomer.created_at
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 " />

                            <span className="font-medium text-sm text-muted-foreground">
                              Subject
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg">
                            <p className="text-base break-words">
                              {selectedCustomer.subject || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Message
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {selectedCustomer.message || "N/A"}
                            </p>
                          </div>
                        </div>

                        <DialogFooter className="md:col-span-2 pt-8 gap-2">
                          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleCustomerDelete(selectedCustomer.id)
                              }
                              className="w-full sm:w-auto"
                            >
                              Delete Customer
                            </Button>
                            <Button
                              variant="default"
                              onClick={() => {
                                setCustomerEdit(selectedCustomer);
                                setCustomerEditMode(true);
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

        {/* FeedBack Fetched data card */}
        <Card className="card-gradient shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-500" />
              <CardTitle>Feedback</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-2 gap-4">
            {feedbackData &&
              feedbackData.map((feedback, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedFeedback(feedback);
                      setFeedbackEdit(feedback);
                      setFeedbackOpen(true);
                    }}
                    className=" border rounded-lg   flex justify-between p-4   bg-card/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <div>
                      <p className=" font-semibold">{feedback.name}</p>
                      <p className="text-gray-500">{feedback.category}</p>
                    </div>
                    <div className="text-end">
                      <p className="border rounded-full bg-red-300 text-center">
                        {feedback.feedback_type}
                      </p>
                      <p>
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Feedback edit and delete content */}

        <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <div className="px-4 py-4 border-b bg-muted/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-base md:text-lg font-semibold">
                  Feedback Details
                </h2>
              </div>
            </div>
            {/* customer scrollbar content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {SelectedFeedback && (
                <div className="space-y-4">
                  {feedbackDataEditMode ? (
                    // Edit Mode
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          Overall Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-8 w-8 cursor-pointer transition-colors ${
                                star <= feedbackEdit.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() =>
                                setFeedbackEdit({
                                  ...feedbackEdit,
                                  rating: star,
                                })
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {feedbackEdit.rating === 0 &&
                            "Click to rate your experience"}
                          {feedbackEdit.rating === 1 &&
                            "Poor - Needs significant improvement"}
                          {feedbackEdit.rating === 2 &&
                            "Fair - Some issues to address"}
                          {feedbackEdit.rating === 3 &&
                            "Good - Generally satisfied"}
                          {feedbackEdit.rating === 4 &&
                            "Very Good - Mostly positive experience"}
                          {feedbackEdit.rating === 5 &&
                            "Excellent - Exceeded expectations"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={feedbackEdit.name}
                          onChange={handleFeedbackEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={feedbackEdit.email}
                          onChange={handleFeedbackEditChange}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={feedbackEdit.subject}
                          onChange={handleFeedbackEditChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          Category
                        </Label>
                        <Select
                          value={feedbackEdit.category}
                          onValueChange={(value) =>
                            setFeedbackEdit({
                              ...feedbackEdit,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">
                              Website Experience
                            </SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="search">
                              Property Search
                            </SelectItem>
                            <SelectItem value="listing">
                              Property Listing
                            </SelectItem>
                            <SelectItem value="customer-service">
                              Customer Service
                            </SelectItem>
                            <SelectItem value="payment">
                              Payment Process
                            </SelectItem>
                            <SelectItem value="agent">Agent Service</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Detailed Feedback
                        </Label>
                        <Textarea
                          id="detailed_feedback"
                          name="detailed_feedback"
                          value={feedbackEdit.detailed_feedback}
                          onChange={handleFeedbackEditChange}
                          rows={4}
                          className="w-full resize-none"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="what_went_well"
                          className="text-sm font-medium"
                        >
                          what_went_well
                        </Label>
                        <Textarea
                          id="what_went_well"
                          name="what_went_well"
                          value={feedbackEdit.what_went_well}
                          onChange={handleFeedbackEditChange}
                          rows={4}
                          className="w-full resize-none"
                        />
                      </div>
                      <div className=" space-y-2">
                        <Label
                          htmlFor="recommend_us"
                          className="text-sm font-medium"
                        >
                          Would you recommend us to others?
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFeedbackEdit({
                              ...feedbackEdit,
                              recommend_us: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="definitely">
                              Definitely
                            </SelectItem>
                            <SelectItem value="probably">Probably</SelectItem>
                            <SelectItem value="not-sure">Not Sure</SelectItem>
                            <SelectItem value="probably-not">
                              Probably Not
                            </SelectItem>
                            <SelectItem value="definitely-not">
                              Definitely Not
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFeedbackDataEditMode(false)}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleFeedbackEditSubmit}
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
                                Full Name
                              </span>
                              <p className="text-base font-medium break-words pl-6">
                                {SelectedFeedback.name || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* email */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-blue-500 flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className=" font-medium text-sm text-muted-foreground">
                                Email
                              </span>
                              <p className="text-base break-words">
                                {SelectedFeedback.email || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                feedback type
                              </span>
                              <p className="text-base break-words pl-6">
                                {SelectedFeedback.feedback_type || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* category */}
                        <div className="py-2">
                          <div className="flex items-start gap-3">
                            <Building className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                            <div className="flex flex-col w-full">
                              <span className="font-semibold text-sm text-muted-foreground">
                                Category
                              </span>
                              <span className="text-base break-words">
                                {SelectedFeedback.category || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                subject
                              </span>
                              <span className="text-base break-words p-6">
                                {SelectedFeedback.subject || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                detailed_feedback
                              </span>
                              <span className="text-base break-words p-6">
                                {SelectedFeedback.detailed_feedback || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 " />
                            <div className="flex flex-col w-full">
                              <span className="font-medium text-sm text-muted-foreground">
                                Created
                              </span>
                              <span className="text-base break-words">
                                {new Date(
                                  SelectedFeedback.created_at
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              What did we do well?
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedFeedback.what_went_well || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              How can we improve?
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedFeedback.how_to_improve || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Would you recommend us to others?
                            </span>
                          </div>
                          <div className="pl-6 bg-muted/30 p-3 rounded-lg max-h-40 overflow-y-auto">
                            <p className="text-base break-words whitespace-pre-wrap">
                              {SelectedFeedback.recommend_us || "N/A"}
                            </p>
                          </div>
                        </div>

                        <DialogFooter className="md:col-span-2 pt-8 gap-2">
                          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t">
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleFeedbackDelete(SelectedFeedback.slug)
                              }
                              className="w-full sm:w-auto"
                            >
                              Delete feedback
                            </Button>
                            <Button
                              variant="default"
                              onClick={() => {
                                setFeedbackEdit(SelectedFeedback);
                                setFeedbackDataEditMode(true);
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
};

export default AgentDashboard;
