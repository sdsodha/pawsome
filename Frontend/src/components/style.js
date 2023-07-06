import { StyleSheet } from 'react-native';

/* Color Codes :
 #9c92da - Light Purple (Primary Color)
 */
 
const primaryColor = '#9c92da';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
        
      },
      fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:'90%',
        
        
      },
      mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:primaryColor
        
      },
      
      bgColor:{
          backgroundColor:'red',
      },
      input: {
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
        },
        heading: {
            fontSize:20,
            marginBottom:10

        },
        label: {
            margin:5,
            justifyContent: 'center',
            alignItems: 'center',
            // color:'white',
            // backgroundColor:'red',
            padding:10
        }, 
        buttonContainer: {
            width: '95%',
            justifyContent: 'left',
            alignItems: 'center',
            // borderWidth:5,
            // borderColor:'red',
            marginRight:50,
            marginLeft:50,

           
            
          },
          button: {
            
            backgroundColor: primaryColor,
            color: 'white',
            padding: 16,
            borderRadius: 5,
          },
          buttonActive: {
            backgroundColor: primaryColor,
            
            
            padding: 8,
            borderRadius: 5,
          },
          
          buttonOutline: {
            backgroundColor: 'white',
            marginTop: 5,
            borderColor: '#0782F9',
            borderWidth: 2,
          },
          buttonText: {
            color: 'white',
            
            fontSize: 10,
          },
        inputContainer: {
            width: '90%',
            marginLeft:20,
            marginRight:20
          },
        mainLogo: {
            width:'50%',
            resizeMode: 'contain',
            justifyContent: 'flex-start'
            
          },
        logo: {
            
            width:'50%',
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems:'center'
          },
        buttonOutlineText: {
            color: '#0782F9',
            fontWeight: '700',
            fontSize: 16,
          },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
        },
        fieldContainer: {
            marginBottom: 15,
            width: '80%',
        },
        picker: {
          borderWidth: 1,
          borderColor: '#ccc',
      },
     
      pictureContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
      },
      pictureItem: {
          width: '20%',
          marginBottom: 16,
          alignItems: 'center',
      },
      picture: {
          width: 100,
          height: 100,
      },
      pictureLabel: {
          marginTop: 8,
      },
      buttonText: {
        
        fontWeight: '700',
        fontSize: 16,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    


});

export default styles;