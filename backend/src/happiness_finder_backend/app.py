from flask import Flask, request
from PIL import Image
from ultralytics import YOLO

app = Flask(__name__)

model = YOLO("model/best.pt")  # pretrained YOLOv8x model


@app.route("/api/detect", methods=["POST"])
def detect():
    image = request.files["image"]
    image = Image.open(image)

    results = model(image)
    results = results[0]
    results = results.tojson()

    return results


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
