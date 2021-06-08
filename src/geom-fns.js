export function rectUnion(rects = []) {
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

export function pointBetweenPointsAt(p1,p2,position = 0.5) {
  return {
    x: p1.x + (p2.x - p1.x) * position,
    y: p1.y + (p2.y - p1.y) * position
  };
}

export function rectWithSizeCenteredAroundPoint(size,point) {
  return { 
    x: point.x - size.width / 2, 
    y: point.y - size.height/2, 
    width: size.width, 
    height: size.height
  };
}