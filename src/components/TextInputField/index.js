// Custom Text Input
const TextInputField = props => (
    <>
        <View style={textInputStyles.textInputParent}>
            <Image
                resizeMode="cover"
                style={textInputStyles.imageStyle}
                source={props.source}
            />
            <View style={textInputStyles.textInputParentInner}>
                <TextInput
                    autoCapitalize="none"
                    style={textInputStyles.textInput}
                    placeholderTextColor={Color.black}
                    underlineColorAndroid={'transparent'}
                    {...props}
                />
                {props.eye && (
                    <Pressable onPress={props.onPress}>
                        <Image
                            resizeMode="cover"
                            style={textInputStyles.imageStyle}
                            source={eyeImage}
                        />
                    </Pressable>
                )}
            </View>
        </View>
        {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
    </>
)

export default TextInputField