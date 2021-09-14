import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CheckBoxProps = {
	status: 'checked' | 'unchecked' | 'intermidiate';
	onPress: () => void;
};

const Checkbox: React.FC<CheckBoxProps> = ({ status, onPress, children }) => {
	const iconName =
		status === 'checked'
			? 'check-box-outline'
			: status === 'intermidiate'
			? 'checkbox-intermediate'
			: 'checkbox-blank-outline';
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginVertical: 4,
				}}
			>
				<Icon
					name={iconName}
					color="#000"
					size={22}
					style={{ marginRight: 6 }}
				/>
				{children}
			</View>
		</TouchableOpacity>
	);
};

export { Checkbox };
