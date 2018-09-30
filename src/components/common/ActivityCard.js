import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  Image
} from "react-native";
import { 
    theme, 
    primaryGreyColor,
    primaryBlueColor, 
    graphGreenColor,
    graphOrangeColor,
    graphRedColor,
    graphGreyColor,
    ActivityFeedTypes
} from '../themes';
import PropTypes from 'prop-types';
import {Fonts} from '../../resources/fonts/Fonts';
import {Icon} from './Icon';



class ActivityCard extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    preposition: PropTypes.string,
    time: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    type: ActivityFeedTypes.Community.Announcement,
    title: "",
    value: "",
    preposition: "",
    time: "",
    width: 200,
    height: 200
  }

  constructor(props) {
    super(props);
  }

  cardImage() {
    const {title} = this.props;

    
    
    switch(title) {
      case "Your steps earned you": {
          return "medit";
      }
      case "Your activity earned you": {
          return "runner";
      }
      case "Your sleep earned you": {
          return "sleep";
      }
      default: {
          return "medit";
      }
    }
    // switch(type) {
    //     case ActivityFeedTypes.Vital.HeartRate: {
    //         return "heart_rate";
    //     }
    //     case ActivityFeedTypes.Activity.Run: {
    //         return "runner";
    //     }
    //     case ActivityFeedTypes.Activity.Swim: {
    //         return "swimmer";
    //     }
    //     case ActivityFeedTypes.Activity.Score: {
    //         return "thumbs_up_green";
    //     }
    //     case ActivityFeedTypes.Activity.Workout: {
    //         return "bench";
    //     }
    //     case ActivityFeedTypes.Wallet.Medits:
    //     case ActivityFeedTypes.Wallet.ActivityMedits:
    //     case ActivityFeedTypes.Wallet.SleepMedits:
    //     case ActivityFeedTypes.Wallet.StepsMedits: {
    //         return "medit";
    //     }
    //     case ActivityFeedTypes.Wallet.Medex: {
    //         return "medex";
    //     }
    //     case ActivityFeedTypes.Health.Workout: {
    //       return "bench";
    //     }
    //     case ActivityFeedTypes.Health.Sleep: {
    //       return "sleep";
    //     } 
    //     case ActivityFeedTypes.Health.Weight: {
    //       return "weight";
    //     } 
    //     default: {
    //         return "";
    //     }
    // }
  }

  cardColor() {
    const {type} = this.props;

    switch(type) {
        case ActivityFeedTypes.Vital.HeartRate:
        case ActivityFeedTypes.Wallet.StepsMedits:  {
            return "#f15b58";
        }
        case ActivityFeedTypes.Activity.Run:
        case ActivityFeedTypes.Wallet.ActivityMedits: {
            return "#36d391";
        }
        case ActivityFeedTypes.Activity.Swim: {
            return "#58d9f5";
        }
        case ActivityFeedTypes.Activity.Score: {
            return "green";
        }
        case ActivityFeedTypes.Activity.Workout: {
            return "#ffbf6c";
        }
        case ActivityFeedTypes.Wallet.Medits: {
            return primaryBlueColor;
        }
        case ActivityFeedTypes.Wallet.Medex: {
          return "#35d392";
        }
        case ActivityFeedTypes.Health.Workout: {
          return "#ffae45";
        }
        case ActivityFeedTypes.Health.Sleep:
        case ActivityFeedTypes.Wallet.SleepMedits: {
          return "#9b59b6";
        }
        case ActivityFeedTypes.Health.Weight: {
          return "#1abc9c";
        }     
        default: {
            return "#000";
        }
    }
  }

  render() {
    const {
        cardStyle,
        iconContainerStyle,
        valueContainerStyle,
        textContainerStyle,
        messageContainerStyle,
        titleStyle,
        prepositionStyle,
        timeContainerStyle,
        valueStyle,
        timeStyle
    } = styles;

    const {
        title,
        value,
        preposition,
        time,
        width,
        height
    } = this.props;

    return (
    <View style={[cardStyle, {
          width: width,
          height: height
      }]}>
        <View style={[iconContainerStyle, {
            width: height,
            height: height
        }]}>
            <Icon 
                name={this.cardImage()}
                color= {this.cardColor()}
                size= {25}
            />
        </View>
        <View style={textContainerStyle}>
            <View style={messageContainerStyle}>
                <Text style={titleStyle}>
                    {title}
                </Text>
                <Text style={[
                  prepositionStyle,
                  {
                    marginLeft: (preposition.length !== 0) ? 4 : 0
                  }
                ]}>
                    {preposition}
                </Text>
                <Text style={
                    [valueStyle,
                    {color: this.cardColor()}]}>
                    {value}
                </Text>
            </View>
            <View style={timeContainerStyle}>
                <Text style={timeStyle}>
                    {time}
                </Text>
            </View>
        </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "#ddd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1
  },    
  iconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ddd',
    borderRightWidth: 1
  },
  valueContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerStyle: {
    flex: 1,
    marginLeft: 10,
  },
  messageContainerStyle: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'flex-end',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'bottom',
    color: graphGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 4,
  },
  prepositionStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'bottom',
    fontFamily: Fonts.regular,
    color: primaryGreyColor
  },
  timeContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  timeStyle: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: -5,
    textAlignVertical: 'bottom',
    fontFamily: Fonts.regular,
    color: primaryGreyColor,
    marginLeft: 4
  },
  valueStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'bottom',
    fontFamily: Fonts.regular,
    marginLeft: 4
  },
});

export { ActivityCard };
