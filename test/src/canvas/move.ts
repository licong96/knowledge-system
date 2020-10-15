
const canvas = document.createElement('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 600;
canvas.height = 600;
ctx.fillStyle = 'purple';

document.body.appendChild(canvas);

const step = 1;
let xPostion = 0;

const move = () => {
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillRect(xPostion, 0, 300, 150);
	xPostion += step;
	if (xPostion <= 300) {
		requestAnimationFrame(move)
	}
}
move();


export {};