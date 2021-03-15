export const rectUnion = (rects = []) => {
  let minX, maxX, minY, maxY = 0;
  for(let i=0;i<rects.length;i++) {
    const rc = rects[i];
    if(i === 0) {
      minX = rc.x;
      maxX = rc.x + rc.width;
      minY = rc.y;
      maxY = rc.y + rc.height;
    } else {
      minX = Math.min(minX,rc.x);
      maxX = Math.max(maxX,rc.x + rc.width);
      minY = Math.min(minY,rc.y);
      maxY = Math.max(maxY,rc.y + rc.height);
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}