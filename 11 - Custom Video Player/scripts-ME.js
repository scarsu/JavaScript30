//elements
const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')
const full = document.querySelector('.full')

//functions
function togglePlay(){
  video[video.paused ? 'play' : 'pause']()
}
function updateButton(){
  toggle.innerHTML = video.paused ? '►' : '▌▌'
}
function changeRange(){
  video[this.name]=this.value
}
function skip(e){
  video.currentTime=video.currentTime+parseFloat(e.target.dataset.skip)
}
function handleProgress(){
  progressBar.style.flexBasis=video.currentTime/video.duration*100+'%'
}
function scrub(e){
  video.currentTime=e.offsetX/progress.offsetWidth*video.duration
}
function toggleFull(){
  if(!video.webkitDisplayingFullscreen){
    video.webkitEnterFullscreen()
  }else{
    video.webkitExitFullscreen()
  }
}
function updateFull(){
  full.innerHTML=video.webkitDisplayingFullscreen ? '⚄' : '⚃'
}

//events
// 播放 暂停
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

// 更新按钮状态
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

// skip
skipButtons.forEach(btn=>btn.addEventListener('click', skip))

// 音量
ranges.forEach(range => range.addEventListener('change', changeRange))

// 更新进度条
video.addEventListener('timeupdate', handleProgress)

// 拖动进度条
let mousedownBar = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', ()=>mousedownBar = true)
progress.addEventListener('mousemove', e=>{mousedownBar && scrub(e)})
progress.addEventListener('mouseup', ()=>mousedownBar = false)

// 全屏
full.addEventListener('click', toggleFull)
video.addEventListener('fullscreenchange', updateFull)