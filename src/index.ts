window.onload = function():void {
  const canvas = <HTMLCanvasElement>document.getElementById('field1');
  const ctx = canvas.getContext('2d');
  const w = 400;
  const h = 400;
  
  canvas.width = w;
  canvas.height = h;

  drawGrid(ctx, w, h);

  canvas.onclick = function (e) {  
    const tx = Math.floor(getMousePos(canvas, e).x / (w / 10)) * (w / 10); 
    const ty = Math.floor(getMousePos(canvas, e).y / (w / 10)) * (w / 10);
    
    ctx.fillStyle = '#1B1464';
    ctx.fillRect(tx + 0.2, ty + 0.2, w / 10 - 0.4, h / 10 - 0.4);
  }

  function getMousePos(canvas: any, e: any) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

function drawGrid(ctx: any, h: number, w: number): void {
  for (let x = w / 10; x < w; x += w / 10) {
    ctx.beginPath();
    ctx.moveTo(0.5 + x, -3.5);
    ctx.lineTo(0.5 + x, h);
    ctx.stroke();
  }
  for (let y = h / 10; y < h; y += h / 10) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
}
