"""
E-Commerce Backend API
Simple Flask server providing product and serving frontend for deployment.
"""

import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow frontend or other clients to access the API
CORS(app)

# Paths for serving the frontend through Flask (useful for Render deployment)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_FOLDER = os.path.join(BASE_DIR, "..", "frontend")

# Dummy products data stored as a Python list
# Each product contains: id, name, price (in INR), and image URL
# Prices converted to Indian Rupees (1 USD ≈ 83 INR)
products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "price": 6640.00,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        "id": 2,
        "name": "Smart Watch",
        "price": 16597.00,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },
    {
        "id": 3,
        "name": "Laptop Stand",
        "price": 4150.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 4,
        "name": "Mechanical Keyboard",
        "price": 10790.00,
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop"
    },
    {
        "id": 5,
        "name": "Wireless Mouse",
        "price": 3320.00,
        "image": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
    },
    {
        "id": 6,
        "name": "USB-C Hub",
        "price": 4980.00,
        "image": "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop"
    },
    {
        "id": 7,
        "name": "Bluetooth Speaker",
        "price": 7470.00,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
    },
    {
        "id": 8,
        "name": "Webcam HD 1080p",
        "price": 5810.00,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop"
    },
    {
        "id": 9,
        "name": "Gaming Chair",
        "price": 24900.00,
        "image": "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=500&fit=crop"
    },
    {
        "id": 10,
        "name": "External SSD 1TB",
        "price": 10790.00,
        "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop"
    },
    {
        "id": 11,
        "name": "USB-C Cable Pack",
        "price": 2075.00,
        "image": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop"
    },
    {
        "id": 12,
        "name": "Wireless Charger",
        "price": 2905.00,
        "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"
    },
    {
        "id": 13,
        "name": "Monitor Stand",
        "price": 3735.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 14,
        "name": "Desk Lamp LED",
        "price": 3320.00,
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
    },
    {
        "id": 15,
        "name": "Laptop Sleeve",
        "price": 2490.00,
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
    },
    {
        "id": 16,
        "name": "Phone Stand",
        "price": 1660.00,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
    },
    {
        "id": 17,
        "name": "Noise Cancelling Earbuds",
        "price": 12450.00,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        "id": 18,
        "name": "Tablet Stand",
        "price": 2325.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 19,
        "name": "HDMI Cable 4K",
        "price": 1577.00,
        "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop"
    },
    {
        "id": 20,
        "name": "USB Flash Drive 128GB",
        "price": 1909.00,
        "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop"
    },
    {
        "id": 21,
        "name": "Laptop Cooling Pad",
        "price": 2988.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 22,
        "name": "Wireless Keyboard & Mouse Combo",
        "price": 6640.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 23,
        "name": "Portable Power Bank 20000mAh",
        "price": 4150.00,
        "image": "https://img.freepik.com/free-vector/powerbank-battery-charger-realistic-icons-set-with-black-silver-devices-isolated-vector-illustration_1284-81780.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
        "id": 24,
        "name": "Monitor Mount Arm",
        "price": 7470.00,
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
        "id": 25,
        "name": "Desk Organizer",
        "price": 2739.00,
        "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"
    },
    {
        "id": 26,
        "name": "Blue Light Blocking Glasses",
        "price": 2490.00,
        "image": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop"
    }
]


@app.route('/api/products', methods=['GET'])
def get_products():
    """
    API endpoint to fetch all products
    Returns: JSON array of all products
    """
    return jsonify(products)


@app.route("/health", methods=["GET"])
def health():
    """
    Simple health check endpoint for monitoring.
    """
    return jsonify({"message": "E-Commerce API is healthy!", "status": "success"})


@app.route("/", methods=["GET"])
def serve_index():
    """
    Serve the main frontend application (index.html).
    This allows a single Render service to host both API and UI.
    """
    return send_from_directory(FRONTEND_FOLDER, "index.html")


@app.route("/<path:path>", methods=["GET"])
def serve_static(path):
    """
    Serve static assets (CSS, JS, images) for the frontend.
    """
    return send_from_directory(FRONTEND_FOLDER, path)


if __name__ == '__main__':
    # Run the Flask app on localhost:5000
    # debug=True enables auto-reload on code changes
    print("Starting E-Commerce API server...")
    print("API available at: http://localhost:5000/api/products")
    app.run(debug=True, host='0.0.0.0', port=5000)

