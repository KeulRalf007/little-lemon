// app/onboarding.tsx
import { Colors } from "@/constants/theme";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { globalStyles } from '@/styles/globalStyles';
import { router } from "expo-router";
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { useProfile } from "../context/ProfileContext";
import { validateEmail, validateNonEmptyString } from '../utils/validateEmail';

export default function Onboarding() {

	const colorScheme = useColorScheme();
	const colorTheme = Colors[colorScheme];

	const { setProfile } = useProfile();
	const [firstName, setFirstName] = React.useState('');
	const [email, setEmail] = React.useState('');


	const hasLeftIcon = false; // Set to true to show left icon in header

	return (


		<KeyboardAvoidingView
			style={globalStyles.onboardingContainer}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			{/* Logo at the top */}
			<Image
				source={require("../images/Logo.png")}
				style={globalStyles.headerLogo}
			/>

			{/* Centered content */}
			<View style={globalStyles.onboardingContent}>
				<Text style={globalStyles.onboardingHeaderText}>Let us get to know you</Text>

				<TextInput
					style={globalStyles.onboardingInput}
					value={firstName}
					onChangeText={setFirstName}
					placeholder="First Name"
				/>
				<Text style={globalStyles.inputCorrection}>
					{firstName && !validateNonEmptyString(firstName)
						? "Use alphabetical letters, not numbers or special characters"
						: ""}
				</Text>

				<TextInput
					style={globalStyles.onboardingInput}
					value={email}
					onChangeText={setEmail}
					placeholder="Email"
					keyboardType="email-address"
				/>
				<Text style={globalStyles.inputCorrection}>
					{email && !validateEmail(email) ? "Use valid Email Addresses" : ""}
				</Text>

				<Pressable
					style={[
						globalStyles.onboardingButton,
						{
							backgroundColor:
								validateNonEmptyString(firstName) && validateEmail(email)
									? "#495E57"
									: "#B7B7B7",
						},
					]}
					disabled={!(validateNonEmptyString(firstName) && validateEmail(email))}
					onPress={() => {
						setProfile({ firstName, email });
						router.replace("/home");
					}}
				>
					<Text style={globalStyles.onboardingButtonText}>Next</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>

	);
};

