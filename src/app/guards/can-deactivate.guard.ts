import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.interface';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
) => {
  if (!nextState) {
    return true;
  }

  if (currentState.url !== nextState.url) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  return true;
};
