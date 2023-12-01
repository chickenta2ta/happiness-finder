import { BoundingBox } from "./boundingBox";

export function isConfident(rectangles: BoundingBox[], threshold: number) {
  for (const rectangle of rectangles) {
    if (rectangle.confidence > (threshold / 100) * 1.15) {
      return true;
    }
  }

  return false;
}
