#!/usr/bin/env bash
#!/usr/bin/env bash
#title           :start_ios_android.sh
#description     :This script .
#author		     :Nabyl Bennouri
#date            :20191021
#version         :0.3   
#usage		     :./start_ios_android.sh
#notes           :Install Android Studio to use this script.
#bash_version    :3.2.57(1)-release
#==============================================================================

cmd="$HOME/Library/Android/sdk/emulator/emulator"
listCmd="$cmd -list-avds"
selectCmd="$cmd -avd"

output=$($listCmd)

echo ""

title="# If there are no emulators in the list then please create one in Android Studio:"
prompt="Pick an Android emulator:"

SAVEIFS=$IFS   # Save current IFS
IFS=$'\n'      # Change IFS to new line
options=($output) # split to array $listCmd
IFS=$SAVEIFS   # Restore IFS

tput setaf 2; 
echo "$title"
tput setaf 0;

PS3="$prompt "
{
select opt in "${options[@]}" "Quit"; do 
  if [[ $REPLY -lt ${#options[@]}+1 && $REPLY -gt 0 ]]; then  
    tput setaf 4;
    echo "Starting app on Android simulator for $opt ...";
    tput setaf 0;
    $selectCmd $opt &
    break;
  elif [[ $REPLY -eq ${#options[@]}+1 ]]; then
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

