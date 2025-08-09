export const getRouteTitle = (pathname) => {
  const routes = {
    "/": "Dashboard",
    "/tenants": "Tenants",
    "/plans": "Plans",
  };

  return routes[pathname] || "Rawdati Platform";
};