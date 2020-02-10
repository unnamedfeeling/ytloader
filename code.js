// https://www.labnol.org/internet/light-youtube-embeds/27941/
// Dependencies: blazy(*), slick slider
// Initialize elements with this div
// <div class="js-youtube-player" data-id="*id youtube*" data-poster="*poster link (can be ommitted)*"></div>
/*Youtube videos*/
var ytimg={
	player: {},
	init: function(){
		var div, n,
		v = document.getElementsByClassName("js-youtube-player");
		for (n = 0; n < v.length; n++) {
			div = ytimg.createInnerElement(v[n]);
			v[n].appendChild(div);
		}
	},
	reinit: function(){
		var div, n,
			v = document.getElementsByClassName("js-youtube-player");
		for (n = 0; n < v.length; n++) {
			if(v[n].querySelector('.yt-holder') == null){
				div = ytimg.createInnerElement(v[n]);
				v[n].appendChild(div);
			}
		}
	},
	createInnerElement: function(el){
		var div = document.createElement("div");
		div.classList.add('yt-holder');
		div.id=el.dataset.id;
		div.setAttribute("data-id", div.id);
		div.innerHTML = ytimg.labnolThumb(div.id);
		// div.onclick = ytimg.labnolIframe(div);
		div.addEventListener('click', ytimg.labnolIframe)

		return div;
	},
	labnolThumb: function(id){
		var thumb = '<img class="video-img" src="https://i.ytimg.com/vi/'+id+'/maxresdefault.jpg">',
		play = '<div class="topimg_btn"><img src="//cdn.baxtep.com/img/svg/play_video.svg" onerror="this.onerror=null; this.src=\'//cdn.baxtep.com/img/icon/icon_play-90x90.png\'" alt="play_video" class="topimg_btn-bgimg"></div>'
		return thumb+play;
	},
	labnolIframe: function(event){
		var wd=this.offsetWidth,
			hg=this.offsetHeight-6,
			v_id=this.dataset.id,
			params={
				height: hg,
				width: wd,
				videoId: v_id,
				autoplay: 0,
				events: {
					'onReady': ytimg.onPlayerReady
				}
			};
		if(typeof YT === 'undefined'){
			var els = document.getElementsByTagName("script")[0],
			scp = document.createElement("script"),
			func = function () { els.parentNode.insertBefore(scp, els); };
			scp.type = "text/javascript";
			scp.id = 'youtube';
			scp.async = true;
			scp.src = "//www.youtube.com/iframe_api";
			if (window.opera == "[object Opera]") {
				document.addEventListener("DOMContentLoaded", func, false);
			} else { func(); }
			if (scp.readyState) {
				scp.onreadystatechange = function() {
					setTimeout(function(){
						ytimg.player = new YT.Player(v_id, params);
					}, 500)
				}
			} else {
				scp.onload = function() {
					setTimeout(function(){
						ytimg.player = new YT.Player(v_id, params);
					}, 500)
				}
			}
		} else {
			setTimeout(function(){
				ytimg.player = new YT.Player(v_id, params);
			}, 500)
		}
	},
	onPlayerReady: function(event) {
		event.target.playVideo();
	},
	stopVideo: function() {
		ytimg.player.stopVideo();
	},
	pauseVid: function(event) {
		ytimg.player.pauseVideo();
	},
	destroy: function(el){
		var iframe=el.querySelector('.yt-holder');
		el.removeChild(iframe);

		var newHolder=ytimg.createInnerElement(el)
		el.appendChild(newHolder)
	}
}
ytimg.init();
