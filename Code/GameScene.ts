export { GameScene };

import Engineer from "./Engineer";

import { Monster } from "./Monster";
import { HumanGen } from "./HumanGen";
import { Score } from "./Score";
import { Levels } from "./Levels";
import { UIManager } from "./UIManager";

class GameScene extends Engineer.Scene2D
{
    private _ResultsShow:boolean;
    private _LevelIndex:number;
    private _BackIndex:number;
    private _BackLastSwap:number;
    private _Back1:Engineer.Tile;
    private _Back2:Engineer.Tile;
    private _Pause:boolean;
    private _Monster:Monster;
    private _HumanGen:HumanGen;
    private _Score:Score;
    private _UIManager:UIManager;
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor(Level?:number)
    {
        super();
        this.Name = "Game";
        this.Init(Level);
        this.Events.KeyDown.push(this.KeyPress.bind(this));
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    public Init(Level?:number): void
    {
        if(!Level) this._LevelIndex = 0;
        else this._LevelIndex = Level;
        this._BackIndex = 1;
        this._BackLastSwap = 0;
        this._ResultsShow = false;
        this._UIManager = new UIManager();
        this.BackColor = Engineer.Color.FromRGBA(255, 255, 255, 255);
        this.GenerateBackground()
        this._Monster = new Monster(this);
        this._Score = new Score(this);
        this._HumanGen = new HumanGen(this, Levels[this._LevelIndex], this._Score);
        this._UIManager.Hint(Levels[this._LevelIndex]);
    }
    public SceneLoaded(DataString)
    {
        let Data = JSON.parse(DataString);
        if(Data.Type == "Scene") this.Deserialize(Data.Data);
    }
    private StartLevel() : void
    {
        this._BackIndex = 1;
        this._BackLastSwap = 0;
        this._Back1.Trans.Translation = new Engineer.Vertex(960, 540, 0);
        this._Back2.Trans.Translation = new Engineer.Vertex(2880, 540, 0);
        this._Monster.Reset();
        this.Trans.Translation = new Engineer.Vertex(0,0,0);
        this._HumanGen.Init(Levels[this._LevelIndex]);
        this._UIManager.Hide();
        this._UIManager.Hint(Levels[this._LevelIndex]);
        this._ResultsShow = false;
    }
    private KeyPress(G: any, Args: any): void
    {
        if(Args.KeyCode == 32)
        {
            //this._Pause = !this._Pause;
        }
        if(this._Pause) return;
        if(this._HumanGen.Finished && Args.KeyCode == 13)
        {
            if(this._Score.TotalScore >= Levels[this._LevelIndex].BronzeScore) this._LevelIndex++;
            if(this._LevelIndex > 8) this._LevelIndex = 0;
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
            this._UIManager.Show(Levels[this._LevelIndex], this._Score.TotalScore);
            this._ResultsShow = true;
            return;
        }
        this.MoveScene();
        // Update Code here
    }
    private MoveScene():void
    {
        this.Trans.Translation = new Engineer.Vertex(this.Trans.Translation.X - 2, this.Trans.Translation.Y, 0);
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
        let Backs:Engineer.TileCollection = new Engineer.TileCollection(null, ["/Resources/Textures/back.png"]);
        let Back:Engineer.Tile = new Engineer.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new Engineer.Vertex(1920, 1085, 1);
        Back.Trans.Translation = new Engineer.Vertex(960, 540, 0);
        this._Back1 = Back;
        this._Back2 = Back.Copy();
        this._Back2.Trans.Translation = new Engineer.Vertex(2880, 540, 0);
        this.AddSceneObject(this._Back1);
        this.AddSceneObject(this._Back2);
    }
}