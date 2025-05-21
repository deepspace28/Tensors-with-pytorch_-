FROM python:3.10-slim

WORKDIR /app

# Install system dependencies including python3-distutils
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-distutils \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "quantum_service:app", "--host", "0.0.0.0", "--port", "8000"]
