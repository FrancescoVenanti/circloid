let delay1 = 0;
let delay2 = 0;
function loop(delay: number) {
  delay2 = delay1;
  delay1 = delay;
  console.log(delay1, delay2);
  requestAnimationFrame(loop);
}
