import { System, Entity } from 'entts';
import { PositionComponent } from '../components/position-component';
import { SpriteComponent} from '../components/sprite-component';

export class SpriteSystem extends System {
    public components = [PositionComponent, SpriteComponent];

    public override onUpdate(): void {
        this.entities.forEach((entityId: string) => {
            const entity = new Entity(entityId);

            const position = entity.getComponent(PositionComponent);
            const sprite = entity.getComponent(SpriteComponent);

            if (!position || !sprite) {
                return;
            }

            sprite.setX(position.x);
            sprite.setY(position.y);
        });
    }
}