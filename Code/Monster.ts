export { Monster }

import Engineer from "./Engineer";

class Monster
{
    private _Scene:Engineer.Scene2D;
    private _Color:Engineer.Sprite;
    private _Asset:Engineer.Sprite;
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Color = new Engineer.Sprite();
        this._Color.Paint = Engineer.Color.Black;
        this._Asset = new Engineer.Sprite();
        this._Scene.AddSceneObject(this._Color);
    }
}