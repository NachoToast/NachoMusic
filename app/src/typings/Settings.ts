/* 
TODO: settings options for the following
- downloads:
    - audio only OR video
    - audio quality
    - video quality
- file locations?

*/
export interface Settings {
    navbarDisplay?: 'text' | 'icons' | 'both';
}

export const DefaultSettings: Settings = {
    navbarDisplay: 'both',
};
