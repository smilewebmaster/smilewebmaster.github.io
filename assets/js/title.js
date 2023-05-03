let particles = [];
let frequency = 20;
// Popolate particles
setInterval(
function () {
  popolate();
}.bind(this),
frequency);


let c1 = createCanvas({ width: $(window).width(), height: $(window).height() });
let c2 = createCanvas({ width: $(window).width(), height: $(window).height() });
let c3 = createCanvas({ width: $(window).width(), height: $(window).height() });

let tela = c1.canvas;
let canvas = c1.context;

// $("body").append(tela);
$("#home").append(c3.canvas);
writeText(c2.canvas, c2.context, "SMILEWEBMASTER\n\nFullstack Developer");


class Particle {
  constructor(canvas, options) {
    let random = Math.random();
    this.canvas = canvas;
    this.x = options.x;
    this.y = options.y;
    this.s = 3 + Math.random();
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = 0.5 + Math.random() * 20;
    this.color = this.radius > 5 ? "#FF5E4C" : "#ED413C"; //this.randomColor()
  }

  randomColor() {
    let colors = ["#FF5E4C", "#FFFFFF"];
    return colors[this.randomIntFromInterval(0, colors.length - 1)];
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    //this.swapColor()
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;
    this.a += Math.random() * 0.8 - 0.4;

    if (this.x < 0 || this.x > this.w - this.radius) {
      return false;
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      return false;
    }
    this.render();
    return true;
  }}


function createCanvas(properties) {
  let canvas = document.createElement('canvas');
  canvas.width = properties.width;
  canvas.height = properties.height;
  let context = canvas.getContext('2d');
  return {
    canvas: canvas,
    context: context };

}

function writeText(canvas, context, text) {
  let size = 100;
  context.font = size + "px Montserrat";
  context.fillStyle = "#111111";
  context.textAlign = "center";
  let lineheight = 70;
  let lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - lineheight * (lines.length - 1) / 3);
  }
}

function maskCanvas() {
  c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
  c3.context.globalCompositeOperation = 'source-atop';
  c3.context.drawImage(c1.canvas, 0, 0);
  blur(c1.context, c1.canvas, 2);
}

function blur(ctx, canvas, amt) {
  ctx.filter = `blur(${amt}px)`;
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';
}


/*
 * Function to clear layer canvas
 * @num:number number of particles
 */
function popolate() {
  particles.push(
  new Particle(canvas, {
    x: $(window).width() / 2,
    y: $(window).height() / 2 }));


  return particles.length;
}

function clear() {
  canvas.globalAlpha = 0.03;
  canvas.fillStyle = '#111111';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

function update() {
  clear();
  particles = particles.filter(function (p) {
    return p.move();
  });
  maskCanvas();
  requestAnimationFrame(update.bind(this));
}

update();