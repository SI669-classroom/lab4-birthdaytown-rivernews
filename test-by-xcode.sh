# rm -rf platforms

# ionic cordova build ios --buildConfig build.json && \
# ionic cordova build ios --prod
ionic cordova run ios --device

open -a Xcode platforms/ios

