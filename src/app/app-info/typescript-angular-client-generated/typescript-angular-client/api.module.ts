import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { Pay_Service } from './api/pay_.service';
import { Posts_Service } from './api/posts_.service';
import { TpAuth_Service } from './api/tpAuth_.service';
import { Users_Service } from './api/users_.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    Pay_Service,
    Posts_Service,
    TpAuth_Service,
    Users_Service ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
