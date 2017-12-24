export { UIManager }

class UIManager
{
    private _LevelSuccess:HTMLElement;
    private _LevelFailed:HTMLElement;
    private _Medal:HTMLElement;
    private _ScoreSuccess:HTMLElement;
    private _ScoreFailed:HTMLElement;
    private _HintPanel:HTMLElement;
    private _HintText:HTMLElement;
    public constructor()
    {
        this._LevelSuccess = document.getElementById("level-complete");
        this._LevelFailed = document.getElementById("level-failed");
        this._ScoreSuccess = document.getElementById("success-score");
        this._ScoreFailed = document.getElementById("fail-score");
        this._Medal = document.getElementById("medal");
        this._HintPanel = document.getElementById("hint-panel");
        this._HintText = document.getElementById("hint");
    }
    public Show(Level:any, TotalScore:number) : void
    {
        if(Level.BronzeScore > TotalScore)
        {
            this._LevelFailed.style.display = "block";
            this._ScoreFailed.innerHTML = TotalScore + " / " + Level.BronzeScore;
        }
        else if(TotalScore > Level.GoldScore)
        {
            this._LevelSuccess.style.display = "block";
            this._Medal.innerHTML = "You earned GOLD medal!";
            this._ScoreSuccess.innerHTML = TotalScore + " / " + Level.GoldScore;
        }
        else if(TotalScore > Level.SilverScore)
        {
            this._LevelSuccess.style.display = "block";
            this._Medal.innerHTML = "You earned SILVER medal!";
            this._ScoreSuccess.innerHTML = TotalScore + " / " + Level.SilverScore;
        }
        else if(TotalScore > Level.BronzeScore)
        {
            this._LevelSuccess.style.display = "block";
            this._Medal.innerHTML = "You earned BRONZE medal!";
            this._ScoreSuccess.innerHTML = TotalScore + " / " + Level.BronzeScore;
        }
    }
    public Hide() : void
    {
        this._LevelSuccess.style.display = "none";
        this._LevelFailed.style.display = "none";
    }
    public Hint(Level:any) : void
    {
        console.log(Level);
        if(Level.Hint)
        {
            console.log(Level.Hint);
            this._HintPanel.style.display = "block";
            this._HintText.innerHTML = Level.Hint;
        }
        else this._HintPanel.style.display = "none";
    }
}