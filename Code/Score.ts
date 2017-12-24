export{Score};
import { GameScene } from "./GameScene";
import Engineer from "./Engineer";

class Score
{
    private _TotalScore:number;
    private _GameScene:Engineer.Scene2D;
    private _DigitColl:Engineer.TileCollection = new Engineer.TileCollection(null, []);
    private _Digit:Engineer.Tile[] = [new Engineer.Tile(),new Engineer.Tile(),new Engineer.Tile()];    
    public get TotalScore():number { return this._TotalScore; }
    public constructor(GameScene:GameScene)
    {       
        this._TotalScore = 0;
        this._GameScene = GameScene;
        this.GenerateTiles();
    
    }
    public Reset() : void
    {
        this._TotalScore = 0;
        for(let i=0;i<3;i++)
        {
            this._Digit[i].Index = 0;
            this._Digit[i].Modified = true;
        }
    }
    private GenerateTiles() : void
    {
            
        for(let i = 0; i < 10; i++) this._DigitColl.Images.push("/Resources/Textures/Human/broj"+i+".png"); 
        
        for(let i = 0; i < 3; i++)
        {
        this._Digit[i].Name = "Digit"+i;
        this._Digit[i].Collection = this._DigitColl;
        this._Digit[i].Index = 0;
        this._Digit[i].Fixed = true;
        this._Digit[i].Trans.Scale = new Engineer.Vertex(50, 75, 1);
        this._Digit[i].Trans.Translation = new Engineer.Vertex(910+75*i, 75, 0);
        this._GameScene.AddSceneObject(this._Digit[i]);
        }
    }
    public UpdateScore(humanPoints:number)
    {   
        let digits:number[]=[0,0,0];
        this._TotalScore+=humanPoints;
        
        for(let i=0;i<3;i++)digits[i]=Math.floor((this._TotalScore/Math.pow(10,i)))%10;                     
      
        for(let i=0;i<3;i++)
        {
            this._Digit[i].Index = digits[2-i];
            this._Digit[i].Modified = true;
        }
        
    }
}