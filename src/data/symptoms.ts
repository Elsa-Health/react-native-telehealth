export type symptom = {
	name: string;
	description: string;
	features: {
		duration: number;
		onset: string[];
		nature: string[];
		periodicity: string[];
		aggitators: string[];
		reducers: string[];
	};
};

export const symptomsList: symptom[] = [
	{
		name: 'Fever',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: [
				'intermittent',
				'step ladder',
				'relapsing',
				'remittent',
				'persistent',
			],
			aggitators: [],
			reducers: ['antipyretics', 'anti-inflammatories', 'antibiotics'],
		},
	},
	{
		name: 'Cough',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: [
				'dry',
				'yellow sputum',
				'green sputum',
				'clear sputum',
				'haemoptyasis',
				'rusty red',
			],
			periodicity: ['morning', 'afternnon', 'night', 'all day'],
			aggitators: ['dust', 'pollen', 'exercise', 'cold air', 'drugs'],
			reducers: [],
		},
	},
	{
		name: 'Dyspnoea',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['progressive', 'non progressive'],
			periodicity: ['night or morning', 'non-specific time'],
			aggitators: [
				'lying flat',
				'sitting up',
				'lying on one side',
				'sleep',
			],
			reducers: ['rest', 'sitting in bed'],
		},
	},
	{
		name: 'Dyspareunia',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: ['intermittent', 'step ladder'],
			aggitators: ['sleep', 'cough'],
			reducers: ['chowder'],
		},
	},
	{
		name: 'Skin Rash',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: ['intermittent', 'step ladder'],
			aggitators: ['sleep', 'cough'],
			reducers: ['chowder'],
		},
	},
	{
		name: 'Fatigue',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: ['intermittent', 'step ladder'],
			aggitators: ['sleep', 'cough'],
			reducers: ['chowder'],
		},
	},
	{
		name: 'Lethargy',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: ['intermittent', 'step ladder'],
			aggitators: ['sleep', 'cough'],
			reducers: ['chowder'],
		},
	},
	{
		name: 'Confusion',
		description: 'Rise in temperature, above the normal 36.8 average',
		features: {
			duration: 1,
			onset: ['sudden', 'gradual'],
			nature: ['high grade', 'low grade'],
			periodicity: ['intermittent', 'step ladder'],
			aggitators: ['sleep', 'cough'],
			reducers: ['chowder'],
		},
	},
];
