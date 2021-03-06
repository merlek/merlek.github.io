#!/bin/bash

set -o errexit # Exit on error

git stash save 'Before deploy' # Stash all changes before deploy
git checkout master
git merge develop --no-edit # Merge in the develop branch without prompting
npm run build # Generate the bundled Javascript and CSS

./bin/clean.sh
mv dist/* ../

git add -A
if $(git commit -m 'Deploy'); then # Commit the changes, if any
  echo 'Changes Committed'
fi

git push origin master # Deploy to Heroku
git checkout develop # Checkout master again
git merge master --no-edit # Merge in the master branch without prompting
git push origin develop

set +o errexit # Exit on error

git stash pop # And restore the changes

exit 0