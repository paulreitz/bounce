import * as PIXI from 'pixijs';
// import { Logger } from '../../utils/logger';

export class SpriteComponent {
    private _state: any;
    private _highlightAlpha: number = 1.0;
    mainSprite: PIXI.Sprite;
    highlightSprite: PIXI.Sprite;

    constructor(mainSprite: PIXI.Sprite, highlightSprite: PIXI.Sprite) {
        this.mainSprite = mainSprite;
        this.highlightSprite = highlightSprite;
        this.highlightSprite.alpha = 0.0;
    }

    enterHighlight(): void {
        this._highlightAlpha = 1.0;
        this.highlightSprite.alpha = this._highlightAlpha;
    }

    enterNormal(): void {
        this._highlightAlpha = 1.0;
        this.highlightSprite.alpha = 0.0;
    }

    updateHighlight(delta: number): void {
        const fadeAmount = 2.0 * delta;
        this._highlightAlpha = this._highlightAlpha - fadeAmount ? this._highlightAlpha - fadeAmount : 0.0;
        this.highlightSprite.alpha = this._highlightAlpha;
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
        // Logger.instance.log(`state key: ${this._state.value}`);
        return this._highlightAlpha <= 0.0 && this._state.value === 'Fading';
    }
}