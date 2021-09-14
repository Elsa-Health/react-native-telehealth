import {
	BottomSheetFlatList,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button as NativeButton,
} from 'react-native';
import { capitalizeWords, toggleStrList, upperFirst } from './utils';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from './components/Checkbox';
import { symptom, symptomsList } from './data/symptoms';

export type symptomInput = {
	data: {
		duration: number;
		onset: string;
		nature: string;
		periodicity: string;
		aggitators: string[];
		reducers: string[];
	};
} & symptom;

type SymptomsInputProps = {
	next: (symptoms: symptomInput[]) => void;
	initialSelectedSymptoms: symptomInput[];
};

const formatSymptomInput = (symptom: symptom): symptomInput => {
	return {
		...symptom,
		features: { ...symptom.features },
		data: {
			duration: 1,
			onset: '',
			nature: '',
			periodicity: '',
			aggitators: [],
			reducers: [],
		},
	};
};

const SymptomsInput: React.FC<SymptomsInputProps> = ({ next }) => {
	const [searchStr, setSearchStr] = useState('');
	const [selectedSymptoms, setSelectedSymptoms] = useState<symptomInput[]>(
		[]
	);

	const searchSymptoms = (symptomsList: symptom[], searchStr: string) => {
		return symptomsList.filter(
			(s) =>
				s.name.toLowerCase().includes(searchStr.toLowerCase()) ||
				s.description.toLowerCase().includes(searchStr.toLowerCase())
		);
	};

	const selectSymptom = (symptom: symptom) => {
		setSelectedSymptoms((prev) => {
			const idx = prev.findIndex((p) => p.name === symptom.name);
			if (idx > -1) {
				return prev.filter((p) => p.name !== symptom.name);
			}

			return [formatSymptomInput(symptom), ...prev];
		});
	};

	const updateSymptomValue = (
		name: string,
		feature: string,
		value: string | number
	) => {
		const updatedSymptoms = selectedSymptoms.map((sy) => {
			if (sy.name === name) {
				return { ...sy, data: { ...sy.data, [feature]: value } };
			}
			return sy;
		});

		setSelectedSymptoms(updatedSymptoms);
	};

	const toggleSymptomList = (
		name: string,
		feature: 'aggitators' | 'reducers',
		value: string
	) => {
		const updatedSymptoms = selectedSymptoms.map((sy) => {
			const toggleFunc = toggleStrList(sy.data[feature]);
			if (sy.name === name) {
				return {
					...sy,
					data: { ...sy.data, [feature]: toggleFunc(value) },
				};
			}
			return sy;
		});

		setSelectedSymptoms(updatedSymptoms);
	};

	const renderItem = useCallback(({ item: symptom }) => {
		console.log(symptom);
		return (
			<TouchableOpacity
				style={styles.symptomsListItem}
				onPress={() => (selectSymptom(symptom), setSearchStr(''))}
			>
				<Text style={styles.symptomsListItemTitle}>{symptom.name}</Text>
				<Text>{symptom.description}</Text>
			</TouchableOpacity>
		);
	}, []);

	return (
		<View
			style={{
				marginTop: 12,
				height: '93%',
				// width: '100%',
			}}
		>
			<TextInput
				keyboardType="default"
				placeholder="Type symptoms here"
				autoCapitalize="none"
				autoCorrect={false}
				underlineColorAndroid="transparent"
				style={styles.symptomSearchInput}
				value={searchStr}
				onChangeText={(t) => setSearchStr(t)}
			/>

			{searchStr.length > 0 && (
				<BottomSheetFlatList
					// ref={ref}
					data={
						searchStr.length > 0
							? searchSymptoms(symptomsList, searchStr)
							: []
					}
					keyExtractor={(_: any, i: number) => 'key__' + i}
					horizontal={false}
					renderItem={renderItem}
					// contentContainerStyle={{
					// 	backgroundColor: 'white',
					// }}
				/>
			)}

			<BottomSheetScrollView>
				{searchStr.length === 0 &&
					selectedSymptoms.map((symptom) => {
						return (
							<View
								key={symptom.name}
								style={{
									borderBottomWidth: 1,
									borderColor: '#ccc',
									paddingVertical: 22,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginRight: 10,
									}}
								>
									<Text style={styles.symptomsListItemTitle}>
										{symptom.name}
									</Text>
									<TouchableOpacity
										onPress={() => selectSymptom(symptom)}
									>
										<Icon
											name="close-circle-outline"
											size={20}
										/>
									</TouchableOpacity>
								</View>
								<Text style={{ color: '#757575' }}>
									{symptom.description}
								</Text>

								<View
									style={{
										marginTop: 10,
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Text>Duration (Days):</Text>
									<TextInput
										keyboardType="number-pad"
										style={{
											borderRadius: 8,
											// borderColor: '#ccc',
											// borderWidth: 1,
											width: '40%',
											paddingHorizontal: 16,
										}}
										underlineColorAndroid="blue"
										placeholder="2"
										onChangeText={(t) =>
											updateSymptomValue(
												symptom.name,
												'duration',
												+t
											)
										}
										value={symptom.data.duration.toString()}
									/>
								</View>

								<View style={{ marginTop: 10 }}>
									<View
										style={{
											borderWidth: 1,
											borderColor: '#ccc',
											borderRadius: 8,
										}}
									>
										<Picker
											selectedValue={symptom.data.onset}
											onValueChange={(itemValue, _) =>
												updateSymptomValue(
													symptom.name,
													'onset',
													itemValue
												)
											}
										>
											<Picker.Item
												label="Onset"
												value=""
											/>
											{symptom.features.onset.map(
												(onset) => (
													<Picker.Item
														key={onset}
														label={capitalizeWords(
															onset
														)}
														value={onset}
													/>
												)
											)}
										</Picker>
									</View>
								</View>

								<View style={{ marginTop: 10 }}>
									<View
										style={{
											borderWidth: 1,
											borderColor: '#ccc',
											borderRadius: 8,
										}}
									>
										<Picker
											selectedValue={symptom.data.nature}
											onValueChange={(itemValue, _) =>
												updateSymptomValue(
													symptom.name,
													'nature',
													itemValue
												)
											}
										>
											<Picker.Item
												label="Nature"
												value=""
											/>
											{symptom.features.nature.map(
												(nature) => (
													<Picker.Item
														key={nature}
														label={capitalizeWords(
															nature
														)}
														value={nature}
													/>
												)
											)}
										</Picker>
									</View>
								</View>

								<View style={{ marginTop: 10 }}>
									<View
										style={{
											borderWidth: 1,
											borderColor: '#ccc',
											borderRadius: 8,
										}}
									>
										<Picker
											selectedValue={
												symptom.data.periodicity
											}
											onValueChange={(itemValue, _) =>
												updateSymptomValue(
													symptom.name,
													'periodicity',
													itemValue
												)
											}
										>
											<Picker.Item
												label="Periodicity"
												value=""
											/>
											{symptom.features.periodicity.map(
												(periodicity) => (
													<Picker.Item
														key={periodicity}
														label={capitalizeWords(
															periodicity
														)}
														value={periodicity}
													/>
												)
											)}
										</Picker>
									</View>
								</View>

								{symptom.features.aggitators.length > 0 && (
									<View style={{ marginTop: 12 }}>
										<Text style={{ fontSize: 18 }}>
											Aggitators:
										</Text>

										<View
											style={{
												marginLeft: 24,
												marginTop: 4,
											}}
										>
											{symptom.features.aggitators.map(
												(aggitator) => (
													<Checkbox
														key={aggitator}
														status={
															symptom.data.aggitators.includes(
																aggitator
															)
																? 'checked'
																: 'unchecked'
														}
														onPress={() =>
															toggleSymptomList(
																symptom.name,
																'aggitators',
																aggitator
															)
														}
													>
														<Text>
															{upperFirst(
																aggitator
															)}
														</Text>
													</Checkbox>
												)
											)}
										</View>
									</View>
								)}

								{symptom.features.reducers.length > 0 && (
									<View style={{ marginTop: 12 }}>
										<Text style={{ fontSize: 18 }}>
											Reducers:
										</Text>

										<View
											style={{
												marginLeft: 24,
												marginTop: 4,
											}}
										>
											{symptom.features.reducers.map(
												(reducer) => (
													<Checkbox
														key={reducer}
														status={
															symptom.data.reducers.includes(
																reducer
															)
																? 'checked'
																: 'unchecked'
														}
														onPress={() =>
															toggleSymptomList(
																symptom.name,
																'reducers',
																reducer
															)
														}
													>
														<Text>
															{upperFirst(
																reducer
															)}
														</Text>
													</Checkbox>
												)
											)}
										</View>
									</View>
								)}
							</View>
						);
					})}

				{selectedSymptoms.length > 0 && (
					<View style={{ marginVertical: 10 }}>
						<NativeButton
							onPress={() => next(selectedSymptoms)}
							title="Continue"
						/>
					</View>
				)}
			</BottomSheetScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	symptomsListItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 14,
		marginVertical: 2,
	},
	symptomsListItemTitle: {
		fontWeight: '700',
		fontSize: 20,
	},
	symptomSearchInput: {
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 10,
		padding: 4,
		paddingHorizontal: 14,
		height: 60,
	},
});

export { SymptomsInput };
