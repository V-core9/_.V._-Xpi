$(document).on('submit', '.paginationForm', function(e){
    e.preventDefault();
    setCookie("perPage", $('#perPage').val(), 1);
    setCookie("currentPage", $('#currentPage').val(), 1);
});

$(document).on('submit', '.adminListUsers', function(e){
    e.preventDefault();
    openUsersAdmin();
});