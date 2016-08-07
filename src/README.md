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