import api from "@/api";

// Fetch tenants
export const fetchTenants = async () => {
  const response = await api.get("/api/v1/tenants");
  return response.data;
};

// Fetch tenants stats
export const fetchTenantsStats = async () => {
  const response = await api.get("/api/v1/tenants/stats");
  return response.data;
};

// Fetch dashboard stats
export const fetchDashboardStats = async () => {
  const response = await api.get("/api/v1/tenants/dashboard-stats");
  return response.data;
};

// Add new tenant
export const createTenant = async (tenantData) => {
  const response = await api.post("/api/v1/tenants", tenantData);
  return response.data;
};

// Edit existing tenant
export const updateTenant = async (id, tenantData) => {
  const response = await api.put(`/api/v1/tenants/${id}`, tenantData);
  return response.data;
};
// Change plan existing tenant
export const changePlanTenant = async (id, tenantData) => {
  const response = await api.patch(
    `/api/v1/tenants/${id}/change-plan`,
    tenantData
  );
  return response.data;
};

export const resendTenantMail = async (email) => {
  const response = await api.post(`/api/v1/tenants/resend-login-info`, { email });
  return response.data;
};

export const updateTenantEmail = async (data) => {
  const response = await api.post(`/api/v1/tenants/update-email`, data);
  return response.data;
};

// Delete a tenant
export const deleteTenant = async (id) => {
  await api.delete(`/api/v1/tenants/${id}`);
};
