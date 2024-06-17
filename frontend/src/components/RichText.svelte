<script>
	// further customization https://github.com/portabletext/svelte-portabletext/
	// Prop warning solution : https://github.com/portabletext/svelte-portabletext/issues/10
	import { PortableText } from '@portabletext/svelte';
	import CustomDefaultListItem from './CustomDefaultListItem.svelte';
	import GlossaryLink from './GlossaryLink.svelte';
	import PortableTextLink from './PortableTextLink.svelte';
	import PortableTextMark from './PortableTextMark.svelte';
	export let text;
</script>

<PortableText
	value={text}
	components={{
		listItem: {
			normal: CustomDefaultListItem
		},
		marks: {
			glossaryLink: GlossaryLink,
			link: PortableTextLink,
			highlight: PortableTextMark
		}
	}}
/>
