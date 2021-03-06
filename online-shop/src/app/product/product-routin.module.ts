import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
    {
        path: 'product',
        canActivateChild: [
            AuthGuard
        ],
        children: [
            {
                path: 'new',
                component: NewProductComponent,
                data: {
                    isLogged: true
                }
            },
            {
                path: 'detail/:id',
                component: DetailComponent,
                data: {
                    isLogged: true
                }
            },
            {
                path: 'edit/:id',
                component: EditProductComponent,
                data: {
                    isLogged: true
                }
            }
        ]
    }
];

export const ProductRouterModule = RouterModule.forChild(routes);
