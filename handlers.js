$(document).ready(function() {
	$('#newPost').on('submit', function(e) {
		var postBody = $('#postBody').val();
		console.log(postBody);
		e.preventDefault();

		db.collection('posts').insert(
		{
			item: "hello"
		});
		e.preventDefault();
	});
});
