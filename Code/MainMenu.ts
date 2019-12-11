export { MainMenu };

import * as TBX from 'toybox-engine';

import { GameScene } from "./GameScene";

class MainMenu extends TBX.Scene2D
{
    private _Game: TBX.Game;
    private _Runner: TBX.Runner;
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
        this.BackColor = TBX.Color.White;
        this.GenerateBackground();
        let Buttons:any = new TBX.ImageCollection(null, ["Resources/Textures/Play.png", "Resources/Textures/Level.png"]);
        let Play:any = new TBX.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new TBX.Vertex(300, 200, 1);
        Play.Trans.Translation = new TBX.Vertex(300, 600, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.Attach(Play);
        let Level:any = new TBX.Tile();
        Level.Name = "Level";
        Level.Collection = Buttons;
        Level.Index = 1;
        Level.Trans.Scale = new TBX.Vertex(300, 200, 1);
        Level.Trans.Translation = new TBX.Vertex(1600, 600, 0);
        Level.Events.MouseDown.push(this.LevelClick.bind(this));
        this.Attach(Level);
        this._Game.Attach(this);
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new GameScene();
        this._Game.Attach(Scene);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0), false);
        this._Runner.SwitchScene("Game");
    }
    public LevelClick(G:any, Args:any) : void
    {
        this._Runner.SwitchScene("LevelPicker");
    }
    private GenerateBackground() : void
    {
        let Backs:TBX.ImageCollection = new TBX.ImageCollection(null, ["Resources/Textures/menu.png", "Resources/Textures/Title.png"]);
        let Back:TBX.Tile = new TBX.Tile();
        Back.Name = "Back";
        Back.Collection = Backs;
        Back.Index = 0;
        Back.Trans.Scale = new TBX.Vertex(1920, 1080, 1);
        Back.Trans.Translation = new TBX.Vertex(960, 540, 0);
        this.Attach(Back);
    }
}