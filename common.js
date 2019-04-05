    /***
     *名称长度处理
     * L: 期望多少字节作为一组
     * end : 超过多少字节显示省略号
     ***/
    function cutStr(str,L,end){ 
        var result = '',
            strlen = str.length, // 字符串长度
            chrlen = str.replace(/[^\x00-\xff]/g,'**').length, // 字节长度
            strArr = [];

        if(chrlen<=L){
            strArr.push(str);
            return strArr;
        }
        var j = 0;
        var e = 0;
        for(var i=0;i<strlen;i++){
            var chr = str.charAt(i);
            if(/[\x00-\xff]/.test(chr)){
                j++; // ascii码为0-255，一个字符就是一个字节的长度
                e++;
            }else{
                j+=2; // ascii码为0-255以外，一个字符就是两个字节的长度
                e+=2;
            }
            
            if(j<=L){ // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
                result += chr;
            }else{ 
                strArr.push(result);
                result = chr;
                j = 0;
                if(/[\x00-\xff]/.test(chr)){
                    j++; // ascii码为0-255，一个字符就是一个字节的长度
                }else{
                    j+=2; // ascii码为0-255以外，一个字符就是两个字节的长度
                }
            }
            if(e >= end){
                console.log('e',e);
                strArr.push(result+"...");
                return strArr;
            }
        }
        if(j > 0 && j < L){
            strArr.push(result);
        }
        return strArr;
    }

    /***ajax请求***/
    function $ajax(data){
        $.ajax({
            url:"",
            type:"post",
            data:data,
            dataType:"json",
            success:function(data){
                
            },
            error:function(err){
                console.log(err);
            }
        });
    }

    /***表格行排序***/
    function sortTr(){
        $("#row_panel").sortable({
            items:".select_col",
            start:function(event,ui){
                if(ui && ui.item){
                    ui.item.prev().find("td").each(function(i,v){
                        $(ui.item.find('td')[i]).width($(v).width());
                    })
                }
            },
        }); 
    }