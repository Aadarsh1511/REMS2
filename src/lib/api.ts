import axios from 'axios';
import { Property } from '@/components/ui/PropertyCard';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const response = await axios.get<Property>(`${API_BASE_URL}/properties/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return null;
  }
};

export const fetchPropertyBySlug = async (slug: string): Promise<Property | null> => {
  try {
    const response = await axios.get<Property>(`${API_BASE_URL}/properties/slug/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with slug ${slug}:`, error);
    return null;
  }
};

export const fetchAgentProfile = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent profile with ID ${id}:`, error);
    return null;
  }
};

export const fetchAgentProperties = async (agentId: string): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/?agent=${agentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching properties for agent ${agentId}:`, error);
    return [];
  }
};

export const fetchUserProperties = async (userId: string): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/?owner=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching properties for user ${userId}:`, error);
    return [];
  }
};

export const fetchPropertyTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-types/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property types:', error);
    return [];
  }
};

export const fetchPropertyCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property categories:', error);
    return [];
  }
};

export const fetchPropertyStatuses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-statuses/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property statuses:', error);
    return [];
  }
};

export const fetchAmenities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/amenities/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching amenities:', error);
    return [];
  }
};

export const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cities/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const fetchLocalities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/localities/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching localities:', error);
    return [];
  }
};

export const fetchStates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/states/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/countries/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/?is_featured=true`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
};

export const fetchNewLaunches = async (): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/?is_new_launch=true`);
    return response.data;
  } catch (error) {
    console.error('Error fetching new launches:', error);
    return [];
  }
};

export const fetchPropertiesForMap = async (): Promise<Property[]> => {
  try {
    const response = await axios.get<Property[]>(`${API_BASE_URL}/properties/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties for map:', error);
    return [];
  }
};

export const submitContactForm = async (formData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contact-forms/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const submitProperty = async (propertyData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/properties/`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting property:', error);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/verify/`, { token });
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${userId}:`, error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/profiles/${userId}/`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile with ID ${userId}:`, error);
    throw error;
  }
};

export const fetchUserBookings = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    throw error;
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings/`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const fetchUserFeedback = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feedback/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching feedback for user ${userId}:`, error);
    throw error;
  }
};

export const submitFeedback = async (feedbackData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback/`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const fetchUserNotifications = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/`, { is_read: true });
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error);
    throw error;
  }
};

export const fetchUserSavedSearches = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/saved-searches/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching saved searches for user ${userId}:`, error);
    throw error;
  }
};

export const createSavedSearch = async (searchData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/saved-searches/`, searchData);
    return response.data;
  } catch (error) {
    console.error('Error creating saved search:', error);
    throw error;
  }
};

export const deleteSavedSearch = async (searchId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/saved-searches/${searchId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting saved search ${searchId}:`, error);
    throw error;
  }
};

export const fetchUserRecentlyViewed = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recently-viewed/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recently viewed for user ${userId}:`, error);
    throw error;
  }
};

export const addRecentlyViewed = async (viewedData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recently-viewed/`, viewedData);
    return response.data;
  } catch (error) {
    console.error('Error adding recently viewed:', error);
    throw error;
  }
};

export const fetchUserShortlists = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shortlists/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shortlists for user ${userId}:`, error);
    throw error;
  }
};

export const createShortlist = async (shortlistData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/shortlists/`, shortlistData);
    return response.data;
  } catch (error) {
    console.error('Error creating shortlist:', error);
    throw error;
  }
};

export const deleteShortlist = async (shortlistId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/shortlists/${shortlistId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting shortlist ${shortlistId}:`, error);
    throw error;
  }
};

export const fetchUserReviews = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for user ${userId}:`, error);
    throw error;
  }
};

export const submitReview = async (reviewData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews/`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export const fetchUserMessages = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for user ${userId}:`, error);
    throw error;
  }
};

export const sendMessage = async (messageData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/messages/`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const fetchUserAppointments = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointments for user ${userId}:`, error);
    throw error;
  }
};

export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments/`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const fetchUserDocuments = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching documents for user ${userId}:`, error);
    throw error;
  }
};

export const uploadDocument = async (documentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/documents/`, documentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const deleteDocument = async (documentId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/documents/${documentId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting document ${documentId}:`, error);
    throw error;
  }
};

export const fetchUserPayments = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching payments for user ${userId}:`, error);
    throw error;
  }
};

export const createPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments/`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const fetchUserInvoices = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoices for user ${userId}:`, error);
    throw error;
  }
};

export const fetchInvoicePdf = async (invoiceId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/invoices/${invoiceId}/pdf/`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice PDF for invoice ${invoiceId}:`, error);
    throw error;
  }
};

export const fetchUserTickets = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/support-tickets/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching support tickets for user ${userId}:`, error);
    throw error;
  }
};

