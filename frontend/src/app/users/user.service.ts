import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, of, tap } from 'rxjs';
import { UserDto } from 'src/app/shared/types/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  readonly users = signal<UserDto[]>([]);
  readonly currentUser = signal<UserDto | null>(null);

  loadAll() {
    this.http
      .get<UserDto[]>(`${environment.apiUrl}/users`, { withCredentials: true })
      .pipe(catchError(() => of([])))
      .subscribe((list: UserDto[]) => this.users.set(list));
  }

  loadMe() {
    this.http
      .get<UserDto>(`${environment.apiUrl}/users/me`, { withCredentials: true })
      .pipe(catchError(() => of(null)))
      .subscribe((user: UserDto | null) => this.currentUser.set(user));
  }

  getUser(id: number) {
    return this.http.get<UserDto>(`${environment.apiUrl}/users/${id}`, { withCredentials: true });
  }

  updateGameProgress(games: Partial<Pick<UserDto, 'hasFinishedGame1' | 'hasFinishedGame2' | 'hasFinishedGame3' | 'hasFinishedGame4'>>) {
    return this.http.patch<UserDto>(
      `${environment.apiUrl}/users/me/games`,
      games,
      { withCredentials: true }
    ).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError((err) => {
        console.error('Error updating game progress:', err);
        throw err;
      })
    );
  }

  markGameAsFinished(gameNumber: 1 | 2 | 3 | 4) {
    const key = `hasFinishedGame${gameNumber}` as keyof Pick<UserDto, 'hasFinishedGame1' | 'hasFinishedGame2' | 'hasFinishedGame3' | 'hasFinishedGame4'>;
    return this.updateGameProgress({ [key]: true });
  }
}
