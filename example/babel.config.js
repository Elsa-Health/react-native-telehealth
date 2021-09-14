const path = require('path');
const pak = require('../package.json');

module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blacklist: null,
				whitelist: null,
				safe: false,
				allowUndefined: true,
			},
		],
		[
			'module-resolver',
			{
				extensions: ['.tsx', '.ts', '.js', '.json'],
				alias: {
					[pak.name]: path.join(__dirname, '..', pak.source),
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
