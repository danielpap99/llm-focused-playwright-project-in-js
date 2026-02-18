const { faker } = require("@faker-js/faker");

class RegistrationPage {
  constructor(request) {
    this.request = request;
    this.baseUrl = "https://api.practicesoftwaretesting.com";
  }

  // #region Data Generation Methods
  generateRandomUserData() {
    const timestamp = Date.now();

    return {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: "age" }).toISOString().split("T")[0],
      address: [faker.location.streetAddress()],
      city: faker.location.city(),
      state: faker.location.state(),
      postcode: faker.location.zipCode(),
      country: "US",
      phone: faker.phone.number(),
      email: `${faker.internet.username()}${timestamp}@example.com`,
      password: this.generateSecurePassword()
    };
  }

  generateSecurePassword() {
    // Generate a secure password that meets API requirements
    // Must have: uppercase, lowercase, number, special character, 8+ chars
    const upper = faker.string.alpha({ length: 2, casing: "upper" });
    const lower = faker.string.alpha({ length: 2, casing: "lower" });
    const numbers = faker.string.numeric(2);
    const special = faker.helpers.arrayElement(["@", "#", "$", "%", "&", "*", "!"]);
    const additional = faker.string.alphanumeric(5);

    // Combine and shuffle
    const password = upper + lower + numbers + special + additional;
    return faker.helpers.shuffle(password.split("")).join("");
  }
  // #endregion

  // #region API Actions
  async registerUser(userData) {
    const response = await this.request.post(`${this.baseUrl}/users/register`, {
      data: userData
    });
    return response;
  }

  async loginUser(email, password) {
    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: {
        email: email,
        password: password
      }
    });
    return response;
  }

  async getUserProfile(accessToken) {
    const response = await this.request.get(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  }
  // #endregion
}

module.exports = RegistrationPage;
