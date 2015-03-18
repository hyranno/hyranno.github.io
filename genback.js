function dot(c,r,w,h){
	var f= function(ctx,i){
		ctx.moveTo(0,i*w);
	 	ctx.arc(0,i*w, r/2, 0,2 * Math.PI, false);
		ctx.moveTo(w,i*w);
	 	ctx.arc(w,i*w, r/2, 0,2 * Math.PI, false);
		ctx.moveTo(w/2,i*w+w/2);
	 	ctx.arc(w/2,i*w+w/2, r/2, 0,2 * Math.PI, false);
	};
	return strokes(f,c,r,w,h);
}
function line(d,c,r,w,h){
	var f= function(ctx,i){
		ctx.moveTo(-w/2,i*w+d*w);
		ctx.lineTo(3*w/2,i*w-d*w);
	};
	return strokes(f,c,r,w,h);
}

function strokes(f,c,r,w,h){
	var canvas= document.createElement("canvas");
	canvas.width= canvas.height= w;
	var ctx= canvas.getContext("2d");
	if (h){
		canvas.height*=h;
		var grad= ctx.createLinearGradient(0,0,0,canvas.height);
		grad.addColorStop(0,c[1]);
		grad.addColorStop(0.5,c[0]);
		grad.addColorStop(1,c[1]);
		ctx.strokeStyle=grad;
	}else{
		h=2;
		ctx.strokeStyle = c[0];
	}
	ctx.lineWidth= r;
	ctx.beginPath();
	for (var i=0; i<=h; i++) f(ctx,i);
	ctx.stroke();
	return canvas.toDataURL();
}

function noise(c,r,w){
	var canvas= document.createElement("canvas");
	canvas.width= canvas.height= w;
	var ctx= canvas.getContext("2d");
	ctx.beginPath();
	ctx.rect(0,0,w,w);
	ctx.fillStyle = c[0];
	ctx.fill();
	var imageData = ctx.getImageData(0,0,w,w);
	for (i=0;i<w*w;i++) imageData.data[4*i+3]= 255*r/w*Math.random();
	ctx.putImageData(imageData, 0, 0);
	return canvas.toDataURL();
}

