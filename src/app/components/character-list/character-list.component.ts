import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  HostBinding,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import { ICharacter } from '../../models';
import { CharacterService } from '../../services';

const CharacterHeightRem = 7;
const CharacterSpacingRem = 1;

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private readonly _viewport!: CdkVirtualScrollViewport;

  @HostBinding('style')
  readonly itemCssVariables = {
    '--character-height': `${CharacterHeightRem}rem`,
    '--character-spacing': `${CharacterSpacingRem}rem`,
  };
  readonly itemSize: number;

  private readonly _characterService = inject(CharacterService);

  constructor() {
    this.itemSize = this._calculateItemSize();
  }

  get characterSignal(): Signal<ICharacter[]> {
    return this._characterService.charactersSignal;
  }

  trackById(_: number, character: ICharacter): number {
    return character.id;
  }

  /**
   * Called whenever the viewport is scrolled.
   * If the last rendered index is the same as the total number of items,
   * then it loads more items.
   */
  onScrollIndexChange(): void {
    const lastRenderedIndex = this._viewport.getRenderedRange().end;
    const totalItems = this._viewport.getDataLength();

    if (lastRenderedIndex === totalItems) {
      this._characterService.loadMoreCharacters();
    }
  }

  private _calculateItemSize(): number {
    return this._remToPx(CharacterHeightRem + CharacterSpacingRem);
  }

  private _remToPx(rem: number): number {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
}
