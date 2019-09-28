
class Imago extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
            .imago-wrapper{
                max-width: 800px;
                box-sizing: border-box;
                border: 1px dotted pink;
                padding: 1rem;
            }  
        </style>
        <div class="imago-wrapper">
            <div class="imago-upload">
                <input class="imago-inputfield" type="file" accept="image/png, image/jpeg" multiple files>
            </div>
            <div class="imago-output"></div>
            <div class="imago-canvas-wrapper">
                <canvas class="imago-canvas"></canvas>
            </div>
        </div>
         
        `;
        // Get data from fileList
        const inputElement = shadowRoot;
        inputElement.querySelector('.imago-inputfield').addEventListener('change', handleFiles, false);
        function handleFiles() {
        const fileList = this.files;
            console.log('filelist', fileList);
        };
        // Show image on canvas
        inputElement.querySelector('.imago-inputfield').onchange = function(e) {
            var img = new Image();
            img.onload = draw;
            img.onerror = failed;
            img.src = URL.createObjectURL(this.files[0]);
        };
        function draw() {
            var canvas = inputElement.querySelector('.imago-canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0,0);
        };
        function failed() {
            console.error("The provided file couldn't be loaded as an Image media");
        };

    }
};
customElements.define('imago-upload', Imago);

E3homas##