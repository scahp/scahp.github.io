var jWebGL;
var Clicks = [];
var StaticObjectArray = [];
var TransparentStaticObjectArray = [];
var UIStaticObjectArray = [];
var LightArray = []
var PipeLines = [];
var ShowSilhouetteDirectionalLight = false;
var ShowSilhouettePointLight = false;
var ShowSilhouetteSpotLight = false;
var ShowDebugInfoOfDirectionalLight = false;
var ShowDebugInfoOfSphereLight = false;
var ShowDebugInfoOfSpotLight = false;

var mainCamera = null;

const shadow_width = 1024.0;
const shadow_height = 1024.0;

var SwitchShadowMode = function(mode)
{
    if (mode == 'ShadowVolume')
    {
        SetShadowVolumeRenderer(jWebGL.renderer);
        var div_segmentAgainstPlane = document.getElementById('div-ShadowVolume');
        div_segmentAgainstPlane.style.display = 'block';
    }
    else if (mode == 'ShadowMap')
    {
        SetShadowMapRenderer(jWebGL.renderer);
        var div_segmentAgainstPlane = document.getElementById('div-ShadowVolume');
        div_segmentAgainstPlane.style.display = 'none';
    }
}

var Init = function()
{
    console.log('init function start');

    var canvas = document.getElementById('webgl-surface');
    var gl = canvas.getContext('webgl2', {stencil:true});
    if (!gl)
    {
        console.log('webgl2 not supported');
        //gl = canvas.getContext('experimental-webgl');
    }

    if (!gl)
        alert('Your browser does not support webgl');

    var loadExtension = function(extName)
    {
        var ext = gl.getExtension(extName);
        if (!ext) { console.log(extName); }
    }

    loadExtension('OES_element_index_uint');        // To use gl.UNSIGNED_INT
    loadExtension('OES_texture_float');             // To use gl.FLOAT
    loadExtension('EXT_color_buffer_float');        // To use gl.FLOAT
    loadExtension("OES_texture_float_linear");      // To use gl.FLOAT

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    var FPSElement = document.getElementById("FPS");
    this.fpsNode = document.createTextNode("");
    FPSElement.appendChild(this.fpsNode);

    jWebGL = new jWebGL(gl);
    jWebGL.Init();
}

var jWebGL = function(gl)
{
    this.gl = gl;
}

jWebGL.prototype.Init = function()
{
    var gl = this.gl;
    this.game = new jGame(gl);
    this.renderer = new jRenderer(gl);
    window.addEventListener('resize', this.OnResizeWindow.bind(this));

    this.OnResizeWindow();

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);

    var game = this.game;
    var renderer = this.renderer;
    renderer.Setup();
    game.Setup();
    SetShadowVolumeRenderer(renderer);

    var lastTime = performance.now();
    var loopCount = 0;
    var loop = function()
    {
        // Update time
        var currentTime = performance.now();
        var deltaTime = currentTime - lastTime;
        ++loopCount;
        if (currentTime - lastTime > 1000)
        {
            this.fpsNode.nodeValue = loopCount.toFixed(0);
            loopCount = 0;
            lastTime = currentTime;
        }

        game.processKeyEvents();
        game.Update(deltaTime);
        renderer.Render(mainCamera);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    var TearDown = function()
    {
        game.Teardown();
        renderer.Teardown();
    };
    //TearDown();
}

jWebGL.prototype.OnResizeWindow = function()
{
    var gl = this.gl;

    if (window.innerWidth > window.innerHeight)
    {
        gl.canvas.height = window.innerHeight;
        gl.canvas.width = window.innerHeight;

        gl.canvas.style.left = (window.innerWidth - window.innerHeight) / 2;
    }
    else
    {
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerWidth;
        
        gl.canvas.style.top = (window.innerHeight - window.innerWidth) / 2;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
