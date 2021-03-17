//响应工具箱的各个功能按钮

//一级标题
function insertHeader1() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("# " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//二级标题
function insertHeader2() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("## " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//三级标题
function insertHeader3() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("### " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//四级标题
function insertHeader4() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("#### " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//五级标题
function insertHeader5() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("##### " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//六级标题
function insertHeader6() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("###### " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//粗体
function insertStrong() {
    textarea = document.querySelector('textarea');
    if (textarea.selectionStart == textarea.selectionEnd) { //当前未选定文字
        textarea.setRangeText("****");
        textarea.selectionStart += 2;
    }
    else { //当前已选定文字
        var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        textarea.setRangeText("**" + str + "**");
        textarea.selectionStart += 2;
        textarea.selectionEnd -= 2;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//斜体
function insertEm() {
    textarea = document.querySelector('textarea');
    if (textarea.selectionStart == textarea.selectionEnd) { //当前未选定文字
        textarea.setRangeText("**");
        textarea.selectionStart += 1;
    }
    else { //当前已选定文字
        var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        textarea.setRangeText("*" + str + "*");
        textarea.selectionStart++;
        textarea.selectionEnd--;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//引用
function insertQuote() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("> " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//链接
function insertLink() {
    textarea = document.querySelector('textarea');
    if (textarea.selectionStart == textarea.selectionEnd) { //当前未选定文字
        textarea.setRangeText("[](url)");
        textarea.selectionStart += 3;
        textarea.selectionEnd += 3;
    }
    else { //当前已选定文字
        var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        textarea.setRangeText("[" + str + "](url)");
        textarea.selectionStart += str.length + 3;
        textarea.selectionEnd--;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//图片
function insertPhoto() {
    textarea = document.querySelector('textarea');
    if (textarea.selectionStart == textarea.selectionEnd) { //当前未选定文字
        textarea.setRangeText("![](url)");
        textarea.selectionStart += 4;
        textarea.selectionEnd += 3;
    }
    else {
        while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
            textarea.selectionEnd++;
        }
        textarea.selectionStart = textarea.selectionEnd++;
        textarea.setRangeText(" ![](url)\n");
        textarea.selectionStart += 5;
        textarea.selectionEnd -= 2;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//代码
function insertCode() {
    textarea = document.querySelector('textarea');
    textarea.setRangeText("``");
    textarea.selectionStart += 1;
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//代码块
function insertCodeblock() {
    textarea = document.querySelector('textarea');
    textarea.setRangeText("```\n\n```");
    textarea.selectionStart += 4;
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//无序列表
function insertBulletlist() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("- " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//有序列表
function insertOrderedlist() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("1. " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//删除线
function insertStrikethrough() {
    textarea = document.querySelector('textarea');
    // textarea.setRangeText("~~~~");
    if (textarea.selectionStart == textarea.selectionEnd) { //当前未选定文字删除整行
        while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
            textarea.selectionStart--;
        }
        while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
            textarea.selectionEnd++;
        }
        var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        textarea.setRangeText("~~" + str + "~~");
    }
    else{   //当前已选定文字
        var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        textarea.setRangeText("~~" + str + "~~");
        textarea.selectionStart += 2;
        textarea.selectionEnd -= 2;
    }
    // textarea.selectionStart += 2;
    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//任务
function insertTasklist() {
    textarea = document.querySelector('textarea');
    while (textarea.value[textarea.selectionStart - 1] != "\n" && textarea.selectionStart > 0) {
        textarea.selectionStart--;
    }
    var str = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    textarea.setRangeText("- [ ] " + str);
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
    }

    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}

//表格
function insertTable() {
    textarea = document.querySelector('textarea');
    var isNewline = false;
    while (textarea.value[textarea.selectionEnd] != "\n" && textarea.selectionEnd < textarea.value.length) {
        textarea.selectionEnd++;
        isNewline = true;
    }
    if (textarea.value[textarea.selectionEnd - 1] != "\n") {
        isNewline = true;
    }
    textarea.selectionStart = textarea.selectionEnd;
    if (isNewline) {
        textarea.setRangeText("\n");
        textarea.selectionStart++;
    }

    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    var str = "\n| 标题 |  |\n" + "| --- | --- |\n" + "|  |  |\n";
    textarea.value = textarea.value.substring(0, startPos) + str + textarea.value.substring(endPos, textarea.value.length);
    textarea.selectionStart = startPos + 3;
    textarea.selectionEnd = startPos + 5;

    textarea.focus()
    new Markdown($('textarea'), $('#preview')).init();
}