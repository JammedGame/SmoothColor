import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Human } from "./Human";
import { Color } from "engineer-js";
export { HumanGen };

class HumanGen
{
    private _GameScene:GameScene;
    private _Difficulty:number;    
    private _CurrLane:number;
    private _TotalDistance:number = 960;
    private _PrevPosX:number = -1;
    private _CurrPosX:number;
    private _Humans:Human[];
    public constructor(GameScene:GameScene)
    {
        this._GameScene = GameScene;
        this._Humans = [];
        for(let i=0;i<10;i++)
        {
            this.generateParameters(0);
        }
    }
    public generateParameters(difficulty:number)
    {
        this._CurrLane = Math.round(Math.random() * 2);
        this._CurrPosX = Math.round(Math.random()*(Math.round(1920 / Math.log(difficulty+2)) - 400) + 400);
        this._TotalDistance += Math.abs(this._CurrPosX - this._PrevPosX) + this._CurrPosX;
        let color:Engineer.Color = this.generateColor();
        let colorPoints:number[]=[color.R,color.G,color.B];
        let humanPoints:number;
        for(let i=0;i<3;i++)
        {
            switch(colorPoints[i])
            {
                case 0: {colorPoints[i]=0;break}
                case 128: {colorPoints[i]=1;break;}
                case 255: {colorPoints[i]=2;break;}
                default: {colorPoints[i]=0;break;}
            }
        }
        if(colorPoints[0]==0 && colorPoints[1]==0 && colorPoints[2]==0)
        {
            humanPoints = 1;
        }
        else if(colorPoints[0]==colorPoints[1] && colorPoints[0]==colorPoints[2] && colorPoints[1]==colorPoints[2]&&colorPoints[0]==255)
        {
            humanPoints = 2;
        }
        else if(colorPoints[0]==colorPoints[1] && colorPoints[0]==colorPoints[2] && colorPoints[1]==colorPoints[2]&&colorPoints[0]==128)
        {
            humanPoints = 3;
        }
        else 
        {
            humanPoints = 4;
        }      
        this._Humans.push(new Human(this._CurrLane, color, humanPoints, this._TotalDistance, this._GameScene));
        this._PrevPosX = this._CurrPosX;
    }
    public generateColor()
    {
        let roll:number[]=[0,0,0];
        roll[0] = Math.round(Math.random()*2);
        roll[1] = Math.round(Math.random()*2);
        roll[2] = Math.round(Math.random()*2);
        for(let i=0; i<3; i++)
        {
            if(roll[i]==0)roll[i]=0;
            else if(roll[i]==1)roll[i]=128;
            else if(roll[i]==2)roll[i]=255;
        }
        
        return Engineer.Color.FromRGBA(roll[0], roll[1], roll[2], 255);
    }
    public TryEatHumans(PosX:number, Lane:number, Color:Engineer.Color) : boolean
    {
        let Eat = false;
        for(let i in this._Humans)
        {
            if(this._Humans[i].Eaten) continue;
            if(Math.abs(PosX - this._Humans[i].PosX) < 100 && Lane == this._Humans[i].Lane
            && this.ColorsEqual(Color, this._Humans[i].Color))
            {
                this._Humans[i].Eat();
                Eat = true;
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