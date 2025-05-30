import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";

const LoginScreen = ({ setValue }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Check if fields are filled
    if (!username.trim() || !password.trim()) {
      setError("Please fill in both username and password");
      return;
    }

    try {
      const payload = {
        email: username.startsWith("01") ? "" : username,
        phone: username.startsWith("01") ? username : "",
        password,
      };

      setLoading(true);
      setError(null); // Clear any previous errors

      const res = await axios.post(
        "https://sjsc-backend-production.up.railway.app/api/v1/auth/teacher-login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );

      setLoading(false);

      if (res) {
        const id = res.data.data.id;
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("teacher-id", id.toString());
        setValue(res.data.token);
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("Invalid username or password");
          } else {
            setError(`Server error: ${error.response.status}`);
          }
        } else if (error.request) {
          setError("Network error - please check your connection");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        console.log(error);
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://assets.chorcha.net/cD1BAToGpTCAsSyWkFRlt.png" }}
        style={styles.logo}
      />
      <Text style={styles.schoolName}>
        St. Joseph's School and College, Bonpara, Natore
      </Text>
      <Text style={styles.signInText}>Sign In</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Email/Phone <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone"
          placeholderTextColor="#A0A8B0"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#A0A8B0"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              type="feather"
              size={18}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.signInButton, loading && styles.signInButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size={20} color="#FFF" style={styles.loader} />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FAFA",
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 25,
    textAlign: "center",
    color: "#005E5E",
    lineHeight: 28,
  },
  signInText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4B8E8E",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#005E5E",
    paddingLeft: 10,
    marginBottom: 8,
  },
  required: {
    color: "#E82020",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#4B8E8E",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 40,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 16,
  },
  signInButton: {
    backgroundColor: "#005E5E",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  signInButtonDisabled: {
    backgroundColor: "#4B8E8E",
    opacity: 0.7,
  },
  signInButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loader: {
    marginRight: 10,
  },
  error: {
    backgroundColor: "#FFE6E6",
    color: "#A80000",
    marginVertical: 15,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
    fontSize: 14,
  },
});

export default LoginScreen;