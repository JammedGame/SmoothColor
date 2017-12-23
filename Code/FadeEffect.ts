export { FadeEffect }

import Engineer from "./Engineer";

class FadeEffect
{
    private _Finished:boolean;
    private _Scene:Engineer.Scene2D;
    private _Asset:Engineer.Sprite;
    private _Color:Engineer.Sprite;
    public get Finished():boolean { return this._Finished; }
    public constructor(Scene:Engineer.Scene2D, Asset:Engineer.Sprite, Color:Engineer.Sprite)
    {
        this._Finished = false;
        this._Scene = Scene;
        this._Asset = Asset.Copy();
        this._Color = Color.Copy();
        let Trans:number = -this._Scene.Trans.Translation.X;
        this._Asset.Fixed = false;
        this._Color.Fixed = false;
        this._Asset.Trans.Translation.X = 200 + Trans;
        this._Color.Trans.Translation.X = 200 + Trans;
        this._Scene.AddSceneObject(this._Asset);
        this._Scene.AddSceneObject(this._Color);
        this._Scene.Events.TimeTick.push(this.UpdateEffect.bind(this));
    }
    private UpdateEffect() : void
    {
        if(this._Finished) return;
        this._Asset.Paint.A -= 2;
        this._Color.Paint.A -= 2;
        if(this._Asset.Paint.A <= 0)
        {
            this._Asset.Paint.A = 0;
            this._Color.Paint.A = 0;
            this.FinishEffect();
        }
    }
    private FinishEffect() : void
    {
        this._Scene.Events.TimeTick.splice(this._Scene.Events.TimeTick.indexOf(this.UpdateEffect), 1);
        this._Scene.RemoveSceneObject(this._Asset);
        this._Scene.RemoveSceneObject(this._Color);
        this._Asset = null;
        this._Color = null;
        this._Finished = true;
    }
}