#!/bin/bash

result=${PWD##*/} 

set -o errexit # Exit on error

cd ..
ls | grep -v $result | xargs rm -rf

echo "Cleaned." 

exit 0