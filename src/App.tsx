import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import CurrencyButton from './CurrencyButton'
import { currencies } from './constants'
import Snackbar from 'react-native-snackbar'

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [currency, setCurrency] = useState(currencies[0])
  useEffect(() => {
    updateOutputValue()
  }, [inputValue, currency])

  const updateOutputValue = () => {
    const inputAmount = parseFloat(inputValue)
    console.log(inputValue)
    if (!isNaN(inputAmount)) {
      const outputAmount = inputAmount * currency.exchangeRate
      const result = `${currency.symbol} ${outputAmount.toFixed(2)}`
      setOutputValue(result)
    } else {
      setOutputValue('')
    }
  }

  const buttonPressed = (value: Currency) => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      Snackbar.show({
        text: 'Please enter a valid number',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: 'white',
      })
    }
    setCurrency(value)
  }

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>SG$</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode='always'
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in SGD'
            />
            {outputValue && (
              <Text style={[styles.output,{marginRight: 10}]}>➜</Text>
            )}
            {outputValue && (
              <Text style={styles.output}>
                {outputValue}
              </Text>
            )}
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              numColumns={3}
              data={currencies}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.button, item === currency && styles.selected]}
                  onPress={() => buttonPressed(item)}
                >
                  <CurrencyButton {...item} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  output: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: 'lime',
    borderRadius: 8,
  }, 
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 100,
    margin: 10,
    padding: 10,
  }
})