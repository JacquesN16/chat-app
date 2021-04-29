import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/esm/locale';


export const createdAtLocale = () => {
    const formatRelativeLocale = {
        lastWeek: '[La semaine dernière] dddd [à] LT',
        yesterday: '[hier à] LT',
        today: '[aujourd\'hui à] LT',
        tomorrow: '[demain à] LT',
        nextWeek: 'dddd [à] LT',
        other: 'L LT', // Difference: Add time to the date
      };
      
      const locale = {...fr,
        formatRelative: token => formatRelativeLocale[token],
      };
      
      return locale;

}
