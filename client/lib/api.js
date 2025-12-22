const API_URL = 'http://localhost:5000/api';

export const api = {
    get: async (endpoint, token) => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!res.ok) {
            // Check for auth errors globally
            if (res.status === 401 || res.status === 403) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            }

            const text = await res.text();
            let errorMessage;
            try {
                const json = JSON.parse(text);
                errorMessage = json.message;
            } catch (e) {
                // Parsing failed, use default
            }
            // Still throw to stop execution flow in caller, but the redirect will happen
            throw new Error(errorMessage || `API Request Failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
    },

    post: async (endpoint, body, token) => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const text = await res.text();
            let errorMessage;
            try {
                const json = JSON.parse(text);
                errorMessage = json.message;
            } catch (e) {
                // Parsing failed
            }
            throw new Error(errorMessage || `API Request Failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
    },

    patch: async (endpoint, body, token) => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const text = await res.text();
            let errorMessage;
            try {
                const json = JSON.parse(text);
                errorMessage = json.message;
            } catch (e) {
                // Parsing failed
            }
            throw new Error(errorMessage || `API Request Failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
    },

    delete: async (endpoint, token) => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });
        if (!res.ok) {
            const text = await res.text();
            let errorMessage;
            try {
                const json = JSON.parse(text);
                errorMessage = json.message;
            } catch (e) {
                // Parsing failed
            }
            throw new Error(errorMessage || `API Request Failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
    }
};