export const createTicket = async (ticketData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/support-tickets/`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating support ticket:', error);
    throw error;
  }
};

export const updateTicket = async (ticketId: string, ticketData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/support-tickets/${ticketId}/`, ticketData);
    return response.data;
  } catch (error) {
    console.error(`Error updating support ticket ${ticketId}:`, error);
    throw error;
  }
};

export const fetchUserActivityLogs = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/activity-logs/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activity logs for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserPreferences = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-preferences/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user preferences for user ${userId}:`, error);
    throw error;
  }
};

export const updatePreferences = async (userId: string, preferencesData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/user-preferences/${userId}/`, preferencesData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user preferences for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserNotificationsSettings = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notification-settings/?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notification settings for user ${userId}:`, error);
    throw error;
  }
};

export const updateNotificationSettings = async (userId: string, settingsData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/notification-settings/${userId}/`, settingsData);
    return response.data;
  } catch (error) {
    console.error(`Error updating notification settings for user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-roles/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
};

export const fetchPermissions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/permissions/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return [];
  }
};

export const fetchGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/groups/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

export const fetchAgents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

export const createAgent = async (agentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/agents/`, agentData);
    return response.data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
};

export const updateAgent = async (agentId: string, agentData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/agents/${agentId}/`, agentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating agent ${agentId}:`, error);
    throw error;
  }
};

export const deleteAgent = async (agentId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/agents/${agentId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting agent ${agentId}:`, error);
    throw error;
  }
};

export const fetchAdminDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin-dashboard/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    throw error;
  }
};

export const fetchAgentDashboardData = async (agentId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agent-dashboard/${agentId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent dashboard data for agent ${agentId}:`, error);
    throw error;
  }
};

export const fetchOwnerDashboardData = async (ownerId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/owner-dashboard/${ownerId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching owner dashboard data for owner ${ownerId}:`, error);
    throw error;
  }
};

export const fetchPropertyAnalytics = async (propertyId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-analytics/${propertyId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property analytics for property ${propertyId}:`, error);
    throw error;
  }
};

export const fetchUserAnalytics = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-analytics/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user analytics for user ${userId}:`, error);
    throw error;
  }
};

export const fetchSystemLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/system-logs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching system logs:', error);
    return [];
  }
};

export const fetchConfigurationSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/configuration-settings/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching configuration settings:', error);
    return [];
  }
};

export const updateConfigurationSetting = async (settingId: string, settingData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/configuration-settings/${settingId}/`, settingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating configuration setting ${settingId}:`, error);
    throw error;
  }
};

export const fetchIntegrations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/integrations/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching integrations:', error);
    return [];
  }
};

export const updateIntegration = async (integrationId: string, integrationData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/integrations/${integrationId}/`, integrationData);
    return response.data;
  } catch (error) {
    console.error(`Error updating integration ${integrationId}:`, error);
    throw error;
  }
};

export const fetchReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
};

export const generateReport = async (reportType: string, params: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reports/generate/`, { report_type: reportType, ...params });
    return response.data;
  } catch (error) {
    console.error(`Error generating report of type ${reportType}:`, error);
    throw error;
  }
};

export const fetchAuditLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/audit-logs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
};

export const fetchSystemHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/system-health/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching system health:', error);
    return null;
  }
};

export const fetchBackupStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/backup-status/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching backup status:', error);
    return null;
  }
};

export const triggerBackup = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trigger-backup/`);
    return response.data;
  } catch (error) {
    console.error('Error triggering backup:', error);
    throw error;
  }
};

export const fetchEmailTemplates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email-templates/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return [];
  }
};

export const updateEmailTemplate = async (templateId: string, templateData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/email-templates/${templateId}/`, templateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating email template ${templateId}:`, error);
    throw error;
  }
};

export const fetchSmsTemplates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sms-templates/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SMS templates:', error);
    return [];
  }
};

export const updateSmsTemplate = async (templateId: string, templateData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/sms-templates/${templateId}/`, templateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating SMS template ${templateId}:`, error);
    throw error;
  }
};

export const fetchPushNotificationTemplates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/push-notification-templates/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching push notification templates:', error);
    return [];
  }
};

export const updatePushNotificationTemplate = async (templateId: string, templateData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/push-notification-templates/${templateId}/`, templateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating push notification template ${templateId}:`, error);
    throw error;
  }
};

export const fetchSeoSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/seo-settings/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return [];
  }
};

export const updateSeoSetting = async (settingId: string, settingData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/seo-settings/${settingId}/`, settingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating SEO setting ${settingId}:`, error);
    throw error;
  }
};

export const fetchSocialMediaSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/social-media-settings/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching social media settings:', error);
    return [];
  }
};

