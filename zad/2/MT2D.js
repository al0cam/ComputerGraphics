class MT2D {
    matrica;
    constructor()
    {
        this.identitet()
    }

    identitet(){
        this.matrica = [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ];
    }
    pomakni(px, py){
        let m = [
            [1,0,px],
            [0,1,py],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    skaliraj(sx, sy){
        let m = [
            [sx,0,0],
            [0,sy,0],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaX(){
        let m = [
            [1,0,0],
            [0,-1,0],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaY(){
        let m = [
            [-1,0,0],
            [0,1,0],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    rotiraj(kut){
        let kutURadijanima = kut * Math.PI / 180;
        let m = [
            [Math.cos(kutURadijanima),-Math.sin(kutURadijanima),0],
            [Math.sin(kutURadijanima),Math.cos(kutURadijanima),0],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    smicanje(kut){
        let kutURadijanima = kut * Math.PI / 180;
        let m = [
            [1,Math.tan(kutURadijanima),0],
            [Math.tan(kutURadijanima),1,0],
            [0,0,1]
        ];
        this.mnozi(m);
    }

    mnozi(m){
        let rezultat = [
            [0 ,0 ,0],
            [0 ,0 ,0],
            [0 ,0 ,0]
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    rezultat[i][j] += this.matrica[i][k] * m[k][j];
                }
            }
        }
        this.matrica = rezultat;
    }

}