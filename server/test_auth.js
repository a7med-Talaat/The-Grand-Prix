const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const testUser = {
        username: `test_user_${Date.now()}`,
        password: 'password123',
        country: 'TestCountry'
    };

    try {
        // 1. Register
        console.log('Testing Registration...');
        const registerRes = await axios.post(`${API_URL}/register`, testUser);
        console.log('Registration Success:', registerRes.status === 201);
        if (registerRes.data.token) console.log('Token received');

        // 2. Login
        console.log('\nTesting Login...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            username: testUser.username,
            password: testUser.password
        });
        console.log('Login Success:', loginRes.status === 200);
        if (loginRes.data.token) console.log('Token received');

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
}

testAuth();
