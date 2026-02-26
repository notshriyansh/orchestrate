import * as htmlToImage from "html-to-image";
import GIF from "gif.js";

export async function exportAsImage() {
  const viewport = document.querySelector(
    ".react-flow__viewport",
  ) as HTMLElement;

  if (!viewport) return;

  const dataUrl = await htmlToImage.toPng(viewport);

  const link = document.createElement("a");
  link.download = "workflow.png";
  link.href = dataUrl;
  link.click();
}

export async function exportAsGIF(duration = 3000) {
  const container = document.querySelector(".react-flow") as HTMLElement;

  if (!container) return;

  const gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: "/gif.worker.js",
  });

  const frames = 40;
  const delay = duration / frames;

  const edges = container.querySelectorAll("path");

  for (let i = 0; i < frames; i++) {
    const offset = i * 4;

    edges.forEach((edge) => {
      (edge as SVGPathElement).style.strokeDashoffset = `${offset}`;
    });

    await new Promise((r) => setTimeout(r, 20));

    const dataUrl = await htmlToImage.toPng(container, {
      backgroundColor: "#0f172a",
      pixelRatio: 2,
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((res) => (img.onload = res));

    gif.addFrame(img, { delay });
  }

  gif.on("finished", function (blob: Blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "workflow.gif";
    link.click();
  });

  gif.render();
}

export async function exportAsMP4(duration = 4000) {
  const container = document.querySelector(".react-flow") as HTMLElement;

  if (!container) return;

  const scale = 2;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width * scale;
  canvas.height = height * scale;

  ctx?.scale(scale, scale);

  const stream = canvas.captureStream(60);
  const recorder = new MediaRecorder(stream, {
    mimeType: "video/webm;codecs=vp9",
    videoBitsPerSecond: 8_000_000,
  });

  const chunks: Blob[] = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "workflow_hd.webm";
    link.click();
  };

  recorder.start();

  const frames = 120;
  const delay = duration / frames;

  for (let i = 0; i < frames; i++) {
    await new Promise((res) => setTimeout(res, delay));

    const dataUrl = await htmlToImage.toPng(container, {
      pixelRatio: scale,
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((res) => (img.onload = res));
    ctx?.drawImage(img, 0, 0, width, height);
  }

  recorder.stop();
}
