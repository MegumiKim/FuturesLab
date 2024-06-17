<script>
	import RichText from '../../components/RichText.svelte';
	import { onMount } from 'svelte';
	import { intersect } from '$lib/IntersectionObserver/action.js';

	export let data;
	export let glossaries = data.glossaries || [];

	let glossariesGroupedByLetter = {};

	function isAlphabet(char) {
		return /^[A-Z]$/i.test(char);
	}

	glossaries.forEach((glossary) => {
		let firstLetter = glossary.term.charAt(0).toUpperCase();

		if (!isAlphabet(firstLetter)) {
			firstLetter = '#';
		}
		if (!glossariesGroupedByLetter[firstLetter]) {
			glossariesGroupedByLetter[firstLetter] = [];
		}
		glossariesGroupedByLetter[firstLetter].push(glossary);
	});

	//Nav side bar
	let glossaryContainer;
	$: currentIndex = 0;
	let navHeight = 0;
	let navContentHeight = 0;
	let minY = 0;
	let maxY = 0;
	let scrollProgress = 0;
	let navItems = [];
	let sections = [];

	$: glossaryContainer && setBounds();

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	export function map(value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
		const newValue = ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;

		if (isClamp) {
			return clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax));
		}

		return newValue;
	}

	function setBounds() {
		if (!glossaryContainer) {
			return;
		}
		const boundingRect = glossaryContainer.getBoundingClientRect();
		minY = boundingRect.top + window.scrollY;
		maxY = boundingRect.bottom + window.scrollY - window.innerHeight;
	}

	function onNavScroll(event) {
		// const progress =
		// 	event.target.scrollTop / (event.target.scrollHeight - event.target.offsetHeight);
		// const index = Math.floor(progress * Object.keys(glossariesGroupedByLetter).length);
		// if (sections[index]) {
		// 	sections[index].scrollIntoView();
		// }
		// window.scrollTo(0, map(progress, 0, 1, minY, maxY, true));
	}

	function onResize(event) {
		setBounds();
	}

	function onUpdate(timestamp) {
		scrollProgress = map(window.scrollY, minY, maxY, 0, 1, true);
	}

	onMount(() => {
		let rid = requestAnimationFrame(update);

		function update(timestamp) {
			rid = requestAnimationFrame(update);
			onUpdate(timestamp);
		}

		return () => {
			cancelAnimationFrame(rid);
		};
	});
</script>

<svelte:window on:resize={onResize} />

<div class="container grid">
	<div class="cell large-span-12 large-start-2">
		<h1>{data.contentTitle || data.title}</h1>
	</div>
</div>

<section class="container Glossary" bind:this={glossaryContainer}>
	<div class="grid">
		<!-- Glossary Items -->
		<div class="cell small-span-16 large-start-2 large-span-14">
			{#each Object.keys(glossariesGroupedByLetter) as letter, i}
				<div
					bind:this={sections[i]}
					use:intersect={{
						onIntersect: (inView) => inView && (currentIndex = i),
						options: {
							rootMargin: `${-100 * (1 - 0.75)}% 0px ${-100 * 0.75}%`
						}
					}}
					class="section-wrapper"
				>
					<h2 id={letter}>{letter}</h2>
					{#each glossariesGroupedByLetter[letter] as glossary}
						<div class="GlossaryItem" id={glossary.slug}>
							<div class="GlossaryItem__term">
								<h3>{glossary.term}</h3>
							</div>
							<div class="GlossaryItem__description">
								<RichText text={glossary.definition.text} />
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<!-- Letter Navigation -->
		<div class="cell small-span-2 small-start-17 Glossary__navigation">
			<div class="Glossary__navigation__sticky">
				<nav bind:offsetHeight={navHeight} on:scroll={onNavScroll}>
					<div
						bind:offsetHeight={navContentHeight}
						style:transform="translateY(-{(navContentHeight - navHeight) * scrollProgress}px)"
					>
						{#each Object.keys(glossariesGroupedByLetter) as letter, i}
							<a
								href={`#${letter}`}
								tabindex="0"
								class:isCurrent={currentIndex === i}
								bind:this={navItems[i]}
								on:click={(evt) => {
									evt.preventDefault();
									currentIndex = i;
									if (sections[currentIndex]) {
										console.log(sections[currentIndex]);
										sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
									}
								}}>{letter}</a
							>
						{/each}
					</div>
				</nav>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$lib/styling/breakpoints' as breakpoints;

	input[type='range'] {
		position: fixed;
		bottom: 100px;
		right: 300px;
	}
	h3 {
		margin: 0;
	}

	.section-wrapper {
		padding-top: 15vh;
	}
	.Glossary {
		position: relative;
		scroll-behavior: smooth;
		&__navigation {
			height: 100%;
			text-align: center;

			&__sticky {
				--padding: 100px;
				position: sticky;
				top: var(--padding);
				bottom: var(--padding);
				right: 0;
				height: calc(100vh - var(--padding) * 2);

				display: flex;
				justify-content: right;

				> nav {
					height: 100%;
					a {
						display: block;
						text-decoration: none;
						width: 2em;
						height: 2em;
						text-align: center;
						line-height: 2em;

						&:not(:last-child) {
							margin-bottom: 0.5em;
						}
					}

					.isCurrent {
						background: #fff;
						color: var(--color-blue);
						border-radius: 50px;
						border-radius: 1em;
					}
				}
			}
		}
	}

	.Glossary__navigation nav::-webkit-scrollbar {
		display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
	}
	.GlossaryItem {
		display: grid;
		gap: 0em var(--gutter);
		grid-template-columns: 1fr;
		padding-top: 60px;
		scroll-margin-top: 80px;
		&__term {
			margin-bottom: 1em;
		}

		&__description {
			margin-bottom: 1em;
		}

		@include breakpoints.mq($from: large) {
			grid-template-columns: repeat(14, minmax(0, 1fr));
			scroll-margin-top: 100px;

			&__term {
				grid-column: span 6 / span 14;
				margin-bottom: 0;
			}
			&__description {
				grid-column: span 8 / span 14;
			}
		}

		@include breakpoints.mq($from: xxlarge) {
			&__description {
				grid-column: span 6 / span 14;
			}
		}
	}
</style>
