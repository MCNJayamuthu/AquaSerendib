from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load trained model
model = YOLO("best.pt")

CONF_THRESHOLD = 0.40
CONF_GAP = 0.10

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    results = model(image, conf=CONF_THRESHOLD)

    detections = []

    for r in results:
        if r.boxes is None:
            continue

        for box in r.boxes:
            class_id = int(box.cls)
            conf = float(box.conf)

            species = r.names[class_id]

            detections.append({
                "species": species,
                "confidence": conf
            })

    # no fish detected
    if len(detections) == 0:
        return {
            "status": "unknown",
            "message": "Seems like this fish is unidentified and please note that at the moment the system can predict these 5 species. We are working on extending the amount fish species in the future. Sorry for the inconvenience."
        }

    detections = sorted(detections, key=lambda x: x["confidence"], reverse=True)

    # confidence gap filtering
    if len(detections) > 1:

        gap = detections[0]["confidence"] - detections[1]["confidence"]

        if gap < CONF_GAP:
            return {
                "status": "uncertain",
                "possible_species": [
                    {
                        "species": detections[0]["species"],
                        "confidence": round(detections[0]["confidence"], 2)
                    },
                    {
                        "species": detections[1]["species"],
                        "confidence": round(detections[1]["confidence"], 2)
                    }
                ]
            }

    top = detections[0]

    if top["confidence"] < 0.5:
        return {
            "status": "unknown",
            "message": "Seems like this fish is unidentified and please note that at the moment the system can predict these 5 species. We are working on extending the amount fish species in the future. Sorry for the inconvenience."
        }

    return {
        "status": "identified",
        "species": top["species"],
        "confidence": round(top["confidence"], 2)
    }