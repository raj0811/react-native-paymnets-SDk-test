import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import { Payment } from './component';

function App(): React.JSX.Element {
  const [collectId, setCollectId] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  function success() {
    console.log('check2 success2');
  }
 
  function fail() {
    console.log('check2 fail');
  }

  const handlePay = () => {
    if (collectId) {
      setShowPayment(true);
    }
  };

  if (showPayment) {
    return (
      <View style={styles.container}>
        <Payment 
          collectId={collectId} 
          onSuccess={success} 
          onFailure={fail} 
          mode={'production'} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter collect_id"
        value={collectId}
        onChangeText={setCollectId}
      />
      <Button title="Pay" onPress={handlePay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default App;