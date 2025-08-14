import { useState } from "react";

export function useGetRoles() {
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  return { roles, fetchRoles };
}
