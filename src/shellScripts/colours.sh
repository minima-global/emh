#!/usr/bin/bash

LETTERS=(0 1 2 3 4 5 6 7 8 9 A B C D E F)
declare -i NUMCOLOURS=10000
declare -i OUTERCOUNTER=0
declare -i INNERCOUNTER=0
while [ ${OUTERCOUNTER} -lt ${NUMCOLOURS} ]; do
    	INNERCOUNTER=0
	COLOUR='#'
	while [ ${INNERCOUNTER} -lt 6 ]; do
    		INDEX=$(shuf -i 0-15 -n 1)
    		COLOUR="${COLOUR}${LETTERS[INDEX]}"
    		INNERCOUNTER+=1
	done
	echo -n "'"
	echo -n ${COLOUR}
	echo -n "', "
    	OUTERCOUNTER+=1
done
echo
