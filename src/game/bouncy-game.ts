import * as PIXI from 'pixijs';
import { EntityManager, SystemManager, Entity } from 'entts';
import { GameDimensions } from './constants/game-constants';
import { SpriteComponent } from './components/sprite-component';
import { PositionComponent } from './components/position-component';
import { VelocityComponent } from './components/velocity-component';
import { BounceComponent } from './components/bounce-component';
import { SpriteSystem } from './systems/sprite-system';
import { MovementSystem } from './systems/movement-system';
import { BounceSystem } from './systems/bounce-system';
import { AudioManager } from './managers/audio-manager';

export class BouncyGame {
    private app: PIXI.Application;
    private ball: Entity;

    constructor(containerId: string) {
        AudioManager.instance.addSound('tink', 'assets/tink.wav');
        this.app = new PIXI.Application({
            width: GameDimensions.width,
            height: GameDimensions.height,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1,
        });
        const container = document.getElementById(containerId) as HTMLElement;
        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }
        container.appendChild(this.app.view as HTMLCanvasElement);
        const bgSprite = PIXI.Sprite.from('assets/templepattern.png');
        bgSprite.scale.set(1.5);
        bgSprite.anchor.set(0.5);
        bgSprite.x = GameDimensions.width / 2;
        bgSprite.y = GameDimensions.height / 2;
        this.app.stage.addChild(bgSprite);
        this.makeBouncyBall();
        this.setSystems();
        this.app.ticker.add(() => {
            SystemManager.update();
        });
    }

    private makeBouncyBall(): void {
        const posX = GameDimensions.width / 2;
        const posY = GameDimensions.height / 2;
        const mainSprite = PIXI.Sprite.from('assets/mix.png');
        mainSprite.x = posX;
        mainSprite.y = posY;
        mainSprite.anchor.set(0.5);
        mainSprite.scale.set(0.5);
        this.app.stage.addChild(mainSprite);

        const highlightSprite = PIXI.Sprite.from('assets/yellow.png');
        highlightSprite.x = posX;
        highlightSprite.y = posY;
        highlightSprite.anchor.set(0.5);
        highlightSprite.scale.set(0.5);
        this.app.stage.addChild(highlightSprite);

        this.ball = EntityManager.createEntity();
        this.ball.addComponent(SpriteComponent, mainSprite, highlightSprite);
        this.ball.addComponent(PositionComponent, posX, posY);
        this.ball.addComponent(VelocityComponent, 5);
        this.ball.addComponent(BounceComponent);
    }

    private setSystems(): void {
        SystemManager.add(SpriteSystem);
        SystemManager.add(MovementSystem);
        SystemManager.add(BounceSystem);
    }
}