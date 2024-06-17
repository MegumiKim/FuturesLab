import groq from 'groq';
import { link } from './components.js';
import { seo } from './components.js';

export const siteSettingsQuery = groq`*[_type == "site-settings"][0] {
  title,
  elevatorPitch,
  ${seo},
  copyright,
  navHeader[] {
    label,
    ...uri ${link}
  },
  navFooter[] {
    label,
    ...uri ${link}
  }
}`;
