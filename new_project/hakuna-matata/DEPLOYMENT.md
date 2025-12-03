# Hakuna Matata - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended for Frontend)
**Best for:** Frontend deployment with automatic builds

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `build`

### Option 2: Netlify (Alternative Frontend)
**Best for:** Simple frontend deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=build
   ```

### Option 3: Render (Full Stack)
**Best for:** Deploying both frontend and backend

1. Go to [render.com](https://render.com)
2. Create two services:
   - **Web Service** for backend (Node.js)
   - **Static Site** for frontend (React)

---

## 📋 Pre-Deployment Checklist

### Frontend Preparation
- [x] Build optimized production bundle
- [x] Configure environment variables
- [x] Update API endpoints
- [x] Test production build locally

### Backend Preparation
- [x] Set up environment variables
- [x] Configure CORS for production domain
- [x] Set up database (MongoDB Atlas)
- [x] Test API endpoints

---

## 🔧 Configuration Files

### Frontend Environment Variables
Create `.env.production` in frontend folder:
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_ENV=production
```

### Backend Environment Variables
Update `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
```

---

## 📦 Build Commands

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Start
```bash
cd backend
npm start
```

---

## 🌐 Deployment Steps

### Step 1: Deploy Backend to Render

1. **Create account** at [render.com](https://render.com)
2. **New Web Service** → Connect GitHub repo
3. **Configure:**
   - Name: `hakuna-matata-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

4. **Add Environment Variables:**
   - `MONGO_URI`
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`

5. **Deploy** → Copy backend URL

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure:**
   - Add environment variable: `REACT_APP_API_URL=<backend-url>`

4. **Verify deployment** → Copy frontend URL

### Step 3: Update CORS

Update `backend/app.js` to allow your frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

---

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create cluster** (Free tier available)
3. **Create database user**
4. **Whitelist IP:** 0.0.0.0/0 (allow from anywhere)
5. **Get connection string**
6. **Add to backend environment variables**

---

## ✅ Post-Deployment Testing

### Test Checklist
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Stress detection functional
- [ ] All activities accessible
- [ ] Chatbot responds
- [ ] Analytics display data
- [ ] Diary saves entries
- [ ] Mobile responsive

### Test URLs
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- API Health: `https://your-backend.onrender.com/api/health`

---

## 🔒 Security Checklist

- [x] Environment variables secured
- [x] CORS configured for production
- [x] HTTPS enabled (automatic on Vercel/Render)
- [x] API keys not in code
- [x] Database connection secured
- [x] User data encrypted

---

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics

### Render Dashboard
- View backend logs
- Monitor uptime
- Check resource usage

---

## 🐛 Troubleshooting

### Frontend Issues
**Problem:** Blank page after deployment
- Check browser console for errors
- Verify API URL in environment variables
- Check build logs in Vercel

**Problem:** API calls failing
- Verify backend URL is correct
- Check CORS configuration
- Ensure backend is running

### Backend Issues
**Problem:** Server not starting
- Check environment variables
- Verify MongoDB connection string
- Check Render logs

**Problem:** Database connection failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has permissions

---

## 🎯 Quick Deploy Commands

### Full Deployment (One-Time Setup)

```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Deploy frontend to Vercel
vercel --prod

# 3. Deploy backend to Render (via dashboard)
# - Connect GitHub repo
# - Configure as shown above

# 4. Update environment variables
# - Add backend URL to frontend
# - Add frontend URL to backend CORS

# 5. Test deployment
curl https://your-backend.onrender.com/api/health
```

---

## 📝 Deployment Summary

**Frontend:** Vercel (https://your-app.vercel.app)
**Backend:** Render (https://your-backend.onrender.com)
**Database:** MongoDB Atlas
**Status:** Production Ready ✅

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to `main` branch → Auto-deploy
- Pull requests → Preview deployments
- Rollback available if needed

---

## 💡 Tips

1. **Use environment variables** for all sensitive data
2. **Test locally** before deploying
3. **Monitor logs** after deployment
4. **Set up alerts** for downtime
5. **Keep dependencies updated**
6. **Use CDN** for static assets
7. **Enable caching** for better performance

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check CORS configuration
5. Review MongoDB connection

**Your Hakuna Matata wellness platform is ready for the world! 🎉**
