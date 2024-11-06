export function generateBalloons(canvasWidth, canvasHeight, count) {
    const balloons = [];
    for (let i = 0; i < count; i++) {
      const balloonConfig = { ...balloonTypes[Math.floor(Math.random() * balloonTypes.length)] };
  
      // Add some randomness to the balloon properties
      balloonConfig.x = Math.random() * canvasWidth;
      balloonConfig.y = canvasHeight + balloonConfig.size; // Start just below the canvas
      balloonConfig.size *= 0.8 + Math.random() * 0.4; // Size variation
      balloonConfig.speed *= 0.9 + Math.random() * 0.2; // Speed variation
  
      // 10% chance for a random color balloon
      if (Math.random() < 0.1) {
        balloonConfig.color = randomColor();
      }
  
      balloons.push(balloonConfig);
    }
    return balloons;
}

export function generateSingleBalloon(canvasWidth, canvasHeight) {
    return generateBalloons(canvasWidth, canvasHeight, 1)[0];
}
// Export balloonTypes if needed elsewhere
export { balloonTypes };