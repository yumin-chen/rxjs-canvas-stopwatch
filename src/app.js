import Rx from 'rxjs/Rx';

const draw = () => {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    const watchSize = 128;

    ctx.beginPath();

    // Outer circle
    ctx.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);

    // 12 longer lines
    for (let i = 0; i < 12; i++) {
      let angle = i * (Math.PI * 2 / 12);
      const armLength = watchSize * 0.2;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * 0.95, watchSize + watchSize * Math.sin(angle) * 0.95);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle), watchSize + (watchSize - armLength) * Math.sin(angle));
    }

    // 60 shorter lines
    for (let i = 0; i < 60; i++) {
      let angle = i * (Math.PI * 2 / 60);
      const armLength = watchSize * 0.1;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * 0.95, watchSize + watchSize * Math.sin(angle) * 0.95);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle), watchSize + (watchSize - armLength) * Math.sin(angle));
    }
    ctx.stroke();
  }
}

draw();
