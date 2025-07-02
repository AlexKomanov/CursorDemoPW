# Slack Notifications & GitHub Pages Setup Guide

## 📋 What was added to your workflow

Your `playwright.yml` workflow now includes:

- **🚀 Start notification**: Sent when tests begin
- **✅ Success notification**: Sent when all tests pass
- **❌ Failure notification**: Sent when tests fail
- **📊 GitHub Pages**: Publishes HTML reports for easy viewing
- **🔗 Direct links**: Slack notifications include links to published reports

Each notification includes useful information like repository, branch, commit, and **direct links to HTML reports**.

## 🔐 Setting up your Slack webhook URL

**IMPORTANT**: For security, your webhook URL should be stored as a GitHub secret, not in the code.

### Step 1: Add the secret to your GitHub repository

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Set the secret name as: `SLACK_WEBHOOK_URL`
5. Set the secret value as: `https://hooks.slack.com/services/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`
6. Click **Add secret**

## 📄 Enable GitHub Pages (Required for HTML Reports)

**IMPORTANT**: You need to enable GitHub Pages for the HTML reports to work.

### Step 1: Enable Pages in your repository

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Source", select **GitHub Actions**
4. Click **Save**

That's it! The workflow will automatically deploy reports to GitHub Pages.

### Step 2: Test the workflow

Once both secrets and Pages are set up, test by:

1. Making a commit to the `main` or `master` branch
2. Creating a pull request
3. Manually triggering the workflow from the Actions tab

## 🎨 Enhanced Notification Features

### Start Notification (🚀)
- Sent when tests begin
- Shows repository, branch, commit, and actor information
- Green color indicator

### Success Notification (✅)
- Sent only when all tests pass
- **📊 Direct link to HTML report** on GitHub Pages
- 🔗 Link to full GitHub Actions log
- Green "good" color

### Failure Notification (❌)
- Sent when any test fails
- **📊 Direct link to failure report** with screenshots/videos
- 🔗 Direct link to debug logs
- Red "danger" color

## 📊 GitHub Pages Report Features

### What gets published:
- **Full HTML reports** with test results, screenshots, and videos
- **Unique URL per run**: Each test run gets its own report URL
- **Permanent access**: Reports stay available (until you clean them up)
- **Beautiful UI**: Playwright's built-in HTML reporter

### Report URLs:
- **Main index**: `https://[username].github.io/[repo-name]/`
- **Specific run**: `https://[username].github.io/[repo-name]/reports/run-[run-id]/`

## 🔧 Customization Options

You can customize the notifications by editing the `custom_payload` sections in `.github/workflows/playwright.yml`:

- Change emoji and text messages
- Modify colors (good, warning, danger, or hex codes like #ff0000)
- Add/remove fields
- Change notification timing with different `if` conditions

### Example: Add test duration to success notification
```yaml
{
  "title": "⏱️ Duration",
  "value": "${{ job.duration }}",
  "short": true
}
```

## 🧹 Managing Old Reports

GitHub Pages will accumulate reports over time. You might want to:

1. **Set up automatic cleanup** (add a cleanup job to remove old reports)
2. **Manual cleanup** (periodically delete old report directories)
3. **Adjust retention** (modify the artifact retention days)

## 🚨 Security Note

Never commit webhook URLs directly to your repository. Always use GitHub secrets for sensitive information like:
- Slack webhook URLs
- API keys
- Access tokens
- Database credentials

## 🔧 Troubleshooting

### Slack notifications not working:
1. Check that `SLACK_WEBHOOK_URL` secret is set correctly
2. Verify the webhook URL is still valid in Slack
3. Check the Actions logs for HTTP error codes

### GitHub Pages not working:
1. Ensure Pages is enabled in repository Settings → Pages
2. Select "GitHub Actions" as the source
3. Check that the workflow has `pages: write` permissions

### Reports not showing:
1. Verify tests actually generate a `playwright-report` directory
2. Check the "Prepare report for Pages" step in Actions logs
3. Ensure the deployment step completed successfully

---

Your enhanced Slack notifications with GitHub Pages reports are now ready! 🎉📊 