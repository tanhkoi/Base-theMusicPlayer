/**
 * 1. render song
 * 2. srcoll top
 * 3. play / pause / seek
 * 4. CD rotate
 * 5. next / previous
 * 6. random
 * 7. next / repeat when ended
 * 8. active song
 * 9. srcoll active song into view
 * 10. play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const header = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const loader = $('.progress');
const btnPrev = $('.btn-prev');
const btnNext = $('.btn-next');

const app = {
	currentIndex: 0,
	isPlaying: false,
	songs: [
		{
			name: 'ギラギラ',
			singer: 'Ado',
			path: './songs/song7.mp3',
			image: './imgs/song7.jpg',
		},
		{
			name: '踊り子',
			singer: 'Vaundy',
			path: './songs/song8.mp3',
			image: './imgs/song8.jpg',
		},
		{
			name: 'すずめ',
			singer: 'RADWIMPS',
			path: './songs/song5.mp3',
			image: './imgs/song5.jpg',
		},
		{
			name: '悪魔の子',
			singer: 'ヒグチアイ',
			path: './songs/song6.mp3',
			image: './imgs/song6.jpg',
		},
		{
			name: 'Until I Found You',
			singer: 'Stephen Sanchez',
			path: './songs/song4.mp3',
			image: './imgs/song4.jpg',
		},
		{
			name: 'Trời hôm nay nhiều mây cực',
			singer: 'Đen',
			path: './songs/song1.mp3',
			image: './imgs/song1.jpg',
		},
		{
			name: 'COPYCAT',
			singer: 'Billie Eilish',
			path: './songs/song3.mp3',
			image: './imgs/song3.jpg',
		},
		{
			name: 'Counting Stars',
			singer: 'OneRepublic',
			path: './songs/song2.mp3',
			image: './imgs/song2.jpg',
		},
	],

	render: function () {
		const htmls = this.songs.map((song) => {
			return `
						<div class="song"> 
							<div class="thumb" style="background-image: url('${song.image}')" ></div>
							<div class="body">
								<h3 class="title">${song.name}</h3>
								<p class="author">${song.singer}</p>
							</div>
							<div class="option">
								<i class="fas fa-ellipsis-h"></i>
							</div>
						</div>`;
		});
		$('.playlist').innerHTML = htmls.join('');
	},

	defineProperties: function () {
		Object.defineProperty(this, 'currentSong', {
			get: function () {
				return this.songs[this.currentIndex];
			},
		});
	},

	handleEvents: function () {
		const _this = this;
		const cdWidth = cd.offsetWidth;
		// Xu ly quay/ dung
		const cdThumpAnimate = cdThumb.animate(
			[
				{
					transform: 'rotate(360deg)',
				},
			],
			{
				duration: 10000,
				iterations: Infinity,
			}
		);
		cdThumpAnimate.pause();

		// xu ly phong to thu nho cd
		document.onscroll = function () {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const newCDWidth = cdWidth - scrollTop;
			cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0;
			cd.style.opacity = newCDWidth / cdWidth;
			
		};

		// xu ly khi nhan play button
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};

		// khi song play
		audio.onplay = function () {
			_this.isPlaying = true;
			player.classList.add('playing');
			cdThumpAnimate.play();
		};
		// xu li thanh load
		audio.ontimeupdate = function () {
			if (audio.duration) {
				loader.value = (audio.currentTime / audio.duration) * 100;
			}
		};
		// khi song pause
		audio.onpause = function () {	
			_this.isPlaying = false;
			player.classList.remove('playing');
			cdThumpAnimate.pause();
		};

		// xu li tua song
		loader.onchange = function (e) {
			const seekTime = (e.target.value / 100) * audio.duration;
			audio.currentTime = seekTime;
			console.log(audio.currentTime);
		};
		btnNext.onclick = function () {
			_this.nextSong();
			audio.play();
		};
		btnPrev.onclick = function () {
			_this.prevSong();
			audio.play();
		};
	},
	loadCurrentSong: function () {
		console.log(this.currentSong);

		header.textContent = this.currentSong.name;
		cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
		audio.src = this.currentSong.path;
	},
	nextSong: function () {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},
	prevSong: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},
	start: function () {
		this.defineProperties();
		this.handleEvents();
		this.loadCurrentSong();
		this.render();
	},
};
app.start();
