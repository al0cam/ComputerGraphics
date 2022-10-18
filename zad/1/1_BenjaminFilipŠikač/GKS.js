class GKS {
    w;
    h;
    transformationX;
    transformationY;
    originX;
	originY;
    g;

    constructor(platno, xMin, xMax, yMin, yMax)
    {
		if(!platno) alert("Greška - nema platna!");

        this.platno = platno
        this.xMin = xMin
        this.xMax = xMax
        this.yMin = yMin
        this.yMax = yMax

        this.w = platno.width;
        this.h = platno.height

        this.transformationX = this.w/(xMax - xMin)
        this.transformationY = this.h/(yMax - yMin)

        this.originX = this.transformationX * Math.abs(xMin)
        this.originY = this.h - this.transformationY * Math.abs(yMin)
        this.slikajKoordinatniSustav()

        this.g.beginPath()
    }

    slikajKoordinatniSustav() {
        this.g = this.platno.getContext("2d");

        //pozadina
        this.g.fillStyle = "#FFFFE0";
        this.g.fillRect(0, 0, this.w, this.h);

        //crtanje linije
        this.g.beginPath();
        
        
        // x with numbers
        this.g.moveTo(0, this.originY);
        for(let i = this.xMin, step = 0; i < this.xMax; i++,step+=this.transformationX){
            
            this.g.moveTo(step, this.originY - (this.h*0.01))
            this.g.lineTo(step,this.originY + (this.h*0.01))
            this.g.moveTo(step,this.originY)
            this.g.lineTo(step+this.transformationX,this.originY)

            if(i == 0) continue
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.fillText(i,step,this.originY - (this.h*0.02))
        }

        // y with numbers
        this.g.moveTo(this.originX, 0);
        for(let i = this.yMin, step = 0; i < this.yMax; i++,step+=this.transformationY){

            this.g.moveTo(this.originX  -(this.h*0.01), step)
            this.g.lineTo(this.originX + (this.h*0.01), step)
            this.g.moveTo(this.originX, step)
            this.g.lineTo(this.originX, step+this.transformationY)

            if(i == 0) continue
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.textBaseline = 'middle'
                this.g.fillText(i,this.originX + (this.w*0.03),this.h - step)
        }

        this.g.strokeStyle = "black";
        this.g.stroke();
    }


    postaviNa(x,y)
    {
        this.g.moveTo(this.originX + x*this.transformationX,this.originY - y*this.transformationY);
    }
    linijaDo(x,y)
    {
        this.g.lineTo(this.originX + x*this.transformationX,this.originY - y*this.transformationY);
    }
    koristiBoju(boja)
    {
        this.g.strokeStyle = boja
    }
    povuciLiniju()
    {
        this.g.stroke()
    }

}