export const updateSocialMediaSetting = async (settingId: string, settingData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/social-media-settings/${settingId}/`, settingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating social media setting ${settingId}:`, error);
    throw error;
  }
};

export const fetchCmsPages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cms-pages/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return [];
  }
};

export const updateCmsPage = async (pageId: string, pageData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/cms-pages/${pageId}/`, pageData);
    return response.data;
  } catch (error) {
    console.error(`Error updating CMS page ${pageId}:`, error);
    throw error;
  }
};

export const fetchFaqCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faq-categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return [];
  }
};

export const fetchFaqs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faqs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

export const updateFaq = async (faqId: string, faqData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/faqs/${faqId}/`, faqData);
    return response.data;
  } catch (error) {
    console.error(`Error updating FAQ ${faqId}:`, error);
    throw error;
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/testimonials/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const updateTestimonial = async (testimonialId: string, testimonialData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/testimonials/${testimonialId}/`, testimonialData);
    return response.data;
  } catch (error) {
    console.error(`Error updating testimonial ${testimonialId}:`, error);
    throw error;
  }
};

export const fetchPartners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/partners/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
};

export const updatePartner = async (partnerId: string, partnerData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/partners/${partnerId}/`, partnerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating partner ${partnerId}:`, error);
    throw error;
  }
};

export const fetchCareers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/careers/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
};

export const updateCareer = async (careerId: string, careerData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/careers/${careerId}/`, careerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating career ${careerId}:`, error);
    throw error;
  }
};

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const updateBlog = async (blogId: string, blogData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/blogs/${blogId}/`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog ${blogId}:`, error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/events/${eventId}/`, eventData);
    return response.data;
  } catch (error) {
    console.error(`Error updating event ${eventId}:`, error);
    throw error;
  }
};

export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/languages/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};

export const fetchUnits = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/units/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    return [];
  }
};

export const fetchPropertyViews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-views/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property views:', error);
    return [];
  }
};

export const fetchPropertySources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-sources/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property sources:', error);
    return [];
  }
};

export const fetchLeadSources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lead-sources/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lead sources:', error);
    return [];
  }
};

export const fetchLeadStatuses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lead-statuses/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lead statuses:', error);
    return [];
  }
};

export const fetchLeads = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leads/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

export const createLead = async (leadData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leads/`, leadData);
    return response.data;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const updateLead = async (leadId: string, leadData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/leads/${leadId}/`, leadData);
    return response.data;
  } catch (error) {
    console.error(`Error updating lead ${leadId}:`, error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const createTask = async (taskData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, taskData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const fetchMeetings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/meetings/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }
};

export const createMeeting = async (meetingData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/meetings/`, meetingData);
    return response.data;
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
};

export const updateMeeting = async (meetingId: string, meetingData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/meetings/${meetingId}/`, meetingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating meeting ${meetingId}:`, error);
    throw error;
  }
};

export const fetchCalls = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calls/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching calls:', error);
    return [];
  }
};

export const createCall = async (callData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calls/`, callData);
    return response.data;
  } catch (error) {
    console.error('Error creating call:', error);
    throw error;
  }
};

export const updateCall = async (callId: string, callData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/calls/${callId}/`, callData);
    return response.data;
  } catch (error) {
    console.error(`Error updating call ${callId}:`, error);
    throw error;
  }
};

export const fetchEmails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emails/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emails:', error);
    return [];
  }
};

export const createEmail = async (emailData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/emails/`, emailData);
    return response.data;
  } catch (error) {
    console.error('Error creating email:', error);
    throw error;
  }
};

export const updateEmail = async (emailId: string, emailData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/emails/${emailId}/`, emailData);
    return response.data;
  } catch (error) {
    console.error(`Error updating email ${emailId}:`, error);
    throw error;
  }
};

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
};

export const createCampaign = async (campaignData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns/`, campaignData);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (campaignId: string, campaignData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/campaigns/${campaignId}/`, campaignData);
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign ${campaignId}:`, error);
    throw error;
  }
};

export const fetchAdvertisements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/advertisements/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    return [];
  }
};

export const createAdvertisement = async (advertisementData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/advertisements/`, advertisementData);
    return response.data;
  } catch (error) {
    console.error('Error creating advertisement:', error);
    throw error;
  }
};

export const updateAdvertisement = async (advertisementId: string, advertisementData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/advertisements/${advertisementId}/`, advertisementData);
    return response.data;
  } catch (error) {
    console.error(`Error updating advertisement ${advertisementId}:`, error);
    throw error;
  }
};

export const fetchAnalyticsReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analytics-reports/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics reports:', error);
    return [];
  }
};

