const BASE_URL = "https://geacloud.kademic5.com.ng/api/";

export const login = async (email: string, password: string) => {
  console.log("Logging in with:", { email, password });
  try {
    const response = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        device_token: 1234, // Replace with actual token if available
      }),
    });

    const data = await response.json();
    console.log(data);
  if (!response.ok) throw new Error(data.message || "Login failed");

  return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

export const register = async (userData: any) => {
  const response = await fetch(`${BASE_URL}create_merchant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),

  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) throw new Error(data.message || "Registration failed");
  console.log(data);

  return data;
};

export const fetchProfile = async (token: string) => {
  const response = await fetch(`${BASE_URL}profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

  return data;

  
};
