export { Monster }

import Engineer from "./Engineer";

import { ColorMixer } from "./ColorMixer";

class Monster
{
    private _Scene:Engineer.Scene2D;
    private _Color:Engineer.Sprite;
    private _Asset:Engineer.Sprite;
    private _Mixer:ColorMixer;
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init()
    {
        this._Color = new Engineer.Sprite();
        this._Color.Trans.Scale = new Engineer.Vertex(80,160,1);
        this._Color.Paint = Engineer.Color.Black;
        this._Asset = new Engineer.Sprite();
        this._Asset.Trans.Scale = new Engineer.Vertex(80,160,1);
        this._Mixer = new ColorMixer(this._Scene, this._Color);
        this._Scene.AddSceneObject(this._Color);
        this.Move(new Engineer.Vertex(100, 440,0));
    }
    public Move(Position:Engineer.Vertex)
    {
        this._Color.Trans.Translation = Position;
        this._Asset.Trans.Translation = Position;
    }
}