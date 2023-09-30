const BASE_URL = "https://register.nomoreparties.co";

export const register = async (password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const authorize = async (password, email) => {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    if (!res.ok) {
      throw new Error(res.statusText); 
    }


    return res.json();
  } catch (error) {
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};
