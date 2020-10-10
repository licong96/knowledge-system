read -p "INPUT YOUR COMMIT DESCRIPTION: " inputCommit
# need reset
commit="H5 -> newYearBag "
if [ "$inputCommit" != "" ]
then
  commit+=" -> $inputCommit"
fi

echo "GIT COMMIT IS : $commit"

gitFidderPath="/Users/cassli/Desktop/vipjr/VPage/"
fidderPath="landingpage/h5/"
# need reset
fidderName="newYearBag/"
distFidderPath="$gitFidderPath$fidderPath$fidderName"


rm -rf "$distFidderPath"
mkdir "$distFidderPath"

cp -a ./build/ "$distFidderPath"
cd "$gitFidderPath"

git pull

git add "$fidderPath$fidderName"

git commit -m "$commit"

git push