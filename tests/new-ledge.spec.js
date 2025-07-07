// @ts-check
import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('Registaration to the New-Ledge', async ({ page, context }) => {
  const randomEmail = `${faker.string.alphanumeric(15)}@mailinator.com`;
  const randomName = `${faker.person.fullName()}`;
  const newPassword = 'ALexko2605**';


  await page.goto('https://portal.test.new-ledge.com/');
  await page.getByText('Sign Up').click();
  await page.getByRole('textbox', { name: 'Email' }).pressSequentially(randomEmail, { delay: 100 });
  await page.getByRole('textbox', { name: 'Full Name' }).pressSequentially(randomName, { delay: 100 });
  await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).pressSequentially(newPassword, { delay: 100 });
  await page.getByRole('textbox', { name: 'Re-enter Your Password' }).pressSequentially(newPassword, { delay: 100 });
  await page.getByRole('checkbox', { name: 'I agree to the Terms of Use' }).check();
  await page.getByRole('button', { name: 'Next Step' }).click();
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.locator('#app')).toContainText('Verification code sent to your email address');
  await page.getByRole('button', { name: 'Got it' }).click();

  const anotherPage = await context.newPage();

  await anotherPage.goto(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${randomEmail}`);
  await anotherPage.getByRole('cell', { name: 'Your verification code' }).click();
  await expect(anotherPage.frameLocator("#html_msg_body").locator("body")).toContainText("Your confirmation code is");
  let codeOnly = "";

  await expect(async () => {
    const verificationCode = await anotherPage.frameLocator("#html_msg_body").locator("body").innerText();
    const verificationCodeArrayOfText = verificationCode.trim().split(" ");
    codeOnly = verificationCodeArrayOfText[verificationCodeArrayOfText.length - 1];
    expect(codeOnly).not.toHaveLength(0);
  }).toPass({
    timeout: 60_000
  });
  await anotherPage.close();

  await page.getByRole('textbox', { name: 'Verification Code' }).click();
  await page.getByRole('textbox', { name: 'Verification Code' }).fill(codeOnly);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByRole('main')).toContainText(`Welcome back, ${randomName},`, { timeout: 15000 });
  await expect(page.locator('header').filter({ hasText: 'My SpaceLeaderboardLogout' }).locator('img')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

});


test('Log in test', async ({ page }) => {
  await page.goto('https://portal.test.new-ledge.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('akomanov88@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('ALexko2605**');
  await page.getByRole('main').getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('img')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await expect(page.getByText('Welcome to the VR Event')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('akomanov88@gmail.com');
  await page.getByRole('button', { name: 'Next Step' }).click();
  await expect(page.getByRole('main')).toContainText('Hello Alex Komanov,');
});





