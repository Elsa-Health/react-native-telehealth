import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity,
} from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from './Button';
import { symptomInput, SymptomsInput } from './SymptomsInput';
import { AssessmentResults } from './AssessmentResults';

const { height } = Dimensions.get('window');

interface Props {
	hangup: () => void;
	localStream?: MediaStream | null;
	remoteStream?: MediaStream | null;
	isPatient: boolean;
	isClinician: boolean;
	isMuted: boolean;
	toggleMute: () => void;
}

function ButtonContainer(props: Props) {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={props.hangup}
				iconName="phone"
				backgroundColor="red"
			/>
		</View>
	);
}

export default function VideoCall(props: Props) {
	// display the local stream on call
	// this is before the call is connected.
	if (props.localStream && !props.remoteStream) {
		return (
			<View style={styles.container}>
				<RTCView
					streamURL={props.localStream.toURL()}
					style={styles.video}
					objectFit={'cover'}
				/>
				<ButtonContainer {...props} />
			</View>
		);
	}

	// once the call is connected, display both the remote and the local streams
	if (props.localStream && props.remoteStream) {
		// If the user is not a clinician, hide the extra intelligence things
		if (!props.isClinician) {
			return (
				<View style={styles.container}>
					<RTCView
						streamURL={props.remoteStream.toURL()}
						style={styles.video}
						objectFit={'cover'}
					/>
					<RTCView
						streamURL={props.localStream.toURL()}
						style={styles.videoLocal}
						objectFit={'cover'}
					/>

					<ButtonContainer {...props} />
				</View>
			);
		}
		return (
			// @ts-ignore
			<ElsaSheetContainer {...props}>
				<View style={styles.container}>
					<RTCView
						streamURL={props.remoteStream.toURL()}
						style={styles.video}
						objectFit={'cover'}
					/>
					<RTCView
						streamURL={props.localStream.toURL()}
						style={styles.videoLocal}
						objectFit={'cover'}
					/>
				</View>
			</ElsaSheetContainer>
		);
	}
	return <ButtonContainer {...props} />;
}

type elsaDifferntial = {
	name: string;
	p: number;
};

type ElsaSheetContainerProps = {
	hangup: () => void;
	handleCompleteAssessment: (
		symptoms: symptomInput[],
		elsaDifferentials: elsaDifferntial[]
	) => void;
} & Props;

export const ElsaSheetContainer: React.FC<ElsaSheetContainerProps> = ({
	hangup,
	isMuted,
	toggleMute,
	children,
}) => {
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// Symptom PARENT state
	const [selectedSymptoms, setSelectedSymptoms] = useState<symptomInput[]>(
		[]
	);

	// navigation
	const [screen, setScreen] = useState<'symptoms' | 'results'>('symptoms');
	const completeIntake = (symptoms: symptomInput[]) => {
		setSelectedSymptoms(symptoms);
		setScreen('results');
	};

	// variables
	const startSize = '10%'; // FIXME: this has to be variable based on the screen dimensions
	const [sheetIndex, setSheetIndex] = useState(0);
	const snapPoints = useMemo(() => [startSize, '85%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
		setSheetIndex(index);
	}, []);

	const toggleElsaSheet = () => {
		sheetIndex !== 0
			? bottomSheetRef.current?.collapse()
			: bottomSheetRef.current?.expand();
	};

	const completeAssessment = () => {
		bottomSheetRef.current?.collapse();
		setScreen('symptoms');

		// TODO: handle next steps
	};

	return (
		<View style={{ minHeight: height }}>
			{children}
			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View
					style={{
						paddingHorizontal: 10,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							paddingHorizontal: '4%',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<TouchableOpacity onPress={toggleElsaSheet}>
							<Image
								style={{ height: 28, width: 28 }}
								source={require('./img/elsa-icon.png')}
							/>
						</TouchableOpacity>

						<Button
							onPress={toggleMute}
							iconName={isMuted ? 'microphone-off' : 'microphone'}
							iconColor="gray"
							style={{ height: 48, width: 48, elevation: 0 }}
							iconSize={24}
							backgroundColor="white"
						/>

						<Button
							onPress={hangup}
							iconName="phone-hangup"
							iconColor="white"
							style={{ height: 48, width: 48, elevation: 0 }}
							iconSize={22}
							backgroundColor="red"
						/>
					</View>

					<View style={{ marginTop: 12 }}>
						{screen === 'symptoms' && (
							<SymptomsInput
								initialSelectedSymptoms={selectedSymptoms}
								next={completeIntake}
							/>
						)}

						{screen === 'results' && (
							<AssessmentResults complete={completeAssessment} />
						)}
					</View>
				</View>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		bottom: 30,
	},
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	video: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	videoLocal: {
		position: 'absolute',
		width: 100,
		height: 150,
		top: 0,
		left: 20,
		elevation: 10,
	},
});
