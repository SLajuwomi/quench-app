import { useState } from 'react';
import { View, Text } from 'react-native';
import {
  ScreenTemplate,
  Avatar,
  Button,
  RadioButtonGroup,
} from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/theme/components';

const REASONS = [
  { id: 'energy', label: 'improve energy' },
  { id: 'skin', label: 'better skin' },
  { id: 'headaches', label: 'reduce headaches' },
  { id: 'focus', label: 'better focus' },
  { id: 'weight', label: 'lose weight' },
  { id: 'curious', label: 'just curious' },
];

const ReasonSelectionScreen = ({ navigation }: any) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedIds.length > 0) {
      navigation.navigate('DidYouKnow');
    }
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.ReasonSelection}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Avatar */}
          <Avatar state="fully-hydrated" size="other" />
          {/* Text Group */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>you're here for a reason</Text>
            <Text style={textStyles.subtitle}>what is that reason?</Text>
          </View>
          {/* Radio Button Group */}
          <RadioButtonGroup
            options={REASONS}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            style={{ marginTop: 8 }}
          />
        </View>
      </View>
      {/* Continue Button */}
      <Button
        title="continue"
        onPress={handleContinue}
        disabled={selectedIds.length === 0}
        style={{ marginHorizontal: 20, marginBottom: 34 }}
      />
    </ScreenTemplate>
  );
};

export default ReasonSelectionScreen;
