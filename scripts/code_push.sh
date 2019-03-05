#!/usr/bin/env bash

echo Do you want to display the keys or deploy? [display/deploy]
read option
echo What platform? [ios/android]
read os
while [ $os -ne 'ios' ] && [$os -ne 'android']
do
	read os
done

if [ $option == 'display' ]
then
	if [ $os == 'ios' ]
	then
		# Display app Keys
		appcenter codepush deployment list -a Citizen-Health/Humantiv --displayKeys
	elif [ $os == 'android' ]
	then
		# Display app Keys
		appcenter codepush deployment list -a Citizen-Health/Humantiv-1 --displayKeys
	fi	
elif [ $option == 'deploy' ]
then
	if [ $os == 'ios' ]
	then
		# Deploy iOS app
		appcenter codepush release-react -a Citizen-Health/Humantiv -d Production
	elif [ $os == 'android' ]
	then
		# Deploy Android app
		appcenter codepush release-react -a Citizen-Health/Humantiv-1 -d Production
	fi
else
	# Display app Keys
	echo Bad argument. Only 'display' and 'deploy' are accepted.
fi
