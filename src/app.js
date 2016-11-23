import Rx from 'rxjs/Rx';

var source = Rx.Observable
    .interval(100 /* ms */)
    .timeInterval();

var subscription = source.subscribe(
    x => {
        draw(x.value);
    });

const draw = (time) => {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const watchSize = 128;
    const contentSize = 0.92;


    // Center doc
    ctx.fillStyle="#13414E";
    ctx.beginPath();
    ctx.arc(watchSize, watchSize, 3, 0, 2 * Math.PI, true);
    ctx.fill();


    ctx.strokeStyle="DimGray";
    ctx.beginPath();

    // Outer circle
    ctx.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);
    ctx.arc(watchSize, watchSize, watchSize - 3, 0, Math.PI * 2, true);

    // 12 longer lines
    for (let i = 0; i < 12; i++) {
      let angle = i * (Math.PI * 2 / 12);
      const armLength = watchSize * 0.15;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
    }

    // 60 shorter lines
    for (let i = 0; i < 60; i++) {
      let angle = i * (Math.PI * 2 / 60);
      const armLength = watchSize * 0.05;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * contentSize, watchSize + watchSize * Math.sin(angle) * contentSize);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle) * contentSize, watchSize + (watchSize - armLength) * Math.sin(angle) * contentSize);
    }

    // Longer hand (minute), each minute goes one step
    let angle = (time / 600 / 60 - 0.25) * (Math.PI * 2);
    let armLength = watchSize * 0.5;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    // Shorter hand (second), each second goes one step
    angle = (time / 10 / 60 - 0.25) * (Math.PI * 2);
    armLength = watchSize * 0.8;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    ctx.stroke();
  }
}

draw();
