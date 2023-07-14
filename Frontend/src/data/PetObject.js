

const Pets = [
    {
        id: 0,
        type: "Cat",
        imageSrc: require("../../assets/happy_cat.png"),
        animSrc: {}
    },
    {
        id: 1,
        type: "Owl",
        imageSrc: require("../../assets/happy_owl.png"),
        animSrc: {
            happyAnim: require("../../assets/owlVideos/owl-happy.mp4"),
            okAnim: require("../../assets/owlVideos/owl-ok.mp4"),
            sadAnim: require("../../assets/owlVideos/owl-sad.mp4"),
        }
    },
    {
        id: 2,
        type: "Pig",
        imageSrc: require("../../assets/happy_pig.png"),
        animSrc: {
            happyAnim: require("../../assets/pigVideos/pig-happy.mp4"),
            okAnim: require("../../assets/pigVideos/pig-ok.mp4"),
            sadAnim: require("../../assets/pigVideos/pig-sad.mp4"),
        }
    },
]

const PetPrompts = {
    sadStateText: "NAME is feeling hungry and thirsty and was missing you, feed to improve NAME’s mood and increase health",
    okStateText: "NAME is feeling fine, feed to make NAME happy",
    happyStateText: "NAME is feeling good, keep up the good work",
    petLeftText: "Your Pet has left you, but you can bring it back by doing any activity 50 times 3 days in a row"
} 

export {Pets, PetPrompts};