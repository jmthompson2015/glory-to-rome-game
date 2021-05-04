export INPUT="/Volumes/StorageDrive/jmthompson/Dropbox/Game/Board Game/Glory to Rome/Glory to Rome Images"
export OUTPUT="/Volumes/StorageDrive/jmthompson/git/glory-to-rome-game/resource/v2.0"

rm -rf ${OUTPUT}
mkdir ${OUTPUT}
mkdir ${OUTPUT}/bonusCard
mkdir ${OUTPUT}/orderCard
mkdir ${OUTPUT}/siteCard

sips --resampleWidth 250 "${INPUT}"/Misc/*.png --out ${OUTPUT}/bonusCard
sips --resampleWidth 250 "${INPUT}"/OrderCards/*.png --out ${OUTPUT}/orderCard
sips --resampleWidth 250 "${INPUT}"/Sites/*.png --out ${OUTPUT}/siteCard
