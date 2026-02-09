class GreenKartPage {
  constructor(page) {
    this.page = page;

    this.monthInput = page.locator('input[name="month"]');
    this.dayInput = page.locator('input[name="day"]');
    this.yearInput = page.locator('input[name="year"]');
    this.calendarButton = page.locator(".react-date-picker__calendar-button");

    this.calendar = page.locator(".react-calendar");
    this.previousYearButton = page.locator(".react-calendar__navigation__prev2-button");
    this.previousMonthButton = page.locator(".react-calendar__navigation__prev-button");
    this.nextYearButton = page.locator(".react-calendar__navigation__next2-button");
    this.nextMonthButton = page.locator(".react-calendar__navigation__next-button");
    this.navigationLabel = page.locator(".react-calendar__navigation__label");

    this.calendarDays = page.locator(".react-calendar__month-view__days__day");
  }

  async navigateToOffers() {
    await this.page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  }

  async openCalendar() {
    const isOpen = await this.calendar.isVisible();
    if (!isOpen) {
      await this.calendarButton.click();
      await this.calendar.waitFor({ state: "visible", timeout: 5000 });
    }
  }

  async selectDate(day, month, year) {
    const monthMap = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12
    };
    const monthNumber = typeof month === "string" ? monthMap[month.toLowerCase()] : month;

    await this.openCalendar();

    await this.navigateToYear(year);

    await this.navigateToMonth(monthNumber, year);

    await this.selectDay(day);
  }

  async navigateToYear(targetYear) {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const currentLabelText = await this.navigationLabel.textContent();
      const currentYear = parseInt(currentLabelText.split(" ")[1]);

      if (currentYear === targetYear) {
        break;
      } else if (currentYear > targetYear) {
        await this.previousYearButton.click();
      } else {
        await this.nextYearButton.click();
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error(`Failed to navigate to year ${targetYear} after ${maxAttempts} attempts`);
    }
  }

  async navigateToMonth(targetMonth, targetYear) {
    let attempts = 0;
    const maxAttempts = 24;

    while (attempts < maxAttempts) {
      const currentLabelText = await this.navigationLabel.textContent();
      const currentMonthName = currentLabelText.split(" ")[0].toLowerCase();
      const currentYear = parseInt(currentLabelText.split(" ")[1]);

      const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      const currentMonth = monthNames.indexOf(currentMonthName) + 1;

      if (currentMonth === targetMonth && currentYear === targetYear) {
        break;
      } else if (currentYear > targetYear || (currentYear === targetYear && currentMonth > targetMonth)) {
        await this.previousMonthButton.click();
      } else {
        await this.nextMonthButton.click();
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error(`Failed to navigate to month ${targetMonth}/${targetYear} after ${maxAttempts} attempts`);
    }
  }

  async selectDay(day) {
    await this.calendarDays.first().waitFor({ state: "visible", timeout: 5000 });

    const dayButton = this.page
      .locator(`.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth) abbr[aria-label*="${day},"]`)
      .first();

    await dayButton.waitFor({ state: "visible", timeout: 5000 });
    await dayButton.click();
  }
}

module.exports = GreenKartPage;
