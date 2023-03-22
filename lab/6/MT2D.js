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
        let radijani = kut * Math.PI / 180;
        let m = [
            [Math.cos(radijani),-Math.sin(radijani),0],
            [Math.sin(radijani),Math.cos(radijani),0],
            [0,0,1]
        ];
        this.mnozi(m);
    }
    smicanje(kut){
        let radijani = kut * Math.PI / 180;
        let m = [
            [1,Math.tan(radijani),0],
            [Math.tan(radijani),1,0],
            [0,0,1]
        ];
        this.mnozi(m);
    }

    zrcaliNa(k, l) {
        let alfa = Math.atan(k)*180/Math.PI;
        this.pomakni(0, l);
        this.rotiraj(alfa);
        this.zrcaliNaX();
        this.rotiraj(-alfa);
        this.pomakni(0, -l);
	}

    rotirajOkoTocke(u,v,kut)
    {
        this.pomakni(-u,-v)
        this.rotiraj(kut)
        this.pomakni(u,v)
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

    lista(){
        let lista = []
        // double for alternative
        for(let i = 0, j = 0; i < 3; j < 2 ? j++ : (i++, j = 0))
        {
            lista.push(this.matrica[j][i])
        }
        
        return lista;
    }

    projekcija2D(xMin, xMax, yMin, yMax)
    {
        let sX = 2/(xMax - xMin)
        let sY = 2/(yMax - yMin)
        let tX = (xMin+xMax)/(xMin - xMax)
        let tY = (yMin+yMax)/(yMin - yMax)
        this.pomakni(tX,tY)
        this.skaliraj(sX,sY)
    }
}