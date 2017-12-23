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
        this._Color.Trans.Scale = new Engineer.Vertex(230,270,1);
        this._Color.Paint = Engineer.Color.Black;
        this._Asset = new Engineer.Sprite();
        this._Asset.Trans.Scale = new Engineer.Vertex(230,270,1);
        this.LoadSets();
        this._Mixer = new ColorMixer(this._Scene, this._Color);
        this._Scene.AddSceneObject(this._Color);
        this._Scene.AddSceneObject(this._Asset);
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Move(new Engineer.Vertex(150, 840, 0));
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
    private LoadSets() : void
    {
        let SpriteSet = new Engineer.SpriteSet(null, "Walk", []);
        SpriteSet.Seed = 10;
        for(let i = 1; i < 10; i++) SpriteSet.Sprites.push("/Resources/Textures/Monster/hodanjekoza"+i+".png");
        this._Color.SpriteSets.push(SpriteSet);
        let SpriteSet2 = new Engineer.SpriteSet(null, "Walk", []);
        SpriteSet2.Seed = 10;
        for(let i = 1; i < 10; i++) SpriteSet2.Sprites.push("/Resources/Textures/Monster/hodanje"+i+".png");
        this._Asset.SpriteSets.push(SpriteSet2);
    }
}