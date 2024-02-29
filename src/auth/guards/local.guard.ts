import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// creating a new class like this is only useful if I want to add additional logic
export class LocalGuard extends AuthGuard('local') {
    canActivate(
        context: ExecutionContext,   
    ): boolean | Promise<boolean> | Observable<boolean>{
        return super.canActivate(context);
    }
}