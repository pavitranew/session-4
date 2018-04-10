'use strict';

// create the dynamic nav based on the navItems array
var nav = document.getElementById('main');
var navLinks = nav.querySelector('#nav-links');
var markup = '' + navItems.map(function (listItem) {
  return '<li><a href="' + listItem.link + '">' + listItem.label + '</a></li>';
}).join('');
navLinks.innerHTML = markup;

var logo = document.querySelector('.logo');
logo.addEventListener('click', function () {
  document.body.classList.toggle('showmenu');
  event.preventDefault();
});

// sticky nav
var topOfNav = nav.offsetTop;

window.addEventListener('scroll', fixNav);

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}

// NEW Hashes
var siteWrap = document.querySelector('.site-wrap');

// window.onload = function(){
//   let newContent;
//   if(!window.location.hash){
//     newContent = navItems.filter(
//       navItem => navItem.link == '#watchlist'
//     )
//   } else {
//     newContent = navItems.filter(
//       navItem => navItem.link == window.location.hash
//     )
//   }
//   renderPage(newContent)
// }

// window.onhashchange = function() {
//   let newloc = window.location.hash;
//   let newContent = navItems.filter(
//     navItem => navItem.link == newloc
//   )
//   renderPage(newContent);
//   window.scrollTo(0,0);
// }

// function renderPage(newContent){
//   siteWrap.innerHTML = `
//   <h2>${newContent[0].header}</h2>
//   ${newContent[0].content}
//   `
// }

//# sourceMappingURL=main-compiled.js.map