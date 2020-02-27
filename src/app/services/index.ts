import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {IntercepterService} from './intercepter.service';
export const httpIntercepterprovider = [
    {provide:HTTP_INTERCEPTORS,useClass:IntercepterService,multi:true}
];