!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory():"function"==typeof define&&define.amd?define(factory):global.vcloading=factory()}(this,function(){"use strict";var vcData={intval:0,count:0,animation:0,opacity:0},setStyle=function(el,styleObj){for(var key in styleObj)el.style[key]=styleObj[key]},prefixes=["-moz-","-ms-","-webkit-",""],prefixStyle=function(key,value){for(var len=prefixes.length,result={},i=0;i<len;i++)result[prefixes[i]+key]=value;return result},wrapper=document.createElement("div"),container=document.createElement("div");setStyle(container,{position:"fixed",top:0,right:0,zIndex:10,left:0});var bar=document.createElement("div");setStyle(bar,{height:"3px","background-color":"#c00",width:"0%"}),setStyle(bar,prefixStyle("box-shadow","0 0 20px 0 #c00")),container.appendChild(bar);var animate=function(fn,time){void 0!==vcData.animation&&clearTimeout(vcData.animation),vcData.animation=setTimeout(fn,time)},syncStyle=function(){bar.style.width=vcData.count+"%",bar.style.opacity=vcData.opacity},setCount=function(count){vcData.count=count,syncStyle()},setOpacity=function(opacity){vcData.opacity=opacity,syncStyle()},show=function(){animate(function(){setOpacity(1)},100)},hide=function(){setOpacity(0),animate(function(){setCount(0),animate(function(){show()},500)},500)},inserted=!1;return{start:function(options){options=options||{},inserted||("complete"===document.readyState?document.body.appendChild(container):(container.id="vcloading",bar.id="vcloading-bar",wrapper.appendChild(container),document.write(wrapper.innerHTML),container=document.getElementById("vcloading"),bar=document.getElementById("vcloading-bar")),inserted=!0),options.barColor&&(bar.style.backgroundColor=options.barColor,setStyle(bar,prefixStyle("box-shadow","0 0 20px 0 "+options.barColor))),options.zIndex&&(container.style.zIndex=options.zIndex),show(),clearInterval(vcData.intval),vcData.intval=setInterval(function(){Number.isNaN(vcData.count)?(clearInterval(vcData.intval),setCount(0),hide()):(vcData.remaining=100-vcData.count,setCount(vcData.count+.15*Math.pow(1-Math.sqrt(vcData.remaining),2)))},200)},complete:function(){setCount(100),clearInterval(vcData.intval),setTimeout(function(){hide(),setTimeout(function(){setCount(0)},500)},1e3)}}});