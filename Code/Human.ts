export { Human };

import * as TBX from 'toybox-engine';

import { GameScene } from "./GameScene";
import { Score } from "./Score";

class Human
{
    private static Munch:TBX.SoundObject;
    private _Lane:number;
    private _PosX:number;
    private _Color:TBX.Color;
    private _Points:Points;
    private _Body:Body;
    private _Shirt:Shirt;
    private _Score:Score;
    private _GameScene:GameScene;    
    public get Lane():number { return this._Lane; }
    public get PosX():number { return this._PosX; }
    public get Color():TBX.Color { return this._Color; }
    public get Eaten():boolean { return !this._Body.Active; }

    public constructor(Lane:number, Color:TBX.Color, PointsVal:number, PosX:number, GameScene:GameScene, Score:Score)
    {   
        if(!Human.Munch) Human.Munch = new TBX.SoundObject("Resources/Textures/Munch.wav");
        this._Lane = Lane;
        this._PosX = PosX;
        this._Color = Color;
        this._Score = Score;
        this._Body = new Body(Lane, Color, PosX, GameScene);
        this._Shirt = new Shirt(Lane, Color, PosX, GameScene);
        if(this._Color.R == 255 && this._Color.G == 255 && this._Color.B == 255)this._Points = new Points(Lane, PointsVal, PosX, GameScene, TBX.Color.Black);
        else this._Points = new Points(Lane, PointsVal, PosX, GameScene);
    }
    public Eat() : void
    {
        this._Body.Active = false;
        this._Shirt.Active = false;
        this._Points.Active = false;
        this._Score.UpdateScore(this._Points.Points);
        Human.Munch.Play();
    } 
    public Destroy() : void
    {
        this._Body.Active = false;
        this._Shirt.Active = false;
        this._Points.Active = false;
    }  
}
class Body extends TBX.Sprite
{    
    public constructor(Lane:number, Color:TBX.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new TBX.Vertex(PosX, 250 + Lane * 315, 2);
        this.Trans.Scale = new TBX.Vertex(85,175,1);
        let SpriteSet = new TBX.SpriteSet(null, [], "Body");
        SpriteSet.Seed = 3;        
        SpriteSet.Images.push("Resources/Textures/Human/human1.png");
        SpriteSet.Images.push("Resources/Textures/Human/human2.png");
        SpriteSet.Images.push("Resources/Textures/Human/human3.png");
        this.SpriteSets.push(SpriteSet);
        GameScene.Attach(this);
    }
}
class Shirt extends TBX.Sprite
{    
    public constructor(Lane:number, Color:TBX.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new TBX.Vertex(PosX, 250 + Lane * 315, 3);
        this.Trans.Scale = new TBX.Vertex(85, 175, 1);
        this.Paint = Color;
        let SpriteSet = new TBX.SpriteSet(null, [], "Shirt");
        SpriteSet.Seed = 3;
        SpriteSet.Images.push("Resources/Textures/Human/shirt.png");
        this.SpriteSets.push(SpriteSet);
        GameScene.Attach(this);
    }
}
class Points extends TBX.Sprite
{    
    private PointsValue:number;
    public get Points():number { return this.PointsValue; }
    public constructor(Lane:number, PointsVal:number, PosX:number, GameScene:GameScene, Color?:TBX.Color,)
    {   
        super();
        this.Trans.Translation = new TBX.Vertex(PosX, 232 + Lane * 315, 4);
        this.Trans.Scale = new TBX.Vertex(35, 35, 1);
        let SpriteSet = new TBX.SpriteSet(null, [], "Points");
        SpriteSet.Seed = 3;
        this.PointsValue = PointsVal;
        SpriteSet.Images.push("Resources/Textures/Human/broj"+PointsVal+".png");
        this.SpriteSets.push(SpriteSet);
        if(Color!=null)this.Paint = Color;
        GameScene.Attach(this);
    }
}


