import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {

  @Output() scrolled = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.scrolled.emit();
      }
    });

    observer.observe(this.el.nativeElement);
  }
}