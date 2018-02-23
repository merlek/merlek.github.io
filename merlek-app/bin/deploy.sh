#!/bin/bash

set -o errexit # Exit on error

git stash save 'Before deploy' # Stash all changes before deploy
git checkout master
git merge develop --no-edit # Merge in the master branch without prompting
npm run build # Generate the bundled Javascript and CSS

./bin/clean.sh
mv dist/* ../

if $(git commit -am Deploy); then # Commit the changes, if any
  echo 'Changes Committed'
fi

git push origin master # Deploy to Heroku
git checkout develop # Checkout master again
git stash pop # And restore the changes

exit 0