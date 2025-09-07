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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,

  DialogFooter,
} from "@/components/ui/dialog";

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
  const handleCustomerEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${selectedCustomer.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerEdit),
        }
      );
      if (response.ok) {
        const update = await response.json();
        console.log(update);
        setSelectedCustomer(update);

        setCustomerEditMode(false);
        // optionatly refresh the customer data list
        setCustomerData((prev) =>
          prev.map((customer) =>
            customer.id === update.id ? update : customer
          )
        );
        toast({
          title: "Success",
          description: "Customer data updated successfully",
        });
      } else {
        console.log("Failed to update customer data");
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Failed to update customer data" });
    }
  };

  // customer service Delete

  const handleCustomerDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/support-tickets/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCustomerData((prev) =>
          prev.filter((customer) => customer.id !== id)
        );
        setOpen(false);
        toast({
          title: "Success",
          description: "Customer data deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Failed to delete customer data" });
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

          <CardContent className="grid lg:grid-cols-1 md:grid-cols-3 gap-4">
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
        // Replace your existing Dialog section with this AdminDashboard styled
        version
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-3xl  p-6 ">
           
            {selectedCustomer && (
              <div className="py-4 border-t">
                {customerEditMode ? (
                  // Edit Mode
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={customerEdit.full_name}
                        onChange={handleCustomerEditChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customerEdit.email}
                        onChange={handleCustomerEditChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone</Label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        value={customerEdit.phone_number}
                        onChange={handleCustomerEditChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={customerEdit.category}
                        onChange={handleCustomerEditChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={customerEdit.priority}
                        onValueChange={(value) =>
                          setCustomerEdit({ ...customerEdit, priority: value })
                        }
                      >
                        <SelectTrigger>
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
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={customerEdit.subject}
                        onChange={handleCustomerEditChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={customerEdit.message}
                        onChange={handleCustomerEditChange}
                        rows={4}
                      />
                    </div>
                    <DialogFooter className="md:col-span-2 pt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCustomerEditMode(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCustomerEditSubmit}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </div>
                ) : (
                  // View Mode - AdminDashboard style
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-4">
                    {/* Using the same renderDetailRow function style from AdminDashboard */}
                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Full Name
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.full_name || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Email
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Phone
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.phone_number || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

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

                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Priority
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.priority || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
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

                    <div className="py-2 md:col-span-2">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Subject
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.subject || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2 md:col-span-2">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        <div className="flex flex-col w-full">
                          <span className="font-semibold text-sm text-muted-foreground">
                            Message
                          </span>
                          <span className="text-base break-words">
                            {selectedCustomer.message || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="md:col-span-2 pt-8 gap-2">
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleCustomerDelete(selectedCustomer.id)
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => {
                          setCustomerEdit(selectedCustomer);
                          setCustomerEditMode(true);
                        }}
                      >
                        Edit
                      </Button>
                    </DialogFooter>
                  </div>
                )}

                {/* <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div> */}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AgentDashboard;
