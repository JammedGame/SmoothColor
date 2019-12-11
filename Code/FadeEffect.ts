export { FadeEffect }

import * as TBX from 'toybox-engine';

class FadeEffect
{
    private _Finished: boolean;
    private _Timer: number;
    private _Scene: TBX.Scene2D;
    private _Asset: TBX.Sprite;
    private _Color: TBX.Sprite;
    public get Finished():boolean { return this._Finished; }
    public constructor(Scene:TBX.Scene2D, Asset:TBX.Sprite, Color:TBX.Sprite)
    {
        this._Finished = false;
        this._Timer = 1000;
        this._Scene = Scene;
        this._Asset = Asset.Copy();
        this._Color = Color.Copy();
        this._Asset.Paint = TBX.Color.Black;
        let Trans:number = -this._Scene.Trans.Translation.X;
        this._Asset.Fixed = false;
        this._Color.Fixed = false;
        this._Asset.Trans.Translation.X = 200 + Trans;
        this._Color.Trans.Translation.X = 200 + Trans;
        this._Scene.Attach(this._Asset);
        this._Scene.Attach(this._Color);
        this._Scene.Events.Update.push(this.UpdateEffect.bind(this));
    }
    private UpdateEffect() : void
    {
        if(this._Finished)
        {
            this._Timer -= 1;
            if(this._Timer < 0)
            {
                this.FinishEffect();
            }
        }
        this._Asset.Paint.A -= 5;
        this._Color.Paint.A -= 5;
        if(this._Asset.Paint.A <= 0)
        {
            this._Asset.Paint.A = 0;
            this._Color.Paint.A = 0;
            this._Finished = true;
        }
    }
    public FinishEffect() : void
    {
        this._Scene.Remove(this._Asset);
        this._Scene.Remove(this._Color);
        this._Scene.Events.Update.splice(this._Scene.Events.Update.indexOf(this.UpdateEffect), 1);
    }
}