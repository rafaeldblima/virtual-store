import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-no-result',
    templateUrl: './no-result.component.html',
    styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent implements OnInit {

    @Input() message: string;
    @Input() class: string;
    @Input() weight: string;
    @Input() noBorder: boolean;

    constructor() {
        this.message = 'Nenhum resultado';

        this.class = 'secondary';

        this.weight = 'normal';
    }

    ngOnInit() {
    }


}
