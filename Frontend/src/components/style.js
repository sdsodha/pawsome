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
    marginTop: 20

  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',


  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor

  },

  bgColor: {
    backgroundColor: 'red',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,


  },
  // input:hover{
  //   border:solid blue 1px,
  // },

  heading: {
    fontSize: 20,
    marginBottom: 10

  },
  welc: {
    fontSize: 20,
  },
  label: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    //  color:'white',
    //     backgroundColor:primaryColor,   
    fontSize: 20,

    padding: 10
  },
  buttonContainer: {
    display: 'flex',

    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
    // borderWidth:5,
    // borderColor:'red',
    // marginRight:50,




  },
  //   startActivityButtonContainer: {

  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     // marginTop: 35,
  //     width: 100,
  //     borderRadius: 8,
  //     backgroundColor: '#37298A'
  // },
  // startActivityButton: {

  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#6A5ACD',
  //     fontSize: 18,
  //     width: 100,
  //     border: '#9c92da 1px',
  //     borderRadius: 8,
  //     padding: 10,

  // },
  loginButton:{
    marginBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    color:'white',
   backgroundColor: '#6A5ACD',   
    fontSize:20,
    width:100,
    border: '#9c92da 1px',
    borderRadius:8,
    padding:10,
 

  },
  loginButtonContainer: {
    display:'flex',
    justifyContent: 'center',
      alignItems: 'center',
      color:'white',
      marginTop: 35,
      marginLeft:140,
      width: 100,
      borderRadius: 8,
      backgroundColor: '#37298A'    
    },
    registerButton:{
      marginBottom:5,
      justifyContent: 'center',
      alignItems: 'center',
      color:'white',
     backgroundColor: '#6A5ACD',   
      fontSize:20,
      width:100,
      border: '#9c92da 1px',
      borderRadius:8,
      padding:10,
   
  
    },
    registerButtonContainer: {
      display:'flex',
    
      justifyContent: 'center',
        alignItems: 'center',
        color:'white',
        marginTop: 35,
        marginLeft:10,
        width: 100,
        borderRadius: 8,
        backgroundColor: '#37298A'    
      },
      googleButtonContainer:{
        // display:'flex',
        flexDirection:'row'
      },
  googleButton: {
    flexDirection:'row',
    margin: 5,
    marginLeft:70,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'white',
    fontSize: 20,
    width: 250,
    border: '#9c92da 1px',
    borderRadius: 10,
    padding: 10,
   

  },
  recoverButton:{
    marginBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    color:'white',
   backgroundColor: '#6A5ACD',   
    fontSize:20,
    width:200,
    border: '#9c92da 1px',
    borderRadius:8,
    padding:10,
 

  },
  recoverButtonContainer: {
    display:'flex',
    justifyContent: 'center',
      alignItems: 'center',
      color:'white',
      marginTop: 35,
      marginLeft:40,
      width: 200,
      borderRadius: 8,
      backgroundColor: '#37298A'    
    },
  signtext:{
              
             
               
    justifyContent: 'center',
    textAlign: 'center',
  
  },
  google:{
    width:20,
    height:20,
    marginRight: 10,
  },

  button: {


    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: primaryColor,


    padding: 10
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
    display: 'flex',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 500,



    fontSize: 10,
  },
  inputContainer: {
    width: '90%',
    margin: 20,

  },
  mainLogo: {
    width: '50%',
    resizeMode: 'contain',
    justifyContent: 'flex-start'

  },
  logo: {
    width:'25%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:50,
    marginTop:50
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