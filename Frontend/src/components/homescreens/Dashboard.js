import { StyleSheet,Dimensions, Text, View } from 'react-native'
import React from 'react'
// //import {ChartComponent} from './Chart'
 import { LineChart,BarChart } from 'react-native-chart-kit';
 import { render } from 'react-dom/cjs/react-dom.production.min';
 import styles from '../style'


const windowWidth = Dimensions.get("window").width-35;



const Dashboard = () => {
    const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 83],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // customize the line color
        strokeWidth: 10 // optional, defaults to 3
      }
    ],
    
  };

  return (
    <View style={styles.container}>
      <BarChart
  // style={graphStyle}
  data={data}
  width={windowWidth}
  height={220}
  yAxisLabel="$"
  chartConfig={{
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '8',
      strokeWidth: '5',
      stroke: '#9c92da'
    }
  }}
  bezier
  style={{
    marginVertical: 5,
    borderRadius: 15
  }}
  verticalLabelRotation={0}
/>
      <LineChart
        data={data}
        width={windowWidth} // width of the chart
        height={220} // height of the chart
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '8',
            strokeWidth: '2',
            stroke: '#9c92da',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}

export default Dashboard

// const styles = StyleSheet.create({})




// const ChartComponent = () => {
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 99, 43],
//         color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // customize the line color
//         strokeWidth: 2 // optional, defaults to 3
//       }
//     ]
//   };

//   return (
//     <View>
//       <LineChart
//         data={data}
//         width={300} // width of the chart
//         height={220} // height of the chart
//         chartConfig={{
//           backgroundColor: '#e26a00',
//           backgroundGradientFrom: '#fb8c00',
//           backgroundGradientTo: '#ffa726',
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16
//           },
//           propsForDots: {
//             r: '6',
//             strokeWidth: '2',
//             stroke: '#ffa726'
//           }
//         }}
//         bezier
//         style={{
//           marginVertical: 8,
//           borderRadius: 16
//         }}
//       />
//     </View>
//   );
// };

// export default ChartComponent;