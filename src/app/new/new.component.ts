import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { flyInOut, expand } from '../animations/app.animation';
import { Paste } from '../shared/paste';
import { PasteService } from '../services/paste.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    expand(),
  ],
})
export class NewComponent implements OnInit {

  errMsg: String;
  formSpinner = false;
  paste: Paste;

  pasteForm: FormGroup;
  textControl: FormControl;

  constructor(private fb: FormBuilder,
    private pasteService: PasteService,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.textControl = this.fb.control('', Validators.required);
    this.pasteForm = this.fb.group({
      text: this.textControl,
    });  
  }

  onSubmit() {
    this.formSpinner = true;
    this.paste = this.pasteForm.value;
    this.pasteService.putPaste(this.paste)
      .subscribe(resolvedPaste => {
        this.formSpinner = false;
        this.pasteForm.reset({
          text: '',
        });
        console.log(resolvedPaste);
        if (resolvedPaste.id) {
          this.router.navigate(['/', resolvedPaste.id]);
        }
      }, errMsg => this.errMsg = <any> errMsg);
  }

}
