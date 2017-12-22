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
    private _TotalDistance:number[] = [100, 100,100];
    private _PrevPosX:number = -1;
    private _CurrPosX:number;
  
    
    public constructor(GameScene:GameScene)
    {
        this._GameScene = GameScene;

        for(let i=0;i<10;i++)
        {
            this.generateParameters(0);
        }
    }
    public generateParameters(difficulty:number)
    {
        this._CurrLane = Math.random() * 2;
        switch(difficulty)
        {
            case 0: 
            {        
                this._CurrPosX = Math.random()*(this._TotalDistance[this._CurrLane] - 20) + 20;
                if(this._PrevPosX == this._CurrPosX)
                {
                    this._TotalDistance[this._CurrLane] += (this._CurrPosX - this._PrevPosX) + this._CurrPosX;
                }
                else
                {
                    this._TotalDistance[this._CurrLane] += this._CurrPosX;
                }
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
                
                new Human(this._CurrLane, color, humanPoints, this._TotalDistance[this._CurrLane], this._GameScene);         
                             
                this._PrevPosX = this._CurrPosX;
                break;                
            }
            case 1:
            case 2:
        }
    }
    public generateColor()
    {
        let roll:number[]=[0,0,0];
        roll[0] = Math.random()*2;
        roll[1] = Math.random()*2;
        roll[2] = Math.random()*2;
        for(let i; i<3; i++)
        {
            if(roll[i]==0)roll[i]=0;
            else if(roll[i]==1)roll[i]=128;
            else if(roll[i]==2)roll[i]=255;
        }
        return Engineer.Color.FromRGBA(roll[0], roll[1], roll[2], 255);
    }
}