import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
 import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import authScreenAtom from "../atoms/authAtom";
import { useSetRecoilState } from "recoil";
import axios from 'axios'
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [submitting, setSubmitting]= useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	 const setUser = useSetRecoilState(userAtom);
     const showToast=useShowToast();
	// const handleSignup = async () => {
	// 	try {
	// 		const res = await fetch("/api/users/signup", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(inputs),
	// 		});
	// 		const data = await res.json();

	// 		if (data.error) {
	// 			showToast("Error", data.error, "error");
	// 			return;
	// 		}

	// 		localStorage.setItem("user-threads", JSON.stringify(data));
	// 		setUser(data);
	// 	} catch (error) {
	// 		showToast("Error", error, "error");
	// 	}
	// };
    const handleSignup = async () => {
        setSubmitting(true);
        try {
            // Perform the signup request
            const res = await axios.post('/api/users/signup', inputs, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            const data = res.data; // No need for await on res.data
            console.log("Response Data:", data);
    
            // Handle error response from the API
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
    
            // Successfully signed up, store user data in localStorage and update state
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
    
            console.log("Dataaa::", data);
    
        } catch (err) {
            // Handle unexpected errors
            console.error("An error occurred:", err);
    
            // Handle axios-specific error structure (e.g., network error or server error)
            const errorMessage = err.response?.data?.error || err.message || "Something went wrong!";
            showToast("Error", errorMessage, "error");
        }finally{
            setSubmitting(false);
        }
    };
    
	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full name</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleSignup}
                                isLoading={submitting}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link color={"blue.400"} 
                                onClick={() => setAuthScreen("login")}
                                >
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}