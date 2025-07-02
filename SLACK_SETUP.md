# Slack Notifications Setup Guide

## 📋 What was added to your workflow

Your `playwright.yml` workflow now includes:

- **🚀 Start notification**: Sent when tests begin
- **✅ Success notification**: Sent when all tests pass
- **❌ Failure notification**: Sent when tests fail

Each notification includes useful information like repository, branch, commit, and direct links to view reports/logs.

## 🔐 Setting up your Slack webhook URL

**IMPORTANT**: For security, your webhook URL should be stored as a GitHub secret, not in the code.

### Step 1: Add the secret to your GitHub repository

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Set the secret name as: `SLACK_WEBHOOK_URL`
5. Set the secret value as: `https://hooks.slack.com/services/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`
6. Click **Add secret**

### Step 2: Test the workflow

Once the secret is added, the workflow will automatically use it. You can test by:

1. Making a commit to the `main` or `master` branch
2. Creating a pull request
3. Manually triggering the workflow from the Actions tab

## 🎨 Notification Features

### Start Notification (🚀)
- Sent when tests begin
- Shows repository, branch, commit, and actor information
- Green color indicator

### Success Notification (✅)
- Sent only when all tests pass
- Includes test duration and link to full report
- Green "good" color

### Failure Notification (❌)
- Sent when any test fails
- Red "danger" color
- Direct link to logs for debugging

## 🔧 Customization Options

You can customize the notifications by editing the `custom_payload` sections in `.github/workflows/playwright.yml`:

- Change emoji and text messages
- Modify colors (good, warning, danger, or hex codes like #ff0000)
- Add/remove fields
- Change notification timing with different `if` conditions

## 🚨 Security Note

Never commit webhook URLs directly to your repository. Always use GitHub secrets for sensitive information like:
- Slack webhook URLs
- API keys
- Access tokens
- Database credentials

---

Your Slack notifications are now ready! 🎉 