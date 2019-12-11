export { LevelPicker };

import * as TBX from 'toybox-engine';

import { Levels } from "./Levels";
import { GameScene } from "./GameScene";

class LevelPicker extends TBX.Scene2D
{
    private _Game: TBX.Game;
    private _Runner: TBX.Runner;
    private _Numbers: TBX.ImageCollection;
    public constructor(Runner:any, Game:any)
    {
        super();
        this._Game = Game;
        this._Runner = Runner;
        this.Init();
    }
    public Init() : void
    {
        this.Name = "LevelPicker";
        this.GenerateBackground();
        this._Numbers = new TBX.ImageCollection(null, []);
        for(let i = 0; i < 10; i++) this._Numbers.Images.push("Resources/Textures/Human/broj"+i+".png");
        this._Numbers.Images.push("Resources/Textures/Lock.png");
        this._Numbers.Images.push("Resources/Textures/MedallionGold.png");
        this._Numbers.Images.push("Resources/Textures/MedallionSilver.png");
        this._Numbers.Images.push("Resources/Textures/MedallionBronze.png");
        this.LevelButton(new TBX.Vertex(360,180,0), 1);
        this.LevelButton(new TBX.Vertex(960,180,0), 2);
        this.LevelButton(new TBX.Vertex(1560,180,0), 3);
        this.LevelButton(new TBX.Vertex(360,500,0), 4);
        this.LevelButton(new TBX.Vertex(960,500,0), 5);
        this.LevelButton(new TBX.Vertex(1560,500,0), 6);
        this.LevelButton(new TBX.Vertex(360,820,0), 7);
        this.LevelButton(new TBX.Vertex(960,820,0), 8);
        this.LevelButton(new TBX.Vertex(1560,820,0), 9);
        this._Game.Attach(this);
    }
    private LevelButton(Location:TBX.Vertex, Number:number) : void
    {
        let LevelPickButton:any = new TBX.Tile();
        LevelPickButton.Name = "Level"+Number;
        if(Levels[Number - 1].Unlocked) LevelPickButton.Data["Level"] = Number - 1;
        else LevelPickButton.Data["Level"] = -1;
        LevelPickButton.Paint = TBX.Color.FromRGBA(100,100,100,100);
        LevelPickButton.Trans.Scale = new TBX.Vertex(300, 150, 1);
        LevelPickButton.Trans.Translation = Location;
        LevelPickButton.Events.MouseDown.push(this.LevelPickButtonClick.bind(this));
        let LevelPickNumber:any = new TBX.Tile();
        LevelPickNumber.Name = "LevelNumber"+Number;
        LevelPickNumber.Collection = this._Numbers;
        if(Levels[Number - 1].Unlocked) LevelPickNumber.Index = Number;
        else LevelPickNumber.Index = 10;
        if(Levels[Number - 1].Unlocked) LevelPickNumber.Trans.Scale = new TBX.Vertex(100, 150, 1);
        else LevelPickNumber.Trans.Scale = new TBX.Vertex(100, 100, 1);
        LevelPickNumber.Trans.Translation = Location;
        this.Attach(LevelPickButton);
        this.Attach(LevelPickNumber);
        if(Levels[Number - 1].Score > Levels[Number - 1].BronzeScore)
        {
            let Medal:any = new TBX.Tile();
            Medal.Name = "Medal"+Number;
            Medal.Collection = this._Numbers;
            Medal.Index = 13;
            if(Levels[Number - 1].Score > Levels[Number - 1].GoldScore) Medal.Index = 11;
            else if(Levels[Number - 1].Score > Levels[Number - 1].SilverScore) Medal.Index = 12;
            Medal.Trans.Scale = new TBX.Vertex(120, 120, 1);
            Medal.Trans.Translation = new TBX.Vertex(Location.X - 140, Location.Y - 65, 0);
            this.Attach(Medal);
        }
    }
    public LevelPickButtonClick(G:any, Args:any) : void
    {
        if(Args.Sender.Data["Level"] == -1) return;
        let Scene = new GameScene(Args.Sender.Data["Level"]);
        this._Game.Attach(Scene);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0), false);
        this._Runner.SwitchScene("Game");
    }
    private GenerateBackground() : void
    {
        let Backs:TBX.ImageCollection = new TBX.ImageCollection(null, ["Resources/Textures/back.png"]);
        let Back:TBX.Tile = new TBX.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new TBX.Vertex(1920, 1082, 1);
        Back.Trans.Translation = new TBX.Vertex(960, 540, 0);
        this.Attach(Back);
    }
}