export { LevelPicker };

import Engineer from "./Engineer";

import { Levels } from "./Levels";
import { GameScene } from "./GameScene";

class LevelPicker extends Engineer.Scene2D
{
    private _Game:any;
    private _Runner:any;
    private _Numbers:Engineer.TileCollection;
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
        this._Numbers = new Engineer.TileCollection(null, []);
        for(let i = 0; i < 10; i++) this._Numbers.Images.push("/Resources/Textures/Human/broj"+i+".png");
        this._Numbers.Images.push("/Resources/Textures/Lock.png");
        this.LevelButton(new Engineer.Vertex(360,180,0), 1);
        this.LevelButton(new Engineer.Vertex(960,180,0), 2);
        this.LevelButton(new Engineer.Vertex(1560,180,0), 3);
        this.LevelButton(new Engineer.Vertex(360,500,0), 4);
        this.LevelButton(new Engineer.Vertex(960,500,0), 5);
        this.LevelButton(new Engineer.Vertex(1560,500,0), 6);
        this.LevelButton(new Engineer.Vertex(360,820,0), 7);
        this.LevelButton(new Engineer.Vertex(960,820,0), 8);
        this.LevelButton(new Engineer.Vertex(1560,820,0), 9);
        this._Game.AddScene(this);
    }
    private LevelButton(Location:Engineer.Vertex, Number:number) : void
    {
        let LevelPickButton:any = new Engineer.Tile();
        LevelPickButton.Name = "Level"+Number;
        if(Levels[Number - 1].Unlocked) LevelPickButton.Data["Level"] = Number - 1;
        else LevelPickButton.Data["Level"] = -1;
        LevelPickButton.Paint = Engineer.Color.FromRGBA(100,100,100,100);
        LevelPickButton.Trans.Scale = new Engineer.Vertex(300, 150, 1);
        LevelPickButton.Trans.Translation = Location;
        LevelPickButton.Events.MouseDown.push(this.LevelPickButtonClick.bind(this));
        let LevelPickNumber:any = new Engineer.Tile();
        LevelPickNumber.Name = "LevelNumber"+Number;
        LevelPickNumber.Collection = this._Numbers;
        if(Levels[Number - 1].Unlocked) LevelPickNumber.Index = Number;
        else LevelPickNumber.Index = 10;
        if(Levels[Number - 1].Unlocked) LevelPickNumber.Trans.Scale = new Engineer.Vertex(100, 150, 1);
        else LevelPickNumber.Trans.Scale = new Engineer.Vertex(100, 100, 1);
        LevelPickNumber.Trans.Translation = Location;
        this.AddSceneObject(LevelPickButton);
        this.AddSceneObject(LevelPickNumber);
    }
    public LevelPickButtonClick(G:any, Args:any) : void
    {
        if(Args.Sender.Data["Level"] == -1) return;
        let Scene = new GameScene(Args.Sender.Data["Level"]);
        this._Game.AddScene(Scene);
        this._Runner.SetResolution(new Engineer.Vertex(1920, 1080, 0), false);
        this._Runner.SwitchScene("Game", false);
    }
    private GenerateBackground() : void
    {
        let Backs:Engineer.TileCollection = new Engineer.TileCollection(null, ["/Resources/Textures/lvlpickback.png"]);
        let Back:Engineer.Tile = new Engineer.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new Engineer.Vertex(1920, 1080, 1);
        Back.Trans.Translation = new Engineer.Vertex(960, 540, 0);
        this.AddSceneObject(Back);
    }
}