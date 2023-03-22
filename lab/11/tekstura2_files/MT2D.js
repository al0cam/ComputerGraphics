class MT2D {
	constructor() {
		this._matrica = [[1,0,0],[0,1,0],[0,0,1]];
		this._transformacije = [];
	}

	//spremi trenutnu transformaciju na stog
	spremiMatricu() {
		if (this._transformacije.length > 32) {
			console.log("Error: stack is full.");
		} else {
			this._transformacije.push(this._matrica);
		}
	}

	//vrati zadnje spremljenu transformaciju sa stoga
	vratiMatricu() {
		if (this._transformacije.length == 0) {
			console.log("Error: stack is empty.");
		} else {
			this._matrica = this._transformacije.pop();
		}
	}

	//pretvori matricu u polje (za webgl)
	poljeMatrica() {
		let v = [];
		for(let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				v.push(this._matrica[j][i]);
			}
		}
		return v;
	}

	//kompozicija transformacija
	mult(m) {
		let m1 = [[0,0,0],[0,0,0],[0,0,0]];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				for (let k = 0; k < 3; k++) {
					m1[i][j] += this._matrica[i][k] * m[k][j];
				}
			}
		}
    this._matrica = m1;
	}

	//slika tocke
	slika_tocke(tocka) {
		let ImTocka = [0,0,0];
		for (let i = 0; i < 3; i++) {
			for (let k = 0; k < 3; k++) {
				ImTocka[i] += this._matrica[i][k] * tocka[k];
			}
		}
		return ImTocka;
	}

	//translacija
	pomakni(px, py) {
		let m = [[1,0,px],[0,1,py],[0,0,1]];
		this.mult(m);
	}

	//skaliranje
	skaliraj(sx, sy) {
		let m = [[sx,0,0],[0,sy,0],[0,0,1]];
		this.mult(m);
	}

	//zrcaljenje na x-osi
	zrcaliNaX () {
		let m = [[1,0,0],[0,-1,0],[0,0,1]];
		this.mult(m);
	}

	//zrcaljenje na y-osi
	zrcaliNaY() {
		let m = [[-1,0,0],[0,1,0],[0,0,1]];
		this.mult(m);
	}

	//rotacija oko ishodista za kut u stupnjevima
	rotiraj(kut) {
		let fi = kut * Math.PI / 180;
        let cosfi = Math.cos(fi);
        let sinfi = Math.sin(fi);
        let m = [[cosfi,-sinfi,0],[sinfi,cosfi,0],[0,0,1]];
        this.mult(m);
    }

    //identiteta
    identitet() {
    	this._matrica = [[1,0,0],[0,1,0],[0,0,1]];
    }

    //rotacija oko proizvoljne tocke za kut u stupnjevima
    rotacija_oko_tocke(x0, y0, kut) {
    	this.pomakni(x0, y0);
    	this.rotiraj(kut);
    	this.pomakni(-x0, -y0);
    }

    //zrcaljenje na pravcu y = k*x + l
    zrcaliNa(k, l) {
    	let alpha = Math.atan(k) * 180 / Math.PI;
        this.pomakni(0, l);
        this.rotiraj(alpha);
        this.zrcaliNaX();
        this.rotiraj(-alpha);
        this.pomakni(0,-l);
    }

    //smicanje
    smicanje(alpha, beta) {
    	let tanA = Math.tan(alpha * Math.PI / 180);
        let tanB = Math.tan(beta * Math.PI / 180);
        let m = [[1,tanB,0],[tanA,1,0],[0,0,1]];
        this.mult(m);
    }

    //preslikava [xmin,xmax] x [ymin,ymax] u [-1,1] x [-1,1] i pritom se ne cuvaju proporcije
    projekcija2D(xmin, xmax, ymin, ymax) {
    	let sx = 2 / (xmax - xmin);
        let sy = 2 / (ymax - ymin);
        let tx = -1 - xmin * sx;
        let ty = -1 - ymin * sy;
        let m = [[sx,0,tx],[0,sy,ty],[0,0,1]];
        this.mult(m);
    }

    //preslikava [xmin,xmax] x [ymin,ymax] u [-1,1] x [-1,1] i pritom se cuvaju proporcije
    //tako da se po potrebi prilagodi [ymin, ymax] interval
    projekcija2Dx(xmin, xmax, ymin, ymax, w, h) {
    	let k = (h / w * (xmax - xmin) - (ymax - ymin)) / 2;
    	let y1 = ymin - k;
    	let y2 = ymax + k;
    	this.projekcija2D(xmin, xmax, y1, y2);
    }

    //preslikava [xmin,xmax] x [ymin,ymax] u [-1,1] x [-1,1] i pritom se cuvaju proporcije
    //tako da se po potrebi prilagodi [xmin, xmax] interval
    projekcija2Dy(xmin, xmax, ymin, ymax, w, h) {
    	let k = (w / h * (ymax - ymin) - (xmax - xmin)) / 2;
        let x1 = xmin - k;
        let x2 = xmax + k;
        this.projekcija2D(x1, x2, ymin, ymax);
    }

}
