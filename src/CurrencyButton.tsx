import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'

type CurrencyButtonProps = PropsWithChildren<{
    name: string,
    symbol: string,
    flag: string,
    exchangeRate: number
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={styles.currencyButton}>
      <Text style={styles.currencyFlag}>{props.flag}</Text>
      <Text style={styles.currencyText}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    currencyButton: {
        alignItems: 'center',
        borderRadius: 5,
      },
      currencyText: {
        fontSize: 14,
        color: 'black',
      },
      currencyFlag: {
          fontSize: 28,
          marginBottom: 4,
      }
})

export default CurrencyButton