class MT2D {
    constructor(){
        this.matrix = null;
        this.identitet();
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
    rotiraj(kut){
        var d = kut * Math.PI / 180;
        var m = [[Math.cos(d),-Math.sin(d),0],[Math.sin(d),Math.cos(d),0],[0,0,1]];
        this.mult(m);
    }
    identitet(){
        this.matrix = [[1,0,0],[0,1,0],[0,0,1]];
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
}