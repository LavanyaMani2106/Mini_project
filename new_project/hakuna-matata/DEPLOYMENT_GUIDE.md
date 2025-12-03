# Hakuna Matata - Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
- Git repository (GitHub/GitLab)
- Vercel account (free tier)
- Render account (free tier)

### Step 1: Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit: https://render.com
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing Hakuna Matata

3. **Configure Service**
   ```
   Name: hakuna-matata-api
   Environment: Node
   Region: Choose closest to you
   Branch: main (or your default branch)
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
   (You'll update FRONTEND_URL after deploying frontend)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the backend URL (e.g., `https://hakuna-matata-api.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Sign up or log in

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project**
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://hakuna-matata-api.onrender.com
   REACT_APP_ENV=production
   ```
   (Use the backend URL from Step 1)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (3-5 minutes)
   - Copy the frontend URL (e.g., `https://hakuna-matata.vercel.app`)

### Step 3: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Open your backend service**
3. **Go to Environment**
4. **Update FRONTEND_URL**
   ```
   FRONTEND_URL=https://hakuna-matata.vercel.app
   ```
   (Use the frontend URL from Step 2)
5. **Save** - This will trigger a redeploy

### Step 4: Test Deployment

1. **Visit your frontend URL**
2. **Test features**:
   - Sign up / Login
   - Stress Detection
   - Dashboard (check real data)
   - Analytics (check real data)
   - Logout and login (verify data persists)

## 📋 Environment Variables Reference

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_ENV=production
```

### Backend (Render Environment Variables)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
OPENAI_API_KEY=your_key_if_needed
```

## 🔍 Troubleshooting

### Build Fails
- Check build logs in Vercel/Render
- Verify all dependencies are in package.json
- Check for syntax errors

### CORS Errors
- Verify FRONTEND_URL in backend matches your Vercel URL
- Check CORS configuration in backend/app.js

### API Not Working
- Verify REACT_APP_API_URL in Vercel environment variables
- Check backend is running in Render dashboard
- Test backend health endpoint: `https://your-backend.onrender.com/health`

### Data Not Persisting
- Check browser console for errors
- Verify localStorage is enabled
- Test API endpoints in Network tab

## 🎯 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Backend health check responds
- [ ] Login/Signup works
- [ ] Stress detection saves data
- [ ] Dashboard shows real data
- [ ] Analytics shows real data
- [ ] Data persists after logout/login
- [ ] No console errors
- [ ] Mobile responsive

## 📱 Accessing Your App

**Frontend**: `https://your-app-name.vercel.app`
**Backend API**: `https://your-api-name.onrender.com`

## 🔄 Redeployment

### Frontend
- Push changes to Git
- Vercel auto-deploys on push

### Backend
- Push changes to Git
- Render auto-deploys on push

### Manual Redeploy
- Vercel: Go to Deployments → Redeploy
- Render: Go to Manual Deploy → Deploy latest commit

## 💡 Tips

1. **Free Tier Limits**:
   - Render: Backend sleeps after 15 min of inactivity (first request may be slow)
   - Vercel: 100GB bandwidth/month

2. **Custom Domain** (Optional):
   - Both Vercel and Render support custom domains
   - Configure in project settings

3. **Monitoring**:
   - Check Vercel Analytics for frontend metrics
   - Check Render logs for backend errors

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Check deployment logs for specific errors
