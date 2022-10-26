class GKS {
    constructor(platno, xMin, xMax, yMin, yMax){
        this.platno = platno;
        this.canvas = platno.getContext("2d");
        this.yMin = yMin;
        this.xMin = xMin;
        this.yMax = yMax;
        this.xMax = xMax;
        this.sy = platno.height/(yMin - yMax);
        this.sx = platno.width/(xMax - xMin);
        this.py = -this.sy * yMax;
        this.px = -this.sx * xMin;
    }
    static GKS(platno, xMin, xMax){
        var h = platno.height;
        var w = platno.width;
        var sx = w / (xMax - xMin);
        var sy = -sx;
        var ymax = (-h/sy) / 2;
        var gks = new GKS(platno,xMin,xMax,-ymax,ymax,10);
        gks.sy = -sx;
        gks.sx = sx;
        gks.px = -sx*xMin;
        gks.py = h/2;
        return gks;
    }
    postaviNa(x,y){
        this.canvas.beginPath();
        if(this._matrix == null){
            this.canvas.moveTo(this.#pocetniX(x), this.#pocetniY(y));
        }
        else{ 
            var xt = this.#transformiraniX(x, y);
            var yt = this.#transformiraniY(x, y);
            this.canvas.moveTo(this.#pocetniX(xt), this.#pocetniY(yt));
        }
    }
    linijaDo(x,y){
        if(this._matrix == null){
            this.canvas.lineTo(this.#pocetniX(x), this.#pocetniY(y));
        }
        else{
            var xt = this.#transformiraniX(x, y);
            var yt = this.#transformiraniY(x, y);
            this.canvas.lineTo(this.#pocetniX(xt), this.#pocetniY(yt));
        }
    }
    koristiBoju(c){
        this.canvas.strokeStyle = c;
    }
    povuciLiniju(){
        this.canvas.stroke();
    }

    postaviY(x,y){
        this.var.beginPath();
        this.var.moveTo(x, 0);
        this.var.lineTo(x, y);
        this.var.stroke();
    } 
    postaviX(x,y){
        this.var.beginPath();
        this.var.moveTo(0, y);
        this.var.lineTo(x, y);
    }
    #pocetniY(y){
        return this.sy * y + this.py;
    }
    #pocetniX(x){
        return this.sx * x + this.px
    }
    #transformiraniY(x, y){
        return this._matrix[1][0] * x + this._matrix[1][1] * y + this._matrix[1][2];
    }
    #transformiraniX(x, y){
        return this._matrix[0][0] * x + this._matrix[0][1] * y + this._matrix[0][2];
    }
    bojanjePozadine(c){
        this.canvas.fillStyle = c;
        this.canvas.fillRect(0, 0, this.platno.width, this.platno.height);
    }
    ispisBrojeva(text, x, y){
        this.canvas.fillStyle = "#000000";
        this.canvas.textAlign = "center";
        this.canvas.font = "16px Arial";
        this.canvas.fillText(text, x, y);
    }
    crticeY(x, y, xsum){
        var offsetX = xsum * 4 / this.platno.width;
        var offsetY = 0;
        this.postaviNa(x - offsetX, y + offsetY);
        this.linijaDo(x + offsetX, y + offsetY);
        this.koristiBoju("#000000");
        this.povuciLiniju();
    }
    crticeX(x, y, ysum){
        var offsetX = 0;
        var offsetY = ysum * 4 / this.platno.width;
        this.postaviNa(x + offsetX, y + offsetY);
        this.linijaDo(x + offsetX, y - offsetY);
        this.koristiBoju("#000000");
        this.povuciLiniju();
    }
    iscrtajPravacY(){
        this.postaviNa(this.xMin, 0);
        this.linijaDo(this.xMax, 0);
        this.koristiBoju("#000000");
        this.povuciLiniju();
    }
    iscrtajPravacX(){
        this.postaviNa(0, this.yMax);
        this.linijaDo(0, this.yMin);
        this.koristiBoju("#000000");
        this.povuciLiniju();
    }

    iscrtajSve(){
        this.iscrtajPravacY();
        this.iscrtajPravacX();
        var ysum = this.yMax - this.yMin;
        var xsum = this.xMax - this.xMin;
        var offsetY = -ysum * 24 / this.platno.width;
        var offsetX = xsum * 11 / this.platno.width;
        
        for (let i = Math.floor(this.xMin) + 1; i <= Math.ceil(this.xMax) - 1; i++) {
            this.ispisBrojeva(i, this.#pocetniX(i), this.#pocetniY(offsetY));
            this.crticeX(i, 0, ysum);   
        }
        offsetY = -ysum * 4 / this.platno.width;
        for (let i = Math.floor(this.yMin) + 1; i <= Math.ceil(this.yMax) - 1; i++) {
           this.ispisBrojeva(i, this.#pocetniX(offsetX), this.#pocetniY(i + offsetY));
            this.crticeY(0, i, xsum);  
        }
    }

    trans(m){
        this._matrix = m.matrix;
    }
}