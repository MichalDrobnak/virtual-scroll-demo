import { Component, Input } from '@angular/core';
import { ICharacter } from '../../models';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  @Input({ required: true }) character!: ICharacter;
}
