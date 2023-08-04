import { StyleSheet,Dimensions, Text, View,ScrollView } from 'react-native'
import React,{useState} from 'react'
// //import {ChartComponent} from './Chart'
 //import { LineChart,BarChart } from 'react-native-chart-kit';
 //import { render } from 'react-dom/cjs/react-dom.production.min';
 import styles from '../style'
 import { VictoryBar,VictoryGroup, VictoryChart,VictoryArea, VictoryTheme,VictoryLabel,VictoryLegend,VictoryAxis } from "victory-native";
 import { Select } from 'native-base';
 //import DropDownPicker from 'react-native-dropdown-picker';
 import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get("window").width;

const allDays = [
  '2023-07-01', '2023-07-02', '2023-07-03', /* ... add more days here ... */
];

// Function to get a limited set of days for display
const getLimitedDays = (days, limit) => {
  const step = Math.ceil(days.length / limit);
  return days.filter((day, index) => index % step === 0);
};


const groupData = [
  { group: 'Sun', bar1: 90, bar2: 85,   bar3: 99, },
  { group: 'Mon', bar1: 75,  bar2: 90,  bar3: 95,},
  { group: 'Tue', bar1: 86,  bar2: 75,  bar3: 86, },
  { group: 'Wed', bar1: 95, bar2: 96,   bar3: 72,},
  { group: 'Thu', bar1: 90, bar2: 84,  bar3: 89, },
  { group: 'Fri', bar1: 82,  bar2: 80,  bar3: 94, },
  { group: 'Sat', bar1: 94,  bar2: 75,  bar3: 90,},
  // Add more groups here
];

const lineData = [
  { x: 1, y: 10 },
  { x: 2, y: 45 },
  { x: 3, y: 28 },
  { x: 4, y: 80 },
  { x: 5, y: 99 },
  { x: 6, y: 43 },
];



const Monthdata = [
  { x: '2023-07-01', y: 10 },
  { x: '2023-07-02', y: 15 },
  { x: '2023-07-03', y: 8 },
  { x: '2023-07-04', y: 14 },
  { x: '2023-07-05', y: 2 },
  { x: '2023-07-06', y: 10 },
  { x: '2023-07-07', y: 18 },
  { x: '2023-07-08', y: 9 },
  { x: '2023-07-09', y: 2 },
  { x: '2023-07-10', y: 13 },
  { x: '2023-07-11', y: 17 },
  { x: '2023-07-12', y: 1 },
  { x: '2023-07-13', y: 15 },
  { x: '2023-07-14', y: 19 },
  { x: '2023-07-15', y: 10 },
  { x: '2023-07-16', y: 5 },
  { x: '2023-07-17', y: 15 },
  { x: '2023-07-18', y: 8 },
  { x: '2023-07-19', y: 16 },
  { x: '2023-07-20', y: 5 },
  { x: '2023-07-21', y: 10 },
  { x: '2023-07-22', y: 17 },
  { x: '2023-07-23', y: 6 },
  { x: '2023-07-24', y: 14 },
  { x: '2023-07-25', y: 8 },
  { x: '2023-07-26', y: 18 },
  

 
];


const data = [
  { quarter: 'Sun', earnings: 95 },
  { quarter: 'Mon', earnings: 80 },
  { quarter: 'Tue', earnings: 87 },
  { quarter: 'Wed', earnings: 65 },
  { quarter: 'Thu', earnings: 50 },
  { quarter: 'Fri', earnings: 35 },
  { quarter: 'Sat', earnings: 90 }
];

const barWidth = 12;
const barRadius = 6;
const fillOpacity = 0.3;

const SolidHorizontalLine = () => {
  
  return (
  <View style={styles.horizontalLine} />
  );
};


