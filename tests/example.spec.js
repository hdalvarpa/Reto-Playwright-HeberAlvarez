// @ts-check
const { test, expect } = require("@playwright/test");

test('RetoPlaywright-Login-CreacionEmpleado-Busqueda', async ({ page }) => {

  const employeeId = Math.floor(10000 + Math.random() * 90000);

  const firstName = "Nombre" + employeeId;
  const middleName = "Segundo Nombre" + employeeId;
  const lastName = "Apellido" + employeeId;
  const username = "Usuario" + employeeId;

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.locator("//input[@name='username']").fill("Admin");

  await page.locator("//input[@name='password']").fill("admin123");

  await page.locator("//button[@type='submit']").click();

  await page.locator("//nav[@role='navigation']//span[text()='PIM']").click();

  await page.locator("//button[text()=' Add ']").click();

  await page.locator("//p[text()='Create Login Details']/following-sibling::div[1]").click();

  await page.locator("//input[@name='firstName']").fill(firstName);

  await page.locator("//input[@name='middleName']").fill(middleName);

  await page.locator("//input[@name='lastName']").fill(lastName);

  const employeeIdField = page.locator("//label[text()='Employee Id']/parent::div/parent::div//input");
  await employeeIdField.fill('');
  await employeeIdField.fill(employeeId.toString());

  await page.locator("//label[text()='Username']/parent::div/parent::div//input").fill(username);

  await page.locator("(//input[@type='password'])[1]").fill("password123");

  await page.locator("(//input[@type='password'])[2]").fill("password123");

  await page.locator("//input[@type='file']").setInputFiles("assets/image.png");

  await page.locator("//button[text()=' Save ']").click();

  // Validar que la  siguiente pagina aparece:

  try {
    await page.waitForSelector("//h6[text()='Personal Details']", { timeout: 10000 });
  } catch (error) {
    console.error('Error con el registro del empleado:', error.message);
    throw error;
  }

  // Validar que se muestre en la lista de empleados buscando por employeeId:

  await page.locator("//nav[@role='navigation']//span[text()='PIM']").click();

  await page.locator("//label[text()='Employee Id']/parent::div/parent::div//input").fill(employeeId.toString());

  await page.locator("//button[@type='submit']").click();

  try {
    await page.locator("//div[@class='orangehrm-container']//div[text()='"+ employeeId +"']").click();
  } catch (error) {
    console.error("Error no se encontró el empleado id "+ employeeId +":", error.message);
    throw error;
  }

});

