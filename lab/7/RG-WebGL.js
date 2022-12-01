function prevediShader(gl, scriptId, tipShadera) {
  let shaderSkripta = document.getElementById(scriptId);
  if (!shaderSkripta) {
    throw "Nepoznata skripta: " + scriptId;
  }

  let izvorniKodShadera = shaderSkripta.text.trim();
  let shader = gl.createShader(tipShadera);

  gl.shaderSource(shader, izvorniKodShadera);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader nije kompajliran: " + gl.getShaderInfoLog(shader);
  }
  return shader;
}

function pripremiGPUprogram(gl, vertexShaderScriptId, fragmentShaderScriptId) {
  let vshader = prevediShader(gl, vertexShaderScriptId, gl.VERTEX_SHADER);
  let fshader = prevediShader(gl, fragmentShaderScriptId, gl.FRAGMENT_SHADER);

  let program = gl.createProgram();

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw "Program nije kreiran kako treba: " + gl.getProgramInfoLog(program);
  }
  return program;
}
