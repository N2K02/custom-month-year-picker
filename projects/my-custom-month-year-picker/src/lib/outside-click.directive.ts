import { Directive, ElementRef, Output, HostListener, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
    @Input() triggered: boolean = false;
    @Output() outsideClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event', '$event.target'])
    onDocumentClicked(_event: MouseEvent, targetElement: HTMLElement) {
        if (this.triggered && targetElement) {
            if (document.body.contains(targetElement) && !this.elementRef.nativeElement.contains(targetElement)) {
                this.outsideClick.emit(false);
            }
        }
    }
}
