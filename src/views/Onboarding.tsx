import React from 'react';
import {StyleSheet} from 'react-native';
import PaperOnboarding from '@gorhom/paper-onboarding';
import {ONBOARDING_DATA} from '../constants';
import {useUser} from '../context/UserContext';

type Props = {};

const Onboarding: React.FC<Props> = () => {
  const {dispatch} = useUser();
  return (
    <PaperOnboarding
      data={ONBOARDING_DATA}
      onCloseButtonPress={() => dispatch({type: 'DISMISS_ONBOARDING'})}
      closeButtonText={'Close'}
      indicatorSize={20}
      titleStyle={styles.titleText}
      descriptionStyle={styles.descriptionText}
      safeInsets={{left: 0, right: 0}}
    />
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '300',
  },
});

export default Onboarding;
