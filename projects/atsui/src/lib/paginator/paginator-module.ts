/**
 * @license
 * Copyright Cazin Cedric All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://atsui.io/license
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AtsuiPaginator } from './paginator';
import { ATSUI_PAGINATOR_I18N_PROVIDER } from './paginator-i18n';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    exports: [
        AtsuiPaginator
    ],
    declarations: [
        AtsuiPaginator
    ],
    providers: [
        ATSUI_PAGINATOR_I18N_PROVIDER
    ]
})
export class AtsuiPaginatorModule { }
