export	const SCALE_FACTOR = 2;
export	const OFFSET_X = 20;
export	const OFFSET_Y = 20;
export	const PLAYER_SPEED = 300;
export	const BACKGROUND_COUNT = 5;
export	const INDICATOR_OFFSET = 8;

export	const DEF_SCALE_IND = [
	{name: "topLeft", x: 1, y: 1},
	{name: "topRight", x: 1, y: 1},
	{name: "bottomLeft", x: 1, y: 1},
	{name: "bottomRight", x: 1, y: 1},
];
export	const FURNITURES = [
	{ frame: 54, x: 0, y: 8 },
	{ frame: 55, x: 16, y: 8 },
	{ frame: 56, x: 32, y: 8 },
	{ frame: 67, x: 0, y: 24 },
	{ frame: 68, x: 16, y: 24 },
	{ frame: 69, x: 32, y: 24 },
	{ frame: 80, x: 0, y: 40 },
	{ frame: 81, x: 16, y: 40 },
	{ frame: 82, x: 32, y: 40 }
  ];
export	const BOOKS = [
	{ type: "book", x: 0, y: 0 },
	{ type: "book2", x: 0, y: 24 }
  ];
export	const HOVER_EVENTS = [
	{ name: "libft", bubbleX: 500, bubbleY: 250, bubbleScale: 0.70, textSize: 26, textWidth: 64, textX: 600, textY: 260 },
	{ name: "get_next_line", bubbleX: 100, bubbleY: 20, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 150, textY: 35 },
	{ name: "ft_printf", bubbleX: 200, bubbleY: 110, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 280, textY: 120 },
	{ name: "pipex", bubbleX: 300, bubbleY: 350, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 400, textY: 360 },
	{ name: "so_long", bubbleX: 300, bubbleY: 150, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 390, textY: 160 },
	{ name: "push_swap", bubbleX: 450, bubbleY: 250, bubbleScale: 0.70, textSize: 26, textWidth: 250, textX: 520, textY: 260 }
];


export const PROJECT_LINKS = {
    libft: `<a href="https://github.com/Vpekdas/libft">libft</a>`,
	get_next_line: `<a href="https://github.com/Vpekdas/get_next_line">get_next_line</a>`,
	ft_printf: `<a href="https://github.com/Vpekdas/ft_printf">ft_printf</a>`,
	pipex: `<a href="https://github.com/Vpekdas/pipex">pipex</a>`,
    so_long: `<a href="https://github.com/Vpekdas/so_long">so_long</a>`,
	push_swap: `<a href="https://github.com/Vpekdas/push_swap">push_swap</a>`,
}