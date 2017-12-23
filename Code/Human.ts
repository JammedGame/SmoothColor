export { Human };
import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Sprite, PointCloud } from "three";

class Human
{
    private _Lane:number;
    private _PosX:number;
    private _Color:Engineer.Color;
    private _Points;
    private _Body;
    private _Shirt;
    private _GameScene:GameScene;
    public get Lane():number { return this._Lane; }
    public get PosX():number { return this._PosX; }
    public get Color():Engineer.Color { return this._Color; }
    public get Eaten():boolean { return !this._Body.Active; }
    public constructor(Lane:number, Color:Engineer.Color, PointsVal:number, PosX:number, GameScene:GameScene)
    {   
        this._Lane = Lane;
        this._PosX = PosX;
        this._Color = Color;
        this._Body = new Body(Lane,Color, PosX, GameScene);
        this._Shirt = new Shirt(Lane, Color, PosX, GameScene);
        this._Points = new Points(Lane, PointsVal, PosX, GameScene);
    }
    public Eat() : void
    {
        console.log("Eat!");
        this._Body.Active = false;
        this._Shirt.Active = false;
        this._Points.Active = false;
    }  
}
class Body extends Engineer.Sprite
{    
    public constructor(Lane:number, Color:Engineer.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX, 200 + Lane * 300, 2);
        this.Trans.Scale = new Engineer.Vertex(200,200,1);
        let SpriteSet = new Engineer.SpriteSet(null, "Body", []);
        SpriteSet.Seed = 10;
        this.Paint = Color;
        SpriteSet.Sprites.push("/Resources/Textures/Human/knight-frame2.png");
        this.SpriteSets.push(SpriteSet);
        GameScene.AddSceneObject(this);
    }
}
class Shirt extends Engineer.Sprite
{    
    public constructor(Lane:number, Color:Engineer.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX, 250 + Lane * 300, 3);
        this.Trans.Scale = new Engineer.Vertex(20, 20, 1);
        this.Paint = Color;
        GameScene.AddSceneObject(this);
    }
}
class Points extends Engineer.Sprite
{    
    public constructor(Lane:number, PointsVal:number, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX, 180 + Lane * 300, 1);
        this.Trans.Scale = new Engineer.Vertex(25, 25, 1);
        let SpriteSet = new Engineer.SpriteSet(null, "Points", []);
        SpriteSet.Seed = 10;
        SpriteSet.Sprites.push("/Resources/Textures/Human/broj2.png");
        this.SpriteSets.push(SpriteSet);
        GameScene.AddSceneObject(this);
    }
}
