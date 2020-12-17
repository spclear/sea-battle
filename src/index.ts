window.onload = function (): void {
  interface coords {
    x: null | number,
    y: null | number,
  }

  const canvas = <HTMLCanvasElement>document.getElementById('field1');
  const ctx = canvas.getContext('2d');

  const w = 400;
  const h = 400;
  const sW = w / 10; // square width
  const sH = h / 10; // square height
  canvas.width = w;
  canvas.height = h;
  
  const playerField = createField();
  const currCords: coords = {
    x: null,
    y: null,
  }

  drawGrid(ctx, w, h);

  canvas.onclick = function (e) {
    const coords = getGridPos(e, canvas, sW, sH);
    playerField[coords.y][coords.x] = 1;
    ctx.fillStyle = '#333';
    ctx.fillRect(coords.x * sW + 1, coords.y * sH + 1, sW - 1, sH - 1);
  }

  canvas.onmousemove = function (e) {
    const coords = getGridPos(e, canvas, sW, sH);
    const isCurrCords = !(currCords.x === null) && !(currCords.y === null);
    const x = coords.x;
    const y = coords.y;

    const isShip = (x: number, y: number): boolean => {
      return !!playerField[y][x];
    }
    
    if (currCords.x !== x || currCords.y !== y) {      
      if (isCurrCords && !isShip(currCords.x, currCords.y)) {
        ctx.clearRect(currCords.x * sW + 1, currCords.y * sH + 1, sW - 1, sH - 1);
      }
      if (!isShip(x, y)) {
        ctx.fillStyle = 'rgba(0, 0, 255, .2)';
        ctx.fillRect(x * sW + 1, y * sH + 1, sW - 1, sH - 1);
      }
    }

    currCords.x = x;
    currCords.y = y;
  }

  canvas.onmouseleave = function () {
    if (!playerField[currCords.y][currCords.x]) {
      ctx.clearRect(currCords.x * sW + 1, currCords.y * sH + 1, sW - 1, sH - 1);
    }
    currCords.x = null;
    currCords.y = null;
  }
}

function drawGrid(ctx: any, h: number, w: number): void {
  for (let x = w / 10; x < w; x += w / 10) {
    ctx.beginPath();
    ctx.moveTo(0.5 + x, 0);
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

function createField(): Array<number[]> {
  const field = new Array(10);
  for (let i = 0; i < field.length; i++) {
    field[i] = new Array(10).fill(0);
  }
  return field
}

function getGridPos(e: any, canvas: any, w: number, h: number) {
  const rect = canvas.getBoundingClientRect();
  const coords = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  const numbTenErr = (n: number): number => {
    if (n >= 10) return 9;
    if (n < 0) return 0;
    return n;
  }
  
  return {
    x : numbTenErr(Math.floor(coords.x / w)),
    y: numbTenErr(Math.floor(coords.y / h))
  }
}