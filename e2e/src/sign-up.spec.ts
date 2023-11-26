import { test, expect } from "@playwright/test";

test.describe('Sign Up page', ()=> {
    test.beforeEach(async ({ page }, testInfo) => {
        // Go to the signup page
        await page.goto('/sign-up');
    });

    test('Sign up route should be opened', async ({ page }) => {
        expect(page.url()).toContain('/sign-up');
    });

    test('Should be able to navigate to the Sign in page from the Sign up form', async ({page})=> {
        // Check if the sign in link is present
        const signInLink = page.getByTestId('signInLink');
        await expect(signInLink).toHaveText('Sign in');
        // Click on the link
        await signInLink.click();
        await page.waitForURL('/sign-in');
        // User should be navigated to the Sign in page
        await expect(page).toHaveURL('/sign-in');
    })

    test('Should be able to sign up with valid credentials', async ({ page }) => {
        // Fill out the signup form
        await page.getByTestId('firstNameInput').fill('John');
        await page.getByTestId('lastNameInput').fill('Doe');
        await page.getByTestId('emailInput').fill('johndoe@example.com');
        await page.getByTestId('passwordInput').fill('Password123!');

        // Submit the form
        const responsePromise = page.waitForResponse('https://demo-api.now.sh/users');
        await page.getByTestId('submitButton').click();
        await responsePromise;
        await expect(page).toHaveURL('/sign-in');
    });

    test('Should show error messages for invalid credentials', async ({ page }) => {
        // Fill out the form with invalid credentials
        await page.getByTestId('firstNameInput').fill('');
        await page.getByTestId('lastNameInput').fill('');
        await page.getByTestId('emailInput').fill('invalidemail@@.com');
        await page.getByTestId('passwordInput').fill('short');
        await page.getByTestId('passwordInput').blur();

        // Submit button should be disabled
        await expect(page.getByTestId('submitButton')).toBeDisabled();

        // Check if error messages are displayed
        const firstNameError = page.getByTestId('firstNameError');
        await expect(firstNameError).toHaveText('Please enter your first name.');

        const lastNameError = page.getByTestId('lastNameError');
        await expect(lastNameError).toHaveText('Please enter your last name.');

        const emailError = page.getByTestId('invalidEmailError');
        await expect(emailError).toHaveText('That\'s an invalid email.');

        const passwordError = page.getByTestId('invalidPasswordError');
        await expect(passwordError).toHaveText('That\'s an invalid password.');

        // TODO: Write test for other error messages
    });
})