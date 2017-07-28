import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { OtherPage } from '../other/other';
import { Subscription } from "rxjs/Subscription";
declare var cordova: any;
let _this;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private onResumeSubscription: Subscription;

    constructor(public navCtrl: NavController, public platform: Platform) {
        _this = this;
        this.onResumeSubscription = platform.resume.subscribe(() => {
            if (_this.navCtrl.getActive().name === "HomePage") {
                _this.scan();
            }
        }); 
    }

    ionViewCanEnter() {
        this.platform.ready().then(() => {
            _this.scan();
        });
    }

    ngOnDestroy() {
        // always unsubscribe your subscriptions to prevent leaks
        this.onResumeSubscription.unsubscribe();
    }

    scan() {
        console.log(cordova.require("cordova/plugin_list").metadata);
        console.log(cordova.plugins);
        console.log(cordova.plugins.cszbar);
        cordova.plugins.cszbar.scan({}, this.onSuccess, this.onSuccess);
    }


    onSuccess(result) {
        //Login_Click
        if (result === "Login_Click") {
            _this.navCtrl.push(OtherPage);
        } else {
            console.log(result);
        }
    }
}
