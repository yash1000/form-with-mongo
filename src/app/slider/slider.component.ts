import { Component, OnInit } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 1000,
      wrap:true,
    })
  }
  slides = [
    {img: "../assets/images/2.jpg"},
    {img: "../assets/images/3.jpg"},
    {img: "../assets/images/4.jpg"},
    {img: "../assets/images/5.jpg"},
    {img: "../assets/images/6.jpg"},
    {img: "../assets/images/7.jpg"},
    {img: "../assets/images/8.jpg"}
  ];
  slideConfig = {"slidesToShow": 2, "slidesToScroll": 1};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    // console.log('slick initialized');
  }
  
  breakpoint(e) {
    // console.log('breakpoint');
  }
  
  afterChange(e) {
    // console.log('afterChange');
  }
  
  beforeChange(e) {
    // console.log('beforeChange');
  }
}
$(document).ready(function($) {
  $('.container .slick').slick({

    autoplay: true,
    autoplaySpeed: 2000,
    arrow:true,
    dots:true
    
});
});


















