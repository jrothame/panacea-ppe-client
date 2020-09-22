import { Directive, Attribute, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appUiImgLoader]'
})
export class UiImgLoaderDirective {

  imgSrc: String;
  @Input() spinnerSrc: String;
  constructor(
    @Attribute('loader') public loader: string,
    @Attribute('imgNoFoundSrc') public onErrorSrc: string,
    private renderer: Renderer2,
    private el: ElementRef) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
    }

    @HostListener('load') onLoad() {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.el.nativeElement.src);
    }

    @HostListener('error') onError() {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
    }
 
}
