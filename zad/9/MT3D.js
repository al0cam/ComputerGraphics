class MT3D {
    matrica;
    kamera;
    constructor()
    {
        this.identitet()
        this.identitetKamere()
    }

    identitet(){
        this.matrica = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }
    pomakni(px, py, pz){
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
    mnoziM(m1,m2){
        let rezultat = [
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0],
            [0 ,0 ,0, 0]
        ];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rezultat[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return rezultat;
    }

    /** 
     *  matrice mogu biti razlicitih velicina no
     *  broj stupaca prve mora biti isti kao broj redaka druge
     * 
    */
    mnoziMatrice(m1,m2){
        // referencira sve vrijednosti matrice na jedan objekt sto je smece
        // let rez = new Array(m1.length).fill(new Array(m2[0].length).fill(new Number(0)))

        let res = new Array(m1.length)
        for(let i = 0; i < m1.length;i++)
        {
            let array = new Array(m2[0].length)
            for(let j = 0; j < m2[0].length;j++)
                array[j] = 0
            res[i]= (array)
        }

        // redak
        for (let i = 0; i < m1.length; i++) {
            // stupac
            for (let j = 0; j < m2[0].length; j++) {
                // redak desne matrice
                for (let k = 0; k < m2.length; k++) {
                    res[i][j] += m1[i][k] * m2[k][j];

                }
            }
        }
        return res;
    }
    
    identitetKamere(){
        this.kamera = [
            [1,0,0,0],
            [0,1,0,0],
            [0,0,1,0],
            [0,0,0,1]
        ];
    }

    velicinaVektora(vektor)
    {
        let returnValue = 0;
        vektor.forEach(element => {
            returnValue += element**2
        });
        return Math.sqrt(returnValue)
    }

    dijeljenjeVektoraSkalarom(vektor,skalar)
    {
        return vektor.map(value => value/skalar)
    }

    mnozenjeVektoraSkalarom(vektor,skalar)
    {
        return vektor.map(value => value*skalar)
    }

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz)
    {
        let N = [x0-x1,y0-y1,z0-z1]
        let V = [Vx, Vy, Vz]
        let n = this.dijeljenjeVektoraSkalarom(N,this.velicinaVektora(N))
        let U = this.vektorskiProdukt(V,n)
        let u = this.dijeljenjeVektoraSkalarom(U,this.velicinaVektora(U))
        let v = this.vektorskiProdukt(n,u)

        this.kamera = [
            [u[0],u[1],u[2],-u[0]*x0 - u[1]*y0 - u[2]*z0],
            [v[0],v[1],v[2],-v[0]*x0 - v[1]*y0 - v[2]*z0],
            [n[0],n[1],n[2],-n[0]*x0 - n[1]*y0 - n[2]*z0],
            [0,0,0,1]
        ];
    }

    vektorskiProdukt(u,v)
    {
        return [u[1]*v[2] - u[2]*v[1], u[2]*v[0] - u[0]*v[2], u[0]*v[1] - u[1]*v[0]]
    }


    lista(){
        let lista = []
        // double for alternative
        for(let i = 0, j = 0; i < this.matrica.length; j < (this.matrica[i].length-1) ? j++ : (i++, j = 0))
        {
            lista.push(this.matrica[j][i])
        }
        return lista;
    }

    ortho(xMin, xMax, yMin, yMax, zMin, zMax)
    {
        let sX = 2/(xMax - xMin)
        let sY = 2/(yMax - yMin)
        let sZ = 2/(zMin - zMax)

        let tX = (xMin+xMax)/(xMin - xMax)
        let tY = (yMin+yMax)/(yMin - yMax)
        let tZ = (zMin+zMax)/(zMin - zMax)

        let rez = [
            [sX, 0, 0, tX],
            [0, sY, 0, tY],
            [0, 0, sZ, tZ],
            [0, 0, 0, 1]
        ]

        this.matrica = this.mnoziMatrice(this.matrica, rez)
        // this.pomakni(tX,tY,tZ)
        // this.skaliraj(sX,sY,sZ)
    }

    transKamera(){
        this.matrica = this.mnoziMatrice(this.matrica, this.kamera)
    }

    persp(xMin, xMax, yMin, yMax, zMin, zMax)
    {
        let sX = (2*zMin)/(xMax - xMin)
        let sY = (2*zMin)/(yMax - yMin)
        let sZ = (zMin+zMax)/(zMin - zMax)
        
        let tX = (xMin+xMax)/(xMax - xMin)
        let tY = (yMin+yMax)/(yMax - yMin)
        let tZ = (2*zMin*zMax)/(zMin - zMax)

        let rez = [
            [sX, 0, tX, 0],
            [0, sY, tY, 0],
            [0, 0, sZ, tZ],
            [0, 0, -1, 0]
        ]

        this.matrica = this.mnoziMatrice(this.matrica, rez)
    }

    calculateNormal(vector1, vector2) {
        // Create two vectors from the provided vectors
        var vec1 = {x: vector1[0], y: vector1[1], z: vector1[2]};
        var vec2 = {x: vector2[0], y: vector2[1], z: vector2[2]};

        // Calculate the cross product of the two vectors
        var normal = {
            x: (vec1.y * vec2.z) - (vec1.z * vec2.y),
            y: (vec1.z * vec2.x) - (vec1.x * vec2.z),
            z: (vec1.x * vec2.y) - (vec1.y * vec2.x)
        };

        // Normalize the normal vector
        var length = Math.sqrt((normal.x * normal.x) + (normal.y * normal.y) + (normal.z * normal.z));

        normal.x /= length;
        normal.y /= length;
        normal.z /= length;

        return [normal.x, normal.y, normal.z];
    }


    kugla(r, m, n) {
        var vrhovi = []; 

        let thetaPrevious = 0
        let iPrevious = 0
        for(let theta = 0; theta <= Math.PI; theta+=Math.PI/m)
        {
          for(let i = 0; i <= 2*Math.PI; i+=Math.PI/n)
          {
            let xPreviousMeridian = r*Math.cos(iPrevious)*Math.sin(thetaPrevious),
                yPreviousMeridian = r*Math.sin(iPrevious)*Math.sin(thetaPrevious),
                zPreviousMeridian = r*Math.cos(thetaPrevious)

            let xPrevious2 = r*Math.cos(iPrevious)*Math.sin(theta),
                yPrevious2 = r*Math.sin(iPrevious)*Math.sin(theta),
                zPrevious2 = r*Math.cos(theta)

            // Current Meridian Previous Parallel
            let xCurrentMeridianPreviousParallel = r*Math.cos(i)*Math.sin(thetaPrevious),
                yCurrentMeridianPreviousParallel = r*Math.sin(i)*Math.sin(thetaPrevious),
                zCurrentMeridianPreviousParallel = r*Math.cos(thetaPrevious)

            x = r*Math.cos(i)*Math.sin(theta)
            y = r*Math.sin(i)*Math.sin(theta)
            z = r*Math.cos(theta)
            
            let c = Math.cos(theta);
            let s = Math.sin(theta);
            let w = 0;

            let vektor1 = [
              xPrevious2 - xPreviousMeridian, 
              yPrevious2 - yPreviousMeridian, 
              zPrevious2 - zPreviousMeridian
            ]

            let vektor2 = [
              xPrevious2 - x, 
              yPrevious2 - y, 
              zPrevious2 - z
            ]

            let vektor3 = [
              x - xCurrentMeridianPreviousParallel, 
              y - yCurrentMeridianPreviousParallel, 
              z - zCurrentMeridianPreviousParallel
            ]

            let vektor4 = [
              xPreviousMeridian - xCurrentMeridianPreviousParallel, 
              yPreviousMeridian - yCurrentMeridianPreviousParallel, 
              zPreviousMeridian - zCurrentMeridianPreviousParallel
            ]

            let normala = calculateNormal(vektor1,vektor2)
            let normala2 = calculateNormal(vektor3,vektor4)

            vrhovi.push([xPreviousMeridian, yPreviousMeridian, zPreviousMeridian, normala].flat())
            vrhovi.push([xPrevious2,yPrevious2,zPrevious2, normala].flat())
            vrhovi.push([x,y,z, normala].flat())

            vrhovi.push([x,y,z, normala2].flat())
            vrhovi.push([xCurrentMeridianPreviousParallel,yCurrentMeridianPreviousParallel,zCurrentMeridianPreviousParallel, normala2].flat())
            vrhovi.push([xPreviousMeridian, yPreviousMeridian, zPreviousMeridian, normala2].flat())
            iPrevious = i;
          }
          thetaPrevious = theta;
        }

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak


    stozac(r, h, n) {
        var vrhovi = []; 

        for(let i = - 2*Math.PI/n; i <= 2*Math.PI; i+=(2*Math.PI)/n) {

          let xPeak = 0,
              yPeak = 0,
              zPeak = h/2;
          
          let x1 = r * Math.cos(i),
              y1 = r * Math.sin(i),
              z1 = -h/2;

          let x2 = r * Math.cos(i+2*Math.PI/n),
              y2 = r * Math.sin(i+2*Math.PI/n),
              z2 = -h/2;

          let vektor1 = [
            xPeak - x2, 
            yPeak - y2, 
            zPeak - z2
          ]

          let vektor2 = [
            x1 - x2, 
            y1 - y2, 
            z1 - z2
          ]

          let normala = calculateNormal(vektor1,vektor2)
          
          vrhovi.push([0, 0, -h / 2, 0, 0, -1]);
          vrhovi.push([x1, y1, z1, 0, 0, -1]);
          vrhovi.push([x2, y2, z2, 0, 0, -1]);

          vrhovi.push([x1, y1, z1, normala].flat());
          vrhovi.push([0, 0, h / 2, normala].flat()); // središte za TRIANGLE_FAN
          vrhovi.push([x2, y2, z2, normala].flat());
        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak

    valjak(r, h, n) {
        var vrhovi = []; 

        for(let i = - 2*Math.PI/n; i <= 2*Math.PI; i+=(2*Math.PI)/n) {

          let x1 = r * Math.cos(i),
              y1 = r * Math.sin(i),
              z1 = -h/2;

          let x12 = r * Math.cos(i),
              y12 = r * Math.sin(i),
              z12 = h/2;

          let x2 = r * Math.cos(i+2*Math.PI/n),
              y2 = r * Math.sin(i+2*Math.PI/n),
              z2 = -h/2;

          let x22 = r * Math.cos(i+2*Math.PI/n),
              y22 = r * Math.sin(i+2*Math.PI/n),
              z22 = h/2;

          let vektor1 = [
              x12 - x1, 
              y12 - y1, 
              z12 - z1
          ]

          let vektor2 = [
              x1 - x2, 
              y1 - y2, 
              z1 - z2
          ]

          let normala = vektorskiProdukt(vektor2,vektor1)

          // top but light is bot
          vrhovi.push([x12, y12, z12, 0, 0, -1]);
          vrhovi.push([0, 0, h / 2, 0, 0, -1]);
          vrhovi.push([x22, y22, z22, 0, 0, -1]);

          // bot but light is top
          vrhovi.push([x2, y2, z2, 0, 0, 1]);
          vrhovi.push([0, 0, -h / 2, 0, 0, 1]);
          vrhovi.push([x1, y1, z1, 0, 0, 1]);

          // sides
          vrhovi.push([x1, y1, z1, normala].flat());
          vrhovi.push([x12, y12, z12, normala].flat());
          vrhovi.push([x22, y22, z22, normala].flat());

          vrhovi.push([x22, y22, z22, normala].flat());
          vrhovi.push([x2, y2, z2, normala].flat());
          vrhovi.push([x1, y1, z1, normala].flat());

        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak
    


}