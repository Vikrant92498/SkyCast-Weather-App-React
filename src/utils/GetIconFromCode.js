import React from 'react';
import ClearSkyDay from '../assests/icons/01d.png'
import ClearSkyNight from '../assests/icons/01n.png'
import FewCloudsDay from '../assests/icons/02d.png'
import FewCloudsNight from '../assests/icons/02n.png'
import ScatteredCloudDay from '../assests/icons/03d.png'
import ScatteredCloudNight from '../assests/icons/03n.png'
import BrokenCloudDay from '../assests/icons/04d.png'
import BrokenCloudNight from '../assests/icons/04n.png'
import ShowerDay from '../assests/icons/09d.png'
import ShowerNight from '../assests/icons/09n.png'
import RainDay from '../assests/icons/10d.png'
import RainNight from '../assests/icons/10n.png'
import ThunderstormDay from '../assests/icons/11d.png'
import ThunderstormNight from '../assests/icons/11n.png'
import SnowDay from '../assests/icons/13d.png'
import SnowNight from '../assests/icons/13n.png'
import FogDay from '../assests/icons/50d.png'
import FogNight from '../assests/icons/50n.png'
import Unknown from '../assests/icons/unknown.png'
const mapWeatherCodeToIcon = (code) => {
  switch (code) {
    case '01d':
      return ClearSkyDay;
    case '01n':
      return ClearSkyNight;
    case '02d':
        return FewCloudsDay;
    case '02n':
      return FewCloudsNight
    case '03d':
        return ScatteredCloudDay;
    case '03n':
        return ScatteredCloudNight;
    case '04d':
        return BrokenCloudDay;
    case '04n':
      return BrokenCloudNight;
    case '09d':
        return ShowerDay;
    case '09n':
        return ShowerNight;
    case '10d':
        return RainDay;
    case '10n':
      return RainNight;
    case '11d':
        return ThunderstormDay;
    case '11n':
      return ThunderstormNight;
    case '13d':
        return SnowDay;
    case '13n':
      return SnowNight;
    case '50d':
        return FogDay;
    case '50n':
      return FogNight;
    default:
      return Unknown;
  }
};

export default mapWeatherCodeToIcon;