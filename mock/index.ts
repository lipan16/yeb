import Mock from 'mockjs'
import {MockMethod} from 'vite-plugin-mock'

const Random = Mock.Random

const menuList = [
    {
        path: '/system',
        component: 'Layout',
        redirect: '/system/user',
        meta: {
            title: 'system',
            icon: 'system',
            hidden: false,
            roles: ['ADMIN'],
            keepAlive: true
        },
        children: [
            {
                path: 'user',
                component: 'system/user/index',
                name: 'user',
                meta: {
                    title: 'userManagement',
                    icon: 'user',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            },
            {
                path: 'role',
                component: 'system/role/index',
                name: 'role',
                meta: {
                    title: 'roleManagement',
                    icon: 'role',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            },
            {
                path: 'menu',
                component: 'system/menu/index',
                name: 'menu',
                meta: {
                    title: 'menuManagement',
                    icon: 'menu',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            },
            {
                path: 'dept',
                component: 'system/dept/index',
                name: 'dept',
                meta: {
                    title: 'deptManagement',
                    icon: 'tree',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            },
            {
                path: 'dict',
                component: 'system/dict/index',
                name: 'dict',
                meta: {
                    title: 'dictManagement',
                    icon: 'dict',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/multi-level-menu',
        component: 'Layout',
        redirect: '/multi-level-menu/level1',
        meta: {
            title: 'multi-level-menu',
            icon: 'nested',
            hidden: false,
            roles: ['ADMIN'],
            keepAlive: true
        },
        children: [
            {
                path: 'level1',
                component: 'nested/level1/index',
                redirect: '/multi-level-menu/level1/level2',
                meta: {
                    title: 'nested_level1',
                    icon: '',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                },
                children: [
                    {
                        path: 'level2',
                        component: 'nested/level1/level2/index',
                        redirect: '/multi-level-menu/level1/level2/level3',
                        meta: {
                            title: 'nested_level1_level2',
                            icon: '',
                            hidden: false,
                            roles: ['ADMIN'],
                            keepAlive: true
                        },
                        children: [
                            {
                                path: 'level3',
                                component: 'nested/level1/level2/level3/index1',
                                name: 'nested_level1_level2_level3_index1',
                                meta: {
                                    title: 'nested_level1_level2_level3_index1',
                                    icon: '',
                                    hidden: false,
                                    roles: ['ADMIN'],
                                    keepAlive: true
                                }
                            },
                            {
                                path: 'level3_2',
                                component: 'nested/level1/level2/level3/index2',
                                name: 'nested_level1_level2_level3_index2',
                                meta: {
                                    title: 'nested_level1_level2_level3_index2',
                                    icon: '',
                                    hidden: false,
                                    roles: ['ADMIN'],
                                    keepAlive: true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/component',
        component: 'Layout',
        meta: {
            title: 'components',
            icon: 'menu',
            hidden: false,
            roles: ['ADMIN'],
            keepAlive: true
        },
        children: [
            {
                path: 'editor',
                component: 'component/editor',
                name: 'editor',
                meta: {
                    title: 'tinymce',
                    icon: '',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            },
            {
                path: 'uploader',
                component: 'component/uploader',
                name: 'uploader',
                meta: {
                    title: 'uploader',
                    icon: '',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/',
        component: 'Layout',
        redirect: '/link',
        meta: {
            roles: ['ADMIN'],
        },
        children: [
            {
                path: 'link',
                component: 'link/index',
                name: 'link',
                meta: {
                    title: 'github',
                    type: 'link',
                    link: 'https://github.com/lipan16/yeb',
                    icon: 'link',
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/',
        component: 'Layout',
        redirect: '/iframeNodejs',
        meta: {
            roles: ['ADMIN'],
        },
        children: [
            {
                path: 'iframeNodejs',
                component: 'iframe/index',
                name: 'iframeNodejs',
                meta: {
                    title: 'nodejs',
                    type: 'iframe',
                    icon: 'iframe',
                    link: 'https://nodejs.org/zh-cn/',
                    affix: false,
                    hidden: false,
                    roles: ['ADMIN'],
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/',
        component: 'Layout',
        redirect: '/personal',
        meta: {
            roles: ['ADMIN'],
        },
        children: [
            {
                path: 'personal',
                component: 'personal/index',
                name: 'personal',
                meta: {
                    roles: ['ADMIN'],
                    title: 'personal',
                    icon: 'personal',
                    affix: false,
                    hidden: false,
                    keepAlive: true
                }
            }
        ]
    }
]

export const LoginInfo = query => {
    console.log(query, '接收post参数')
    // const {username, password} = JSON.parse(options.body)
    // if(username === '010924' && password === 'cib@1234'){
    return {
        code: '200',
        message: 'ok',
        data: {
            accessToken: Random.guid()
        }
    }

    // }else{
    //     return {
    //         code: '-200',
    //         data: {
    //             message: '用户不存在',
    //         },
    //     }
    // }
}

const UserInfo = {
    userId: Random.id(),
    nickname: Random.cname(),
    avatar: 'https://avatars.githubusercontent.com/u/37772795?v=4',
    roles: ['ADMIN'],
    perms: ['sys:user:edit', 'sys:user:delete', 'sys:user:add']
}

export default [
    {
        url: '/sys/login',
        method: 'get',
        response: LoginInfo
    },
    {
        url: '/sys/getUserInfo',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: UserInfo
            }
        }
    },
    {
        url: '/sys/getMenuList',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: menuList
            }
        }
    }
] as MockMethod[]
