
<br />

# react-native-count-to

A customizable React Native component that gradually counts from a number to a target number. Has support for slowing down the counting when counter is approaching target number.


## Installation
To install the module:
```javascript
npm install react-native-count-to
```

## Usage

1.  Import react-native-count-to:

```javascript
import {CountTo} from 'react-native-count-to';
```

2.  Use in whatever fashion is needed, i.e:

```javascript
    <CountTo from={0} to={42} interval={1000} />
```
or 
```javascript
    <CountTo from={25000} to={-12000} interval={8000} slowDownEnabled={true} slowDownDistance={100} slowDownInterval={2000} />
```


## Available props

| Name                          |  Default| Description                                                                                                                                                   |
 ------------------------------ |  -------------------------------------------------------------------------------------------------------|---------------------------------- |
| from                    | 0 |  Number to count from                                                                                         |
| to              | **REQUIRED**                             | Number to count to                                                                                                |
| interval                   | 1000                 | Total amount of milliseconds the counting should take                                                                                                                       |
| slowDownEnabled             | false                            | Toggles whether the counter should count more slowly as it approaches the target value or not                                                                                                |
|   slowDownInterval             | 600                          | Total amount of milliseconds the slow counting should take                                                                                            |
| slowDownDistance                    | 5                           | The number away from target value when the slow counting should begin                         |
| style                   | {}                           | Style for the text component                                                                                                                       |
| containerStyle                  | {}                        | Style for the container component
| onComplete                  | () => {}                        | Callback for when the counting has completed    

