import { AppearanceCommand } from './appearance-command';
import { CommandTypes } from './command-types';

export class Navigate implements AppearanceCommand {
    type = CommandTypes.Navigate;
    constructor(public route: string) {}
}

export class SetConfig implements AppearanceCommand {
    type = CommandTypes.SetConfig;
    constructor(public key: string, public value: string|number) {}
}

export class Select implements AppearanceCommand {
    type = CommandTypes.Select;
    constructor(public selector: string, public index = 0) {}
}

export class Deselect implements AppearanceCommand {
    type = CommandTypes.Deselect;
}

export class SetColors implements AppearanceCommand {
    type = CommandTypes.SetColors;
    constructor(public css: string) {}
}

export class SetCustomCss implements AppearanceCommand {
    type = CommandTypes.SetCustomCss;
}

export class SetCustomJs implements AppearanceCommand {
    type = CommandTypes.SetCustomJs;
}

export type AllCommands = Navigate | SetConfig | Select;
