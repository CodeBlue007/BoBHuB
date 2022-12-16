import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const UserInfo = () => {
    const [userTable, setUserTable] = useState({name:true,nick:true,phone:true,email:true,pw:true});

    const handleClickUpdate = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let targetClass = e.currentTarget.className;
        if (targetClass.includes('nameUpdate')) setUserTable({name:false,nick:true,phone:true,email:true,pw:true});
        if (targetClass.includes('nickUpdate')) setUserTable({name:true,nick:false,phone:true,email:true,pw:true});
        if (targetClass.includes('phoneUpdate'))setUserTable({name:true,nick:true,phone:false,email:true,pw:true});
        if (targetClass.includes('emailUpdate')) setUserTable({name:true,nick:true,phone:true,email:false,pw:true});
        if (targetClass.includes('pwUpdate'))setUserTable({name:true,nick:true,phone:true,email:true,pw:false});
    }

    const handleClickSuccess = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let targetClass = e.currentTarget.className;
        if (targetClass.includes('nameUpdate')) setUserTable({ ...userTable, name: true });
        if (targetClass.includes('nickUpdate')) setUserTable({ ...userTable, nick: true });
        if (targetClass.includes('phoneUpdate')) setUserTable({ ...userTable, phone: true });
        if (targetClass.includes('emailUpdate')) setUserTable({ ...userTable, email: true });
        if (targetClass.includes('pwUpdate')) setUserTable({ ...userTable, pw: true });
    }

    const handleClickCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let targetClass = e.currentTarget.className;
        if (targetClass.includes('nameUpdate')) setUserTable({ ...userTable, name: true });
        if (targetClass.includes('nickUpdate')) setUserTable({ ...userTable, nick: true });
        if (targetClass.includes('phoneUpdate')) setUserTable({ ...userTable, phone: true });
        if (targetClass.includes('emailUpdate')) setUserTable({ ...userTable, email: true });
        if (targetClass.includes('pwUpdate')) setUserTable({ ...userTable, pw: true });
    }

    return (
        <Table>
            <TableRow>
                <TableHeader>이름</TableHeader>
                {userTable.name ? (<TableData>
                    장은영
                    <UpdateIcon className='nameUpdate' onClick={handleClickUpdate}>
                        <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                    </UpdateIcon>
                </TableData>) :
                    (<>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Name" />
                        </Box>
                        <Stack direction="row">
                            <Button className='nameUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={handleClickCancel}>취소</Button>
                            <Button className='nameUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={handleClickSuccess}>완료</Button>
                        </Stack>
                    </>)}
            </TableRow>
            <TableRow>
                <TableHeader>트랙 / 기수</TableHeader>
                <TableData>
                    SW 3기
                    <Warning>*최초 등록 후, 변경 불가합니다.</Warning>
                </TableData>
            </TableRow>
            <TableRow>
                <TableHeader>닉네임</TableHeader>
                {userTable.nick ? (<TableData>
                    은영
                    <UpdateIcon className='nickUpdate' onClick={handleClickUpdate}>
                        <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                    </UpdateIcon>
                </TableData>) :
                    (<>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Nickname" />
                        </Box>
                        <Stack sx={{}} direction="row">
                            <Button className='nickUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={handleClickCancel}>취소</Button>
                            <Button className='nickUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={handleClickSuccess}>완료</Button>
                        </Stack>
                    </>)}
            </TableRow>
            <TableRow>
                <TableHeader>휴대폰 번호</TableHeader>
                {userTable.phone ? (<TableData>
                    01011112222
                    <UpdateIcon className='phoneUpdate' onClick={handleClickUpdate}>
                        <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                    </UpdateIcon>
                </TableData>) :
                    ((<>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Phone" />
                        </Box>
                        <Stack sx={{}} direction="row">
                            <Button className='phoneUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={handleClickCancel}>취소</Button>
                            <Button className='phoneUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={handleClickSuccess}>완료</Button>
                        </Stack>
                    </>)
                    )}
            </TableRow>
            <TableRow>
                <TableHeader>이메일</TableHeader>
                {userTable.email ? (<TableData>
                    elice@elice.com
                    <UpdateIcon className='emailUpdate' onClick={handleClickUpdate}>
                        <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                    </UpdateIcon>
                </TableData>) :
                    (<>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="demo-helper-text-misaligned-no-helper" label="Phone" />
                        </Box>
                        <Stack sx={{}} direction="row">
                            <Button className='emailUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={handleClickCancel}>취소</Button>
                            <Button className='emailUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={handleClickSuccess}>완료</Button>
                        </Stack>
                    </>)}
            </TableRow>
            <TableRow>
                <TableHeader>비밀번호</TableHeader>
                {userTable.pw ? (<TableData>
                    ********
                    <UpdateIcon className='pwUpdate' onClick={handleClickUpdate}>
                        <CreateIcon sx={{ color: '#6a4a96' }} fontSize='small' />
                    </UpdateIcon>
                </TableData>) :
                    (<>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField sx={{ height: '45px' }} color="secondary" size='small' id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                        </Box>
                        <Stack sx={{}} direction="row">
                            <Button className='pwUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="outlined" onClick={handleClickCancel}>취소</Button>
                            <Button className='pwUpdate' sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '10px' }} color="secondary" size="medium" variant="contained" onClick={handleClickSuccess}>완료</Button>
                        </Stack>
                    </>)}
            </TableRow>
        </Table>
    )

}

export default UserInfo;

const Table = styled.table`
    border-collapse:collapse;
    border-bottom:1.5px solid #C9CACC;
    border-top:1.5px solid #C9CACC;
    border-left:none;
    border-right:none;
    width:500px;
`

const TableRow = styled.tr`

`

const TableHeader = styled.th`
    padding:30px;
    border-top:0.5px solid #C9CACC;
    background-color:#fbf7ff;
    font-size:14px;
`

const TableData = styled.td`
    padding:30px;
    border-top:0.5px solid #C9CACC;
    border-left:1.5px solid #C9CACC;
`

const UpdateIcon = styled.button`
    position:absolute;
    margin-top:-3px;
    margin-left:15px;
    cursor:pointer;
    background-color:white;
    border:none;
`

const Warning = styled.div`
    margin-top:10px;
    font-size:12px;
`