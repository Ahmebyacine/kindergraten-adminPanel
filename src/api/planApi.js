import api from "@/api";

//Fetch plans
export const fetchPlans = async () => {
  const response = await api.get("/api/v1/plans");
  return response.data;
};

// Add New plan
export const createPlan = async (planData) => {
  const response = await api.post("/api/v1/plans", planData);
  return response.data;
};

// Edit existing plan
export const updatePlan = async (id, planData) => {
  const response = await api.put(`/api/v1/plans/${id}`, planData);
  return response.data;
};

// Delete a plan
export const deletePlan = async (id) => {
  await api.delete(`/api/v1/plans/${id}`);
};

//Fetch plans
export const fetchTenantCount = async () => {
  const response = await api.get("/api/v1/plans/tenant-count");
  return response.data;
};