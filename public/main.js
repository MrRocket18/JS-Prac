
    $( "input[name='completed']" ).on( "change", function() {
        let isChecked = $(this).is(":checked");
        let todoId = $(this).closest("form").find("input[name='id']").val();
        let $span = $(this).closest("label").find("span");
        $span.toggleClass("completed", isChecked);
        $.post('/complete',{id: todoId,completed: isChecked})
            .done(function(data) {
                console.log("Успешно отправлено на сервер!", data);
            })
            .fail(function(error) {
                console.error("Ошибка при отправке данных на сервер!", error);
            });
    });