<div class="wrapper">
	<div>
		<h1>Welcome to the Back Rooms of YouTube</h1>
		<h3>Explore videos with zero views and default titles.</h3>
	</div>

	<a id="lets-go" class="button" href="/explore">Let's go!</a>

	<p class="credit">
		Credit to <a href="https://www.youtube.com/watch?v=-0kmMJ6F9WM">KVN AUST</a> and his videos on YouTube's
		Recycle Bin for the inspiration and the search terms.
	</p>

	<p class="note">
		<b>Note:</b> This application uses the YouTube API to search for videos, however the daily quota
		greatly limits the number of searches that can be performed in a day (~100 searches/day). If the
		quota has been exceeded, you can click the link in the category cards to execute a search directly
		on YouTube.com, however you will have to scroll through the results yourself instead of getting a
		random one each time.
	</p>

	<div class="footer"><a href="http://fleetfoxx.dev">⟬ built by fleetfoxx ⟭</a></div>
</div>

<style>
	h3 {
		opacity: 0.8;
		margin-top: 0;
	}

	a#lets-go {
		margin: 10rem;
	}

	p.credit {
		font-size: 1.1rem;
		font-weight: bold;
	}

	p.note {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		padding: 1rem;
	}

	div.footer {
		padding: 1rem;
		font-size: 0.9rem;
	}

	div.footer a {
		color: inherit;
		text-decoration: none;
    opacity: 0.8;
    transition: opacity ease-in-out 0.1s;
	}

	div.footer a:hover {
		text-decoration: underline;
    opacity: 1;
	}

	div.wrapper {
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		/* gap: 2rem; */
		justify-content: space-between;
		height: 100vh;
	}
</style>
