import { createMachine } from 'xstate';
import { SpriteComponent } from '../components/sprite-component';
import { SpriteStateEvent } from './sprite-state-event';
import { AudioManager } from '../managers/audio-manager';

export class SpriteState {
    spriteStates: any;

    constructor() {
        this.setupStateMachine();
    }

    setInitialState(sprite: SpriteComponent): void {
        sprite.state = this.spriteStates.initial;
    }

    updateState(sprite: SpriteComponent, event: SpriteStateEvent): void {
        const nextState = this.spriteStates.transition(sprite.state, event.type);
        nextState.actions.forEach((action: any) => {
            action.exec(sprite);
        });
        sprite.state = nextState;
    }

    private setupStateMachine(): void {
        this.spriteStates = createMachine({
            id: 'sprite-state',
            initial: 'Normal',
            states: {
                Normal: {
                    entry: ['enterNormal'],
                    on: {
                        HIGHLIGHT: 'Highlighted',
                    }
                },
                Highlighted: {
                    entry: ['enterHighlight'],
                    on: {
                        UNHIGHLIGHT: 'Normal',
                        FADE: 'Fading',
                    }
                },
                Fading: {
                    on: {
                        UNHIGHLIGHT: 'Normal',
                        HIGHLIGHT: 'Highlighted',
                    }
                }
            }
        },
        {
            actions: {
                enterHighlight: (sprite: SpriteComponent) => {
                    sprite.enterHighlight();
                    AudioManager.instance.playSound('tink');
                    setTimeout(() => {
                        this.updateState(sprite, { type: 'FADE' });
                    }, 0);
                },
                enterNormal: (sprite: SpriteComponent) => {
                    sprite.enterNormal();
                }
            }
        });
    }
}