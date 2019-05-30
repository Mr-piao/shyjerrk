function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj,false)[attr]
	}
}
function move(obj,json,fn){
	var bStop=true;
	clearInterval(obj.timer)
	obj.timer=setInterval(function(){
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr]){
				bStop=false;
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(cur+speed)+')'
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';
				}
			}
		}
		if(bStop){
			clearInterval(obj.timer)
			if(fn){
				fn();
			}
		}
	},30)
}