# About the dist folder
After building the dist version of your project, the generated files are stored in this folder. You should keep it under version control.
#npm install other package
npm install XXXX --save-dev
#run webpack serve
npm run serve:dist
#ctrl + c stop the serve
ctrl + c
#deploy the static html to github gh-pages
git subtree push --prefix=dist origin gh-pages

#git deploy step
git add -A
git commit -m "comment"
git push

# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Auto-run unit tests on file changes
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy