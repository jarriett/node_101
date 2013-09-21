$(function() { //lead media upload
    $("#lead_medias").on('change', 'input',function(event) {
        var file_name = $("#lead_media_file").prop('files')[0].name;
        var file_list = $("#lead_media_file").prop('files');
        var input_file = $("#lead_media_file");
        var added_files = 'media_files_added';
        var inputs_holder = $('#lead_medias');
        var old_input = $(this);
        var new_input = $(this).clone();
        new_input.appendTo(inputs_holder);
        $('#' + added_files).append('<div><span>' + file_name + '</span></div>');
        old_input.css('display','none')
        .attr('id',file_name);
    });

});
