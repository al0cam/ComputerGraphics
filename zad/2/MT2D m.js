class MT2D {
    constructor(){
        this.matrix = null;
        this.identitet();
    }

    identitet(){
        this.matrix = [[1,0,0],[0,1,0],[0,0,1]];
    }

    pomakni(px, py){
        var m = [[1,0,px],[0,1,py],[0,0,1]];
        this.mult(m);
    }

    skaliraj(sx, sy){
        var m = [[sx,0,0],[0,sy,0],[0,0,1]];
        this.mult(m);
    }

    zrcaliNaX(){
        var m = [[1,0,0],[0,-1,0],[0,0,1]];
        this.mult(m);
    }

    zrcaliNaY(){
        var m = [[-1,0,0],[0,1,0],[0,0,1]];
        this.mult(m);
    }

    rotiraj(r){
        var d = r * Math.PI / 180;
        var m = [[Math.cos(d),-Math.sin(d),0],[Math.sin(d),Math.cos(d),0],[0,0,1]];
        this.mult(m);
    }

    smicanje(a, b){
        var ar = a * Math.PI / 180;
        var br = b * Math.PI / 180;
        var m = [[1,Math.tan(br),0],[Math.tan(ar),1,0],[0,0,1]];
        this.mult(m);
    }

    mult(m){
        var c = [[0 ,0 ,0] ,[0 ,0 ,0] ,[0 ,0 ,0]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    c[i][j] += this.matrix[i][k] * m[k][j];
                }
            }
        }
        this.matrix = c;
    }

    //zadatak 3
    rotirajOkoTocke(x, y, r){
        this.pomakni(x, y);
        this.rotiraj(r);
        this.pomakni(-x, -y);
    }

    //zadatak 3
    zrcaliNa(k, l){
        var a = Math.atan(k) * 180 / Math.PI;
        this.pomakni(0, l);
        this.rotiraj(a);
        this.zrcaliNaX();
        this.rotiraj(-a);
        this.pomakni(0, -l);
    }
}