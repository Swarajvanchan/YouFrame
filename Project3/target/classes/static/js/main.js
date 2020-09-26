 window.onload = function () {
     loadImage();
 }


  function uploadImage() {
        // Get form
        var form = $('#fileUploadForm')[0];

		// Create an FormData object
        var data = new FormData(form);

		// If you want to add an extra field for the FormData
        data.append("CustomField", "This is some extra data, testing");

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/uploadImage",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                $("#result").text(data);
                var image = data.split("$$")[1];
                var imageName = data.split("$$")[0];
                var href = image.split("data:")[1];

                var html = '<div class="col-md-4">'+
                                      '<div class="thumbnail">'+
                                         '<a href="#" target="_blank">'+
                                              '<img id="myImg" src="'+image+'" alt="'+imageName+'" style="width:100%;height: 200px" />'+
                                              '<div class="caption">'+
                                                  '<p>'+imageName+'</p>'+
                                              '</div>'+
                                          '</a>'+
                                      '</div>'+
                                  '</div>';
                $('#gallary').prepend(html);
            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);

            }
        });

}

    function loadImage() {
        $.ajax({
            type: "GET",
            url: "/api/loadImage",
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                var html = "";
                for(var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    var img =  data[i];
                    var image = img.split("$$")[1];
                    var imageName = img.split("$$")[0];

                    html += '<div class="col-md-4">'+
                                      '<div class="thumbnail">'+
                                         '<a href="#" target="_blank">'+
                                              '<img id="myImg" src="'+image+'" alt="'+imageName+'" style="width:100%;height: 200px"/>'+
                                              '<div class="caption">'+
                                                  '<p>'+imageName+'</p>'+
                                              '</div>'+
                                          '</a>'+
                                      '</div>'+
                                  '</div>';

                 }
               $('#gallary').html(html);
            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);

            }
        });
   }