const Dashboard = () => {

  const customTicks = getLimitedDays(allDays, 3);
  const [selectedValue, setSelectedValue] = useState(null);

  

  //const defaultValue = items.length > 0 ? items[0].value : null;

  return (
    <ScrollView >
     <View style={styles.container}>
     <VictoryChart height={250} animate={{ duration: 500, easing: "bounceIn" }}>
     <VictoryLegend
        x={10}
        y={-5}
        orientation="horizontal"
        gutter={15}
         style={{ /*border: { stroke: 'black' },*/ title: { fontSize: 14 } }}
        data={[
          { name: 'Arm Crossover',   symbol: { fill: "#6A5ACD"} },
          { name: 'Punching Air',  symbol: { fill: "#434C5F"} },
          { name: 'Shoulder Extension',  symbol: { fill: "#CD4768"} },
          // Add more legend items if you have more bars
        ]}
      />
      <VictoryAxis dependentAxis tickValues={[0,50,100]}/>
      <VictoryAxis 
      
     // tickFormat={[1, 7, 13, 19, 25, 31]}
       style={{
        axis: { stroke: 'black', strokeWidth: 4 },
        tickLabels: { fill: 'black', fontSize: 14}, // Style X-axis tick labels
      }}
      tickLabelComponent={<VictoryLabel dy={0} dx={5} />}
      />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.6 }
          }}
        >
         
          
          
          <VictoryArea
            style={{
              data: { fill: "#6A5ACD", stroke: "#6A5ACD" }
            }}
            data={[
              { x: 1, y: 50 },
              { x: 2, y: 66.5 },
              { x: 3, y: 83.5 },
              { x: 4, y: 95.5 },
              { x: 5, y: 77 }
            ]}
            interpolation="natural"
          />
         
          
          <VictoryArea
            style={{
              data: { fill: "#CD4768", stroke: "#CD4768" }
            }}
            data={[
              { x: 1, y: 85 },
              { x: 2, y: 76.5 },
              { x: 3, y: 93.5 },
              { x: 4, y: 65.5 },
              { x: 5, y: 97 }
            ]}
            interpolation="natural"
          />
           <VictoryArea
            style={{
              data: { fill: "#434C5F", stroke: "#434C5F" }
            }}
            data={[
              { x: 1, y: 65 },
              { x: 2, y: 96.5 },
              { x: 3, y: 73.5 },
              { x: 4, y: 65.5 },
              { x: 5, y: 67 }
            ]}
            interpolation="natural"
          />

        </VictoryGroup>
        
      </VictoryChart>
    
      
      <SolidHorizontalLine/>
      
      {/* <View style={styles.dropdownContainer}>
        <Text style={styles.dropdown}>Control 1</Text>
        <Text style={styles.dropdown}>Control 2</Text>

      </View> */}
     
    <View style={sty.container}>
    <View style={sty.control}>
      
     {/* <DropDownPicker
            items={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
              // Add more options as needed
              
            ]}
            
            defaultValue={selectedValue}
            placeholder="Select Option"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownStyle}
            textStyle={styles.dropdownTextWhite}
            onChangeItem={(item) => setSelectedValue(item.value)} // Update selectedValue state with the selected value
          />  */}


       {/* <DropDownPicker
       items={[
         { label: 'Option 1', value: 'option1' },
         { label: 'Option 2', value: 'option2' },
         { label: 'Option 3', value: 'option3' },
         // Add more options as needed
       ]}
       defaultValue={selectedValue}
       placeholder="Select Option"
       containerStyle={sty.dropdownContainer}
          style={sty.dropdown}
          itemStyle={sty.dropdownItem}
          dropDownStyle={sty.dropdownStyle}
          textStyle={sty.dropdownTextWhite}
          //arrowIcon={() => <Icon name="chevron-down" size={18} color="red" />}
          onChangeItem={(item) => setSelectedValue(item.value)}
    
     /> 
      */}
     </View> 
     <View style={sty.control}>

