import type { SearchTerm } from './+page.svelte';

const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
const ymd = year + month + day;
const mdy = month + day + year;
const dmy = day + month + year;

const hms = () => {
	const now = new Date();
	const hour = now.getHours().toString().padStart(2, '0');
	const minute = now.getMinutes().toString().padStart(2, '0');
	const second = now.getSeconds().toString().padStart(2, '0');
	return hour + minute + second;
};

/**
 * 3 digit random number.
 */
const xxx = Math.floor(Math.random() * 999)
	.toString()
	.padStart(3, '0');

/**
 * 4 digit random number.
 */
const xxxx = Math.floor(Math.random() * 9999)
	.toString()
	.padStart(4, '0');

export const searchTerms: SearchTerm[] = [
	{
		title: 'Random',
		term: () => 'random',
		description: 'Get a video from a random category.'
	},
	{
		title: 'IMG',
		term: () => 'IMG',
		description: 'Smartphone'
	},
	{
		title: 'IMG XXXX',
		term: () => `IMG ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: 'MVI',
		term: () => 'MVI',
		description: 'Smartphone'
	},
	{
		title: 'MVI XXXX',
		term: () => `MVI ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: 'MOV XXXX',
		term: () => `MOV ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: '100 XXXX',
		term: () => `100 ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: 'DSC XXXX',
		term: () => `DSC ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: 'SAM XXXX',
		term: () => `SAM ${xxxx}`,
		description: '(0000 - 9999)'
	},
	{
		title: 'WA0XXX',
		term: () => `WA0${xxx}`,
		description: '(000 - 999)'
	},
	{
		title: 'GOPRXXXX',
		term: () => `GOPR${xxxx}`,
		description: 'GoPro (0000 - 9999)'
	},
	{
		title: 'FILEXXXX',
		term: () => `FILE${xxxx}`,
		description: 'Dash cam (0000 - 9999)'
	},
	{
		title: '-YMD-',
		term: () => ymd,
		example: '20230911',
		description: 'Smartphone (year month day)'
	},
	{
		title: '-MDY-',
		term: () => mdy,
		example: '09112023',
		description: 'Smartphone (month day year)'
	},
	{
		title: '-DMY-',
		term: () => dmy,
		example: '11092023',
		description: 'Smartphone (day month year)'
	},
	{
		title: '-HMS-',
		term: () => hms(),
		example: '11092023',
		description: 'Time of Day (000000 - 235959)'
	},
	{
		title: 'WIN -YMD-',
		term: () => `WIN ${ymd}`,
		example: 'WIN 20230911',
		description: 'Webcam'
	},
	{
		title: 'VID -YMD-',
		term: () => `VID ${ymd}`,
		example: 'VID 20230911',
		description: 'Webcam'
	},
	{
		title: 'WhatsApp Video -Y-',
		term: () => `WhatsApp Video ${year}`,
		example: 'WhatsApp Video 2023',
		description: 'Smartphone'
	},
	{
		title: '/Storage/Emulated/',
		term: () => '/Storage/Emulated/',
		description: 'Photo albums'
	},
	{
		title: 'FullSizeRender',
		term: () => 'FullSizeRender',
		description: 'Misc'
	},
	{
		title: 'My Movie',
		term: () => 'My Movie',
		description: 'Misc'
	},
	{
		title: 'DVR/SWF/VLC Record',
		term: () => 'DVR Record',
		description: 'Game capture card'
	},
	{
		title: '.MP4/.3GP/.MOV/.AVI/.WMV',
		term: () => '.3GP',
		description: 'PC videos'
	},
	{
		title: '.MKV/.MPEG/.FLV',
		term: () => '.MKV',
		description: 'PC videos (mostly spam)'
	},
	{
		title: '.FLAC',
		term: () => '.FLAC',
		description: 'Copyrighted music'
	},
	{
		title: '.WAV',
		term: () => '.WAV',
		description: 'User-created music'
	},
	{
		title: 'AUD-(-YMD-)',
		term: () => `AUD-${ymd}`,
		description: 'Audio-only (post 2013)'
	},
	{
		title: '240P 400K',
		term: () => '240P 400K',
		description: 'Fetish (NSFW)'
	},
	{
		title: '480P 600K',
		term: () => '480P 600K',
		description: 'Fetish (NSFW)'
	},
	{
		title: '480P 2000K',
		term: () => '480P 2000K',
		description: 'Fetish (NSFW)'
	},
	{
		title: '720P 1500K',
		term: () => '720P 1500K',
		description: 'Fetish (NSFW)'
	},
	{
		title: '720P 4000K',
		term: () => '720P 4000K',
		description: 'Fetish (NSFW)'
	}
];
