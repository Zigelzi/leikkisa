<!-- 
    @component
    ## Slots
    Title

    Content

    Actions
 -->
<div class="p-6 border border-slate-400 rounded shadow">
	<h5 class="text-3xl text-bold mb-3 font-heading break-words hyphens-auto" lang="fi">
		<slot name="title" />
	</h5>
	<p class="mb-4 font-light">
		<slot name="content" />
	</p>
	<div>
		<slot name="actions" />
	</div>
</div>