{/* <DropDownPicker
       items={[
         { label: 'Option 12', value: 'option12' },
         { label: 'Option 22', value: 'option22' },
         { label: 'Option 33', value: 'option33' },
         // Add more options as needed
       ]}
       defaultValue={selectedValue}
       placeholder="Select Option"
       containerStyle={sty.dropdownContainer}
          style={sty.dropdownOutlined}
          itemStyle={sty.dropdownItem}
          dropDownStyle={sty.dropdownStyle}
          textStyle={sty.dropdownTextBlack}
          onChangeItem={(item) => setSelectedValue(items.value)}
     /> */}
     </View>
     
      </View> 
      


    
      <VictoryChart domainPadding={{ x: 25 }} padding={40} height={250} animate={{ duration: 500, easing: "bounceIn" }}>
      <VictoryLegend
        x={40}
        y={-5}
        orientation="horizontal"
        gutter={70}
         style={{ /*border: { stroke: 'black' },*/ title: { fontSize: 14 } }}
        data={[
          { name: 'Food',   symbol: { fill: "#6A5ACD"} },
          { name: 'Treat',  symbol: { fill: "#434C5F"} },
          { name: 'Water',  symbol: { fill: "#CD4768"} },
          // Add more legend items if you have more bars
        ]}
      />
      {<VictoryAxis
        tickValues={data.map((d) => d.group)}
        tickFormat={(group) => `${group}`}
      />}
      
      <VictoryAxis dependentAxis tickValues={[0,50,100]}/>
      
      <VictoryGroup offset={13.5} >
        <VictoryBar
          cornerRadius={barRadius}
          data={groupData}
          x="group"
          y="bar1"
          barWidth={barWidth} 
          style={{ data: { fill: '#6A5ACD' } }}
        />
        <VictoryBar
          cornerRadius={barRadius}
          data={groupData}
          x="group"
          y="bar2"
          barWidth={barWidth} 
          style={{ data: { fill: '#434C5F' } }}
        />
        <VictoryBar
          cornerRadius={barRadius}
          data={groupData}
          x="group"
          y="bar3"
          barWidth={barWidth} 
          style={{ data: { fill: '#CD4768' } }}
        />
        {/* Add more VictoryBar components for additional bars */}
      </VictoryGroup>


     
     
    </VictoryChart>

    <SolidHorizontalLine/>

    <VictoryChart animate={{ duration: 500, easing: "bounceIn" }} domainPadding={{ x: 10 }} padding={35}  height={250}  // Adjust padding for the chart
      >
    <VictoryAxis dependentAxis 
    tickValues={[0,5,10,15,20]}
     style={{
      axis: { stroke: 'black', strokeWidth: 2 },
    }} />
    <VictoryAxis 
      //tickValues={customTicks} // Use custom X-axis ticks
      //tickFormat={(tick) => `${tick.split('-')[2]}-Jul`} // Format the day and add '-Jul'
        tickFormat={[1, 7, 13, 19, 25, 31]}
        fixLabelOverlap={true}
        style={{
          axis: { stroke: 'black', strokeWidth: 2 },
          //ticks: { stroke: 'black', size: 5 }, // Style X-axis tick marks
          tickLabels: { 
            fill: 'black', 
            fontSize: 14,
            padding: 5
          },
        }}

       
       
        

        // tickLabelComponent={
        //   <VictoryLabel 
        //     dy={10}
        //     textAnchor="middle" // Center the label horizontally
        //     verticalAnchor="start" // Position the label above the tick mark
        //   />
        // }
        //tickLabelComponent={<VictoryLabel dy={0} dx={5} style={{ marginRight:30,fill:'red'}}/>}
        />
        
        
        <VictoryBar
          data={Monthdata}
          x="x"
          cornerRadius={barRadius}
          barWidth='10' 
          
          y="y"
          // Customize bar style if needed
          style={{
            data: {
              fill: '#6A5ACD',
              width: 0, // Customize the width of each bar
            },
          }}
        />
      </VictoryChart>
    
    

      

        {/* <VictoryChart width={windowWidth} theme={VictoryTheme.material} height={250} domainPadding={{ x: 20, y: 0 }} padding={40} >
     
       
         
           <VictoryBar
          cornerRadius={10}
          style={{
            data: { fill: "#6A5ACC" },
            labels: { fontSize: 16 },
            parent: { border: "1px solid #ccc" }
          }}
          //  style={{ data: { fill: "#6A5ACC" } }}
          data={data} x="quarter" y="earnings" />
        
        </VictoryChart> */}
        </View>
      
   
    </ScrollView>
  );
}

export default Dashboard
const sty = StyleSheet.create({
  container: {
    flexDirection: 'row',
    color:'white',
  },
  control: {
    flex: 1,
    padding: 0,
    
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    alignContent:'flex-start',
    
    
  },
  dropdownContainer: {
    height: 60,
    borderWidth: 0,
    backgroundColor: '#37298A',
    borderColor: '#6A5ACD',
    borderRadius: 8,
    overflow: 'hidden',
    color:'white',
    width:'75%',
    
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    zIndex: 1,
    
    
    
  },
  dropdown: {
    backgroundColor: '#6A5ACD',
    flex:0,
    alignSelf:'auto',
    width:'100%',
    borderColor: '#6A5ACD',
  },
  dropdownOutlined: {
    flex:0,
    alignSelf:'auto',
    width:'100%',
    borderColor: '#6A5ACD',
    borderWidth:1,
  },
  dropdownTextWhite: {
    color: 'white',
    fontWeight:'500' 
  },
  dropdownTextBlack: {
    color: '#3F495D',
    fontWeight:'500' 
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    color:'white',
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
    color:'white',
    zIndex: 2,
  },
 
});







