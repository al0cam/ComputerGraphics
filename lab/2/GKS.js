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

        this.w = platno.width;
        this.h = platno.height
        this.platno = platno

        if(yMin == null || yMax == null)
        {
            this.xMin = xMin
            this.xMax = xMax

            this.transformationX = this.w/(xMax - xMin)
            this.transformationY = this.transformationX       

            this.yMin = -(this.h/this.transformationY)/2
            this.yMax = (this.h/this.transformationY)/2
        }
        else if(xMin == null || xMax == null)
        {
            this.yMin = yMin
            this.yMax = yMax

            this.transformationY = this.h/(yMax - yMin)
            this.transformationX = this.transformationY       

            this.xMin = -(this.w/this.transformationX)/2
            this.xMax = (this.w/this.transformationX)/2
        }
        else{
            this.xMin = xMin
            this.xMax = xMax
            this.yMin = yMin
            this.yMax = yMax

            this.transformationX = this.w/(xMax - xMin)
            this.transformationY = this.h/(yMax - yMin)
        }



        this.originX = this.transformationX * Math.abs(this.xMin)
        this.originY = this.h - this.transformationY * Math.abs(this.yMin)
        console.log(this.originY, this.h/2);
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
        let isiFloat;
        this.g.moveTo(0, this.originY);
        for(let i = this.xMin, step = 0; i < this.xMax; ){
            
            isiFloat = Math.round(i) != i

            if(!isiFloat)
            {
                this.g.moveTo(step, this.originY - (this.h*0.01))
                this.g.lineTo(step,this.originY + (this.h*0.01))
            }
            this.g.moveTo(step,this.originY)
            this.g.lineTo(step+this.transformationX,this.originY)

            if(i != 0 && !isiFloat)
            {
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.fillText(Math.round(i),step,this.originY - (this.h*0.02))
            }
            
            if(isiFloat)
            {
                let excess = Math.abs(Math.round(i) - i)
                i += excess
                step +=this.transformationX*excess
            }
            else{
                i++
                step+=this.transformationX
            }
        }
        
        // y with numbers
        this.g.moveTo(this.originX, 0);
        for(let i = this.yMax, step = 0; i > this.yMin; ){

            isiFloat = Math.round(i) != i
            if(!isiFloat)
            {
                this.g.moveTo(this.originX  -(this.h*0.01), step)
                this.g.lineTo(this.originX + (this.h*0.01), step)
            }

            this.g.moveTo(this.originX, step)
            this.g.lineTo(this.originX, step+this.transformationY)

            if(i != 0 && !isiFloat){
                this.g.font = "1em Arial";
                this.g.fillStyle = "black"
                this.g.textAlign = 'center'
                this.g.textBaseline = 'middle'
                this.g.fillText(i,this.originX + (this.w*0.03), step)
            } 
                
            if(isiFloat)
            {
                let excess = Math.abs(Math.round(i) - i)
                i -= excess
                step +=this.transformationY*excess
            }
            else{
                i--
                step+=this.transformationY
            }
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