export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";
import { LevelPicker } from "./LevelPicker";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new Engineer.Game();
        this._Game.Name = "SmoothColor";
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new Engineer.Vertex(1920, 1080, 0));
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        let _LevelPicker:any = new LevelPicker(this._Runner, this._Game);
        this._Game.AddScene(_Menu);
        this._Game.AddScene(_LevelPicker);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}