import { RegisterFormValue } from "./pages/register";
import { SignInFormValue } from "./pages/signin";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormValue) => {
    const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',  // Send cookies with requests
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const signIn = async (formData: SignInFormValue) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',  // Send cookies with requests
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const signOut = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',  // Send cookies with requests
    });

    if (!response.ok) {
        throw new Error("Error signing out");
    }
}

export const validateToken = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/validate-token`, {
        credentials: 'include',  // Send cookies with requests
    });

    console.log(response);
    if (!response.ok) {
        throw new Error("Invalid Token");
    }

    return response.json(); // userId: req.userId
}