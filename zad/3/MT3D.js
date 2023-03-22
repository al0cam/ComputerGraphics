class MT3D {
    matrica;
    constructor()
    {
        this.identitet()
    }

    identitet(){
        this.matrica = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }
    pomakni(px, py,pz){
        let m = [
            [1,0,0,px],
            [0,1,0,py],
            [0,0,1,pz],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    skaliraj(sx, sy,sz){
        let m = [
            [sx,0,0,0],
            [0,sy,0,0],
            [0,0,sz,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaX(){
        let m = [
            [1,0,0,0],
            [0,-1,0,0],
            [0,0,-1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaY(){
        let m = [
            [-1,0,0,0],
            [0,1,0,0],
            [0,0,-1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaZ(){
        let m = [
            [-1,0,0,0],
            [0,-1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    zrcaliNaXY(){
        let m = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,-1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }

    zrcaliNaXZ(){
        let m = [
            [1,0,0,0],
            [0,-1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }

    zrcaliNaYZ(){
        let m = [
            [-1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }
    rotirajX(kut){
        let radijani = kut * Math.PI / 180;
        let m = [
            [1,0,0,0],
            [0,Math.cos(radijani),-Math.sin(radijani),0],
            [0,Math.sin(radijani),Math.cos(radijani),0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }

    rotirajY(kut){
        let radijani = kut * Math.PI / 180;
        let m = [
            [Math.cos(radijani),0,Math.sin(radijani),0],
            [0,1,0,0],
            [-Math.sin(radijani),0,Math.cos(radijani),0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }


    rotirajZ(kut){
        let radijani = kut * Math.PI / 180;
        let m = [
            [Math.cos(radijani),-Math.sin(radijani),0,0],
            [Math.sin(radijani),Math.cos(radijani),0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
        this.mnozi(m);
    }

    // smicanje(kut){
    //     let radijani = kut * Math.PI / 180;
    //     let m = [
    //         [1,Math.tan(radijani),0],
    //         [Math.tan(radijani),1,0],
    //         [0,0,1]
    //     ];
    //     this.mnozi(m);
    // }

    // zrcaliNa(k, l) {
    //     let alfa = Math.atan(k)*180/Math.PI;
    //     this.pomakni(0, l);
    //     this.rotiraj(alfa);
    //     this.zrcaliNaX();
    //     this.rotiraj(-alfa);
    //     this.pomakni(0, -l);
	// }

    // rotirajOkoTocke(u,v,kut)
    // {
    //     this.pomakni(-u,-v)
    //     this.rotiraj(kut)
    //     this.pomakni(u,v)
    // }

    mnozi(m){
        let rezultat = [
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0]
        ];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rezultat[i][j] += this.matrica[i][k] * m[k][j];
                }
            }
        }
        this.matrica = rezultat;
    }
}