import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Human } from "./Human";
import { Color } from "engineer-js";
import { Score } from "./Score";
import { HumanColorGen } from "./HumanColorGen";
export { HumanGen };

class HumanGen
{
    private _GameScene:GameScene;
    private _Difficulty:number;    
    private _CurrLane:number;
    private _TotalDistance:number = 300;
    private _PrevPosX:number = -1;
    private _CurrPosX:number;
    private _Humans:Human[];
    private _Score:Score;
    private _Level:any;
    private _ColorGen:HumanColorGen;
    public get Finished():boolean
    {
        return -this._GameScene.Trans.Translation.X > this._TotalDistance ||
                this._Humans.length == 0;
    }
    public constructor(GameScene:GameScene, Level:any, Score:Score)
    {
        this._GameScene = GameScene;
        this._Score = Score;
        this.Init(Level);
    }
    public Init(Level:any) : void
    {
        if(this._Humans)
        {
            for(let i in this._Humans) this._Humans[i].Destroy();
        }
        this._Humans = [];
        this._Level = Level;
        this._Score.Reset();
        this._TotalDistance = 300;
        this._ColorGen = new HumanColorGen(this._Level);
        for(let i=0;i<this._Level.Humans;i++)
        {
            this.generateParameters(0);
        }
    }
    public generateParameters(difficulty:number)
    {
        this._CurrLane = Math.round(Math.random() * 2);
        this._CurrPosX = Math.round(Math.random()*(Math.round(1920 / Math.log(difficulty+2)) - 400) + 400);
        this._TotalDistance += Math.abs(this._CurrPosX - this._PrevPosX) + this._CurrPosX;
        let Data = this._ColorGen.Gen();
        this._Humans.push(new Human(this._CurrLane, Data.Color, Data.Score, this._TotalDistance, this._GameScene,this._Score));
        this._PrevPosX = this._CurrPosX;
    }
    public TryEatHumans(PosX:number, Lane:number, Color:Engineer.Color) : boolean
    {
        let Eat = false;
        for(let i in this._Humans)
        {
            if(this._Humans[i].Eaten) continue;
            if(Math.abs(PosX - this._Humans[i].PosX) < 50 && Lane == this._Humans[i].Lane
            && this.ColorsEqual(Color, this._Humans[i].Color))
            {
                this._Humans[i].Eat();
                Eat = true;
            }
        }
        for(let i = this._Humans.length-1; i>=0; i--)
        {
            if(this._Humans[i].Eaten)
            {
                this._Humans.splice(i,1);
            }
        }
        return Eat;
    }
    public ColorsEqual(Color1:Engineer.Color, Color2:Engineer.Color) : boolean
    {
        let Equal = true;
        Equal = Equal && Color1.R == Color2.R;
        Equal = Equal && Color1.G == Color2.G;
        Equal = Equal && Color1.B == Color2.B;
        return Equal;
    }
}