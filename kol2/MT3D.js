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
        var vec1 = {x4: vector1[0], y4: vector1[1], z4: vector1[2]};
        var vec2 = {x4: vector2[0], y4: vector2[1], z4: vector2[2]};

        // Calculate the cross product of the two vectors
        var normal = {
            x4: (vec1.y4 * vec2.z4) - (vec1.z4 * vec2.y4),
            y4: (vec1.z4 * vec2.x4) - (vec1.x4 * vec2.z4),
            z4: (vec1.x4 * vec2.y4) - (vec1.y4 * vec2.x4)
        };

        // Normalize the normal vector
        var length = Math.sqrt((normal.x4 * normal.x4) + (normal.y4 * normal.y4) + (normal.z4 * normal.z4));

        normal.x4 /= length;
        normal.y4 /= length;
        normal.z4 /= length;

        return [normal.x4, normal.y4, normal.z4];
    }

    kugla(r, m, n, boja=[0,0,0]) {
        var vrhovi = []; 

        let thetaPrevious = 0
        let iPrevious = 0
        for(let theta = 0; theta <= Math.PI; theta+=Math.PI/m)
        {
          for(let i = 0; i <= 2*Math.PI; i+=Math.PI/n)
          {
            let x1 = r*Math.cos(iPrevious)*Math.sin(thetaPrevious),
                y1 = r*Math.sin(iPrevious)*Math.sin(thetaPrevious),
                z1 = r*Math.cos(thetaPrevious)

            let x2 = r*Math.cos(iPrevious)*Math.sin(theta),
                y2 = r*Math.sin(iPrevious)*Math.sin(theta),
                z2 = r*Math.cos(theta)

            // Current Meridian Previous Parallel
            let x3 = r*Math.cos(i)*Math.sin(thetaPrevious),
                y3 = r*Math.sin(i)*Math.sin(thetaPrevious),
                z3 = r*Math.cos(thetaPrevious)

            let x4 = r*Math.cos(i)*Math.sin(theta),
                y4 = r*Math.sin(i)*Math.sin(theta),
                z4 = r*Math.cos(theta)
            
            let c = Math.cos(theta);
            let s = Math.sin(theta);
            let w = 0;

            let vektor1 = [
              x2 - x1, 
              y2 - y1, 
              z2 - z1
            ]

            let vektor2 = [
              x2 - x4, 
              y2 - y4, 
              z2 - z4
            ]

            let vektor3 = [
              x4 - x3, 
              y4 - y3, 
              z4 - z3
            ]

            let vektor4 = [
              x1 - x3, 
              y1 - y3, 
              z1 - z3
            ]

            let normala = this.calculateNormal(vektor1,vektor2)
            let normala2 = this.calculateNormal(vektor3,vektor4)

            vrhovi.push([x1, y1, z1,  boja, normala].flat())
            vrhovi.push([x2,y2,z2,    boja, normala].flat())
            vrhovi.push([x4,y4,z4,    boja, normala].flat())

            vrhovi.push([x4,y4,z4,    boja, normala2].flat())
            vrhovi.push([x3,y3,z3,    boja, normala2].flat())
            vrhovi.push([x1, y1, z1,  boja, normala2].flat())
            iPrevious = i;
          }
          thetaPrevious = theta;
        }

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak
    
    polukugla(r, m, n, boja=[0,0,0]) {
        var vrhovi = []; 

        let thetaPrevious = 0
        let iPrevious = 0
        for(let theta = 0; theta <= Math.PI/2; theta+=Math.PI/m)
        {
          for(let i = 0; i <= 2*Math.PI; i+=Math.PI/n)
          {


            /**
             *      x2 ________ x3
             *       |          |  
             *       |          |
             *      x1 ________ x4 
             * 
             */
            let x1 = r*Math.cos(iPrevious)*Math.sin(thetaPrevious),
                y1 = r*Math.sin(iPrevious)*Math.sin(thetaPrevious),
                z1 = r*Math.cos(thetaPrevious)

            let x2 = r*Math.cos(iPrevious)*Math.sin(theta),
                y2 = r*Math.sin(iPrevious)*Math.sin(theta),
                z2 = r*Math.cos(theta)

            // Current Meridian Previous Parallel
            let x3 = r*Math.cos(i)*Math.sin(thetaPrevious),
                y3 = r*Math.sin(i)*Math.sin(thetaPrevious),
                z3 = r*Math.cos(thetaPrevious)

            let x4 = r*Math.cos(i)*Math.sin(theta),
                y4 = r*Math.sin(i)*Math.sin(theta),
                z4 = r*Math.cos(theta)

            let vektor1 = [
              x2 - x1, 
              y2 - y1, 
              z2 - z1
            ]

            let vektor2 = [
              x2 - x4, 
              y2 - y4, 
              z2 - z4
            ]

            let vektor2Invers = [
              x4 - x2, 
              y4 - y2, 
              z4 - z2
            ]

            let vektor3 = [
              x4 - x3, 
              y4 - y3, 
              z4 - z3
            ]

            let vektor4 = [
              x1 - x3, 
              y1 - y3, 
              z1 - z3
            ]

            let vektor4Invers = [
              x3 - x1, 
              y3 - y1, 
              z3 - z1
            ]

            let normala = this.calculateNormal(vektor1,vektor2)
            let normala2 = this.calculateNormal(vektor3,vektor4)

            let normalaInvers = this.calculateNormal(vektor1,vektor2Invers)
            let normala2Invers = this.calculateNormal(vektor3,vektor4Invers)

            // vanjstina
            vrhovi.push([x1, y1, z1,  boja, normala].flat())
            vrhovi.push([x2,y2,z2,    boja, normala].flat())
            vrhovi.push([x4,y4,z4,    boja, normala].flat())

            vrhovi.push([x4,y4,z4,    boja, normala2].flat())
            vrhovi.push([x3,y3,z3,    boja, normala2].flat())
            vrhovi.push([x1, y1, z1,  boja, normala2].flat())

            // unutrasnjost
            vrhovi.push([x4,y4,z4,    boja, normalaInvers].flat())
            vrhovi.push([x2, y2, z2,  boja, normalaInvers].flat())
            vrhovi.push([x1, y1, z1,  boja, normalaInvers].flat())

            vrhovi.push([x1, y1, z1,  boja, normala2Invers].flat())
            vrhovi.push([x3,y3,z3,    boja, normala2Invers].flat())
            vrhovi.push([x4,y4,z4,    boja, normala2Invers].flat())

            iPrevious = i;
          }
          thetaPrevious = theta;
        }

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    }

    stozac(r, h, n, boja=[0,0,0]) {
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

          let normala = this.calculateNormal(vektor2,vektor1)
          
          vrhovi.push([x1, y1, z1, boja,  0, 0, -1].flat());
          vrhovi.push([0, 0, -h/2, boja,  0, 0, -1].flat());
          vrhovi.push([x2, y2, z2, boja,  0, 0, -1].flat());

          vrhovi.push([0, 0, h/2,  boja, normala].flat());
          vrhovi.push([x1, y1, z1, boja, normala].flat());
          vrhovi.push([x2, y2, z2, boja, normala].flat());
        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak

    valjak(r, h, n, boja=[0,0,0]) {
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

          let vektor3 = [
              0 - x22, 
              0 - y22, 
              h/2 - z22
          ]

          let vektor4 = [
              x12 - x22, 
              y12 - y22, 
              z12 - z22
          ]

          let normala = this.calculateNormal(vektor2,vektor1)
          let normala2 = this.calculateNormal(vektor4,vektor3)
          let normala3 = [-normala2[0], -normala2[1], -normala2[2]]

          // top
          vrhovi.push([0, 0, h/2,     boja, normala2].flat());
          vrhovi.push([x12, y12, z12, boja, normala2].flat());
          vrhovi.push([x22, y22, z22, boja, normala2].flat());

          // bot
          vrhovi.push([0, 0, -h/2, boja, normala3].flat());
          vrhovi.push([x2, y2, z2, boja, normala3].flat());
          vrhovi.push([x1, y1, z1, boja, normala3].flat());

          // sides
          vrhovi.push([x12, y12, z12, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());

          vrhovi.push([x2, y2, z2,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());

        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak


    propeler(r, h, n, boja=[0,0,0]) {
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

          let vektor1Invers = [
            x1 - x12, 
            y1 - y12, 
            z1 - z12
        ]

          let normala = this.calculateNormal(vektor2,vektor1)
          let normalaInvers = this.calculateNormal(vektor2,vektor1Invers)
         

          // sides izvana
          vrhovi.push([x12, y12, z12, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());

          vrhovi.push([x2, y2, z2,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());

          // sides unutra
          vrhovi.push([x1, y1, z1,    boja, normalaInvers].flat());
          vrhovi.push([x12, y12, z12, boja, normalaInvers].flat());
          vrhovi.push([x22, y22, z22, boja, normalaInvers].flat());

          vrhovi.push([x22, y22, z22, boja, normalaInvers].flat());
          vrhovi.push([x2, y2, z2,    boja, normalaInvers].flat());
          vrhovi.push([x1, y1, z1,    boja, normalaInvers].flat());

        } // for

        for(let i = 0; i < 3; i++)
        {
            let trokut = i*2*Math.PI/3;

            let x1 = r * Math.cos(trokut),
                y1 = r * Math.sin(trokut),
                z1 = -h/2;

            let x2 = r * Math.cos(trokut+Math.PI/6),
                y2 = r * Math.sin(trokut+Math.PI/6);


            let vektor1 = [
                x2 - x1,
                y2 - y1,
                z1
            ];

            let vektor2 = [
                x1,
                y1,
                z1
            ]
            let vektor1Invers = [
                x1 - x2,
                x1 - y2,
                z1
            ];

            let normala = this.calculateNormal(vektor1,vektor2)
            let normalaInvers = this.calculateNormal(vektor1Invers,vektor2)

            vrhovi.push([0,0,0,         boja, normala].flat());
            vrhovi.push([x1, y1, z1,    boja, normala].flat());
            vrhovi.push([x2, y2, -z1,   boja, normala].flat());

            vrhovi.push([x1, y1, z1,    boja, normalaInvers].flat());
            vrhovi.push([0,0,0,         boja, normalaInvers].flat());
            vrhovi.push([x2, y2, -z1,   boja, normalaInvers].flat());
        }

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak

    elipsastiValjak(x,y, h, n, boja=[0,0,0]) {
        var vrhovi = []; 

        for(let i = - 2*Math.PI/n; i <= 2*Math.PI; i+=(2*Math.PI)/n) {

          let x1 = x*Math.cos(i),
              y1 = y*Math.sin(i),
              z1 = -h/2;

          let x12 = x*Math.cos(i),
              y12 = y*Math.sin(i),
              z12 = h/2;

          let x2 = x*Math.cos(i+2*Math.PI/n),
              y2 = y*Math.sin(i+2*Math.PI/n),
              z2 = -h/2;

          let x22 = x*Math.cos(i+2*Math.PI/n),
              y22 = y*Math.sin(i+2*Math.PI/n),
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

          let vektor3 = [
              0 - x22, 
              0 - y22, 
              h/2 - z22
          ]

          let vektor4 = [
              x12 - x22, 
              y12 - y22, 
              z12 - z22
          ]

          let normala = this.calculateNormal(vektor2,vektor1)
          let normala2 = this.calculateNormal(vektor4,vektor3)
          let normala3 = [-normala2[0], -normala2[1], -normala2[2]]

          // top
          vrhovi.push([0, 0, h/2,     boja, normala2].flat());
          vrhovi.push([x12, y12, z12, boja, normala2].flat());
          vrhovi.push([x22, y22, z22, boja, normala2].flat());

          // bot
          vrhovi.push([0, 0, -h/2, boja, normala3].flat());
          vrhovi.push([x2, y2, z2, boja, normala3].flat());
          vrhovi.push([x1, y1, z1, boja, normala3].flat());

          // sides
          vrhovi.push([x12, y12, z12, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());

          vrhovi.push([x2, y2, z2,    boja, normala].flat());
          vrhovi.push([x22, y22, z22, boja, normala].flat());
          vrhovi.push([x1, y1, z1,    boja, normala].flat());

        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak

    kocka(brid)
    {
      return [
        // front but in persp bot  
        [-brid, brid, -brid,   0, 1, 0,   0, 0, -1],
        [brid, -brid, -brid,   0, 1, 0,   0, 0, -1],
        [-brid, -brid, -brid,  0, 1, 0,   0, 0, -1],
        [brid, -brid, -brid,   0, 1, 0,   0, 0, -1],
        [-brid, brid, -brid,   0, 1, 0,   0, 0, -1],
        [brid, brid, -brid,    0, 1, 0,   0, 0, -1],
        
        // left  but in persp back
        [-brid, brid, -brid,   1, 0, 0,   -1, 0, 0],
        [-brid, -brid, brid,   1, 0, 0,   -1, 0, 0],
        [-brid, brid, brid,    1, 0, 0,   -1, 0, 0],
        [-brid, -brid, brid,   1, 0, 0,   -1, 0, 0],
        [-brid, brid, -brid,   1, 0, 0,   -1, 0, 0],
        [-brid, -brid, -brid,  1, 0, 0,   -1, 0, 0],
  
        // bot  but in persp left
        [-brid, -brid, -brid,  0, 0, 0,   0, -1, 0],
        [brid, -brid, brid,    0, 0, 0,   0, -1, 0],
        [-brid, -brid, brid,   0, 0, 0,   0, -1, 0],
        [brid, -brid, brid,    0, 0, 0,   0, -1, 0],
        [-brid, -brid, -brid,  0, 0, 0,   0, -1, 0],
        [brid, -brid, -brid,   0, 0, 0,   0, -1, 0],
  
        // right  but in persp front
        [brid, -brid, -brid,   0, 0, 1,   1, 0, 0],
        [brid, brid, brid,     0, 0, 1,   1, 0, 0],
        [brid, -brid, brid,    0, 0, 1,   1, 0, 0],
        [brid, brid, brid,     0, 0, 1,   1, 0, 0],
        [brid, -brid, -brid,   0, 0, 1,   1, 0, 0],
        [brid, brid, -brid,    0, 0, 1,   1, 0, 0],
  
        // back  but in persp top
        [brid, -brid, brid,    1, 1, 1,   0, 0, 1],
        [-brid, brid, brid,    1, 1, 1,   0, 0, 1],
        [-brid, -brid, brid,   1, 1, 1,   0, 0, 1],
        [-brid, brid, brid,    1, 1, 1,   0, 0, 1],
        [brid, -brid, brid,    1, 1, 1,   0, 0, 1],
        [brid, brid, brid,     1, 1, 1,   0, 0, 1],
  
        // top  but in persp right
        [brid, brid, brid,     1, 0, 1,   0, 1, 0],
        [-brid, brid, -brid,   1, 0, 1,   0, 1, 0],
        [-brid, brid, brid,    1, 0, 1,   0, 1, 0],
        [-brid, brid, -brid,   1, 0, 1,   0, 1, 0],
        [brid, brid, brid,     1, 0, 1,   0, 1, 0],
        [brid, brid, -brid,    1, 0, 1,   0, 1, 0],
      ];
    }

    floorY(xMin, xMax, yMin, yMax, zMin, zMax, brid)
    { 
      let floor = []
      
      if(floor.length == 0)
      {
        for(let i = yMin; i <= yMax; i++)
        {
          floor.push(
            [xMax, i, -brid, 0, 1, 0,  1, 1, 1],
            [xMin, i, -brid, 0, 1, 0,  1, 1, 1],
            [xMax, i, -brid, 0, 1, 0,  1, 1, 1],
          )
        }
        for(let i = xMin; i <= xMax; i++)
        {
          floor.push(
            [i, yMax, -brid, 0, 1, 0,  0, 0, 0],
            [i, yMin, -brid, 0, 1, 0,  0, 0, 0],
            [i, yMax, -brid, 0, 1, 0,  0, 0, 0],
          )
        }
      }
      return floor;
    }

    floor(xMin, xMax, yMin, yMax, zMin, zMax, brid)
    { 
      let floor = []
      
      if(floor.length == 0)
      {
        for(let i = zMin; i <= zMax; i++)
        {
          floor.push(
            [xMin, -brid, brid, 0, 1, 0],
            [xMax, -brid, brid, 0, 1, 0],
            [xMin, -brid, brid, 0, 1, 0],
          )
        }
        for(let i = xMin; i <= xMax; i++)
        {
          floor.push(
            [brid, -brid, zMin, 0, 1, 0],
            [brid, -brid, zMax, 0, 1, 0],
            [brid, -brid, zMin, 0, 1, 0]
          )
        }
      }
      return floor;
    }
}