var vozilo = function(){
    var can = document.getElementById("canvas");
    var gks = new GKS(can, 10, -9, 10, -1);
    var sirina = can.width; 
    var visina = can.height;
    var startY = sirina / 2;
    function crtanjeGrafa(){
        gks.postaviY(startY - 100, visina);
        gks.stroke();
        gks.postaviX(sirina, visina - 100);
        gks.stroke();
        gks.drawGraphX();
        gks.drawGraphNumberX();
        gks.drawGraphY();
    };
    function init(){
        crtanjeGrafa();
    };
    return init();
} 

window.onload = vozilo;

window.onload = function(){
    var can = document.getElementById("canvas");
    var gks = new GKS(can, -9, 11, -3, 12);
    var mat = new MT2D();
    gks.bojanjePozadine("#FFFFE0");
    gks.iscrtajSve();
    kamion(gks, mat, "#000000");
    pravac(gks, mat);
    kamion(gks, mat,"#0000ff", 3, 6);
}

function kamion(gks, mat, color, zx, zy){
    mat.identitet();
    gks.koristiBoju(color);
    if (zx && zy){
        this.z = Math.atan(zx) * 180 / Math.PI;
        mat.pomakni(0, zy);
        mat.rotiraj(this.z);
        mat.zrcaliNaX();
        mat.rotiraj(-this.z);
        mat.pomakni(0, -zy);
        gks.trans(mat);
    }
    //crtanje kabine
    gks.postaviNa(5, 2);
    gks.linijaDo(7, 2);
    gks.linijaDo(7, 5);
    gks.linijaDo(5, 5.5);
    gks.linijaDo(5, 2);
    gks.povuciLiniju();

    //crtanje prikolice
    gks.postaviNa(1, 2);
    gks.linijaDo(1, 5);
    gks.linijaDo(5, 5);
    gks.linijaDo(5, 2);
    gks.linijaDo(1, 2);
    gks.povuciLiniju();
   
    //crtanje šoferšajbe
    gks.postaviNa(5.3, 3.5);
    gks.linijaDo(5.3, 5);
    gks.linijaDo(6.8, 4.7);
    gks.linijaDo(6.8, 3.5);
    gks.linijaDo(5.3, 3.5);
    gks.povuciLiniju();

    //crtanje prednjeg kotaca
    mat.pomakni(6, 2);
    gks.trans(mat);
    gks.postaviNa(1, 0);
    for (let i = 0; i <= 360; i++) {
        var y = 0.5 * Math.sin(i * Math.PI / 180);
        var x = 0.5 * Math.cos(i * Math.PI / 180);
        gks.linijaDo(x, y);
    }     
    gks.povuciLiniju();
    
    //crtanje zadnjeg kotaca
    mat.identitet();
    if (zx && zy){
        this.z = Math.atan(zx) * 180 / Math.PI;
        mat.pomakni(0, zy);
        mat.rotiraj(this.z);
        mat.zrcaliNaX();
        mat.rotiraj(-this.z);
        mat.pomakni(0, -zy);
        gks.trans(mat);
    }
    mat.pomakni(2, 2);
    gks.trans(mat);
    gks.postaviNa(1, 0);
    for (let i = 0; i <= 360; i++) {
        var y = 0.5 * Math.sin(i * Math.PI / 180); 
        var x = 0.5 * Math.cos(i * Math.PI / 180);
        gks.linijaDo(x, y);
    }     
   
    gks.povuciLiniju();             
}

function pravac(gks, mat){
    mat.identitet();
    gks.trans(mat);
    gks.postaviNa(-2.5, -1.5);
    for (let x = -2.5; x <= 1; x+= 0.1) {
        var y = 3 * x + 6; 
        gks.linijaDo(x, y);
    }     
    gks.koristiBoju("#ff0000");
    gks.povuciLiniju();
}