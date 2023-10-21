export interface BoundingBox {
  box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  class: number;
  confidence: number;
  name: string;
}
