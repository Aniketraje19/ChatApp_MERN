
import { useEffect, useState } from "react"
import { sigin} from "../Api/auth.api.js"
import { useAuth } from "../Context/Auth.context.js"
import {useNavigate} from "react-router-dom"
import { FormControl, FormLabel, VStack, Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'

const SignIn = () => {



    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const {login} = useAuth()

    

    const [showPassword, setShowPassword] = useState(false)
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)

    const toast = useToast()

    const handleSubmit = async () => {


        if (!formDetails.email) {
            toast({
                title: "Email is Required!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 1500,
            })

            return

        }
        if (!formDetails.password) {
            toast({
                title: "Password is Required!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 1500,
            })
            return

        }

        setIsFormSubmitting(true)

        try {

            const data = await sigin(formDetails.email, formDetails.password)
            if (!data) throw Error("Something went Wrong!")
            login(data.data.user,data.data.accessToken)
            toast({
                title: data.message,
                status: data.success ? "success" : "error",
                isClosable: true,
                position: "top",
                duration: 1500,
            })

            setFormDetails({
                email: "",
                password: "",
            })

        } catch (error) {
            toast({
                title: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 1500,
            })

        }

        setIsFormSubmitting(false)
        navigate("/chats")
    }

    return (
        <>
            <VStack w="100%" h="100%">
                <FormControl id="email_" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <FormLabel>Email:</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your Email!"
                        border="1px solid black"
                        _hover={{
                            border: "2px solid black"
                        }}
                        value={formDetails.email}
                        onChange={e => setFormDetails(prev => ({ ...prev, email: e.target.value }))}
                    />
                </FormControl>
                <FormControl id="password_" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <FormLabel>Password:</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            border="1px solid black"
                            _hover={{
                                border: "2px solid black"
                            }}
                            value={formDetails.password}
                            onChange={e => setFormDetails(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <InputRightElement m="0rem 1rem">
                            <Button
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                                onClick={() => setShowPassword(prev => !prev)}
                            >{showPassword ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    colorScheme="green"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={handleSubmit}
                    isLoading={isFormSubmitting}
                >
                    Sign In
                </Button>
            </VStack>
        </>
    )
}

export default SignIn