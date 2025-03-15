$(document).ready(function() {
    $("td:nth-child(0)").each(function() {
        if ($(this).text() === "Total") {
            $(this).parent().children().css({'background-color': 'red'});
        }
    });
});