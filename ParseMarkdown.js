//实现对Markdown格式字符串的编译

//获取元素
function $(selector) {
    return document.querySelector(selector);
}

function Markdown(textarea, div) {
    this.textarea = textarea;
    this.div = div;
}

Markdown.prototype = {
    init: function () {

        //改变 HTML 元素的内容，输出文本
        this.div.innerHTML = this.blockParse(this.textarea.value);

        //在 <textarea> 元素的值发生改变时触发
        this.textarea.oninput = () => {
            this.div.innerHTML = this.blockParse(this.textarea.value);
        }

    },
    blockParse: function (initStr) {

        // 消除多余空格
        while (initStr.match(/ {2,}/)) {
            initStr = initStr.replace(/ {2,}/, " ");
        }

        var rows = initStr.split('\n');

        var matchArry;
        var html = '';
        var newline = true;
        for (var i = 0, len = rows.length; i < len; i++) {

            matchArry = rows[i].match(/^#\s/)
                || rows[i].match(/^##\s/)
                || rows[i].match(/^###\s/)
                || rows[i].match(/^####\s/)
                || rows[i].match(/^#####\s/)
                || rows[i].match(/^######\s/)
                || rows[i].match(/^\*{3,}/)        //***
                || rows[i].match(/^( |\*){4,}$/)    //** **
                || rows[i].match(/^-{3,}$/)        //---
                || rows[i].match(/^( |-){4,}$/)    //-- --
                || rows[i].match(/^_{3,}$/)        //---
                || rows[i].match(/^( |_){4,}$/)    //-- --
                || rows[i].match(/^ {0,3}\> {0,1}/) //> 
                || rows[i].match(/^\- \[[xX ]\] /)  //- [xX] 或 - [ ] 
                || rows[i].match(/^\*\s/)          //* 
                || rows[i].match(/^\-\s/)          //-
                || rows[i].match(/^\d\.\s/)        //1. 
                || rows[i].match(/^```/)          //```
                || rows[i].match(/^~~~/)          //~~~
                || rows[i].match(/^\|.*\|/);       //||或|a1 |

            if (matchArry) {
                switch (matchArry[0]) {

                    //标题
                    case '# ':
                        html += '<h1>' + this.inlineParse(rows[i].substring(2)) + '</h1>';
                        break;
                    case '## ':
                        html += '<h2>' + this.inlineParse(rows[i].substring(3)) + '</h2>';
                        break;
                    case '### ':
                        html += '<h3>' + this.inlineParse(rows[i].substring(4)) + '</h3>';
                        break;
                    case '#### ':
                        html += '<h4>' + this.inlineParse(rows[i].substring(5)) + '</h4>';
                        break;
                    case '##### ':
                        html += '<h5>' + this.inlineParse(rows[i].substring(6)) + '</h5>';
                        break;
                    case '###### ':
                        html += '<h6>' + this.inlineParse(rows[i].substring(7)) + '</h6>';
                        break;

                    //分割线
                    case rows[i].match(/^\*{3,}$/) && rows[i].match(/^\*{3,}$/)[0]:
                        html += rows[i].replace(/^\*{3,}$/g, '<hr>');
                        break;
                    case rows[i].match(/^( |\*){4,}$/) && rows[i].match(/^( |\*){4,}$/)[0]:
                        html += rows[i].replace(/^( |\*){4,}$/g, '<hr>');
                        break;
                    case rows[i].match(/^-{3,}$/) && rows[i].match(/^-{3,}$/)[0]:
                        html += rows[i].replace(/^-{3,}$/g, '<hr>');
                        break;
                    case rows[i].match(/^( |-){4,}$/) && rows[i].match(/^( |-){4,}$/)[0]:
                        html += rows[i].replace(/^( |-){4,}$/g, '<hr>');
                        break;
                    case rows[i].match(/^_{3,}$/) && rows[i].match(/^_{3,}$/)[0]:
                        html += rows[i].replace(/^_{3,}$/g, '<hr>');
                        break;
                    case rows[i].match(/^( |_){4,}$/) && rows[i].match(/^( |_){4,}$/)[0]:
                        html += rows[i].replace(/^( |_){4,}$/g, '<hr>');
                        break;

                    //引用
                    case rows[i].match(/^ {0,3}> {0,1}/) && rows[i].match(/^ {0,3}> {0,1}/)[0]:
                        var temp = '<p>';
                        var re = /^ {0,3}> {0,1}/;
                        while (i < len && rows[i].match(re)) {
                            if (temp != '<p>') {
                                temp += ' ';
                            }
                            if (rows[i][0] == ">" && rows[i][1] != " ") {
                                temp += rows[i].substring(1, rows[i].length);
                            }
                            else {
                                temp += rows[i].substring(2, rows[i].length);
                            }
                            i++;
                        }
                        temp += '</p>';
                        i--;
                        html += '<blockquote>' + temp + '</blockquote>';
                        break;

                    //任务列表
                    case rows[i].match(/^\- \[[xX ]\] /) && rows[i].match(/^\- \[[xX ]\] /)[0]:
                        var temp = '';
                        var re1 = /^\- \[[xX]\]\s+/, re2 = /^\- \[[ ]\]\s+/;
                        while (i < len && (rows[i].match(re1) || rows[i].match(re2))) {
                            if (rows[i].match(re1)) {
                                temp += '<li><input checked="" disabled="" type="checkbox"> ' + rows[i].substring(6, rows[i].length) + '</li>';
                            }
                            else if (rows[i].match(re2)) {
                                temp += '<li><input disabled="" type="checkbox"> ' + rows[i].substring(6, rows[i].length) + '</li>';
                            }
                            i++;
                        }
                        i--;
                        html += '<ul>' + temp + '</ul>';
                        break;

                    //无序列表
                    case '* ':
                        var temp = '';
                        var re = /^\*\s/;
                        while (i < len && rows[i].match(re)) {
                            temp += '<li>' + rows[i].substring(2, rows[i].length) + '</li>';
                            i++;
                        }
                        i--;
                        html += '<ul>' + temp + '</ul>';
                        break;
                    case '- ':
                        var temp = '';
                        var re = /^-\s/;
                        while (i < len && rows[i].match(re)) {
                            temp += '<li>' + rows[i].substring(2, rows[i].length) + '</li>';
                            i++;
                        }
                        i--;
                        html += '<ul>' + temp + '</ul>';
                        break;

                    //有序列表
                    case rows[i].match(/^\d\.\s/) && rows[i].match(/^\d\.\s/)[0]:
                        var temp = '';
                        var re = /^\d\.\s/;
                        while (i < len && rows[i].match(re)) {
                            temp += '<li>' + rows[i].substring(3, rows[i].length) + '</li>';
                            i++;
                        }
                        i--;
                        html += '<ol>' + temp + '</ol>';
                        break;

                    //代码块
                    case '~~~':
                        var temp = '';
                        var re = /^~~~/;
                        i++;
                        while (i < len && !re.test(rows[i])) {
                            temp += rows[i] + '\n';
                            i++;
                        }
                        html += '<pre><code>' + temp + '</code></pre>';
                        break;
                    case '```':
                        var temp = '';
                        var re = /^```/;
                        i++;
                        while (i < len && !re.test(rows[i])) {
                            temp += rows[i] + '\n';
                            i++;
                        }
                        html += '<pre><code>' + temp + '</code></pre>';
                        break;

                    //表格
                    case rows[i].match(/^\|.*\|/) && rows[i].match(/^\|.*\|/)[0]:
                        var temp = '<thead>';
                        var re = /^\|.*\|/;
                        var centerSide = /\:\-{1,}\:/, leftSide = /\:\-{1,}/, rightSide = /\-{1,}\:/, commonSide = /\-{1,}/;
                        var arry = rows[i + 1].split('|'), j, jlen = arry.length - 1;

                        var alignment = new Array();
                        for (j = 0; j <= jlen; j++) {
                            alignment[j] = -1;
                        }
                        for (j = 1; j < jlen; j++) {

                            if (centerSide.test(arry[j])) { //居中对齐
                                alignment[j] = 1
                            }
                            else if (leftSide.test(arry[j])) { //左对齐
                                console.log(arry[j]);
                                alignment[j] = 2
                            }
                            else if (rightSide.test(arry[j])) { //右对齐
                                alignment[j] = 3
                            }
                            else if (commonSide.test(arry[j])) { //无
                                alignment[j] = 0
                            }
                        }
                        var checkline = i + 1;
                        while (i < len && re.test(rows[i])) {
                            arry = rows[i].split('|');
                            jlen = arry.length - 1;

                            if (i == checkline) {
                                temp += '</thead>';
                                i++;
                                continue;
                            }
                            temp += '<tr>';
                            for (j = 1; j < jlen; j++) {

                                if (i < checkline) {    //表格标题
                                    if (alignment[j] == 0) {
                                        temp += '<th>' + this.inlineParse(arry[j]) + '</th>';
                                    }
                                    else if (alignment[j] == 1) {
                                        temp += '<th align="center">' + this.inlineParse(arry[j]) + '</th>';
                                    }
                                    else if (alignment[j] == 2) {
                                        temp += '<th align="left">' + this.inlineParse(arry[j]) + '</th>';
                                    }
                                    else if (alignment[j] == 3) {
                                        temp += '<th align="right">' + this.inlineParse(arry[j]) + '</th>';
                                    }

                                }
                                else {  //表格内容
                                    if (alignment[j] == 0) {
                                        temp += '<td>' + this.inlineParse(arry[j]) + '</td>';
                                    }
                                    else if (alignment[j] == 1) {
                                        temp += '<td align="center">' + this.inlineParse(arry[j]) + '</td>';
                                    }
                                    else if (alignment[j] == 2) {
                                        temp += '<td align="left">' + this.inlineParse(arry[j]) + '</td>';
                                    }
                                    else if (alignment[j] == 3) {
                                        temp += '<td align="right">' + this.inlineParse(arry[j]) + '</td>';
                                    }
                                }
                            }
                            temp += '</tr>';
                            i++;
                        }
                        i--;
                        temp += '</tbody>';
                        html += '<table>' + temp + '</table>';
                        break;

                    default:
                        break;
                }
            } else {
                if (rows[i].length != 0) { //当前非空白行
                    if (newline) {
                        html += '<p>';
                        newline = false;
                    }
                    html += ' ' + this.inlineParse(rows[i]);

                    if (i == len - 1) { //文档末尾行
                        html += '</p>';
                        newline = true;
                    }
                }
                else {
                    html += '</p>';
                    newline = true;
                }
            }

        }
        return html;
    },
    inlineParse: function (str) {
        str = str.replace(/\s/g, '&nbsp;');

        //粗体
        var strong = str.match(/\*{2,}(.*?)\*{2,}/g); // 惰性匹配，/g执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
        //无法**abc**类型匹配
        if (!strong) {
            //忽略单词间下划线的类型，如a__bc__, __ab__c, a__bc__d
            var ignore1 = str.match(/[a-zA-Z0-9]__.*?__/g);
            var ignore2 = str.match(/__.*?__[a-zA-Z0-9]/g);
            var ignore3 = str.match(/__(&nbsp;)+(.*?)__/);
            var ignore4 = str.match(/__(.*?)(&nbsp;)+__/);
            if (!ignore1 && !ignore2 && !ignore3 && !ignore4) {
                //尝试__abc__匹配
                strong = str.match(/__(.*?)__/g);
            }
        }
        if (strong) {
            for (var i = 0, len = strong.length; i < len; i++) {
                str = str.replace(strong[i], '<strong>' + strong[i].substring(2, strong[i].length - 2) + '</strong>');
            }
        }

        //斜体
        var em = str.match(/\*.*?\*/g);
        //无法*abc*类型匹配
        if (!em) {
            //忽略单词间下划线的类型，如a_bc_, _ab_c, a_bc_d
            var ignore1 = str.match(/[a-zA-Z0-9]_.*?_/g);
            var ignore2 = str.match(/_.*?_[a-zA-Z0-9]/g);
            var ignore3 = str.match(/_(&nbsp;)+(.*?)_/);
            var ignore4 = str.match(/_(.*?)(&nbsp;)+_/);
            if (!ignore1 && !ignore2 && !ignore3 && !ignore4) {
                //尝试_abc_匹配
                em = str.match(/_.*?_/g);
            }
        }
        if (em) {
            for (i = 0, len = em.length; i < len; i++) {
                str = str.replace(em[i], '<em>' + em[i].substring(1, em[i].length - 1) + '</em>');
            }
        }

        //代码
        var code = str.match(/`.+`/g);
        if (code) {
            for (i = 0, len = code.length; i < len; i++) {
                str = str.replace(code[i], '<code>' + code[i].substring(1, code[i].length - 1) + '</code>');
            }
        }

        //删除线
        var strikeThrough = str.match(/~~.+~~/g);
        if (strikeThrough) {
            for (i = 0, len = strikeThrough.length; i < len; i++) {
                str = str.replace(strikeThrough[i], '<del>' + strikeThrough[i].substring(2, strikeThrough[i].length - 2) + '</del>');
            }
        }

        //图片
        var img = str.match(/!\[.*\]\(.*\)/g);
        var re1 = /\(.*\)/;
        var re2 = /\[.*\]/;
        if (img) {
            for (i = 0, len = img.length; i < len; i++) {
                var url = img[i].match(re1)[0];
                var title = img[i].match(re2)[0];
                str = str.replace(img[i], '<img src=' + url.substring(1, url.length - 1) + ' alt=' + title.substring(1, title.length - 1) + '>');
            }
        }

        //链接
        var a = str.match(/\[.*\]\(.*\)/g);
        if (a) {
            for (i = 0, len = a.length; i < len; i++) {
                var url = a[i].match(re1)[0];
                var title = a[i].match(re2)[0];
                str = str.replace(a[i], '<a href=' + url.substring(1, url.length - 1) + '>' + title.substring(1, title.length - 1) + '</a>');
            }
        }

        return str;
    }
}

// 使用构造函数调用函数
new Markdown($('textarea'), $('#preview')).init();



