import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const exams = [
       "Quiz- 1",
       "Quiz- 2",
       "Half Yearly",
       "Quiz- 3",
       "Quiz- 4",
       "Final",
]

const Marks = () => {
       return (
              <View style={{
                     flex: 1,
                     flexDirection: 'row',
                     flexWrap: 'wrap',
                     justifyContent: 'space-around',
                     padding: 20,
                     alignItems: 'center',

              }}>
                     {exams.map((exam, index) => (
                            <Card key={index} exam={exam} />
                     ))}
              </View>
       );
};


function Card({ exam }) {
       return (
              <View style={styles.card}>
                     <Text> {exam} </Text>
              </View>
       )
}


const styles = StyleSheet.create({
       card: {
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#DBDBDB',
              shadowColor: '#000',
              width: 150,
              margin: 5,
       },
       cardTitle: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#302b63',
              marginTop: 10,
       }
});

export default Marks;