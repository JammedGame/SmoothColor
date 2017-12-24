export{IndicatorLVL};
import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Levels } from "./Levels";

class IndicatorLVL
{
private _GameScene:GameScene;
private _LvlColl:Engineer.TileCollection = new Engineer.TileCollection(null, []);
private _Lvl:Engineer.Tile = new Engineer.Tile();
private _NumColl:Engineer.TileCollection = new Engineer.TileCollection(null, []);
private _Num:Engineer.Tile = new Engineer.Tile();

    public constructor(GameScene:GameScene)
    {        
        this._GameScene = GameScene;
        this._LvlColl.Images.push("Resources/Textures/Human/lvl.png");
        this._Lvl.Name = "Digit";
        this._Lvl.Collection = this._LvlColl;
        this._Lvl.Index = 0;
        this._Lvl.Fixed = true;
        this._Lvl.Trans.Scale = new Engineer.Vertex(150, 75, 1);
        this._Lvl.Trans.Translation = new Engineer.Vertex(1720, 75, 0);
        

        this._GameScene.AddSceneObject(this._Lvl);

        for(let i = 0; i < 10; i++)this._NumColl.Images.push("Resources/Textures/Human/broj"+i+".png");
        this._Num.Name = "Num";
        this._Num.Collection = this._NumColl;
        this._Num.Index = 0;
        this._Num.Fixed = true;
        this._Num.Trans.Scale = new Engineer.Vertex(45, 75, 1);
        this._Num.Trans.Translation = new Engineer.Vertex(1870, 71, 0);
        

        this._GameScene.AddSceneObject(this._Num);
        
    }    
    public UpdateLvl(lvl:number)
    {
        this._Num.Index = lvl;
        this._Num.Modified = true;
    }
}

