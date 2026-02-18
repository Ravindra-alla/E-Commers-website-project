# Procfile for Render (and Heroku-compatible hosts)
# point the web process at the backend Flask application

web: cd backend && gunicorn app:app --bind 0.0.0.0:$PORT
