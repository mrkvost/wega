function shapeMouseOut($element) {
    // console.log('-- mouseOut --');
    $element = $(event.target);
    $element.find('material').attr('diffuseColor', '0.5 0.5 0.5');
}

function shapeMouseOver($element) {
    // console.log('-- mouseOver --');
    $element = $(event.target);
    $element.find('material').attr('diffuseColor', '0.5 0.5 0.5');
}

// function shapeMouseMove($element) {
//     console.log('-- mouseMove --');
//     $element = $(event.target);
//     $element.find('material').attr('diffuseColor', '0.5 0.5 0.5');
// }

function shapeClick(event) {
    $element = $(event.target);
    $element.find('material').attr('diffuseColor', '0.5 0.5 0.5');

    // console.log('event', event);
    // console.log('target', event.target);
    // console.log('$element', $element);
}

$(document).ready(function() {
    var $kocka = $('#kocka');
    var $kockaMaterial = $('#kocka-material');
    var $x3dContainer = $('.x3d-container');
    $('shape').each(function() {
        // I don't like this! :'-/
        $(this).attr('onclick', 'shapeClick(event);');
        $(this).attr('onmouseover', 'shapeMouseOver(event);');
        $(this).attr('onmouseout', 'shapeMouseOut(event);');
        // $(this).attr('onmousemove', 'shapeMouseMove(event);');
    });
});
