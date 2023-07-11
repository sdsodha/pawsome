

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

export {Pets};