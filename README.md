# AquaSerendib

AI-Powered Image Recognition System for Identifying Endemic Freshwater Fishes of Sri Lanka

---

## Overview

AquaSerendib is a full-stack web application that leverages artificial intelligence to identify endemic freshwater fish species in Sri Lanka using images.

Users can upload an image of a fish, and the system will analyze it using a trained YOLO-based deep learning model to predict the species and display detailed biological information.

---

## Key Features

* AI-powered fish identification (YOLO-based)
* Image upload and real-time prediction
* Detailed fish information display
* Admin dashboard with CRUD functionality
* Secure authentication system
* Responsive UI design

---

## Tech Stack

### Frontend

* React.js

### Backend

* Node.js / Express

### AI/ML

* YOLO (Object Detection)
* Python

### Database

* Supabase

---

## How It Works

1. User uploads a fish image
2. Image is sent to backend API
3. AI model processes the image
4. System identifies the species
5. Data is retrieved from the database
6. Results are displayed

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/aquaserendib.git
cd aquaserendib
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### AI Service Setup

```bash
cd ai-service
python -m venv venv
```

```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

```bash
uvicorn main:app
```

---

## Admin Access

```text
Username: admin
Password: admin123
```

---

## Demo

A working demo of the system is available in the Releases section.

File:
AquaSerendib_demo

---

## Version

v1.0.0 – Initial Production Release

---

## Future Improvements

* Add more fish species
* Community submissions
* Enhance customer support system

---

## Limitations

* Limited number of fish species(five species)
* Performance depends on image quality
* Requires internet connection

---

## License

MIT License

---

## Author

Magalage Chandupa Nimnajith Jayamuthu

mcnjayamuthu@gmail.com

Final Year Project – BSc (Hons) Software Engineering

---

## Contact

For inquiries or collaboration, please reach out via GitHub.
