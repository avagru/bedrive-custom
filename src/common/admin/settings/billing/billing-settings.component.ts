import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SettingsPanelComponent} from '../settings-panel.component';

@Component({
    selector: 'billing-settings',
    templateUrl: './billing-settings.component.html',
    styleUrls: ['./billing-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BillingSettingsComponent extends SettingsPanelComponent implements OnInit {
    public acceptedCards: string[] = [];

    ngOnInit() {
        this.acceptedCards = this.settings.getJson('billing.accepted_cards', []);
    }

    /**
     * Save current settings to the server.
     */
    public saveSettings() {
        const settings = this.state.getModified();
        settings.client['billing.accepted_cards'] = JSON.stringify(this.acceptedCards);
        super.saveSettings(settings);
    }
}
