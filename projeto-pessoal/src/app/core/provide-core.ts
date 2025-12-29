import { makeEnvironmentProviders } from "@angular/core";
import { TitleStrategy } from "@angular/router";
import { AppTitleStrategyService } from "./layout/strategies/app-title-strategy.service";
import { provideAtuh } from "./auth/provide-auth";

export function provideCore() {
    return makeEnvironmentProviders([
        provideAtuh(),
        {
            provide: TitleStrategy,
            useClass: AppTitleStrategyService
        }
    ]);
}