import { BoundingBox } from "./boundingBox";

export async function drawRectangles(
  ctx: CanvasRenderingContext2D,
  rectangles: BoundingBox[]
) {
  rectangles.forEach((rectangle) => {
    if (rectangle.name === "Three Leaf Clover") {
      return;
    }

    const width = rectangle.box.x2 - rectangle.box.x1;
    const height = rectangle.box.y2 - rectangle.box.y1;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgb(237 111 134)";
    ctx.strokeRect(rectangle.box.x1, rectangle.box.y1, width, height);

    ctx.fillStyle = "rgb(237 111 134 / 50%)";
    ctx.fillRect(rectangle.box.x1, rectangle.box.y1, width, height);

    ctx.fillStyle = "rgb(237 111 134)";

    const fontSize = 22;
    ctx.font = `${fontSize}px sans-serif`;

    const name = rectangle.name;
    const textWidth = ctx.measureText(name).width;

    ctx.fillRect(
      rectangle.box.x1 - 1,
      rectangle.box.y1 - 1 - fontSize,
      textWidth,
      fontSize
    );

    ctx.fillStyle = "white";
    ctx.fillText(name, rectangle.box.x1 - 1, rectangle.box.y1 - 1);
  });
}
