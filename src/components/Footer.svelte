<script>
	import Settings from './Settings.svelte';
</script>

<div class="bottom-0 items-center p-8 mt-5" />
<footer class="footer fixed bottom-0 items-center p-4 bg-neutral text-neutral-content">
	<div class="flex justify-left w-full">
		<!-- Twitter -->
		<a href="https://twitter.com/tytr_dev" target="_blank" rel="noreferrer"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class="fill-current"
				><path
					d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
				/></svg
			>
		</a>

		<!-- Youtube -->
		<a
			href="https://www.youtube.com/channel/UCA0RA69cRrSqg2gWdKEJ2DQ"
			target="_blank"
			rel="noreferrer"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class="fill-current"
				><path
					d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
				/></svg
			></a
		>

		<a
			href="https://open.spotify.com/artist/6VV8X6eVeIbXCZaHVByAuQ"
			target="_blank"
			rel="noreferrer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 15 15"
				class="fill-current"
			>
				<path
					d="M14 7.5C14 11.0897 11.0903 14 7.5 14V15C11.6426 15 15 11.6419 15 7.5H14ZM7.5 14C3.90974 14 1 11.0897 1 7.5H0C0 11.6419 3.35739 15 7.5 15V14ZM1 7.5C1 3.91029 3.90974 1 7.5 1V0C3.35739 0 0 3.35806 0 7.5H1ZM7.5 1C11.0903 1 14 3.91029 14 7.5H15C15 3.35806 11.6426 0 7.5 0V1ZM3.6619 10.1162C4.64825 9.87576 5.86144 9.77072 7.05416 9.88791C8.25009 10.0054 9.38823 10.3424 10.2559 10.9525L10.8311 10.1345C9.77768 9.39382 8.45578 9.02081 7.15195 8.8927C5.84491 8.76428 4.51862 8.87807 3.42506 9.14466L3.6619 10.1162ZM3.32624 7.99237C6.772 7.38275 9.17433 7.69462 11.1649 9.12359L11.7481 8.31123C9.44985 6.66142 6.73182 6.37433 3.15202 7.00766L3.32624 7.99237ZM3.10135 5.84102C4.45435 5.36298 6.10442 5.1645 7.72549 5.29726C9.34836 5.43016 10.9042 5.8917 12.0886 6.69623L12.6505 5.86901C11.2863 4.94241 9.55125 4.44343 7.80712 4.30059C6.06118 4.15761 4.26817 4.36818 2.76821 4.89814L3.10135 5.84102Z"
				/>
			</svg>
		</a>
	</div>

	<div class="absolute right-0">
		<Settings />
	</div>
</footer>
