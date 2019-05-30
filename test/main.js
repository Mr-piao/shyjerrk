window.onload=function(){
	oTab.goo('qie');
	last.allStart();
}
/*图片轮播*/
var oTab={
	goo:function(id){
		
		var oDiv=document.getElementById(id);
		var oSpan=oDiv.getElementsByTagName('span')[0];
		var oP=oDiv.getElementsByTagName('p')[0];
		var oA=oDiv.getElementsByTagName('a');
		var aImg=oDiv.getElementsByTagName('img')[0];
		
		var arrText=['第一张','第二张','第三张','第四张'];
		var oImg=['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];
		var num=0;
		function tab(){
			oSpan.innerHTML=num+1+'/'+arrText.length;
			oP.innerHTML=arrText[num];
			aImg.src=oImg[num];
		}
		oA[0].onclick=function(){
			num--;
			if(num<0){
				num=arrText.length-1;
			}
			tab();
		}
		oA[1].onclick=function(){
			num++;
			if(num==arrText.length){
				num=0;
			}
			tab();
		}
		tab();
		
	}
}
var tabSwitch={
	goo:function(id){
		var oDiv=document.getElementById('go');
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		var oLeft=document.getElementById("goLeft");
		var oRight=document.getElementById("goRight");
		var speedx=2;
		var timer1=null;
		oUl.innerHTML+=oUl.innerHTML;
		oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
		timer1=setInterval(autoPlay,30);
		function autoPlay(){
				if(oUl.offsetLeft<-oUl.offsetWidth/2){
					oUl.style.left=0
				}
				if(oUl.offsetLeft>0){
					oUl.style.left=-oUl.offsetWidth/2+'px';
				}
				oUl.style.left=oUl.offsetLeft-speedx+'px';
		}
		oLeft.onclick=function(){
			speedx=Math.abs(speedx);
		}
		
		oRight.onclick=function(){
			speedx=-Math.abs(speedx);
		}
		oDiv.onmouseover=function(){
			clearInterval(timer1)
		}
		oDiv.onmouseout=function(){
			timer1=setInterval(autoPlay,30);
		}
		
	}

}
var last={
	zhu:function(){
		var oWrap=document.getElementById("wrap");
		var iWidth=document.documentElement.clientWidth||document.body.clientWidth;
		var aDiv=oWrap.getElementsByTagName('div')
		var oBtn=oWrap.getElementsByTagName('h3')[0];
		var timer=null
		var num=0;
		var onOff=true;
		oWrap.style.left=iWidth-oWrap.offsetWidth-10+'px';
		oBtn.onclick=function(){
			if(timer){
				return ;
			}
			if(onOff){
				timer=setInterval(function(){
					aDiv[num].className='show1'
					num++;
					if(num==aDiv.length){
						clearInterval(timer);
						oBtn.innerHTML='移动端小实例收缩';
						onOff=!onOff;
						timer=null;
					}
				},100)
			}else{
				num=aDiv.length-1;
				timer=setInterval(function(){
					aDiv[num].className='hide1';
					num--;
					if(num<0){
						clearInterval(timer);
						oBtn.innerHTML='移动端小实例展开';
						onOff=!onOff;
						num=0;
						timer=null;
					}
				},100)
			}
			
		}
	},
	feng:function(){
		var oBtn=document.getElementById("feng");
		var oMen=document.getElementById("fmenu");
		var aImg=oMen.getElementsByTagName('img');
		var onOff=true;
		var r=-150;
		for(var i=0;i<aImg.length;i++){
			aImg[i].onmouseover=function(){
				this.style.transition='0.2s '
				this.style.transform='scale(1.5)';
			}
			aImg[i].onmouseout=function(){
				this.style.transform='scale(1)';
			}
		}
		oBtn.onclick=function(){
			if(onOff){
				this.style.transform='rotate(360deg)';
				for(var i=0;i<aImg.length;i++){
					var pos=getT(r,90/4*i);
					aImg[i].style.transition='.5s '+i*200+'ms'
					aImg[i].style.left=Math.abs(pos.t)+'px';
					aImg[i].style.top=pos.l+'px';
				}
			}else{
				this.style.transform='rotate(0deg)';
				for(var i=0;i<aImg.length;i++){
					aImg[i].style.left=0;
					aImg[i].style.top=0;
				}
			}
			onOff=!onOff;
		}
		function getT(r,deg){
			return {t:Math.round(r*Math.cos(deg*Math.PI/180)),l:Math.round(r*Math.sin(deg*Math.PI/180))}
		}
	},
	markNav:function(){
		var speed=0;
		var timer1=null;
		var timer2=null;
		var oBox=document.getElementById('nav1');
		var oMark=document.getElementById('nav-box')
		var oUl=document.getElementById('nav2');
		var aLi=getByclass(oBox,'navbar');
		var hT=document.getElementById("hT");
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmousemove=function(){
				clearTimeout(timer2)
				move(oMark,this.offsetLeft)
			}
			aLi[i].onmouseout=function(){
				timer2=setTimeout(function(){
					move(oMark,0)
				},80)
			}
		}
		oMark.onmouseover=function(){
			clearTimeout(timer2)
		}
		oMark.onmouseout=function(){
			timer2=setTimeout(function(){
				move(oMark,0)
			},100)
		}
		function move(obj,target){
			clearInterval(timer1);
			timer1=setInterval(function(){
				speed+=(target-obj.offsetLeft)/5;
				speed*=0.7;
				if(Math.abs(speed)<=1&&Math.abs(target-obj.offsetLeft)<=1){
					clearInterval(timer1);
					speed=0
					obj.style.left=target+'px';
					oUl.style.left=-target+'px';
				}else{
					obj.style.left=obj.offsetLeft+speed+'px';
					oUl.style.left=-obj.offsetLeft+speed+'px';
				}
			},30)
		}
		function getByclass(parent,aClass){
			var aEle=parent.getElementsByTagName('*');
			var resul=[];
			for(var i=0;i<aEle.length;i++){
				if(aEle[i].className==aClass){
					resul.push(aEle[i])
				}
			}
			return resul;
		}
		/*window.onscroll=function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollTop>40){
				oBox.style.position = 'fixed';
				oBox.style.top = 0;
				oBox.style.left=(document.documentElement.clientWidth-oBox.offsetWidth)/2+'px'
			}else if(scrollTop<30){
				oBox.style.position = 'absolute';
				oBox.style.top=10+'px';
				hT.style.marginTop=60+'px'
			}

		}*/
	},
	dragAble:function(id){
		var oDiv=document.getElementById(id);
		var oH=oDiv.getElementsByTagName('h3')[0];
		var oBtn=document.getElementById('conR_1');
		var oConten=document.getElementById('conL_1');
		var oContenP=document.getElementById('conL');
		var oBox=document.getElementById('conR');
		var oClose=document.getElementById('close');
		oClose.onclick=function(){
			oDiv.style.display='none';
		};
		var prevX = 0;
		var prevY = 0;
		var iSpeedX = 0;
		var iSpeedY = 0;
		var timer = null;

		var disy=0;
		var disx=0;
		oDiv.style.left=(document.documentElement.clientWidth-oDiv.offsetWidth)/2+'px';
		oDiv.style.top=(document.documentElement.clientHeight-oDiv.offsetHeight)/2+'px';
		oDiv.style.height=0;
		setTimeout(function(){
			move(oDiv,{opacity:100})
			setTimeout(function(){
				move(oDiv,{height:500})
			},1000)
		},1000)
		addEvent(oBtn,'DOMMouseScroll',wheel);
		addEvent(oBtn,'mousewheel',wheel);
		addEvent(oBox,'DOMMouseScroll',wheel);
		addEvent(oBox,'mousewheel',wheel);
		
		addEvent(oContenP,'DOMMouseScroll',wheel);
		addEvent(oContenP,'mousewheel',wheel);
		addEvent(oDiv,'DOMMouseScroll',wheel);
		addEvent(oDiv,'mousewheel',wheel);
		drag(oH);
		drag1(oBtn)
		function wheel(e){
			var e=e||event;
			var down=true;
			down=e.wheelDelta?e.wheelDelta<0:e.detail>0;
			if(down){
				setDrag(oBtn.offsetTop+16);
			}else{
				setDrag(oBtn.offsetTop-16);
			}
			if(e.preventDefault){
				e.preventDefault();
			}
			return false;

		}
		function drag(obj){
			obj.onmousedown=function(e){
				clearInterval(timer)
				var e=e||event;
				disx = e.clientX - obj.parentNode.offsetLeft;
				disy = e.clientY - obj.parentNode.offsetTop;
				prevX = e.clientX;
				prevY = e.clientY;

				document.onmousemove=function(e){
					var e=e||event;
					obj.parentNode.style.left = e.clientX - disx + 'px';
					obj.parentNode.style.top = e.clientY - disy + 'px';
					iSpeedX = e.clientX - prevX;
					iSpeedY = e.clientY - prevY;

					prevX = e.clientX;
					prevY = e.clientY;

					return false;
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					moveGo()
				}
				return false;
			}
		};
		function moveGo(){
			clearInterval(timer);
			timer = setInterval(function(){

				iSpeedY += 3;

				var L = oDiv.offsetLeft + iSpeedX;
				var T = oDiv.offsetTop + iSpeedY;
				var Top=document.body.scrollTop||document.documentElement.scrollTop;
				if(T>document.documentElement.clientHeight +Top- oDiv.offsetHeight){
					T = document.documentElement.clientHeight +Top- oDiv.offsetHeight;
					iSpeedY *= -1;
					iSpeedY *= 0.75;
					iSpeedX *= 0.75;
				}
				else if(T<0){
					T = 0;
					iSpeedY *= -1;
					iSpeedY *= 0.75;
				}

				if(L>document.documentElement.clientWidth - oDiv.offsetWidth){
					L = document.documentElement.clientWidth - oDiv.offsetWidth;
					iSpeedX *= -1;
					iSpeedX *= 0.75;
				}
				else if(L<0){
					L = 0;
					iSpeedX *= -1;
					iSpeedX *= 0.75;
				}

				oDiv.style.left = L + 'px';
				oDiv.style.top = T + 'px';

			},30);
		}
		oBtn.onmouseover=function(){
			this.style.background='#a8a8a8'
		}
		oBtn.onmouseout=function(){
			this.style.background='#c0c0c0'
		}
		function addEvent(obj,ev,fn){
			if(obj.attachEvent){
				return obj.attachEvent('on'+ev,fn)
			}else{
				return obj.addEventListener(ev,fn,false)
			}
		}
		function setDrag(t){
			var scale=t/(oBtn.parentNode.offsetHeight-oBtn.offsetHeight);
			if(scale>1){
				scale=1;
			}
			if(scale<0){
				scale=0;
			}
			if(t<0){
				t=0;
			}else if(t>oBtn.parentNode.offsetHeight-oBtn.offsetHeight){
				t=oBtn.parentNode.offsetHeight-oBtn.offsetHeight;
			}
			oBtn.style.top= t+'px';
			oConten.style.top=-scale*(oConten.offsetHeight-oContenP.offsetHeight)+'px';
		}
		function drag1(obj){
			obj.onmousedown=function(e){
				var e=e||event;
				var disy= e.clientY-obj.offsetTop;
				document.onmousemove=function(e){
					var e=e||event;
					var t= e.clientY-disy;

					setDrag(t);
					return false;
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
				return false;
			}
		}
	},
	menu:function(){
		 var oMenu=document.getElementById("menu");
		 var aA=oMenu.getElementsByTagName('a');
		 var oZhuti=document.getElementById("zhuti");
		 var aLi=oZhuti.getElementsByTagName('ul')[0].getElementsByTagName('li');
		 var oClose=oZhuti.getElementsByTagName('div')[0].getElementsByTagName('a')[0];
		 var oLink=document.getElementById("link1");
		document.oncontextmenu=function(e){
			var e=e||event;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(e.clientX>document.documentElement.clientWidth-oMenu.offsetWidth){
				
				oMenu.style.display='block';
				oMenu.style.left=(document.documentElement.clientWidth - oMenu.offsetWidth)+'px';
				oMenu.style.top=e.clientY+scrollTop+'px';
			}else {
				oMenu.style.display='block';
				oMenu.style.left=e.clientX+'px';
				oMenu.style.top=e.clientY+scrollTop+'px';	
			}
			return false;
		};
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick=function(){
				oLink['href'] = this.id + ".css";	
			}
		}
		document.onclick=function(){
			oMenu.style.display='none'
		}
		oClose.onclick=function(){
			oZhuti.style.display='none'
		}
		aA[0].onclick=function(){
			window.location.reload();
		}
		aA[1].onclick=function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			oZhuti.style.display=oZhuti.style.display=='block'?'none':'block';
			oZhuti.style.left=(document.documentElement.clientWidth-oZhuti.offsetWidth)/2+'px';
			oZhuti.style.top=(document.documentElement.clientHeight-oZhuti.offsetHeight)/2+scrollTop+'px';
		}
	},
	lay:function(){
		var oDiv=document.getElementById("pic");
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.getElementsByTagName('li');
		var aPos={};
		var zIndex=0;
		for(var i=0;i<aLi.length;i++){
			aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position='absolute';
			aLi[i].style.margin=0;
			aLi[i].onmouseover=function(){
				this.style.zIndex=++zIndex;
				this.style.background='pink'
				move(this,{height:150,width:150,left:aPos[this.index].left-25,top:aPos[this.index].top-25,fontSize:28})
			}
			aLi[i].onmouseout=function(){
				this.style.background='orange'
				move(this,{height:100,width:100,left:aPos[this.index].left,top:aPos[this.index].top,fontSize:16})
			}
		}
	},
	tab:function(id){
		var oDiv=document.getElementById(id);
		var	aBtn=oDiv.getElementsByTagName('input');
		var	aDiv=oDiv.getElementsByTagName('div');
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index=i;
			aBtn[i].onmouseover=function(){
				
				for(var i=0;i<aBtn.length;i++){
					aBtn[i].className='';
					aDiv[i].style.display='none';
				}
				aDiv[this.index].style.display='block';
				this.className='active';
			}
		}
	},
	aotuPlay:function(id){
		var oDiv=document.getElementById(id);
		var	aBtn=oDiv.getElementsByTagName('input');
		var	aDiv=oDiv.getElementsByTagName('div');
		var timer=null;
		var index=0;
		auto();
		function auto(){
			if(index>=aBtn.length){
				index=0;
			}
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className='';
				aDiv[i].style.display='none';
			}
			aDiv[index].style.display='block';
			aBtn[index].className='active';
			index++;
			for(var i=0;i<aDiv.length;i++){
				aDiv[i].onmouseover=function(){
					clearInterval(timer);
				}
				aDiv[i].onmouseout=function(){
					timer=setInterval(auto,1000);
				}
			}
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].index=i;
				aBtn[i].onmouseover=function(){
					clearInterval(timer);
					for(var i=0;i<aBtn.length;i++){
						aBtn[i].className='';
						aDiv[i].style.display='none';
					}
					aBtn[this.index].className='active';
					aDiv[this.index].style.display='block';
					index=this.index;
				}
				aBtn[i].onmouseout=function(){
					timer=setInterval(auto,1000);
				}
			}
		}
		
		timer=setInterval(auto,1000);
	},
	up:function(id){
		var oDiv=document.getElementById(id);
		var ooo=document.getElementById('box111');
		var oCon=oDiv.getElementsByTagName('ol')[0];
		var aLi=oCon.getElementsByTagName('li')[0];
		var speed=1;
		var timer=null;
		oCon.innerHTML+=oCon.innerHTML;
		oCon.onmouseover=function(){
			clearInterval(timer);
		}
		oCon.onmouseout=function(){
			timer=setInterval(auto,30);
		}
		function auto(){
		
			
            if(ooo.scrollTop >= ooo.scrollHeight/2){
                ooo.scrollTop = 0;
                ooo.scrollTop++
                //clearInterval(timer);
                //console.log(ooo.scrollTop)
            }else{
            	   ooo.scrollTop++;
            }
         
			// if(oCon.offsetTop>0){
			// 	oCon.style.top=-oCon.offsetHeight/2+speed+'px';
			// }else{
			// 	oCon.style.top=oCon.offsetTop+speed+'px';
			// }
			
		}
		
		timer=setInterval(auto,30);
	},
	show:function(){
		var oBtn=document.getElementById("winBtn");
		var oVerLay=document.getElementById("overlay");
		var oWin=document.getElementById("win");
		var oClose=document.getElementById("close1");
		oBtn.onclick=function(ev){
			var ev=ev||window.event;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			oVerLay.style.top=oVerLay.offsetHeight+scrollTop+'px';
			oWin.style.top=oWin.offsetHeight+scrollTop+document.documentElement.clientHeight/2+'px';
			oVerLay.style.display='block';
			oWin.style.display='block';
			oVerLay.style.zIndex=100;
			oWin.style.zIndex=100;
		};
		oClose.onclick=function(){
			oVerLay.style.display='none';
			oWin.style.display='none';	
		}
	},
	showC:function(id){
		var oDiv=document.getElementById(id);
		var oBtn=oDiv.getElementsByTagName('h2')[0];
		var oUl=oDiv.getElementsByTagName('ul')[0];
		oBtn.onclick=function(){
			oUl.style.display=oUl.style.display=='none'?'block':'none';
		/*	if(oUl.style.display=='none'){
				oUl.style.display='block';
			}else{
				oUl.style.display='none';
			}*/
		}
	},
	checkBox:function(){
		var oBox=document.getElementById("chbox");
		var oBtn1=document.getElementById("quan");
		var oBtn2=document.getElementById("bu");
		var oBtn3=document.getElementById("fan");
		var aInput=oBox.getElementsByTagName('input')
		oBtn1.onclick=function(){
			for(var i=0;i<aInput.length;i++){
				aInput[i].checked=true;
			}
		}
		oBtn2.onclick=function(){
			for(var i=0;i<aInput.length;i++){
				aInput[i].checked=false;
			}
		}
		oBtn3.onclick=function(){
			for(var i=0;i<aInput.length;i++){
				aInput[i].checked=!aInput[i].checked;
			}
		}
		
	},
	shar:function(id){
		var timer=null;
		var oDiv=document.getElementById(id);
		oDiv.onmouseover=function(){
			startMove(0,10)
		};
		oDiv.onmouseout=function(){
			startMove(-150,-10)
		};
		function startMove(iTarget,speed){
			clearInterval(timer);
			timer=setInterval(function(){
				if(oDiv.offsetLeft==iTarget){
					clearInterval(timer)
				}else{
					oDiv.style.left=oDiv.offsetLeft+speed+'px'
				}
			},30)
		}
		
/*		oDiv.onmouseout=function(){
			setInterval(function(){
				if(oDiv.offsetLeft==-150){
					oDiv.style.left=0;
				}
				oDiv.style.left=oDiv.offsetLeft-10+'px';
			},30)
		};*/
	},
	toTup:function(){
		var oBtn=document.getElementById("top");
		This=this;
		var iHeight= window.innerHeight||document.documentElement.clientHeight;//可视区
		var timer=null;
		var bStop=true;
		var oWrap=document.getElementById("wrap");
	  window.onscroll=function(){
		  var oBox=document.getElementById('nav1');
		  var oBoxNav=document.getElementById("navbom");
		  var aBtn=document.getElementById("abtn");
		  
		  var timer=null;
		  var bTrue=true;
		
		  var disx=(document.documentElement.clientWidth||document.body.clientWidth)-oBoxNav.offsetWidth;
		 var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollTop>iHeight){
				oBtn.style.display='block';
			}else{
				oBtn.style.display='none';
			}
			if(!bStop){
			 clearInterval(timer)
			}
			if(scrollTop>40){
				oBox.style.position = 'fixed';
				oBox.style.top = 0;
				oBox.style.left=(document.documentElement.clientWidth-oBox.offsetWidth)/2+'px'
			}else if(scrollTop<30){
				oBox.style.position = 'absolute';
				oBox.style.top=10+'px';
				hT.style.marginTop=60+'px'
			}
			if(scrollTop>110){
				oWrap.style.position = 'fixed';
				oWrap.style.top='110px';
			}
				bStop=false;
				
	  };
	  /*window.onscroll=function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollTop>40){
				oBox.style.position = 'fixed';
				oBox.style.top = 0;
				oBox.style.left=(document.documentElement.clientWidth-oBox.offsetWidth)/2+'px'
			}else if(scrollTop<30){
				oBox.style.position = 'absolute';
				oBox.style.top=10+'px';
				hT.style.marginTop=60+'px'
			}

		}*/
	  oBtn.onclick=function(){
			timer=setInterval(function(){
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;	
					document.documentElement.scrollTop=document.body.scrollTop=scrollTop-80;
					if(scrollTop==0){
						clearInterval(timer)
					}
					bStop=true;
			},30)
			
	  }
		
	},
	nav:function(){
		var oMark=document.getElementById("mark");
		var oNav=document.getElementById("nav");
		var aLi=oNav.getElementsByTagName('li');
		var timer=0;
		var speed=0;
		var timer2=0;
		//alert(getTop(oNav))82
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseover=function(){
				clearTimeout(timer2);
				star(parseInt(this.offsetLeft-5))
			}
			aLi[i].onmouseout=function(){
				timer2=setTimeout(function(){
					star(0)
				},100)
			}
			oMark.onmouseover=function(){
				clearTimeout(timer2);
			}
			oMark.onmouseout=function(){
				timer2=setTimeout(function(){
					star(0)
				},100)
			};
			this.oNav=oNav;
			
		};
		function star(target){
			clearInterval(timer);
			timer=setInterval(function(){
				speed+=(target-oMark.offsetLeft)/7;
				speed*=0.75;
				if(Math.abs(speed)<=1&&Math.abs(target-oMark.offsetLeft)<=1){
					clearInterval(timer)
					oMark.style.left=target+'px';
					speed=0;
				}else{
					oMark.style.left=oMark.offsetLeft+speed+'px';
				}
			},30)
		}
	},
	allStart:function(){
		tabSwitch.goo('go');
		last.tab('tab');
		last.aotuPlay('tab1');
		last.up('upScroll');
		last.show();
		last.showC('cai');
		last.checkBox();
		last.shar('shar');
		last.lay();
		last.toTup();
		//last.nav();
		last.menu();
		last.zGo();
		last.dragAble('infor');
		last.markNav();
		this.botBar();
		this.feng();
		this.zhu();
	},
	zGo:function(){
		var oDiv=document.getElementById("g2");
		var oSpan=oDiv.getElementsByTagName('span')[0];
		setInterval(function(){
			if(oDiv.offsetLeft>180){
				oDiv.style.left=0+'px';
				oSpan.style.left=0+'px';
			}
			oDiv.style.left=oDiv.offsetLeft+1+'px';
			oSpan.style.left=-oDiv.offsetLeft+1+'px';
		},30)
	},
	botBar:function(){
		var oBtn=document.getElementById("abtn");
		var oDiv=document.getElementById("navbom");
		var timer=null;
		var left=document.documentElement.clientWidth||document.body.clientWidth;
		var tar=left-oDiv.offsetWidth;
		var chu=left-100;
		var bTrue=true;
		var speed=0;
		oBtn.onclick=function(){
			if(bTrue){
				this.innerHTML='点我回去'
				move(oDiv,tar)
			}else{
				this.innerHTML='点我出来'
				move(oDiv,chu)
			}
			bTrue=!bTrue;
		}
		function move(obj,target){
			clearInterval(timer);
			timer=setInterval(function(){
				speed+=(target-obj.offsetLeft)/7;
				speed*=0.7;
				if(Math.abs(speed)<=1&&Math.abs(target-obj.offsetLeft)<=1){
					clearInterval(timer);
					speed=0;
					obj.style.left=target+'px';
				}else{
					obj.style.left=obj.offsetLeft+speed+'px'
				}
			},30)
		}
	}
}