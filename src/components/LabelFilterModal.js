import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CheckBox from '@react-native-community/checkbox';
import {toTitleCase} from '@app/util';

const LabelFilterModal = React.forwardRef(({labels, onChange}, ref) => {
  const [selectAll, setSelectAll] = useState(
    labels.filter((label) => label.value === true).length === labels.length
      ? true
      : false,
  );

  const renderCheckBoxRow = (label) => {
    return (
      <View style={styles.checkBoxRow} key={label.label}>
        <CheckBox
          tintColor={'#A4A4A4'}
          onFillColor={'#FFFFFF'}
          onCheckColor={'#0080FF'}
          onTintColor={'#0080FF'}
          onAnimationType={'one-stroke'}
          offAnimationType={'one-stroke'}
          style={styles.checkBox}
          value={label.value}
          onValueChange={(value) => {
            label.value = value;
            onChange();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            label.value = !label.value;
            onChange();
          }}>
          <Text style={styles.checkBoxLabelText}>
            {toTitleCase(label.label)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={['0%', '30%']}
      backdropComponent={BottomSheetBackdrop}>
      <BottomSheetScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.checkBoxRow}>
          <CheckBox
            tintColor={'#A4A4A4'}
            onFillColor={'#FFFFFF'}
            onCheckColor={'#0080FF'}
            onTintColor={'#0080FF'}
            onAnimationType={'one-stroke'}
            offAnimationType={'one-stroke'}
            style={styles.checkBox}
            value={selectAll}
            onValueChange={(value) => {
              labels.forEach((label) => {
                label.value = value;
              });
              setSelectAll(!selectAll);
              onChange();
            }}
          />
          <TouchableOpacity
            onPress={() => {
              labels.forEach((label) => {
                label.value = !selectAll;
              });
              setSelectAll(!selectAll);
              onChange();
            }}>
            <Text style={styles.checkBoxLabelText}>Select All</Text>
          </TouchableOpacity>
        </View>
        {labels.map((label) => renderCheckBoxRow(label))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkBox: {
    marginRight: 10,
  },
  checkBoxLabelText: {
    fontSize: 20,
  },
});

export default LabelFilterModal;
