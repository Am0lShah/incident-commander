# Supabase Configuration Guide

Follow these steps to configure your Supabase project for the Incident Commander application.

## 1. Enable Email Provider

This is required for the Signup and Login functionality to work.

1.  Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2.  Select your project (e.g., `incident-commander`).
3.  In the left sidebar, click on the **Authentication** icon (it looks like a users group).
4.  In the Authentication menu, click on **Providers** under the Configuration section.
5.  Find **Email** in the list of providers.
6.  Click on **Email** to expand the settings.
7.  Click the toggle to **Enable Email provider**.
8.  **(Optional but Recommended for Dev)**: Uncheck **"Confirm email"** if you want to be able to log in immediately without verifying your email address during development.
9.  Click **Save**.

## 2. Disable Anonymous Sign-ins

This ensures that only registered users can access your application.

1.  In the **Authentication** section of the sidebar, click on **Settings** (sometimes located under Configuration > Policies).
2.  Scroll down to the **User Signups** section (or sometimes under an "Auth Providers" general setting, but usually in the main settings).
3.  Look for the setting labeled **"Allow anonymous sign-ins"**.
4.  Ensure this checkbox is **Unchecked (Disabled)**.
5.  Click **Save**.

## 3. Verify Configuration

Once these steps are complete:
1.  Restart your local development server if it was running.
2.  Navigate to `/signup`.
3.  Create a new account. You should no longer see the "Anonymous sign-ins are disabled" error.
