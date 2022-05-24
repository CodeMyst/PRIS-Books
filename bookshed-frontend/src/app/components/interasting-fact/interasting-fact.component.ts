import { Component, OnInit } from '@angular/core';
import { getFact, InterestingFact, postFact } from 'src/app/api/interasting-fact';
import * as EasyMDE from 'easymde';
import { ActivatedRoute } from '@angular/router';
import { getSelf } from 'src/app/api/auth';
import { Role } from 'src/app/api/user';

@Component({
    selector: 'app-interasting-fact',
    templateUrl: './interasting-fact.component.html',
    styleUrls: ['./interasting-fact.component.scss']
})
export class InterastingFactComponent implements OnInit {
    fact: InterestingFact | undefined;

    content: string = ""
    message: string = ""

    isFactEditorOpen: boolean = false;

    isAdmin: boolean = false;

    constructor() { }

    async ngOnInit() {
        this.fact = await getFact();
        this.content = this.fact.content;
        console.log(this.fact.content);

        this.isAdmin = (await getSelf()).role == Role.ADMIN;

    }

    toggleEditor() {
        this.isFactEditorOpen = !this.isFactEditorOpen;
    }

    async submitFact() {
        let retFact: InterestingFact = await postFact(this.content);
        if (!retFact) {
            this.message = "Something went wrong"
            return;
        }
        
        this.fact = retFact;
        this.toggleEditor();
    }
}
