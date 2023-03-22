var load=function(){
        var canvas = document.getElementById("canvas");
        gl = canvas.getContext("webgl2");
        if (!gl) alert("WebGL2 nije dostupan!");
        var mtd = new MT3D();
        var ver=[], verK=[], a = 0.1,m = 0,x = 0,y = 0,visina = 0,korak = 0;
        prog = pripremiGPUprogram(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(prog); 
        gl.enable(gl.DEPTH_TEST);
        bufferi();

        function cjelokupnaSlika() {
            korak = (korak + 0.01)%(2*Math.PI)
            y = 3 * Math.sin(korak)
            x = 3 * Math.cos(korak),
            visina = Math.cos(korak)            
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0, 0, canvas.width, canvas.height);

            mtd.identitet();
            mtd.persp(1, -1, 1, -1, 2, 20);
            mtd.postaviKameru(x, y, visina, 0, 0, 0, 0, 0, 1);
            mtd.transKamera()
            
            napraviGrid();

            mtd.pomakni(0,0,-a)
            napraviKocku(0, 0, 0.4, 0, 0, 0);
            requestAnimationFrame(cjelokupnaSlika);
        }

        function crteGrid() {
            for (var i = 0; i <= 20; i++) {
                ver.push([-1 + i * 0.1, -1, 0, 1, 1, 1]);
                ver.push([-1 + i * 0.1, 1, 0, 1, 1, 1]);
                ver.push([-1, i * 0.1, 0, 1, 1, 1]);
                ver.push([-1, i * 0.1, 0, 1, 1, 1]);
            }
            for (var i = 0; i <= 20; i++) {
                ver.push([i * 0.1, -1, 0, 1, 1, 1]);
                ver.push([i * 0.1, -1, 0, 1, 1, 1]);
                ver.push([-1, -1 + i * 0.1, 0, 1, 1, 1]);
                ver.push([1, -1 + i * 0.1, 0, 1, 1, 1]);
            }
            return ver;
        }

        function napraviGrid(){
            gl.uniformMatrix4fv(prog.u_matTrans, false, mtd.lista());
            gl.bindVertexArray(VAO_grid);
            gl.drawArrays(gl.LINES, 0, crteGrid().length);
        }
        function napraviKocku() {
            gl.uniformMatrix4fv(prog.u_matTrans, false, mtd.lista());
            gl.bindVertexArray(VAO_kocka);
            gl.drawArrays(gl.TRIANGLES, 0, bridoviKocka().length);
        }
        function bridoviKocka() {
            return [
                // front
                [-a, a, -a,  0, 1, 0],
                [a, -a, -a,  0, 1, 0],
                [-a, -a, -a,  0, 1, 0],
                
                [a, -a, -a,  0, 1, 0],
                [-a, a, -a,  0, 1, 0],
                [a, a, -a,  0, 1, 0],
              
                // left
                [-a, a, -a,  1, 0, 0],
                [-a, -a, a,  1, 0, 0],
                [-a, a, a,  1, 0, 0],
        
                [-a, -a, a,  1, 0, 0],
                [-a, a, -a,  1, 0, 0],
                [-a, -a, -a,  1, 0, 0],
        
                // bot
                [-a, -a, -a,  0, 0, 0],
                [a, -a, a,  0, 0, 0],
                [-a, -a, a,  0, 0, 0],
                
                [a, -a, a,  0, 0, 0],
                [-a, -a, -a,  0, 0, 0],
                [a, -a, -a,  0, 0, 0],
        
                // right
                [a, -a, -a,  0, 0, 1],
                [a, a, a,  0, 0, 1],
                [a, -a, a,  0, 0, 1],
        
                [a, a, a,  0, 0, 1],
                [a, -a, -a,  0, 0, 1],
                [a, a, -a,  0, 0, 1],
        
                // back
                [a, -a, a,  1, 1, 1],
                [-a, a, a,  1, 1, 1],
                [-a, -a, a,  1, 1, 1],
                
                [-a, a, a,  1, 1, 1],
                [a, -a, a,  1, 1, 1],
                [a, a, a,  1, 1, 1],
        
                // top
                [a, a, a,  1, 0, 1],
                [-a, a, a,  1, 0, 1],
                [-a, a, -a,  1, 0, 1],
        
                [-a, a, -a,  1, 0, 1],
                [a, a, a,  1, 0, 1],
                [a, a, -a,  1, 0, 1],
              ];
        }

      

        function bufferi() {
            VAO_kocka = gl.createVertexArray();
            VAO_grid = gl.createVertexArray();
            prog.u_matTrans = gl.getUniformLocation(prog, "u_matTrans");
            prog.a_pozicija = gl.getAttribLocation(prog, "a_pozicija");
            prog.a_ispunjenje = gl.getAttribLocation(prog, "a_ispunjenje");
            ///kockice
            gl.bindVertexArray(VAO_kocka);
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.enableVertexAttribArray(prog.a_pozicija);
            gl.enableVertexAttribArray(prog.a_ispunjenje);
            gl.vertexAttribPointer(prog.a_pozicija, 3, gl.FLOAT, false, 24, 0);
            gl.vertexAttribPointer(prog.a_ispunjenje, 3, gl.FLOAT, false, 24, 12);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bridoviKocka().flat()), gl.STATIC_DRAW);
            //grid
            gl.bindVertexArray(VAO_grid);
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.enableVertexAttribArray(prog.a_pozicija);
            gl.vertexAttribPointer(prog.a_pozicija, 3, gl.FLOAT, false, 24, 0);
            gl.vertexAttribPointer(prog.a_ispunjenje, 3, gl.FLOAT, false, 24, 12);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(crteGrid().flat()), gl.STATIC_DRAW);
            gl.vertexAttrib3f(prog.a_ispunjenje, 1, 1, 1);
        }
        cjelokupnaSlika();
     
    }
window.onload=load;