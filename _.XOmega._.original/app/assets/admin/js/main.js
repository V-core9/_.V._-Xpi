// 1. Admin pagination
$(document).on('submit', '.paginationForm', function(e){
    e.preventDefault();
    setCookie("perPage", $('#perPage').val(), 1);
    setCookie("currentPage", $('#currentPage').val(), 1);
});
// END 1. Admin pagination
