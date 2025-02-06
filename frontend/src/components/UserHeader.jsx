import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast, VStack } from '@chakra-ui/react'
import {BsInstagram} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'
import React from 'react'


const UserHeader = ({user, loading}) => {
    console.log(user)
    const toast= useToast();
    const copyURL=()=>{
        const currentURL= window.location.href;
        //console.log(currentURL)
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
				title: "Success.",
				status: "success",
				description: "Profile link copied.",
				duration: 3000,
				isClosable: true,
			});
        })
    }
  return (
    <>
      <VStack gap={4} alignItems={'start'}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                   {user?.name}
                </Text>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'sm'}>{user?.username}</Text>
                    <Text fontSize={'xs'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>threads.net</Text>
                </Flex>
            </Box>
            <Box>
                {user.profilePic && (
                    <Avatar name={user?.name} src={user.profilePic} size={{
                        base:'md',md:'xl'
                    }}/>
                )}
                {!user.profilePic && (
                    <Avatar name={user?.name} src='https://bit.ly/broken-link' size={{
                        base:'md',md:'xl'
                    }}/>
                )}
            </Box>
        </Flex>
            <Text >{user?.bio}</Text>
            <Flex w={'full'} justify={'space-between'}>
                <Flex  gap={2} alignItems={'center'}>
                    <Text color={'gray.light'}>{user?.followers.length} followers</Text>
                    <Box bg={'gray.light'} h={1} w={1} borderRadius={'full'}></Box>
                    <Link color={'gray.light'}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={'pointer'}/>
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'}/>
                            </MenuButton>
                            <Portal>
                                <MenuList bg={'gray.dark'}>
                                    <MenuItem bg={'gray.dark'} onClick={copyURL}>
                                    Copy Link</MenuItem>
                                </MenuList>
                            </Portal>

                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={'full'} >
                <Flex flex={1} justifyContent={'center'} pb={3} cursor={'pointer'} borderBottom={'1.5px solid white'}>
                    <Text fontWeight={'bold'} > Threads</Text>
                </Flex>
                <Flex flex={1} justifyContent={'center'} pb={3} cursor={'pointer'} borderBottom={'1px solid gray'} color={'gray.light'}>
                    <Text fontWeight={'bold'} > Replies</Text>
                </Flex>
                
            </Flex>

      </VStack>
    </>
  )
}

export default UserHeader
