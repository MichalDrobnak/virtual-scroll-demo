import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagedResponse, ICharacter } from '../models';

const CharactersUrl = 'https://rickandmortyapi.com/api/character/';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  readonly charactersSignal = signal<ICharacter[]>([]);

  private _pageToLoad = 1;

  constructor(private _http: HttpClient) {}

  loadMoreCharacters(): void {
    this._fetchCharacters(this._pageToLoad).subscribe((response) => {
      this.charactersSignal.set([
        ...this.charactersSignal(),
        ...response.results,
      ]);
      this._pageToLoad++;
    });
  }

  private _fetchCharacters(
    page: number
  ): Observable<IPagedResponse<ICharacter>> {
    return this._http.get<IPagedResponse<ICharacter>>(
      `${CharactersUrl}?page=${page}`
    );
  }
}
