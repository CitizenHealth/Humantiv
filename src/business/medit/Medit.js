import {
  AppleHealth,
  HumanAPI
} from "./sources";

// Strategy pattern
class Medit {
  constructor() {
  }
  
  getMedits(steps, stepsTimestamp, stepsTimestampValue,strategy) {
    return new Promise( (resolve, reject) => {
      let totalMedits = 0;
      
      if (stepsTimestamp) {
        let stepMedits = getStepMedits(steps, stepsTimestamp, stepsTimestampValue,strategy)
        // Generate Medits
        totalMedits += parseInt(stepMedits.medits);
        if (parseInt(stepMedits.medits) > 0) {
          this.props.dataAdd({type: "wallet", item: "medits", data: totalMedits});
          // Add medit to feed
          const story = {
            title: "Your steps earned you",
            preposition: "",
            value: `${stepMedits.medits} Medits`,
            time: Math.round((new Date()).getTime() / 1000),
            type: "stepsmedits"
          }
          this.props.addFeedStory(story);
        }
        this.props.dataSave({type: "timestamps", data: {
          steps: stepMedits.timestamp,
          steps_value: stepMedits.value
        }});
      } else {
        this.setTimestamp('steps', steps);
      }
    });
  }
}

export {Medit}                   
