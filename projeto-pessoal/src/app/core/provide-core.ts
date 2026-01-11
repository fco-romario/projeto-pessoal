import { makeEnvironmentProviders } from "@angular/core";
import { TitleStrategy } from "@angular/router";
import { AppTitleStrategyService } from "./layout/strategies/app-title-strategy.service";
import { provideAtuh } from "./auth/provide-auth";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { setOuthTokenInterceptor } from "./auth/interceptors/set-outh-token-interceptor";

export function provideCore() {
    return makeEnvironmentProviders([
        provideHttpClient(withInterceptors([setOuthTokenInterceptor])),
        provideAtuh(),
        {
            provide: TitleStrategy,
            useClass: AppTitleStrategyService
        }
    ]);
}