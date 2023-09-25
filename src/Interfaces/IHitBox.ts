import { Rectangle } from "pixi.js";

export interface IHitBox{
    getHitBox():Rectangle;
}

export function checkCollision(objA:IHitBox,objB:IHitBox):Rectangle|null{
    const rectA = objA.getHitBox();
    const rectB = objB.getHitBox();

    const rightmostLeft = rectA.left < rectB.left ? rectB.left : rectA.left;
    const leftmostRight = rectA.right > rectB.right ? rectB.right : rectA.right;
    const topmostBottom = rectA.bottom > rectB.bottom ? rectB.bottom : rectA.bottom;
    const bottommostTop = rectA.top < rectB.top ? rectB.top : rectA.top;
    
    if ((rightmostLeft < leftmostRight) && (topmostBottom > bottommostTop)){
        const rect = new Rectangle();
        rect.x=rightmostLeft;
        rect.y=bottommostTop;
        rect.width= leftmostRight -rightmostLeft;
        rect.height= topmostBottom - bottommostTop;

        return rect;
    }
    else return null;
}