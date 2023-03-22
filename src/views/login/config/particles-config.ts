export const particlesConfig = [
    {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#e70b0b'
            },
            links: {
                color: '#69aff5',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 6,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    },
    {
        "fullScreen": {
            "zIndex": 1
        },
        "emitters": [
            {
                "position": {
                    "x": 0,
                    "y": 30
                },
                "rate": {
                    "quantity": 5,
                    "delay": 0.15
                },
                "particles": {
                    "move": {
                        "direction": "top-right",
                        "outModes": {
                            "top": "none",
                            "left": "none",
                            "default": "destroy"
                        }
                    }
                }
            },
            {
                "position": {
                    "x": 100,
                    "y": 30
                },
                "rate": {
                    "quantity": 5,
                    "delay": 0.15
                },
                "particles": {
                    "move": {
                        "direction": "top-left",
                        "outModes": {
                            "top": "none",
                            "right": "none",
                            "default": "destroy"
                        }
                    }
                }
            }
        ],
        "particles": {
            "color": {
                "value": [
                    "#ffffff",
                    "#FF0000"
                ]
            },
            "move": {
                "decay": 0.05,
                "direction": "top",
                "enable": true,
                "gravity": {
                    "enable": true
                },
                "outModes": {
                    "top": "none",
                    "default": "destroy"
                },
                "speed": {
                    "min": 10,
                    "max": 50
                }
            },
            "number": {
                "value": 0
            },
            "opacity": {
                "value": 1
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "animation": {
                    "enable": true,
                    "speed": 30
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 30
                }
            },
            "size": {
                "value": {
                    "min": 0,
                    "max": 2
                },
                "animation": {
                    "enable": true,
                    "startValue": "min",
                    "count": 1,
                    "speed": 16,
                    "sync": true
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 5,
                    "max": 15
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "speed": {
                    "min": -7,
                    "max": 7
                }
            },
            "shape": {
                "type": [
                    "circle",
                    "square"
                ],
                "options": {}
            }
        }
    },
]
