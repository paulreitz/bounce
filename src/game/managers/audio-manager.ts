export class AudioManager {
    private static _instance: AudioManager;
    private _sounds: { [key: string]: any };

    private constructor() {
        this._sounds = {};
    }

    static get instance(): AudioManager {
        if (!AudioManager._instance) {
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }

    addSound(key: string, path: string): void {
        this._sounds[key] = new Audio(path);
    }

    playSound(key: string): void {
        if (this._sounds[key]) {
            this._sounds[key].play();
        }
    }
}