import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import { Plan } from '../../shared/billing/models/plan';
import { Plans } from '../../shared/billing/plans.service';

@Injectable()
export class BillingPlansResolver implements Resolve<Plan[]> {

    constructor(private plans: Plans) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Plan[]> {
        return this.plans.all({order: 'position|asc'}).pipe(map(response => response.data)).toPromise();
    }
}

