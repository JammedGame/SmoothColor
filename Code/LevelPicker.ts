export { LevelPicker };

import Engineer from "./Engineer";

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
        this.LevelButton(new Engineer.Vertex(300,300,0), 5);
        this._Game.AddScene(this);
    }
    private LevelButton(Location:Engineer.Vertex, Number:number) : void
    {
        let LevelPickButton:any = new Engineer.Tile();
        LevelPickButton.Name = "Level"+Number;
        LevelPickButton.Data["Level"] = Number - 1;
        LevelPickButton.Collection = this._Numbers;
        LevelPickButton.Index = Number;
        LevelPickButton.Trans.Scale = new Engineer.Vertex(200, 300, 1);
        LevelPickButton.Trans.Translation = Location;
        LevelPickButton.Events.MouseDown.push(this.LevelPickButtonClick.bind(this));
        this.AddSceneObject(LevelPickButton);
    }
    public LevelPickButtonClick(G:any, Args:any) : void
    {
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