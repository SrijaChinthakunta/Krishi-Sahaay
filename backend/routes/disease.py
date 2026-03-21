from fastapi import APIRouter, UploadFile, File
import numpy as np
from PIL import Image
import tensorflow as tf
import os
import gdown

router = APIRouter()

# =========================
# DOWNLOAD MODEL (ONLY ONCE)
# =========================
MODEL_PATH = "model/plant_model.h5"
FILE_ID = "1oOIkAkU3_sNZG3N2s-nR-5P-0Ot4unXb"
URL = f"https://drive.google.com/uc?id={FILE_ID}"

# Create model folder
os.makedirs("model", exist_ok=True)

# Download if not exists
if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    gdown.download(URL, MODEL_PATH, quiet=False)

# =========================
# LOAD MODEL
# =========================
model = tf.keras.models.load_model(MODEL_PATH)

# =========================
# LOAD CLASS NAMES
# =========================
with open("model/classes.txt", "r") as f:
    class_names = [line.strip() for line in f.readlines()]

# =========================
# PREDICTION FUNCTION
# =========================
def predict_image(image: Image.Image):

    image = image.resize((128, 128))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    index = np.argmax(predictions)

    return class_names[index]

# =========================
# SMART MAPPING FUNCTION
# =========================
def get_disease_info(prediction):

    text = prediction.lower()

    # 🍅 TOMATO
    if "tomato" in text:
        if "early" in text:
            return (
                "Tomato Early blight",
                "Use fungicides like chlorothalonil or copper-based sprays.",
                "Use neem oil spray and remove infected leaves."
            )
        elif "late" in text:
            return (
                "Tomato Late blight",
                "Apply metalaxyl-based fungicides.",
                "Use baking soda spray and avoid overwatering."
            )
        elif "healthy" in text:
            return (
                "Tomato Healthy",
                "No disease. Maintain proper care.",
                "Use compost and organic fertilizers."
            )

    # 🥔 POTATO
    if "potato" in text:
        if "early" in text:
            return (
                "Potato Early blight",
                "Use fungicides like mancozeb.",
                "Use neem oil and crop rotation."
            )
        elif "late" in text:
            return (
                "Potato Late blight",
                "Apply systemic fungicides immediately.",
                "Remove infected plants and improve drainage."
            )
        elif "healthy" in text:
            return (
                "Potato Healthy",
                "Healthy plant. Maintain proper care.",
                "Use compost and natural fertilizers."
            )

    # fallback
    return (
        prediction.replace("_", " "),
        "No data available",
        "No data available"
    )

# =========================
# API
# =========================
@router.post("/detect-disease")
async def detect_disease(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")

    prediction = predict_image(image)

    print("Prediction:", prediction)

    disease, treatment, organic = get_disease_info(prediction)

    return {
        "disease": disease,
        "treatment": treatment,
        "organic_solution": organic
    }