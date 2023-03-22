class Persp {
    w;
    h;
    sX;
    sY;
    originX;
    originY;
    g;
    #matrica = null;
    d;
    #xLast;
    #yLast;
    #zLast;


    constructor(platno, xMin, xMax, yMin, yMax, d) {
        if (!platno) alert("Greška - nema platna!");

        this.w = platno.width;
        this.h = platno.height
        this.platno = platno
        this.g = this.platno.getContext("2d");

        if (yMin == null || yMax == null) {
            this.xMin = xMin
            this.xMax = xMax

            this.sX = this.w / (xMax - xMin)
            this.sY = this.sX

            this.yMin = -(this.h / this.sY) / 2
            this.yMax = (this.h / this.sY) / 2
        }
        else if (xMin == null || xMax == null) {
            this.yMin = yMin
            this.yMax = yMax

            this.sY = this.h / (yMax - yMin)
            this.sX = this.sY

            this.xMin = -(this.w / this.sX) / 2
            this.xMax = (this.w / this.sX) / 2
        }
        else {
            this.xMin = xMin
            this.xMax = xMax
            this.yMin = yMin
            this.yMax = yMax
            this.d = d

            this.sX = this.w / (xMax - xMin)
            this.sY = this.h / (yMax - yMin)
        }

        this.originX = this.sX * Math.abs(this.xMin)
        this.originY = this.h - this.sY * Math.abs(this.yMin)
        this.identitet()
        this.slikajKoordinatniSustav()

        // this.g.beginPath()
    }


    slikajKoordinatniSustav() {
        //pozadina
        this.g.fillStyle = "#FFFFE0";
        this.g.fillRect(0, 0, this.w, this.h);

        //crtanje linije
        this.g.beginPath();

        // x with numbers
        let isiFloat;
        this.g.moveTo(0, this.originY);
        for (let i = this.xMin, step = 0; i < this.xMax;) {

            isiFloat = Math.round(i) != i

            if (!isiFloat) {
                this.g.moveTo(step, this.originY - (this.h * 0.01))
                this.g.lineTo(step, this.originY + (this.h * 0.01))
            }
            this.g.moveTo(step, this.originY)
            this.g.lineTo(step + this.sX, this.originY)

            if (i != 0 && !isiFloat) {
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.fillText(Math.round(i), step, this.originY - (this.h * 0.02))
            }

            if (isiFloat) {
                let excess = Math.abs(Math.round(i) - i)
                i += excess
                step += this.sX * excess
            }
            else {
                i++
                step += this.sX
            }
        }

        // y with numbers
        this.g.moveTo(this.originX, 0);
        for (let i = this.yMax, step = 0; i > this.yMin;) {

            isiFloat = Math.round(i) != i
            if (!isiFloat) {
                this.g.moveTo(this.originX - (this.h * 0.01), step)
                this.g.lineTo(this.originX + (this.h * 0.01), step)
            }

            this.g.moveTo(this.originX, step)
            this.g.lineTo(this.originX, step + this.sY)

            if (i != 0 && !isiFloat) {
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.textBaseline = 'middle'
                this.g.fillText(i, this.originX + (this.w * 0.03), step)
            }

            if (isiFloat) {
                let excess = Math.abs(Math.round(i) - i)
                i -= excess
                step += this.sY * excess
            }
            else {
                i--
                step += this.sY
            }
        }

        this.g.strokeStyle = "black";
        this.g.stroke();
    }
    clear() {
        this.g.clearRect(0, 0, this.w, this.h);
    }
    pocniPut() {
        this.g.beginPath()
    }
    postaviNa(x, y, z) {

        let xCrta = this.#matrica[0][0] * x + this.#matrica[0][1] * y + this.#matrica[0][2] * z + this.#matrica[0][3]
        let yCrta = this.#matrica[1][0] * x + this.#matrica[1][1] * y + this.#matrica[1][2] * z + this.#matrica[1][3]
        let zCrta = this.#matrica[2][0] * x + this.#matrica[2][1] * y + this.#matrica[2][2] * z + this.#matrica[2][3]

        this.#xLast = xCrta;
        this.#yLast = yCrta;
        this.#zLast = zCrta;

        let xp = - (this.d / zCrta) * xCrta
        let yp = - (this.d / zCrta) * yCrta

        let xPix = this.originX + xp * this.sX
        let yPix = this.originY + yp * this.sY
        this.g.moveTo(xPix, yPix);
    }
    linijaDo(x, y, z) {
        let xCrta = this.#matrica[0][0] * x + this.#matrica[0][1] * y + this.#matrica[0][2] * z + this.#matrica[0][3]
        let yCrta = this.#matrica[1][0] * x + this.#matrica[1][1] * y + this.#matrica[1][2] * z + this.#matrica[1][3]
        let zCrta = this.#matrica[2][0] * x + this.#matrica[2][1] * y + this.#matrica[2][2] * z + this.#matrica[2][3]

        const granicaCrtanja = 0.00001;

        if (zCrta < granicaCrtanja && this.#zLast < granicaCrtanja) {
            this.crtaj(xCrta, yCrta, zCrta)
        }
        else if (zCrta < granicaCrtanja && this.#zLast > granicaCrtanja) {
            let t = (this.#zLast + granicaCrtanja) / (this.#zLast - zCrta)

            let x = this.#xLast + (xCrta - this.#xLast) * t
            let y = this.#yLast + (yCrta - this.#yLast) * t
            let z = - granicaCrtanja

            let xp = - (this.d / z) * x
            let yp = - (this.d / z) * y

            let xPix = this.originX + xp * this.sX
            let yPix = this.originY + yp * this.sY
            this.g.moveTo(xPix, yPix);

            this.crtaj(xCrta, yCrta, zCrta)
        }
        else if (zCrta > granicaCrtanja && this.#zLast < granicaCrtanja) {
            let t = (this.#zLast + granicaCrtanja) / (this.#zLast - zCrta)
            let x = this.#xLast + (xCrta - this.#xLast) * t
            let y = this.#yLast + (yCrta - this.#yLast) * t
            let z = - granicaCrtanja

            // let xp = - (this.d / this.#zLast) * this.#xLast
            // let yp = - (this.d / this.#zLast) * this.#yLast

            // let xPix = this.originX + xp * this.sX
            // let yPix = this.originY + yp * this.sY
            // this.g.moveTo(xPix, yPix);
            
            this.crtaj(x, y, z)

            let xp = - (this.d / this.zCrta) * this.xCrta
            let yp = - (this.d / this.zCrta) * this.yCrta
            let xPix = this.originX + xp * this.sX
            let yPix = this.originY + yp * this.sY
            this.g.moveTo(xPix, yPix);
        }

        this.#xLast = xCrta;
        this.#yLast = yCrta;
        this.#zLast = zCrta;
    }

    crtaj(x, y, z) {
        let xp = - (this.d / z) * x
        let yp = - (this.d / z) * y

        let xPix = this.originX + xp * this.sX
        let yPix = this.originY + yp * this.sY
        this.g.lineTo(xPix, yPix);
    }

    koristiBoju(boja) {
        this.g.strokeStyle = boja
    }
    povuciLiniju() {
        this.g.stroke()
    }

    identitet() {
        this.#matrica = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0]
            [0, 0, 0, 1]
        ];
    }

    // trans(mt3d){
    //     this.#matrica = mt3d.mnoziM(mt3d.kamera,mt3d.matrica)
    // }

    trans(mt3d) {
        this.#matrica = mt3d.mnoziMatrice(mt3d.kamera, mt3d.matrica)
    }

}