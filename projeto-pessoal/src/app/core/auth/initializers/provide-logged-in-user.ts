import { inject, provideAppInitializer } from "@angular/core";
import { LocalStorageToken } from "../stores/local-storage-store";
import { of } from "rxjs";
import { TokenLocalStorageStore } from "../stores/token-local-storage-store.service";
import { LoginFacadeService } from "../facades/login-facade.service";

export function provideLoggedInUser() {
    return provideAppInitializer(() => {
        const _tokenLocalStorageStore = inject(TokenLocalStorageStore);

        if(!_tokenLocalStorageStore.has()) return of();

        const token = _tokenLocalStorageStore.get() as string;
        const _loginFacadeService = inject(LoginFacadeService);

        return _loginFacadeService.refreshToken(token);
    })
}