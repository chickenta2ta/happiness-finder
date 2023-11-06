import { BoundingBox } from "./boundingBox";

export async function drawCircles(
  ctx: CanvasRenderingContext2D,
  rectangles: BoundingBox[]
) {
  rectangles.forEach((rectangle) => {
    const centerX = (rectangle.box.x2 + rectangle.box.x1) / 2;
    const centerY = (rectangle.box.y2 + rectangle.box.y1) / 2;

    const width = rectangle.box.x2 - rectangle.box.x1;
    const height = rectangle.box.y2 - rectangle.box.y1;

    const radius = (width + height) / 4;

    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgb(234 106 116 / 80%)";

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  });
}
