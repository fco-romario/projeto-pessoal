import { makeEnvironmentProviders } from "@angular/core";
import { TitleStrategy } from "@angular/router";
import { AppTitleStrategyService } from "./layout/strategies/app-title-strategy.service";

export function provideCore() {
    return makeEnvironmentProviders([
        {
            provide: TitleStrategy,
            useClass: AppTitleStrategyService
        }
    ]);
}