// components/Filters.js
// renders the Section Filter row
import { globalStyles } from "@/styles/globalStyles";
import { Text, TouchableOpacity, View } from 'react-native';
import { log } from '../utils/logger';

const Filter = ({ onChange, selections, sections }) => {
    log('Filters.tsx\\Filters\\1.Start, selections:');
    return (
        <View style={globalStyles.filterContainer}>
            {sections.map((section, index) => (
                <TouchableOpacity
                    key={section}
                    onPress={() => {
                        onChange(index);
                    }}
                    style={[globalStyles.filterButton,
                    {
                        flex: 1 / sections.length,
                        backgroundColor: selections[index] ? '#EE9972' : '#495E57',
                    }]
                    }>
                    <View>
                        <Text style={{ color: selections[index] ? 'black' : 'white' }}>
                            {section}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))
            }
        </View >
    );
};



export default Filter;