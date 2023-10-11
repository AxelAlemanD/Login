import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.dto';

@Component({
  selector: 'app-hamburguer-menu',
  templateUrl: './hamburguer-menu.component.html',
  styleUrls: ['./hamburguer-menu.component.scss']
})
export class HamburguerMenuComponent {
  
  @Input({ required: true }) options: MenuItem[] = []
  @Output() onClick: EventEmitter<MenuItem | undefined> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const classesToCheck = ['menu', 'menu__option', 'menu__item', 'menu__icon', 'menu__switcher'];
    const containsClass = classesToCheck.some(className => event.target.classList.contains(className));
    if (!containsClass) {
      this.emitClickedOption(undefined);
    }
  }

  emitClickedOption(option: MenuItem | undefined) {
    this.onClick.emit(option);
  }
}
