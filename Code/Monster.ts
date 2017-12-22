export { Monster }

import Engineer from "./Engineer";

import { ColorMixer } from "./ColorMixer";

class Monster
{
    private _Lane:number;
    private _Scene:Engineer.Scene2D;
    private _Color:Engineer.Sprite;
    private _Asset:Engineer.Sprite;
    private _Mixer:ColorMixer;
    public constructor(Scene:Engineer.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init() : void
    {
        this._Lane = 2;
        this._Color = new Engineer.Sprite();
        this._Color.Trans.Scale = new Engineer.Vertex(130,270,1);
        this._Color.Paint = Engineer.Color.Black;
        this._Asset = new Engineer.Sprite();
        this._Asset.Trans.Scale = new Engineer.Vertex(130,270,1);
        this._Mixer = new ColorMixer(this._Scene, this._Color);
        this._Scene.AddSceneObject(this._Color);
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Move(new Engineer.Vertex(100, 1080, 0));
    }
    public Move(Position:Engineer.Vertex) : void
    {
        this._Color.Trans.Translation = Position;
        this._Asset.Trans.Translation = Position;
    }
    public MoveToLane() : void
    {
        let Current = this._Color.Trans.Translation;
        let New = new Engineer.Vertex(Current.X, this._Lane * 300 + 240, 0);
        this.Move(New);
    }
    private KeyDown(Game:Engineer.Game, Args:any) : void
    {
        if(Args.KeyCode == 38)
        {
            if(this._Lane != 0)
            {
                this._Lane--;
                this.MoveToLane();
            }
        }
        else if(Args.KeyCode == 40)
        {
            if(this._Lane != 2)
            {
                this._Lane++;
                this.MoveToLane();
            }
        }
    }
}