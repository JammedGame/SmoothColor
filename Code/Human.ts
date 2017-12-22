export { Human };
import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Sprite, PointCloud } from "three";

class Human
{
    private _Points;
    private _Body;
    private _Shirt;
    private _GameScene:GameScene;
    
    public constructor(Lane:number, Color:Engineer.Color, PointsVal:number, PosX:number, GameScene:GameScene)
    {   
        this._Body = new Body(Lane,Color, PosX, GameScene);
        this._Shirt = new Shirt(Lane, Color, PosX, GameScene);
        this._Points = new Points(Lane, PointsVal, PosX, GameScene);
    }   
}
class Body extends Engineer.Sprite
{    
    public constructor(Lane:number, Color:Engineer.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX,100+Lane*300,0);
        this.Trans.Scale = new Engineer.Vertex(100,100,1);
        GameScene.AddSceneObject(this);
    }
}
class Shirt extends Engineer.Sprite
{    
    public constructor(Lane:number, Color:Engineer.Color, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX,100+Lane*300,0);
        this.Trans.Scale = new Engineer.Vertex(100,100,1);
        GameScene.AddSceneObject(this);
    }
}
class Points extends Engineer.Sprite
{    
    public constructor(Lane:number, PointsVal:number, PosX:number, GameScene:GameScene)
    {   
        super();
        this.Trans.Translation = new Engineer.Vertex(PosX,80+Lane*300,0);
        this.Trans.Scale = new Engineer.Vertex(100,100,1);
        GameScene.AddSceneObject(this);
    }
}
