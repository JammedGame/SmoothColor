export { GameLogic };

import * as TBX from 'toybox-engine';

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";
import { LevelPicker } from "./LevelPicker";
import { Levels } from "./Levels";

class GameLogic
{
    private _Game: TBX.Game;
    private _Runner: TBX.Runner;
    public constructor()
    {
        this.TryLoadData();
        this._Game = new TBX.Game();
        this._Game.Name = "SmoothColor";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        let _LevelPicker:any = new LevelPicker(this._Runner, this._Game);
        this._Game.Attach(_Menu);
        this._Game.Attach(_LevelPicker);
        let Music = new TBX.SoundObject("Resources/Textures/Music.mp3");
        Music.Looped = true;
        Music.Play();
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
    private TryLoadData()
    {
        let StringData = localStorage.getItem("Level_Data");
        if(!StringData) return;
        let Data = JSON.parse(StringData);
        Levels.splice(0);
        for(let i in Data)
        {
            Levels.push(Data[i]);
        }
    }
}