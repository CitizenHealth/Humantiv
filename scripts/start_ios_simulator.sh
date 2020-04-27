#!/usr/bin/env bash
#title           :start_ios_simulator.sh
#description     :This script .
#author		       :Nabyl Bennouri
#date            :20191021
#version         :0.1   
#usage		       :./start_ios_simulator.sh
#notes           :Install Xcode to use this script.
#bash_version    :3.2.57(1)-release
#==============================================================================

cmd="xcrun simctl"
deleteUnavailableCmd="$cmd delete unavailable"
listCmd="$cmd list"
selectCmd="$cmd boot"

$deleteUnavailableCmd
output=$($listCmd)

echo ""

title="# iOS simulators available"
prompt="Pick an iOS simulator:"

SAVEIFS=$IFS   # Save current IFS
IFS=$'\n'      # Change IFS to new line
options=($output) # split to array $listCmd
IFS=$SAVEIFS   # Restore IFS

tput setaf 2;
echo "$title"
tput setaf 0;

## now loop through the devices array and only keep the available devices
endDelimiter='== Device Pairs ==';
startDelimiter='== Devices ==';
SAVEIFS=$IFS;   # Save current IFS
IFS=$'\n';      # Change IFS to new line
deviceIds=();
startGatheringDevices=0;
index=0
for i in "${!options[@]}"; do
  if [[ "${options[$i]}" = "${startDelimiter}" ]]; then
    startGatheringDevices=1;
  fi
  if [[ "${options[$i]}" = "${endDelimiter}" ]]; then
    break;
  fi
  if [[ $startGatheringDevices = 1 && ${options[$i][0]} != --* ]]; then
    option="$(echo -e "${options[$i]}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
    REGEXP_LONG='([^\(\[]+)\(([^\(]+)\)( )\(([^\)]+)\)( )\(([^\(]+)\)'
    REGEXP_SHORT='([^\(]+)\(([^\)]+)\)( )\(([^\)]+)\)'

    if [[ ${option} =~ $REGEXP_LONG ]]; then
      # Trim trailing and leading spaces
      IFS=$SAVEIFS   # Restore IFS
      LEFT_QUOTE="("
      RIGHT_QUOTE=")"
      trimDevice=${BASH_REMATCH[1]}
      trimDevice=$(echo $trimDevice | xargs)
      cmd="${trimDevice} ${LEFT_QUOTE}${BASH_REMATCH[2]}${RIGHT_QUOTE}"      
      withoutTrailingSpace=$(echo $cmd | tr -s " ")
      withoutTrailingSpace=${withoutTrailingSpace%% }
      withoutTrailingSpace=${withoutTrailingSpace## }

      device="$withoutTrailingSpace"
      deviceId=${BASH_REMATCH[3]}
      devices[index]=$device
      index=$((index+1))
      deviceIds+=($deviceId)
    elif [[ ${option} =~ $REGEXP_SHORT ]]; then
      # Trim trailing and leading spaces
      withoutTrailingSpace=$(echo "${BASH_REMATCH[1]}" | tr -s " ")
      withoutTrailingSpace=${withoutTrailingSpace%% }
      withoutTrailingSpace=${withoutTrailingSpace## }

      device="${withoutTrailingSpace}"
      deviceId=${BASH_REMATCH[2]}
      devices[index]=$device
      index=$((index+1))
      deviceIds+=($deviceId)
    else
      continue
    fi     
  fi
done
PS3="$prompt "
{
select opt in "${devices[@]}" "Quit"; do
    if [[ $REPLY -lt ${#devices[@]}+1 && $REPLY -gt 0 ]]; then  
      tput setaf 4;
      echo "Starting app on iOS simulator for $opt ...";
      tput setaf 0;
      cmd="react-native run-ios --simulator \"${opt}\""
      echo "CMD: ${cmd}"
      eval $cmd
      break;
    elif [[ $REPLY -eq ${#devices[@]}+1 ]]; then
      tput setaf 0; echo "Goodbye!";
      break;
    else 
      tput setaf 0; echo "Invalid option. Try another one.";
    fi
done
} || {
    echo "Failed"
    tput setaf 0;
}

