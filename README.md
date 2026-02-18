# E-Commerce Website - Setup & Run Guide

A full-stack e-commerce website with Flask backend and HTML/CSS/JavaScript frontend.

## 📋 Prerequisites

- Python 3.7 or higher installed
- pip (Python package installer)
- A modern web browser (Chrome, Firefox, Edge, etc.)

## 🚀 Quick Start Guide

### Step 1: Install Backend Dependencies

1. Open a terminal/command prompt
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

   **Note for Windows:** If `pip` doesn't work, try `pip3` or `python -m pip install -r requirements.txt`

### Step 2: Start the Backend Server

1. Make sure you're still in the `backend` folder
2. Run the Flask server:
   ```bash
   python app.py
   ```

   **Note for Windows:** If `python` doesn't work, try `python3` or `py app.py`

3. You should see:
   ```
   Starting E-Commerce API server...
   API available at: http://localhost:5000/api/products
   * Running on http://0.0.0.0:5000
   ```

4. **Keep this terminal window open** - the server needs to keep running!

### Step 3: Open the Frontend

**Option A: Direct File Opening (Simplest)**
1. Open a new file explorer window
2. Navigate to the `frontend` folder
3. Double-click `index.html` to open it in your default browser

**Option B: Using a Local Server (Recommended)**
1. Open a new terminal/command prompt
2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

3. **For Python 3:**
   ```bash
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000` in your browser

   **For Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **For Node.js (if installed):**
   ```bash
   npx http-server -p 8000
   ```

## ✅ Verify Everything is Working

1. **Backend Check:** Open `http://localhost:5000/api/products` in your browser
   - You should see a JSON array with 26 products

2. **Frontend Check:** Open the frontend page
   - You should see the hero section, analytics dashboard, and product cards
   - Products should load automatically
   - Clicking "Add to Cart" should update the cart counter and revenue

## 🛠️ Troubleshooting

### Backend Issues:

**Problem:** `pip` command not found
- **Solution:** Use `pip3` or `python -m pip` instead

**Problem:** Port 5000 already in use
- **Solution:** Change the port in `backend/app.py` (line 79) from `port=5000` to `port=5001` or another available port. Then update `frontend/script.js` (line 7) to use the new port.

**Problem:** ModuleNotFoundError: No module named 'flask'
- **Solution:** Make sure you ran `pip install -r requirements.txt` in the backend folder

### Frontend Issues:

**Problem:** Products not loading / CORS error
- **Solution:** Make sure the backend server is running first, then open the frontend

**Problem:** Images not showing
- **Solution:** This is normal - Unsplash images may take time to load or might be blocked. The placeholder will show if images fail to load.

## 📁 Project Structure

```
E-COMMERS/
├── backend/
│   ├── app.py              # Flask server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   └── script.js           # JavaScript functionality
└── README.md               # This file
```

## 🎯 What to Expect

- **Backend:** Runs on `http://localhost:5000`
- **Frontend:** Opens in your browser showing:
  - Beautiful gradient hero section
  - Analytics dashboard (Total Products, Revenue, Orders, Best Seller)
  - 26 product cards with hover effects
  - Working "Add to Cart" functionality
  - Responsive design for mobile and desktop

## 💡 Tips

- Keep the backend terminal open while using the website
- If you make changes to backend code, restart the Flask server (Ctrl+C, then run `python app.py` again)
- Frontend changes can be seen by refreshing the browser page
- The cart and revenue update in real-time when you add products

## 🚪 Stopping the Server

To stop the backend server:
- Press `Ctrl + C` in the terminal where the server is running

---

**Happy Shopping! 🛍️**

