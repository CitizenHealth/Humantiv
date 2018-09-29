#!/bin/bash
# Nabyl Bennouri - 09/20/2018

# parse arguments
POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    -n|--name)
    SIMULATOR="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# debug
#echo FUNCTION  = "${FUNCTION}"

if [ "${SIMULATOR}" == "" ]
then
  echo "Missing simulator name. Please specify a simulator hame. Example: -n \"iPhone X\" or -n \"iPhone 6\" or -n android"
  exit
fi

echo "Running on \"${SIMULATOR}\" simulator ..."
if [ "${SIMULATOR}" == "android" ]
then
  react-native run-android
else
  echo react-native run-ios --simulator \"${SIMULATOR}\"
  react-native run-ios --simulator \"${SIMULATOR}\"
fi