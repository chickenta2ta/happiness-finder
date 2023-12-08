import { BoundingBox } from "./boundingBox";

export function getMaxConfidence(rectangles: BoundingBox[]) {
  return rectangles.reduce(
    (max, b) => (b.confidence > max ? b.confidence : max),
    0.0
  );
}
