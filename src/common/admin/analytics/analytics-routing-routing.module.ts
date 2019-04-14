import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsContainerComponent } from './components/analytics-container/analytics-container.component';

const routes: Routes = [
    {
        path: '',
        component: AnalyticsContainerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingRoutingModule { }
