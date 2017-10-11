import './master'
import '../scss/index.scss'

Array.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++)
        callback.call(this[i]);
};

function getimgData(text) {
    drawText(text);
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let radius = Math.floor(canvas.width / 140) > 4 ? 4 : Math.floor(canvas.width / 140);
    let dots = [];
    for (let x = 0; x < imgData.width; x += radius * 2) {
        for (let y = 0; y < imgData.height; y += radius * 2) {
            let i = (y * imgData.width + x) * 4;
            if (imgData.data[i] >= 128) {
                let dot = new Dot(x - radius, y - radius, 0, radius);
                dots.push(dot);
            }
        }
    }
    return dots;
}

function drawText(text) {
    context.save();
    context.font = canvas.width / 6.5 +"px bold arial,sans-serif";
    context.fillStyle = "rgba(168, 168, 168, 1)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    context.restore();
}

let Dot = function (centerX, centerY, centerZ, radius) {
    this.dx = centerX;
    this.dy = centerY;
    this.dz = centerZ;
    this.tx = 0;
    this.ty = 0;
    this.tz = 0;
    this.z = centerZ;
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
};
Dot.prototype = {
    paint: function () {
        context.save();
        context.beginPath();
        let scale = focallength / (focallength + this.z);
        context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
        context.fillStyle = "#3399ff";
        context.fill();
        context.restore();
    }
};

function setData() {
    switch (content) {
        case "先锋网络中心":
            content = "NEUPioneer";
            break;
        case "NEUPioneer":
            content = "爱生活 爱先锋";
            break;
        case "爱生活 爱先锋":
            content = "先锋网络中心";
            break;
    }
    dots = getimgData(content);
}

let canvas = document.getElementById('cas');
let context = canvas.getContext('2d');
let focallength = 500;
let content = "先锋网络中心";
let dots;
let derection = true;
let pause = false;

function resize_canvas(){
    canvas.width = $("#cas-wrapper").width();
    canvas.height = canvas.width / 3;
}

window.onresize = resize_canvas;
resize_canvas();
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
setData();
initAnimate();
animate();

function initAnimate() {
    dots.forEach(function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * focallength * 2 - focallength;
        this.tx = Math.random() * canvas.width;
        this.ty = Math.random() * canvas.height;
        this.tz = Math.random() * focallength * 2 - focallength;
        this.paint();
    });
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(function () {
        let dot = this;
        if (!pause) {
            if (derection) {
                if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
                    dot.x = dot.dx;
                    dot.y = dot.dy;
                    dot.z = dot.dz;
                    pause = true;
                    setTimeout(function () {
                        pause = false;
                        derection = false;
                    }, 10000)
                } else {
                    dot.x = dot.x + (dot.dx - dot.x) * 0.05;
                    dot.y = dot.y + (dot.dy - dot.y) * 0.05;
                    dot.z = dot.z + (dot.dz - dot.z) * 0.05;
                }
            } else {
                if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
                    dot.x = dot.tx;
                    dot.y = dot.ty;
                    dot.z = dot.tz;
                    setData();
                    initAnimate();
                    derection = true;
                } else {
                    dot.x = dot.x + (dot.tx - dot.x) * 0.1;
                    dot.y = dot.y + (dot.ty - dot.y) * 0.1;
                    dot.z = dot.z + (dot.tz - dot.z) * 0.1;
                }
            }
        }
        dot.paint();
    });
    if ("requestAnimationFrame" in window) {
        requestAnimationFrame(animate);
    } else if ("webkitRequestAnimationFrame" in window) {
        webkitRequestAnimationFrame(animate);
    } else if ("msRequestAnimationFrame" in window) {
        msRequestAnimationFrame(animate);
    } else if ("mozRequestAnimationFrame" in window) {
        mozRequestAnimationFrame(animate);
    }
}
