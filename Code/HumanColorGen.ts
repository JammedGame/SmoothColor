export { HumanColorGen }

import * as TBX from 'toybox-engine';

class HumanColorGen
{
    private _Level:any;
    private _Pool:any[];
    public constructor(Level:any)
    {
        this._Level = Level;
        this.GeneratePool();
    }
    public Gen() : any
    {
        let Index = HumanColorGen.RandomNumber(this._Pool.length);
        let Color = this.GenerateColor(this._Pool[Index]);
        let Score = this.GenerateScore(this._Pool[Index]);
        return { Color: Color, Score: Score };
    }
    private GenerateColor(Value:any) : TBX.Color
    {
        let Color = TBX.Color.FromRGBA(this.GenerateChannel(Value[0]),
                                            this.GenerateChannel(Value[1]),
                                            this.GenerateChannel(Value[2]),255);
        return Color;
    }
    private GenerateChannel(Value:number) : number
    {
        if(Value == 0) return 0;
        if(Value == 1) return 128;
        return 255;
    }
    private GenerateScore(Value:any) : number
    {
        let Score = 1;
        if(Value[0] == 2) Score+=1;
        else if(Value[0] == 1) Score+=2;
        if(Value[1] == 2) Score+=1;
        else if(Value[1] == 1) Score+=2;
        if(Value[2] == 2) Score+=1;
        else if(Value[2] == 1) Score+=2;
        if(Value[0] == Value[1] && Value[1] == Value[2])
        {
            if(Value[0] == 2) Score -= 2;
            if(Value[0] == 1) Score -= 3;
        }
        return Score;
    }
    private GeneratePool() : void
    {
        this._Pool = [];
        this._Pool.push([0,0,0]);
        this._Pool.push([2,0,0]);
        this._Pool.push([0,2,0]);
        this._Pool.push([0,0,2]);
        if(!this._Level.BasicOnly)
        {
            this._Pool.push([2,2,0]);
            this._Pool.push([2,0,2]);
            this._Pool.push([0,2,2]);
            this._Pool.push([2,2,2]);
        }
        if(this._Level.LowChannel)
        {
            this._Pool.push([1,0,0]);
            this._Pool.push([0,1,0]);
            this._Pool.push([0,0,1]);
            this._Pool.push([1,1,0]);
            this._Pool.push([1,0,1]);
            this._Pool.push([0,1,1]);
            this._Pool.push([1,1,1]);
        }
        if(this._Level.LowHighMixes)
        {
            this._Pool.push([2,1,0]);
            this._Pool.push([2,0,1]);
            this._Pool.push([2,1,1]);
            this._Pool.push([2,1,2]);
            this._Pool.push([2,2,1]);
            this._Pool.push([1,0,2]);
            this._Pool.push([1,2,0]);
            this._Pool.push([1,1,2]);
            this._Pool.push([1,2,1]);
            this._Pool.push([1,2,2]);
            this._Pool.push([0,2,1]);
            this._Pool.push([0,1,2]);
        }
    }
    private static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}