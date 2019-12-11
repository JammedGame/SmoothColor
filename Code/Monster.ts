export { Monster }

import * as TBX from 'toybox-engine';

import { ColorMixer } from "./ColorMixer";
import { FadeEffect } from "./FadeEffect";

class Monster
{
    private _Lane:number;
    private _Scene:TBX.Scene2D;
    private _Color:TBX.Sprite;
    private _Asset:TBX.Sprite;
    private _Mixer:ColorMixer;
    private _FadeEffects:FadeEffect[];
    public get Lane():number { return this._Lane; }
    public get Color():TBX.Color { return this._Color.Paint; }
    public constructor(Scene:TBX.Scene2D)
    {
        this._Scene = Scene;
        this.Init();
    }
    public Init() : void
    {
        this._Lane = 2;
        this._FadeEffects = [];
        this._Color = new TBX.Sprite();
        this._Color.Trans.Scale = new TBX.Vertex(230,270,1);
        this._Color.Paint = TBX.Color.Black;
        this._Color.Fixed = true;
        this._Asset = new TBX.Sprite();
        this._Asset.Trans.Scale = new TBX.Vertex(230,270,1);
        this._Asset.Fixed = true;
        this.LoadSets();
        this._Mixer = new ColorMixer(this._Scene, this._Color);
        this._Scene.Attach(this._Color);
        this._Scene.Attach(this._Asset);
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Move(new TBX.Vertex(150, 840, 0));
    }
    public Move(Position:TBX.Vertex) : void
    {
        this._Color.Trans.Translation = Position;
        this._Asset.Trans.Translation = Position;
    }
    public Reset() : void
    {
        for(let i in this._FadeEffects)
        {
            this._FadeEffects[i].FinishEffect();
        }
        this._FadeEffects = [];
    }
    public MoveToLane() : void
    {
        let Current = this._Color.Trans.Translation;
        let New = new TBX.Vertex(Current.X, this._Lane * 315 + 210, 0);
        this.CreateFade();
        this.Move(New);
    }
    private CreateFade() : void
    {
        for(let i = this._FadeEffects.length - 1; i >= 0; i--)
        {
            if(this._FadeEffects[i].Finished)
            {
                this._FadeEffects.splice(i, 1);
            }
        }
        this._FadeEffects.push(new FadeEffect(this._Scene, this._Asset, this._Color));
    }
    private KeyDown(Game:TBX.Game, Args:any) : void
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
        let Seed: number = 5;
        let SpriteSetSkin = new TBX.SpriteSet(null, [], "Walk");
        SpriteSetSkin.Seed = Seed;
        for(let i = 1; i < 10; i++) SpriteSetSkin.Images.push("Resources/Textures/Monster/hodanjekoza"+i+".png");
        this._Color.SpriteSets.push(SpriteSetSkin);
        let SpriteSetSkin2 = new TBX.SpriteSet(null, [], "Eat");
        SpriteSetSkin2.Seed = Seed;
        for(let i = 1; i < 10; i++) SpriteSetSkin2.Images.push("Resources/Textures/Monster/jedenjekoze"+i+".png");
        this._Color.SpriteSets.push(SpriteSetSkin2);
        let SpriteSet = new TBX.SpriteSet(null, [], "Walk");
        SpriteSet.Seed = Seed;
        for(let i = 1; i < 10; i++) SpriteSet.Images.push("Resources/Textures/Monster/hodanje"+i+".png");
        this._Asset.SpriteSets.push(SpriteSet);
        let SpriteSet2 = new TBX.SpriteSet(null, [], "Eat");
        SpriteSet2.Seed = Seed;
        for(let i = 1; i < 10; i++) SpriteSet2.Images.push("Resources/Textures/Monster/jedenje"+i+".png");
        this._Asset.SpriteSets.push(SpriteSet2);
    }
    public Eat() : void
    {
        this._Color.SetSpriteSet(1);
        this._Color.BackUpSpriteSet = 0;
        this._Asset.SetSpriteSet(1);
        this._Asset.BackUpSpriteSet = 0;
    }
}