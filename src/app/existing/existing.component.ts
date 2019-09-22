import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Paste } from '../shared/paste';
import { flyInOut, expand } from '../animations/app.animation';
import { PasteService } from '../services/paste.service';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-existing',
  templateUrl: './existing.component.html',
  styleUrls: ['./existing.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    expand(),
  ],
})
export class ExistingComponent implements OnInit {
  paste: Paste;
  errMsg: String;
  path: String;
  textCopied = false;
  urlCopied = false;

  constructor(private pasteService: PasteService,
    private location: Location,
    private clipboardService: ClipboardService) { }

  ngOnInit() {
    this.paste = new Paste();
    this.paste.id = this.location.path().substring(1);
    this.path = window.location.href;
    this.pasteService.getPaste(this.paste.id).subscribe(txt => {
      this.paste.text = txt;
    }, errMsg => {
      this.errMsg = <any> errMsg;
    });
  }

  copyURL() {
    this.clipboardService.copyFromContent(this.path.toString());
    this.urlCopied = true;
    setTimeout(() => { this.urlCopied = false; }, 3000);
  }

  copyText() {
    this.clipboardService.copyFromContent(this.paste.text);
    this.textCopied = true;
    setTimeout(() => { this.textCopied = false; }, 3000);
  }

}
