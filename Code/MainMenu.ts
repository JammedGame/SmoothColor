export { MainMenu };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";

class MainMenu extends Engineer.Scene2D
{
    private _Game:any;
    private _Runner:any;
    public constructor(Runner:any, Game:any)
    {
        super();
        this._Game = Game;
        this._Runner = Runner;
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        this.GenerateBackground();
        let Buttons:any = new Engineer.TileCollection(null, ["/Resources/Textures/Play.png"]);
        let Play:any = new Engineer.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new Engineer.Vertex(300, 200, 1);
        Play.Trans.Translation = new Engineer.Vertex(200, 200, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
        this._Game.AddScene(this);
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new GameScene();
        this._Game.AddScene(Scene);
        this._Runner.SetResolution(new Engineer.Vertex(1920, 1080, 0), false);
        this._Runner.SwitchScene("Game", false);
    }
    private GenerateBackground() : void
    {
        let Backs:Engineer.TileCollection = new Engineer.TileCollection(null, ["/Resources/Textures/cover.png"]);
        let Back:Engineer.Tile = new Engineer.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new Engineer.Vertex(1920, 1080, 1);
        Back.Trans.Translation = new Engineer.Vertex(960, 540, 0);
        this.AddSceneObject(Back);
    }
}