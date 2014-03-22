/**
 * Finds all users for a project and creates filter links to their issue queues.
 */
function assignedToExtend(){

    var clones = [],
        clone = [],
        user = '',

        // Find all users.
        users = "div[data-filterable-for=assignee-filter-field] h4:has(span.description)",

        // Find the "Assigned to" link.
        assignedToLink = "#issues_list ul.filter-list:first() li:nth-child(2)",

        // Find the current user's username.
        currentUserName = $("#user-links .name").text().trim();

    if ($(users).length !== 0) {

        // Give the "Assigned to" link an ID and append a ul container for our new
        // links to live within.
        $(assignedToLink).addClass("giu-filter")
            .append("<ul id='giu-filter-links'></ul>");

        // Clone the "Assigned to" link and create a new one for each user.
        $(users).each(function (index, Element) {

            // Remove the full name which is in a <span> tag.
            $(Element).children("span").remove();

            user = $(Element).text().trim();

            if (user !== currentUserName) {
                clones[index] = $(assignedToLink).clone()
                    .removeClass("giu-filter");

                // Note: Since 'clones' is a clone(), manipulating 'clone' also
                // manipulates all of the actual elements within 'clones'.
                clone = clones[index]
                    .children("a")
                    .removeClass("selected") // github adds unwanted style for this
                    .text("Assigned to " + user)
                    .prepend("<span class='count'></span>"); // No API for counts

                // Correct the path name of the link.
                clone[0].pathname = clone[0].pathname
                    .replace(new RegExp(currentUserName + '$'), '') + user;
            }
        });

        $("#giu-filter-links").append(clones);
    }
}

assignedToExtend();

$(document).on('mousemove', function() {
    if ($('#giu-filter-links').length === 0
        && $("div[data-filterable-for=assignee-filter-field] h4:has(span.description)").length !== 0) {
        assignedToExtend();
    }
});
