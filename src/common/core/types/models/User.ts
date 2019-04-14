import { Social } from './Social';
import { SocialProfile } from './SocialProfile';
import { Role } from './Role';
import { Subscription } from '../../../shared/billing/models/subscription';

export class User {
    id: number;
    display_name: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    permissions?: string;
    email: string;
    password: string;
    language: string;
    timezone: string;
    country: string;
    created_at: string;
    updated_at: string;
    is_subscribed?: boolean;
    subscriptions?: Subscription[];
    confirmed: true;
    roles: Role[] = [];
    social_profiles: SocialProfile[];
    has_password: boolean;
    oauth?: Social[];
    available_space: number|null;

    // follows
    followed_users?: User[];

    constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}
