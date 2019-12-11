export { ColorMixer }

import * as TBX from 'toybox-engine';

class ColorMixer
{
    private _Modified: boolean;
    private _Scene: TBX.Scene;
    private _Sprite: TBX.Sprite;
    private _KeysDown: any;
    public constructor(Scene:TBX.Scene2D, Sprite:TBX.Sprite)
    {
        this._Modified = false;
        this._Scene = Scene;
        this._Sprite = Sprite;
        this.Init();
    }
    public Init() : void
    {
        this._KeysDown = {Q:false,W:false,E:false,A:false,S:false,D:false};
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
        this._Scene.Events.Update.push(this.Update.bind(this));
    }
    private KeyDown(Game:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 81)
        {
            if(!this._KeysDown.Q) this._Modified = true;
            this._KeysDown.Q = true;
        }
        else if(Args.KeyCode == 87)
        {
            if(!this._KeysDown.W) this._Modified = true;
            this._KeysDown.W = true;
        }
        else if(Args.KeyCode == 69)
        {
            if(!this._KeysDown.E) this._Modified = true;
            this._KeysDown.E = true;
        }
        else if(Args.KeyCode == 65)
        {
            if(!this._KeysDown.A) this._Modified = true;
            this._KeysDown.A = true;
        }
        else if(Args.KeyCode == 83)
        {
            if(!this._KeysDown.S) this._Modified = true;
            this._KeysDown.S = true;
        }
        else if(Args.KeyCode == 68)
        {
            if(!this._KeysDown.D) this._Modified = true;
            this._KeysDown.D = true;
        }
    }
    private KeyUp(Game:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 81)
        {
            if(this._KeysDown.Q) this._Modified = true;
            this._KeysDown.Q = false;
        }
        else if(Args.KeyCode == 87)
        {
            if(this._KeysDown.W) this._Modified = true;
            this._KeysDown.W = false;
        }
        else if(Args.KeyCode == 69)
        {
            if(this._KeysDown.E) this._Modified = true;
            this._KeysDown.E = false;
        }
        else if(Args.KeyCode == 65)
        {
            if(this._KeysDown.A) this._Modified = true;
            this._KeysDown.A = false;
        }
        else if(Args.KeyCode == 83)
        {
            if(this._KeysDown.S) this._Modified = true;
            this._KeysDown.S = false;
        }
        else if(Args.KeyCode == 68)
        {
            if(this._KeysDown.D) this._Modified = true;
            this._KeysDown.D = false;
        }
    }
    private Update() : void
    {
        if(!this._Modified) return;
        let Color = TBX.Color.Black;
        if(this._KeysDown.Q) Color.R = 255;
        else if(this._KeysDown.A) Color.R = 128;
        else Color.R = 0;
        if(this._KeysDown.W) Color.G = 255;
        else if(this._KeysDown.S) Color.G = 128;
        else Color.G = 0;
        if(this._KeysDown.E) Color.B = 255;
        else if(this._KeysDown.D) Color.B = 128;
        else Color.B = 0;
        this._Sprite.Paint = Color;
        this._Sprite.Modified = true;
        this._Modified = false;
    }
}