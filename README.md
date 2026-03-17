# HMX2003 - Self-Healing CI/CD Pipeline Agent

This project demonstrates an automated build recovery system using **GitHub Actions**, **n8n**, and an **Auto-Healing Agent**.

## 🚀 Final Demo Instructions

### 1. GitHub Setup
- Ensure your repository is pushed to GitHub.
- Add Repo Secret: `N8N_WEBHOOK_URL`
- Set it to: `https://YOUR_TUNNEL_URL/webhook/self-heal` (e.g., from localhost.run)

### 2. n8n Setup
1. **Import Workflow**: Import the `n8n-workflow.json` file.
2. **Setup Credentials**: Double-click **BOTH** GitHub nodes and select your GitHub account.
3. **Activate**: Set the workflow to **Active** (Top Right).

### 3. Trigger the Heal
- Go to **GitHub Actions** -> Choose the failed build -> **Re-run all jobs**.
- Watch n8n execute all green nodes.
- Watch a new commit appear: `Auto-heal: Fixed build failure...`
- The build will then turn **GREEN**! ✅

## How it Works
1. **GitHub Action** fails during build due to missing `lodash`.
2. **Action** sends failure logs to the **n8n Webhook**.
3. **n8n Agent** fetches the code, analyzes the error, and pushes a fix.
4. **CI/CD** re-runs automatically and succeeds.
 
 
 
 
