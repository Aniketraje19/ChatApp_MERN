import { Container, Box, Button } from "@chakra-ui/react"
import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import {SignIn,SignUp} from "../components/index.js" 

const Home = () => {

    const [isSignup, setIsSignup] = useState(true)

    const signupRef = useRef()
    const signinpRef = useRef()

    useGSAP(() => {
        gsap.to(isSignup ? signupRef.current : signinpRef.current, {
            transform: "rotateY(-180deg)",
            duration: 1,
            opacity:0,
            zIndex:"-100"
        })
        gsap.to(isSignup ? signinpRef.current : signupRef.current, {
            transform: "rotateY(0)",
            duration: 1,
            opacity:1,
            zIndex:"100"
        })
    }, [isSignup])

    return (

        <>

            <Container maxW="xl" centerContent display="flex" mt="2rem"> 

                <Box
                    w="100%"
                >
                    <Button
                        borderRadius="0"
                        w="50%"
                        p="8"
                        bg="#210b23"
                        color="white"
                        border="1px solid wheat"
                        _hover={{
                            bg: "#210b23",
                        }}
                        isActive={isSignup}
                        _active={{
                            bg: "wheat",
                            color: "black"
                        }}
                        onClick={() => setIsSignup(true)}
                    >SignUp</Button>
                    <Button
                        borderRadius="0"
                        w="50%"
                        p="8"
                        bg="#210b23"
                        color="white"
                        border="1px solid wheat"
                        _hover={{
                            bg: "#210b23",
                        }}
                        isActive={!isSignup}
                        _active={{
                            bg: "wheat",
                            color: "black"
                        }}
                        onClick={() => setIsSignup(false)}
                    >SignIn</Button>


                </Box>

                <Box w="100%" position="relative">
                    <Box
                        bg="wheat"
                        p="4"
                        m="2"
                        w="100%"
                        display="flex"
                        justifyContent="center"
                        borderRadius="md"
                        transform="rotateY(-180deg)"
                        position="absolute"
                        ref={signupRef}
                        h="26rem"
                    ><SignUp/></Box>
                    <Box
                        bg="wheat"
                        p="4"
                        m="2"
                        w="100%"
                        display="flex"
                        justifyContent="center"
                        borderRadius="md"
                        position="absolute"
                        ref={signinpRef}
                        h="26rem"
                    ><SignIn/></Box>
                </Box>
            </Container>

        </>

    )
}

export default Home