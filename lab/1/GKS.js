export default class {
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
    }

    slikajKoordinatniSustav() {
        this.g = this.platno.getContext("2d");


        console.log(this.originX);
        console.log(this.transformationX);




        //pozadina
        this.g.fillStyle = "#FFFFE0";
        this.g.fillRect(0, 0, this.w, this.h);

        //crtanje linije
        this.g.beginPath();
        
        
        // x with numbers
        this.g.moveTo(0, this.originY);
        for(let i = this.xMin, step = 0; i < this.xMax; i++,step+=this.transformationX){
            this.g.font = "2vw Arial";
            this.g.fillStyle = "black"
            this.g.fillText(i,step-1 + (this.w*0.009),this.originY - (this.h*0.01))
            this.g.fillText('|',step-1,this.originY + (this.h*0.005))
            this.g.lineTo(step+this.transformationX,this.originY)
        }

        // y with numbers
        this.g.moveTo(this.originX, 0);
        for(let i = this.yMin, step = 0; i < this.yMax; i++,step+=this.transformationY){
            this.g.font = "2vw Arial";
            this.g.fillStyle = "black"
            this.g.fillText(i,this.originX+(this.w*0.01),this.h - step - (this.h*0.01))
            this.g.font = "3vw Arial";
            this.g.fillText('_',this.originX-(this.w*0.012),this.h - step - (this.h*0.009))
            this.g.lineTo(this.originX, step+this.transformationY)
        }

        this.g.strokeStyle = "black";
        this.g.stroke();
    }


    postaviNa(x,y)
    {
        this.g.moveTo(x,y);
    }
    linijaDo(x,y)
    {
        this.g.lineTo(x,y);
    }
    koristiBoju(boja)
    {
        this.g.strokeStyle = boja
    }

}