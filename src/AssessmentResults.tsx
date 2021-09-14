import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Button,
} from 'react-native';

type AssessmentResultsProps = {
	complete: () => void;
};

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
	complete,
}) => {
	return (
		<View>
			<Text style={styles.title}>Assessment Results</Text>
			<Text>
				Based on the patients symptomatic presentation, here are some
				differential diagnoses to consider
			</Text>

			<View style={{ marginTop: 10 }}>
				<View style={{ marginVertical: 5 }}>
					<Text style={{ fontSize: 18 }}>Malaria: 80%</Text>
					<DataBar height={24} size={80} />
				</View>
				<View style={{ marginVertical: 5 }}>
					<Text style={{ fontSize: 18 }}>Pneumonia: 48.9%</Text>
					<DataBar height={24} size={48.88775} />
				</View>
				<View style={{ marginVertical: 5 }}>
					<Text style={{ fontSize: 18 }}>Anaemia: 28%</Text>
					<DataBar height={24} size={28.0} />
				</View>
			</View>

			<View style={{ marginTop: 10 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					<BottomSheetTextInput
						multiline={true}
						numberOfLines={8}
						style={styles.commentsInput}
						placeholder="Comments, Recommendation, and Next steps"
						textAlignVertical="top"
					/>
				</KeyboardAvoidingView>
			</View>

			<View style={{ marginTop: 24 }}>
				<Button onPress={complete} title="Complete Assessment" />
			</View>
		</View>
	);
};

type DataBarProps = {
	height: number;
	size: number;
};

const DataBar: React.FC<DataBarProps> = ({ height, size }) => {
	const width = `${Math.max(0, Math.min(size, 100)).toFixed(2)}%`;
	return <View style={{ height, backgroundColor: 'blue', width }} />;
};

const styles = StyleSheet.create({
	title: {
		fontWeight: '600',
		fontSize: 24,
	},
	commentsInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 16,
	},
});
