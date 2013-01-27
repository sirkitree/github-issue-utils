/**
 * Finds all users for a project and creates filter links to their issue queues.
 */

(function ($) {

    var clones = [],
        clone = [],
        user = '',
        pathname = '',
        newPathname = '',

        // Find all users.
        users = "div.user-selector ul li label h4:has(span.avatar)",

        // Find the "Assigned to" link.
        assignedToLink = "#issues_list ul.filter-list:first() li:nth-child(2)",

        // Find the current user's username.
        currentUserName = $("#user-links .name").text().trim();

    // Give the "Assigned to" link an ID and append a ul container for our new
    // links to live within.
    $(assignedToLink).addClass("giu-filter")
        .append("<ul id='giu-filter-links'></ul>");

    // Clone the "Assigned to" link and create a new one for each user.
    $(users).each(function (index, Element) {

        // Remove the full name which is in a <small> tag.
        $(Element).children("small").remove();

        user = $(Element).text().trim();

        if (user !== currentUserName) {
            clones[index] = $(assignedToLink).clone()
                .removeClass("giu-filter");

            // Note: Since 'clones' is a clone(), manipulating 'clone' also
            // manipulates all of the actual elements within 'clones'.
            clone = clones[index]
                .children("a")
                .removeClass("selected") // github adds unwanted style for this class
                .text("Assigned to " + user)
                .prepend("<span class='count'></span>"); // No API for counts :`(

            // Correct the pathname of the link.
            pathname = clone[0].pathname;
            newPathname = pathname.replace(new RegExp(currentUserName + '$'), '') + user;
            clone[0].pathname = newPathname;
        }
    });

    $("#giu-filter-links").append(clones);

})(jQuery);