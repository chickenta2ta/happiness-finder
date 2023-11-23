import { BoundingBox } from "./boundingBox";

export function adjustConfidence(rectangles: BoundingBox[]) {
  rectangles.forEach((rectangle) => {
    if (rectangle.name === "Three Leaf Clover") {
      rectangle.confidence *= 0.9;
    }
  });
  rectangles.sort((a, b) => b.confidence - a.confidence);

  return rectangles.slice(0, 3);
}