export const generateAnalyticsReport = async (reportType: string, params: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analytics-reports/generate/`, { report_type: reportType, ...params });
    return response.data;
  } catch (error) {
    console.error(`Error generating analytics report of type ${reportType}:`, error);
    throw error;
  }
};

export const fetchWebsiteTraffic = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/website-traffic/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching website traffic:', error);
    return [];
  }
};

export const fetchUserBehavior = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-behavior/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user behavior:', error);
    return [];
  }
};

export const fetchConversionRates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/conversion-rates/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversion rates:', error);
    return [];
  }
};

export const fetchRoiAnalysis = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roi-analysis/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ROI analysis:', error);
    return [];
  }
};

export const fetchMarketTrends = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market-trends/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching market trends:', error);
    return [];
  }
};

export const fetchCompetitorAnalysis = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/competitor-analysis/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    return [];
  }
};

export const fetchPropertyValuationData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-valuation-data/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property valuation data:', error);
    return [];
  }
};

export const getPropertyValuation = async (propertyId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/property-valuation/${propertyId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error getting property valuation for property ${propertyId}:`, error);
    throw error;
  }
};

export const requestPropertyValuation = async (valuationData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/property-valuation/request/`, valuationData);
    return response.data;
  } catch (error) {
    console.error('Error requesting property valuation:', error);
    throw error;
  }
};

export const fetchEMICalculatorData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emi-calculator-data/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching EMI calculator data:', error);
    return [];
  }
};

export const calculateEMI = async (emiData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/emi-calculator/calculate/`, emiData);
    return response.data;
  } catch (error) {
    console.error('Error calculating EMI:', error);
    throw error;
  }
};

export const fetchAreaConverterData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/area-converter-data/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching area converter data:', error);
    return [];
  }
};

export const convertArea = async (areaData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/area-converter/convert/`, areaData);
    return response.data;
  } catch (error) {
    console.error('Error converting area:', error);
    throw error;
  }
};

export const fetchRentReceipts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rent-receipts/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rent receipts:', error);
    return [];
  }
};

export const generateRentReceipt = async (receiptData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rent-receipts/generate/`, receiptData);
    return response.data;
  } catch (error) {
    console.error('Error generating rent receipt:', error);
    throw error;
  }
};

export const fetchGrievances = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/grievances/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return [];
  }
};

export const submitGrievance = async (grievanceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/grievances/`, grievanceData);
    return response.data;
  } catch (error) {
    console.error('Error submitting grievance:', error);
    throw error;
  }
};

export const fetchSummonsNotices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summons-notices/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summons notices:', error);
    return [];
  }
};

export const submitSummonsNotice = async (summonsNoticeData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summons-notices/`, summonsNoticeData);
    return response.data;
  } catch (error) {
    console.error('Error submitting summons notice:', error);
    throw error;
  }
};

export const fetchSafetyGuides = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/safety-guides/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching safety guides:', error);
    return [];
  }
};

export const fetchTermsAndConditions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terms-conditions/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    return [];
  }
};

export const fetchPrivacyPolicy = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/privacy-policy/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return [];
  }
};

export const fetchSitemap = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sitemap/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return null;
  }
};

export const fetchMobileApps = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mobile-apps/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching mobile apps:', error);
    return [];
  }
};

export const fetchRealEstateInvestments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/real-estate-investments/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching real estate investments:', error);
    return [];
  }
};

export const fetchBuildersIndia = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/builders-india/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching builders India:', error);
    return [];
  }
};

export const fetchCustomerService = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer-service/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer service:', error);
    return null;
  }
};

export const fetchAboutUs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about-us/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching about us:', error);
    return null;
  }
};

export const fetchOurServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/our-services/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching our services:', error);
    return [];
  }
};

export const fetchPriceTrends = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/price-trends/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching price trends:', error);
    return [];
  }
};

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const fetchArticleBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/slug/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const fetchPropertySearch = async (params: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching properties for search:', error);
    return [];
  }
};

export interface WishlistItem {
  id: number;
  slug: string;
  user: string;
  property: number;
}

async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Authentication token not found.");
  }
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(errorData.detail || 'API request failed');
  }
  if (response.status === 204 /* No Content */) {
    return null;
  }
  return response.json();
}

export const getWishlist = async (): Promise<WishlistItem[]> => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/wishlist/`);
};

export const addToWishlist = async (propertyId: number, userId: string): Promise<WishlistItem> => {
  const body = JSON.stringify({ property: propertyId, user: userId });
  return makeAuthenticatedRequest(`${API_BASE_URL}/wishlist/`, {
    method: 'POST',
    body,
  });
};

export const removeFromWishlist = async (slug: string): Promise<void> => {
  await makeAuthenticatedRequest(`${API_BASE_URL}/wishlist/${slug}/`, {
    method: 'DELETE',
  });
};