import React from 'react'

import { TestIds, BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';

export default class App extends React.Component{

	showInterstitialAd = () => {
		// Create a new instance
		const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
	
		// Add event handlers
		interstitialAd.onAdEvent((type, error) => {
			if (type === AdEventType.LOADED) {
				interstitialAd.show();
			}
		});
	
		// Load a new advert
		interstitialAd.load();
	}

	showRewardAd = () => {
        // Create a new instance
        const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);

        // Add event handlers
        rewardAd.onAdEvent((type, error) => {
            if (type === RewardedAdEventType.LOADED) {
                rewardAd.show();
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of 5 lives');
                Alert.alert(
                    'Reward Ad',
                    'You just earned a reward of 5 lives',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                  )
            }
        });

        // Load a new advert
        rewardAd.load();
    }

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} >
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginVertical: 20 }} >
					<View style={styles.contentContainer} >
						<Text style={styles.header} >Banner Ads</Text>
						<View style={styles.divider} />

						<View style={styles.infoBox} >
							<Text style={styles.infoText} >
								Banner Ads are usually shown by default on bottom of the page.
								You can select the position as you like. You can even display 
								multiple banner ads per page.
							</Text>
						</View>
					</View>
					
					<View>
						<BannerAd
							unitId={TestIds.BANNER}
							size={BannerAdSize.SMART_BANNER}
							requestOptions={{
								requestNonPersonalizedAdsOnly: true
							}}
							onAdLoaded={() => console.log('Advert loaded')}
							onAdFailedToLoad={(error) => {
								console.error('Advert failed to load: ', error)
							}}
						/>
					</View>
					
					<View style={styles.contentContainer} >
						<Text style={styles.header} >Interstitial Ads</Text>
						<View style={styles.divider} />

						<View style={styles.infoBox} >
							<Text style={styles.infoText} >
								Interstitial ads are full-screen ads that cover 
								the interface of their host app. You should display 
								them at natural transition points in the flow of an app.
							</Text>
						</View>

						<View>
							<TouchableOpacity style={styles.btnStyle} onPress={this.showInterstitialAd} >
								<Text style={styles.btnText}>Interstitial Ad On Click</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={styles.contentContainer} >
						<Text style={styles.header} >Reward Ads</Text>
						<View style={styles.divider} />

						<View style={styles.infoBox} >
							<Text style={styles.infoText} >
								Reward Ads are similar to interstitial ads in the trigger 
								mechanism.
							</Text>
						</View>

						<View>
							<TouchableOpacity style={styles.btnStyle} onPress={this.showRewardAd} >
								<Text style={styles.btnText} >Reward Ad On Click</Text>
							</TouchableOpacity>
						</View>
					</View>

				</ScrollView>

			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		margin: 20 
	},
	header: {
		fontWeight: 'bold',
		fontSize: 30
	},
	divider: {
		width: '100%',
		height: 2, 
		backgroundColor: '#000',
		marginBottom: 20
	},
	infoBox: {
		backgroundColor: '#fff',
		borderRadius: 20, 
		elevation: 5,
		marginHorizontal: 5,
		paddingHorizontal: 10,
		paddingVertical: 15
	},
	infoText: {
		fontSize: 15
	},
	btnStyle: {
		marginVertical: 20,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 7,
		backgroundColor: '#0bc4d9'
	},
	btnText: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		elevation: 5
	}
})