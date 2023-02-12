import * as PIXI from 'pixijs';

export class SpriteComponent {
    private _state: any;
    private _highlightAlpha: number = 1.0;
    private _elapsedTime: number = 0;
    private _duration: number = 1.0;
    mainSprite: PIXI.Sprite;
    highlightSprite: PIXI.Sprite;

    constructor(mainSprite: PIXI.Sprite, highlightSprite: PIXI.Sprite) {
        this.mainSprite = mainSprite;
        this.highlightSprite = highlightSprite;
        this.highlightSprite.alpha = 0.0;
    }

    enterHighlight(): void {
        this._elapsedTime = 0;
        this._highlightAlpha = 1.0;
        this.highlightSprite.alpha = this._highlightAlpha;
    }

    enterNormal(): void {
        this._highlightAlpha = 1.0;
        this.highlightSprite.alpha = 0.0;
    }

    updateHighlight(delta: number): void {
        this.updateAlpha(delta);
    }

    setX(x: number): void {
        this.mainSprite.x = x;
        this.highlightSprite.x = x;
    }

    setY(y: number): void {
        this.mainSprite.y = y;
        this.highlightSprite.y = y;
    }

    get width(): number {
        return this.mainSprite.width;
    }

    get height(): number {
        return this.mainSprite.height;
    }

    get state(): any {
        return this._state;
    }

    set state(state: any) {
        this._state = state;
    }

    get fadeComplete(): boolean {
        return this.highlightSprite.alpha <= 0.0 && this._state.value === 'Fading';
    }

    private easeOutCubic(t: number): number {
        return (--t) * t * t + 1;
    }

    private updateAlpha(delta: number): void {
        this._elapsedTime += delta;
        const progress = Math.min(this._elapsedTime / this._duration, 1);
        const alpha = 1 - this.easeOutCubic(progress);
        this.highlightSprite.alpha = alpha;
    }
}