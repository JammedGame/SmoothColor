export { GameScene };

import Engineer from "./Engineer";

import { Monster } from "./Monster";
import { HumanGen } from "./HumanGen";

class GameScene extends Engineer.Scene2D
{
    private _Pause:boolean;
    private _Monster:Monster;
    private _HumanGen:HumanGen;
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor()
    {
        super();
        this.Name = "Game";
        this.Init();
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    public Init(): void
    {
        this.BackColor = Engineer.Color.FromRGBA(255, 255, 255, 255);
        this._Monster = new Monster(this);
        this._HumanGen = new HumanGen(this);
    }
    public SceneLoaded(DataString)
    {
        let Data = JSON.parse(DataString);
        if(Data.Type == "Scene") this.Deserialize(Data.Data);
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        // Update Code here
        this.MoveScene();
    }
    private MoveScene():void
    {
        this.Trans.Translation = new Engineer.Vertex(this.Trans.Translation.X - 2, this.Trans.Translation.Y, 0);
    }
}