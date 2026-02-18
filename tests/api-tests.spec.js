const { test, expect } = require("@playwright/test");
const RegistrationPage = require("../main/pages/RegistrationPage");

test.describe("API Registration and UI Login", () => {
  let registrationPage;
  let userData;

  test.beforeEach(async ({ request }) => {
    registrationPage = new RegistrationPage(request);
    userData = registrationPage.generateRandomUserData();
  });

  test("Register user via API successfully", async () => {
    // Register user via API
    const registrationResponse = await registrationPage.registerUser(userData);

    expect(registrationResponse.status()).toBe(201);

    const responseData = await registrationResponse.json();
    expect(responseData).toHaveProperty("id");
    expect(responseData.email).toBe(userData.email);
    expect(responseData.first_name).toBe(userData.first_name);
    expect(responseData.last_name).toBe(userData.last_name);
  });

  test("Register user via API and verify authentication", async () => {
    // Step 1: Register user via API
    const registrationResponse = await registrationPage.registerUser(userData);

    expect(registrationResponse.status()).toBe(201);

    // Step 2: Verify user can authenticate via API
    const loginResponse = await registrationPage.loginUser(userData.email, userData.password);

    expect(loginResponse.ok()).toBeTruthy();

    const loginData = await loginResponse.json();
    expect(loginData).toHaveProperty("access_token");
    expect(loginData).toHaveProperty("token_type", "bearer");

    // Step 3: Use the token to get user profile (proves authentication worked)
    const profileResponse = await registrationPage.getUserProfile(loginData.access_token);

    expect(profileResponse.ok()).toBeTruthy();

    const profileData = await profileResponse.json();
    expect(profileData.email).toBe(userData.email);
    expect(profileData.first_name).toBe(userData.first_name);
    expect(profileData.last_name).toBe(userData.last_name);
  });
});
