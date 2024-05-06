
import { useState } from "react"

import { FormControl, FormLabel, VStack, Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'

const SignUp = () => {


    const [formDetails, setFormDetails] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword:"",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isFormSubmitting,setIsFormSubmitting] = useState(false)

    const toast = useToast()

    const handleSubmit = async () => {
        setIsFormSubmitting(true)
        if (!formDetails.email || !formDetails.name || !formDetails.password || !formDetails.confirmPassword) {
            toast({
                title: "All Fields are Required!",
                status: "error",
                isClosable: true,
                position: "top",
                duration:1500,
            })
        }
        if (formDetails.password !== formDetails.confirmPassword) {
            toast({
                title: "Confirm password should be Same!",
                status: "error",
                isClosable: true,
                position: "top",
                duration:1500,
            })
        }
            
        
        setIsFormSubmitting(false)
    }
    
    return (
        <>
            <VStack w="100%" h="100%">
                <FormControl id="name" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <FormLabel>Name:</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your Name | e.g John Doe"
                        border="1px solid black"
                        _hover={{
                            border: "2px solid black"
                        }}
                        value={formDetails.name}
                        onChange={e => setFormDetails(prev => ({ ...prev, name: e.target.value }))}
                    />
                </FormControl>
                <FormControl id="email" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <FormLabel>Email:</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your Email! | e.g john@gmail.com"
                        border="1px solid black"
                        _hover={{
                            border: "2px solid black"
                        }}
                        value={formDetails.email}
                        onChange={e => setFormDetails(prev => ({ ...prev, email: e.target.value }))}
                    />
                </FormControl>
                <FormControl id="password" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
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
                <FormControl id="confirmPassword" isRequired display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <FormLabel>Confirm Password:</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your Password"
                            border="1px solid black"
                            _hover={{
                                border: "2px solid black"
                            }}
                            value={formDetails.confirmPassword}
                            onChange={e => setFormDetails(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
                    Login
                </Button>
            </VStack>
        </>
    )
}

export default SignUp