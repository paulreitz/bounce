import { System, Entity } from 'entts';
// import { Logger } from '../../utils/logger';
import { GameDimensions } from '../constants/game-constants';
import { PositionComponent } from '../components/position-component';
import { VelocityComponent } from '../components/velocity-component';
import { BounceComponent } from '../components/bounce-component';
import { SpriteComponent } from '../components/sprite-component';
import { SpriteState } from '../state/sprite-state';
import { SpriteStateEvent } from '../state/sprite-state-event';

export class BounceSystem extends System {
    private _stateMachine: SpriteState;
    private _lastTime: number = 0;
    public components = [BounceComponent];

    constructor() {
        super();
        this._stateMachine = new SpriteState();
    }

    public override onEntityAdded(entityId: string): void {
        const entity = new Entity(entityId);
        const sprite = entity.getComponent(SpriteComponent);
        if (!!sprite) {
            this._stateMachine.setInitialState(sprite);
        }
    }

    public override onUpdate(): void {
        const now = Date.now();
        let delta: number = 0;
        if (this._lastTime !== 0) {
            delta = (now - this._lastTime) / 1000;
        }
        this.entities.forEach((entityId: string) => {
            const entity = new Entity(entityId);

            const position = entity.getComponent(PositionComponent);
            const velocity = entity.getComponent(VelocityComponent);
            const sprite = entity.getComponent(SpriteComponent);

            if (!position || !velocity || !sprite) {
                return;
            }

            const offsetY = sprite.height / 2;
            const offsetX = sprite.width / 2;
            let highlight = false;
            let state = sprite.state;
            if (state.value === 'Fading' && delta !== 0) {
                sprite.updateHighlight(delta);
            }

            if (position.y - offsetY <= 0 || position.y + offsetY >= GameDimensions.height) {
                const yPos = (position.y + offsetY) - GameDimensions.height;
                if (yPos === 0) {
                    velocity.y = -1;
                } else {
                    velocity.y = (yPos / Math.abs(yPos)) * -1;
                }
                highlight = true;
            }

            if (position.x - offsetX <= 0 || position.x + offsetX >= GameDimensions.width) {
                const xPos = (position.x + offsetX) - GameDimensions.width;
                if (xPos === 0) {
                    velocity.x = -1;
                } else {
                    velocity.x = (xPos / Math.abs(xPos)) * -1;
                }
                highlight = true;
            }

            if (highlight) {
               this._stateMachine.updateState(sprite, { type: 'HIGHLIGHT' } as SpriteStateEvent);
            } else if (sprite.fadeComplete) {
                this._stateMachine.updateState(sprite, { type: 'UNHIGHLIGHT' } as SpriteStateEvent);
            }
        });
        this._lastTime = now;
    }
}