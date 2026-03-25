# AquaSerendib

AI-Powered Image Recognition System for Identifying Endemic Freshwater Fishes of Sri Lanka

---

## Overview

AquaSerendib is an end-to-end AI-powered computer vision system designed to identify Sri Lankan endemic freshwater fish species using images.

The system leverages a custom-built dataset, a YOLO-based deep learning model, and a full-stack web application to deliver real-time predictions along with detailed biological information.

This project demonstrates the complete machine learning lifecycle, including data collection, preprocessing, model training, evaluation, and deployment.

---

## Key Features

* AI-powered fish identification (YOLO-based)
* Image upload and real-time prediction
* Custom-trained deep learning model
* Model evaluation with performance metrics
* Admin dashboard (CRUD operations for fish data and for the future plans in the roadmap page)
* Secure authentication system (JWT-based)
* Fully responsive web interface

---

## AI / Machine Learning Pipeline

### Data Collection

* Collected real-world fish data using video recordings
* Extracted frames using FFmpeg via Python scripts
* Generated a dataset of 5,967 labeled images across 5 species

  <img width="1919" height="1024" alt="Screenshot_75" src="https://github.com/user-attachments/assets/8d2651e3-9f4c-4a15-a6ca-708a1bc590fb" />


### Data Preprocessing

* High-resolution frame extraction (60 FPS)
* Removed duplicate / low-quality frames
* Applied filtering based on image quality
* Organized dataset into training/validation sets

  <img width="1919" height="971" alt="Screenshot_84" src="https://github.com/user-attachments/assets/925a90ee-1a44-4c4e-a726-775b96fc3c91" />

  <img width="1919" height="1019" alt="Screenshot_83" src="https://github.com/user-attachments/assets/d5de4007-70dd-433f-9083-a558584da623" />

  <img width="1919" height="971" alt="Screenshot_81" src="https://github.com/user-attachments/assets/9e08fb4f-9b25-4a08-852a-f289a4b776d8" />


### Annotation

* Annotated dataset using Roboflow
* Managed bounding boxes and class labels
* Applied augmentation techniques to improve model generalization

<img width="1917" height="970" alt="Screenshot_35" src="https://github.com/user-attachments/assets/35f62bbd-8075-4be4-9c41-f06eddd58539" />


---

## Model Training

* Model: YOLOv8 (Ultralytics)
* Variant: YOLOv8m (medium model)
* Framework: Ultralytics Python library
* Environment: Google Colab (GPU-enabled)
* Task: Object Detection + Classification

The pretrained yolov8m.pt model was fine-tuned on the custom dataset.

---

## Model Performance

* mAP@50: 97.9%
* Precision: ~95%
* Recall: ~95%
* mAP@50–95: ~77%

---

## Model Evaluation

### Training Metrics

* Loss curves show stable convergence
* Precision and recall stabilized above 0.94
* High detection confidence across all classes

<img width="2400" height="1200" alt="results" src="https://github.com/user-attachments/assets/c132f9b6-3952-4b48-89ad-72e445a4ee90" />

---

### Confusion Matrix

* Strong diagonal dominance → high classification accuracy
* Minimal misclassification between similar species

<img width="3000" height="2250" alt="confusion_matrix" src="https://github.com/user-attachments/assets/6ea32d53-d349-4815-b1db-3e0f808a0051" />

<img width="3000" height="2250" alt="confusion_matrix_normalized" src="https://github.com/user-attachments/assets/77aac428-8430-455b-8c76-f6cff3ec6eeb" />


---

### Precision–Recall Curve
* High area under curve → strong detection performance

<img width="2250" height="1500" alt="BoxPR_curve" src="https://github.com/user-attachments/assets/c857619d-b1dd-4f21-9e11-07713afd057e" />

---

### F1 Score
* Peak F1 ≈ 0.95 → balanced precision and recall

<img width="2250" height="1500" alt="BoxF1_curve" src="https://github.com/user-attachments/assets/5fb87070-0da4-4b52-bbf8-fde4c55468f0" />

---

## Data Processing Pipeline (Advanced)

* Extracted frames at 60 FPS using FFmpeg
* Preserved original image quality (high-resolution JPG)
* Used GPU acceleration (NVIDIA NVENC) for faster processing
* Implemented frame selection using image sharpness scoring
* Reduced redundancy and improved dataset quality

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js / Express

### AI/ML

* YOLO (Object Detection)
* Python
* OpenCV
* FastAPI
* Google Colab (training environment)

### Database

* Supabase

### Tools & Platforms

* Roboflow (annotation & dataset management)
* FFmpeg (video frame extraction)
* GitHub (version control)

---

## How It Works

1. User uploads a fish image
2. Image is sent to backend API
3. AI model processes the image
4. System identifies the species
5. Data is retrieved from the database
6. Results are displayed

---

## Sample Outputs

<img width="1919" height="1020" alt="Screenshot_62" src="https://github.com/user-attachments/assets/cb4a7745-f301-475d-91e7-a56b5edd440a" />

<img width="1919" height="1021" alt="Screenshot_58" src="https://github.com/user-attachments/assets/559badc5-ffb0-4373-9cc4-d5e1fc284c47" />

<img width="1919" height="1018" alt="Screenshot_56" src="https://github.com/user-attachments/assets/86a30640-97d9-4fa3-baea-db12073d349c" />

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

## Contributing

Contributions, suggestions, and improvements are welcome!

---

## Contact

For inquiries or collaboration, please reach out via GitHub.
