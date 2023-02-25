import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer as NBFooter, FooterTab, Icon } from 'native-base';

// components
import { Text } from 'src/components';
import { Global } from 'src/theme';

// styles
import styles from './styles';

const routes = [
  {
    route: 'back',
    icon: 'caret-left',
    text: 'BACK',
    iconType: 'FontAwesome',
  },
  {
    route: 'Dashboard',
    icon: 'format-list-bulleted',
    text: 'DASHBOARD',
    iconType: 'MaterialIcons',
  },
  {
    route: 'MainMenu',
    icon: 'home',
    iconType: 'MaterialIcons',
  },
  {
    route: 'CustomizePref',
    icon: 'tune',
    text: 'PREF',
    iconType: 'MaterialIcons',
  },
  {
    route: 'forward',
    icon: 'caret-right',
    text: 'FORWARD',
    iconType: 'FontAwesome',
  },
];

const Footer = ({ props, activeRoute }) => {
  const {
    navigation: { replace },
  } = props;

  const { footer, touch, icon } = styles;
  const { galleryBg, borderT, borderDustyGray } = Global;

  const onPressIcon = (route) => {
    if (route === 'back') {
      if (activeRoute === 'MainMenu') {
        if (activeRoute !== 'Dashboard') {
          replace('Dashboard');
        }
      }
      if (activeRoute === 'CustomizePref') {
        replace('MainMenu');
      }
    } else if (route === 'forward') {
      if (activeRoute === 'Dashboard') {
        replace('MainMenu');
      }
      if (activeRoute === 'MainMenu') {
        replace('CustomizePref', { type: false });
      }
    } else if (route !== 'back' && route !== 'forward') {
      replace(route, route === 'CustomizePref' && { type: false });
    } else {
    }
  };

  return (
    <NBFooter>
      <FooterTab style={[footer, galleryBg, borderT, borderDustyGray]}>
        {routes.map((screen, i) => (
          <TouchableOpacity key={i} style={touch} onPress={() => onPressIcon(screen.route)}>
            <Icon type={screen.iconType} name={screen.icon} style={icon} />
            <Text text={screen.text} color="tertiary" style={{ fontSize: 10 }} />
          </TouchableOpacity>
        ))}
      </FooterTab>
    </NBFooter>
  );
};

export default Footer;
