# HMX2003 - Self-Healing CI/CD Pipeline Agent

A 30-minute minimal viable product (MVP) demonstrating an automated build recovery system using **GitHub Actions**, **n8n**, and **CodeLlama**.

## Challenge Addressed
Detects build failures (e.g., missing NPM dependencies), analyzes the error logs via CodeLlama, and automatically commits a patch to fix the build.

## How It Works

1. **GitHub Actions**: Runs `npm run build` on push.
2. **Failure Detection**: The `package.json` intentionally lacks `lodash`. The build fails.
3. **Webhook Trigger**: Action catches the failure, extracts the error log, and POSTs to an **n8n** webhook.
4. **n8n Automation**:
   - Parses the payload.
   - Fetches the current `package.json` directly from GitHub API.
   - Sends the error and file to **CodeLlama** (running locally via Ollama).
   - Receives the corrected `package.json` (with the missing dependency added).
   - Commits the updated `package.json` back to GitHub.
5. **Self-Heal**: The branch immediately rebuilds successfully!

---

## 🚀 5-Minute Setup Guide (Hackathon Pace)

### 1. Start Your Containers
Ensure Docker is running, then spin up n8n and Ollama:
```bash
docker-compose up -d
```

### 2. Prepare CodeLlama
Pull the `codellama` model so n8n can query it:
```bash
docker exec -it <YOUR_OLLAMA_CONTAINER_NAME> ollama run codellama
# Once it says "success", type /bye to exit.
```

### 3. Setup the GitHub Repo
1. Push this folder to a pristine GitHub repository.
2. Go to your Repo **Settings > Secrets and variables > Actions**.
3. Create a **New repository secret**:
   - **Name**: `N8N_WEBHOOK_URL`
   - **Secret**: The URL of your n8n instance webhook. 
   *(Use [ngrok](https://ngrok.com/) to expose port 5678 if running locally: `ngrok http 5678`. The secret would look like `https://<your-id>.ngrok-free.app/webhook/self-heal`)*
4. Ensure your repository has **Read and write permissions** for workflows (`Settings -> Actions -> General -> Workflow permissions`).

### 4. Configure n8n Workflow
1. Open n8n at `http://localhost:5678`.
2. Click **Add workflow** -> **Import from File...** -> Select `n8n-workflow.json`.
3. In the GitHub API nodes (`Get package.json` and `Commit Fix`):
   - You **MUST** add your GitHub credentials. Create a GitHub Personal Access Token (PAT) with "repo" scopes and add it in n8n as **GitHub API credentials**.
4. Activate the Webhook on the top right ("Active" toggle on).

### 5. Trigger the Self-Healing Magic ✨
1. Check the local `index.js`, notice the `lodash` requirement but missing from `package.json`.
2. Commit and push the `index.js`.
3. Watch the GitHub Actions run fail.
4. Watch n8n trigger and CodeLlama generate the fix!
5. Refresh your repo: `package.json` will magically have `lodash` and a second commit labeled "Auto-heal: Fixed build failure...". The pipeline will now pass!
