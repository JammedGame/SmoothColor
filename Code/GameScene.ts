export { GameScene };

import * as TBX from 'toybox-engine';

import { Monster } from "./Monster";
import { HumanGen } from "./HumanGen";
import { Score } from "./Score";
import { Levels } from "./Levels";
import { IndicatorLVL } from "./IndicatorLVL";
import { UIManager } from "./UIManager";

class GameScene extends TBX.Scene2D
{
    private _ResultsShow:boolean;
    private _LevelIndex:number;
    private _BackIndex:number;
    private _BackLastSwap:number;
    private _Back1:TBX.Tile;
    private _Back2:TBX.Tile;
    private _Pause:boolean;
    private _Monster:Monster;
    private _HumanGen:HumanGen;
    private _Score:Score;
    private _IndicatorLVL:IndicatorLVL;
    private _UIManager:UIManager;
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor(Level?:number)
    {
        super();
        this.Name = "Game";
        this.Init(Level);
        this.Events.KeyDown.push(this.KeyPress.bind(this));
        this.Events.Update.push(this.SceneUpdate.bind(this));
    }
    public Init(Level?:number): void
    {
        if(!Level) this._LevelIndex = 0;
        else this._LevelIndex = Level;
        this._Pause = false;
        this._BackIndex = 1;
        this._BackLastSwap = 0;
        this._ResultsShow = false;
        this._UIManager = new UIManager();
        this.BackColor = TBX.Color.FromRGBA(255, 255, 255, 255);
        this.GenerateBackground()
        this._Monster = new Monster(this);
        this._Score = new Score(this);
        this._HumanGen = new HumanGen(this, Levels[this._LevelIndex], this._Score);
        this._IndicatorLVL = new IndicatorLVL(this);
        this._UIManager.Hint(Levels[this._LevelIndex]);        
        this._IndicatorLVL.UpdateLvl(this._LevelIndex+1);
    }
    public SceneLoaded(DataString)
    {
        let Data = JSON.parse(DataString);
        if(Data.Type == "Scene") this.Deserialize(Data.Data);
    }
    private StartLevel() : void
    {
        this._Pause = true;
        this._BackIndex = 1;
        this._BackLastSwap = 0;
        this._ResultsShow = false;
        this._Back1.Trans.Translation = new TBX.Vertex(960, 540, 0);
        this._Back2.Trans.Translation = new TBX.Vertex(2880, 540, 0);
        this._Monster.Reset();
        this._HumanGen.Init(Levels[this._LevelIndex]);
        this._UIManager.Hide();
        this._UIManager.Hint(Levels[this._LevelIndex]);
        this._IndicatorLVL.UpdateLvl(this._LevelIndex+1);
        this.Trans.Translation = new TBX.Vertex(0,0,0);
        this._Pause = false;
    }
    private KeyPress(G: any, Args: any) : void
    {
        if(this._Pause) return;
        if(this._HumanGen.Finished && Args.KeyCode == 13 && this._ResultsShow)
        {
            if(this._Score.TotalScore >= Levels[this._LevelIndex].BronzeScore) this._LevelIndex++;
            if(this._LevelIndex > 8) this._LevelIndex = 0;
            Levels[this._LevelIndex].Unlocked = true;
            this.StartLevel();
        }
        else if(Args.KeyCode == 82)
        {
            this.StartLevel();
        }
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        if(this._HumanGen.Finished)
        {
            if(this._ResultsShow) return;
            if(Levels[this._LevelIndex].Score < this._Score.TotalScore) Levels[this._LevelIndex].Score = this._Score.TotalScore;
            if(this._LevelIndex < 8 && Levels[this._LevelIndex].BronzeScore < this._Score.TotalScore) Levels[this._LevelIndex+1].Unlocked = true;
            this.SaveData();
            this._UIManager.Show(Levels[this._LevelIndex], this._Score.TotalScore);
            this._ResultsShow = true;
            return;
        }
        this.MoveScene();
        this._Monster.Update();
    }
    private SaveData() : void
    {
        localStorage.setItem("Level_Data", JSON.stringify(Levels));
    }
    private MoveScene() : void
    {
        let Speed: number = 6;
        this.Trans.Translation = new TBX.Vertex(this.Trans.Translation.X - Speed, this.Trans.Translation.Y, 0);
        if(this._BackLastSwap + 1920 <= -this.Trans.Translation.X) this.SwapBackgrounds();
        let Eat:boolean = this._HumanGen.TryEatHumans(-this.Trans.Translation.X + 250, this._Monster.Lane, this._Monster.Color);
        if(Eat) this._Monster.Eat();
    }
    private SwapBackgrounds() : void
    {
        this._BackLastSwap = -this.Trans.Translation.X;
        if(this._BackIndex == 1)
        {
            this._Back1.Trans.Translation.X += 1920;
            this._BackIndex = 2;
        }
        if(this._BackIndex == 2)
        {
            this._Back2.Trans.Translation.X += 1920;
            this._BackIndex = 1;
        }
    }
    private GenerateBackground() : void
    {
        let Backs:TBX.ImageCollection = new TBX.ImageCollection(null, ["Resources/Textures/back.png"]);
        let Back:TBX.Tile = new TBX.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new TBX.Vertex(1920, 1085, 1);
        Back.Trans.Translation = new TBX.Vertex(960, 540, 0);
        this._Back1 = Back;
        this._Back2 = Back.Copy();
        this._Back2.Trans.Translation = new TBX.Vertex(2880, 540, 0);
        this.Attach(this._Back1);
        this.Attach(this._Back2);
    }
}