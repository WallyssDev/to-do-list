$(document).ready(function(){

        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefasSalvas.forEach(tarefa => {
            const novaTarefa = $('<li class="lista-completa"></li>');
            $(`<div class="marcar-feito"></div>`).appendTo(novaTarefa);
            $(`<div class="tarefas-fazer">${tarefa.texto}</div>`).appendTo(novaTarefa);
            $(`<div class="x-icon"></div>`).appendTo(novaTarefa);
            if(tarefa.feita){
                novaTarefa.find('.marcar-feito').css('background-color', '#FDA388');
                novaTarefa.find('.tarefas-fazer').css('text-decoration', 'line-through');
            }
            $(novaTarefa).appendTo('ul');
        });

    $('#show-hide').click(function(){
        $('#show-input form').slideToggle(300).css('display', 'flex');
        if($('#show-hide').text().includes('hide')){
            $('#show-hide').text('>>>Click to show<<<');
        }else{
            $('#show-hide').text('>>>Click to hide<<<');
        }
    
    })

    $('form').on('submit', function(e){
        e.preventDefault();
        
        const valorTarefa = $('#valor-tarefa').val();
        if(valorTarefa === ''){
            
            return
        }else{
        const novaTarefa = $('<li class="lista-completa"></li>');
        $(`<div class="marcar-feito"></div>`).appendTo(novaTarefa);
        $(`<div class="tarefas-fazer">${valorTarefa}</div>`).appendTo(novaTarefa);
        $(`<div class="x-icon"></div>`).appendTo(novaTarefa);
        $(novaTarefa).appendTo('ul');
        $('#valor-tarefa').val('');
        }
        // Atualiza localStorage
        tarefasSalvas.push({ texto: valorTarefa, feita: false });
        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    })

    $('ul').on('click', '.lista-completa div', function(){
    const indiceLI = $(this).closest('li').index();
    const indiceDiv = $(this).index();

    if(indiceDiv === 0){
        const tarefa = tarefasSalvas[indiceLI]; 

        if(tarefa.feita) {           
            $(this).css('background-color', '#FFFFFB'); 
            $(this).next().css('text-decoration', ''); 
            tarefa.feita = false; 
        } else {
            $(this).css('background-color', '#FDA388'); 
            $(this).next().css('text-decoration', 'line-through'); 
            tarefa.feita = true; 
        }

        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
    } else if(indiceDiv === 2){
        $(this).closest('li').remove();
        tarefasSalvas.splice(indiceLI, 1); 
        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
    }
});


});