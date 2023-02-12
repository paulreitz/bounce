import { System, Entity } from 'entts';
import { PositionComponent } from '../components/position-component';
import { VelocityComponent } from '../components/velocity-component';

export class MovementSystem extends System {
    public components = [PositionComponent, VelocityComponent];

    public override onUpdate(): void {
        this.entities.forEach((entityId: string) => {
            const entity = new Entity(entityId);

            const position = entity.getComponent(PositionComponent);
            const velocity = entity.getComponent(VelocityComponent);

            if (!position || !velocity) {
                return;
            }

            position.x += velocity.x * velocity.speed;
            position.y += velocity.y * velocity.speed;
        });
    }
}