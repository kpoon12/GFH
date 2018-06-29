var book = new Array();
var NumDisplay = 1;
var Book;
var Title;
var Content;
var Page;
var Mp3;
var xmlDocCE;
//var dropboxlink = "http://webpages.charter.net/poonfamily/GFH/";
var dropboxlink = "MP3/";
var bkMarkList;
var historyList;
var numbk = 0;
var CheckAudio = false;
var screenHeight;
var screenWidth;
var showpanel = false;
var fistPage;
var fistPage1;
var songpage;
var songpage1;
var Showdelay;
var displayBoth = 0;
var appData;
var numhl = 0;
var AudioL;
var btHeight;
var btWidth;
var last = 0;
var menuOn = 0;

$(document).ready(function () {
    $("#info").click(function () { Info(); });
    $("#btSetting").click(function () { GotoSetting(); });

    $("#BtBook").click(function () { Chinese(); });
    $("#BtPage").click(function () { ListPage(); });

    $("#btFind").click(function () { GotoSearch(); });
    $("#btDisplay").click(function () { Both(); });
    $("#btBookmarks").click(function () { openBookmark(); });
    $("#btMP3").click(function () { ShowAllMP3(); });
    $("#btAdd").click(function () { addBookmark(); });
    //$("#btBackPage").click(function () { Back(); });
    //$("#btNextPage").click(function () { Next(); });
    $("#btBackPage").click(function () { Back();  });
    $("#btNextPage").click(function () { Next();  });

    $("#btHistory").click(function () { ShowHistory(); });
    //$("#OutTitle1").click(function () { ShowAllMP3(); });
    $("#OutTitle2").click(function () { Toggle(); });
    $("#numOnly").click(function () { ToGrid(); });
    $("#btnback").click(function () { GotoSong(); UpdateDisplay(); });
    //$("#Output1").click(function () { GotoSong(); UpdateDisplay(); });
    $("#btnsearch").click(function () { Search1(); });

    $('#menu-btn').click(function () { toggleMenu(); });
    $("#book1").click(function () { onBook1(); });
    $("#book12").click(function () { onBook12(); });
    $("#book13").click(function () { onBook13(); });
    $("#book14").click(function () { onBook14(); });
    $("#book15").click(function () { onBook15(); });
    $("#book16").click(function () { onBook16(); });

    onBook1();

    historyList = new Array();
    //appData = Windows.Storage.ApplicationData.current;
    DisplayBook();
    var filepointer = null;

    //WinJS.Namespace.define("SdkSample", {
    //    validateFileExistence: validateFileExistence,
    //    filelink: filepointer
    //});
});

window.onresize = function () {
    // your code
    viewport();
};

function swipedetect(el, callback) {

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()

    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                move = distY
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

function LoadVersion() {

    //xmlDoc = loadXMLDoc("GFH.xml");
    // Book = xmlDoc.getElementsByTagName("Book");
    // Title = xmlDoc.getElementsByTagName("Title");
    // Content = xmlDoc.getElementsByTagName("Context");
    // Page = xmlDoc.getElementsByTagName("Page");
    // Mp3 = xmlDoc.getElementsByTagName("Mp3");
    node = 0;
    //xmlDocCE = loadXMLDoc("ID.xml");

    //var el = document.getElementById('OutTitle1')
    //swipedetect(el, function(swipedir){
    //    //swipedir contains either "none", "left", "right", "top", or "down"
    //    if (swipedir == 'left')
    //        Next();
    //    if (swipedir == 'right')
    //        Back();

    //})

}

function SetBlack(id) {
    document.getElementById(id).style.background = "gray";
    document.getElementById(id).style.color = "White";
}

function SetLight(id) {
    document.getElementById(id).style.background = "white";
    document.getElementById(id).style.color = "black";
}

function SetColor(light) {
    if (light) {
        SetLight("results");
        SetLight("Output1");
        SetLight("books");
        SetLight("pages");
    }
    else {
        SetBlack("results");
        SetBlack("Output1");
        SetBlack("Setting");
        SetBlack("books");
        SetBlack("pages");
    }
}

function viewport() {
    var g = document.documentElement;
    screenHeight = g.clientHeight - 60;
    screenWidth = g.clientWidth;
    
    BtBook.style.width = (screenWidth - 250) + "px";
    OutTitle2.style.top = screenHeight - 30 + "px";
    btBackPage.style.top = screenHeight + "px";
    btAdd.style.top = screenHeight + "px";
    btNextPage.style.top = screenHeight + "px";
    AudioLeft.style.top = (screenHeight + 10) + "px";


    btWidth = (screenWidth - 20) + "px";
    btHeight = "60px";

    if (screenWidth < 320) {
        btDisplay.style.visibility = "collapse";
    }

    if (screenWidth > 900) {
        btWidth = (screenWidth - 30) / 3 + "px";
    }
    else if (screenWidth > 600) {
        btWidth = (screenWidth - 30) / 2 + "px";
    }
}

var alltitle = ["第一冊", "第二冊", "第三冊", "第四冊", "第五冊", "第六冊", "第七冊", "第八冊", "第九冊", "第十冊", "第十一冊", "第十二冊", "第十三冊", "第十四冊", "第十五冊", "第十六冊", "愛的迴響", "晨鳥", "詩歌分享", "世上奇珍的禱告 (簡短版)", "世上奇珍的禱告", "Hymnal 1", "Hymnal 2", "Hymnal 3", "Songs of Love", "God's Beautiful Heart", "Songs of My Heart 1", "Songs of My Heart 2", "Songs of My Heart 3", "Songs of My Heart 5", "Songs of My Heart 6", "Songs of My Heart 7", "Songs of My Heart 8", "Songs of My Heart 9", "Pray the precious prayers (CV)", "Pray the precious prayers"]
var alltitle1 = ["Hymnal 1", "Hymnal 2", "Hymnal 3", "Songs of Love", "God's Beautiful Heart", "Songs of My Heart 1", "Songs of My Heart 2", "Songs of My Heart 3", "Songs of My Heart 5", "Songs of My Heart 6", "Songs of My Heart 7", "Songs of My Heart 8", "Songs of My Heart 9", "Pray the precious prayers (CV)", "Pray the precious prayers", "第一冊", "第二冊", "第三冊", "第四冊", "第五冊", "第六冊", "第七冊", "第八冊", "第九冊", "第十冊", "第十一冊", "第十二冊", "第十三冊", "第十四冊", "第十五冊", "第十六冊", "愛的迴響", "晨鳥", "詩歌分享", "世上奇珍的禱告 (簡短版)", "世上奇珍的禱告"]

function DisplayBook() {
    LoadSetting();
    LoadVersion();

    for (var i = 0; i < alltitle.length; i++) {
        if (localStorage.CE == "CE") {
            book[i] = alltitle[i];
        }
        else {
            book[i] = alltitle1[i];
        }

    }
    GotoSong();
    UpdateDisplay();
}

function Goto(v) {
    GotoSong();
    if (NumDisplay === 1) {
        songpage = v;
        UpdateDisplay();
    }
    else {
        songpage1 = v;
        UpdateDisplay();
    }
}

function Back() {
    if (songpage > 0) {
        GotoSong();
        CheckAudio = false;

        songpage--;
        UpdateDisplay();
    }
}

function Next() {
    if (songpage < SongPage.length - 1) {
        GotoSong();
        CheckAudio = false;

        songpage++;
        UpdateDisplay();
    }
}

function Both() {
    HideAll();
    if (displayBoth == 1) {
       displayBoth = 0;
    }
    else {
       displayBoth = 1;
    }
    GotoSong();
    UpdateDisplay();
}

function Toggle() {
    if (document.getElementById("OutTitle2").innerHTML != "") {
        showTEXT();
        songpage = songpage1;
        GotoSong();
        UpdateDisplay();
    }
}

function UpdateDisplay() {
    ThisBook(songpage);
    document.getElementById("BtBook").innerHTML = SongPage[songpage].Book;
    document.getElementById("BtPage").innerHTML = SongPage[songpage].Page;
    document.getElementById("OutTitle1").innerHTML = SongPage[songpage].Book + "--" + SongPage[songpage].Page;
    var s = SongPage[songpage].Context + "<br/><br/><br/><br/>";//.replace(/\n\n/g, "\n");
    document.getElementById("Output1").innerHTML = SongPage[songpage].Title + "<br/>" + s.replace(/\n/g, "<br />");
    localStorage.songpage = songpage;
    localStorage.CurrentPage = SongPage[songpage].Page;
    FindEnglish();
    FindAudio();
}

function FindAudio() {
    //var link = dropboxlink + localStorage.CurrentBook + "/" + Page[songpage].childNodes[0].nodeValue + ".mp3";
    //fileSystem.root.fullPath = 'file:///storage/extSdCard'   
    var AudioL = document.getElementById("AudioLeft");
    AudioL.style.visibility = 'hidden';

    if (SongPage[songpage].Mp3 !== "" && localStorage.local != "file://") {
        var folder = localStorage.CurrentBook;//alltitle[localStorage.CurrentBook - 1].replace(" ", "\\ ");
        var linkloc = localStorage.local + folder + "/" + SongPage[songpage].Mp3 + ".mp3";
        AudioL.style.visibility = 'visible';
        AudioL.src = linkloc;
    }

    Showdelay = 0;
}

function UpdateDisplay1() {
    lines1 = SongPage[songpage].Context.split(/\r\n|\r|\n/g);
    lines2 = SongPage[songpage1].Context.split(/\r\n|\r|\n/g);
    document.getElementById("Output1").innerHTML = SongPage[songpage].Title + "<br/>" + SongPage[songpage1].Title + "<br/>";

    for (var x = 0; x < lines1.length; x++)
    {
        if (lines1[x] != null)
            document.getElementById("Output1").innerHTML += lines1[x] + "<br/>"
        if (lines2[x] != null)
            document.getElementById("Output1").innerHTML += lines2[x] + "<br/>";
    }
    document.getElementById("Output1").innerHTML += "<br/><br/><br/><br/>";
    localStorage.songpage1 = songpage1;
}

function checkIfFileExists(path) {
    var result = false;

    window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        0,
        function (fileSystem) {
            fileSystem.root.getFile(
                path,
                { create: false },
                function () { result = true; }, // file exists
                function () { result = false; } // file does not exist
            );
        },
        fail
    ); //of requestFileSystem

    return result;
}

function fail(error) {
    alert(error.code);
}

function Info() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccessUpload, fail);
}

function onFileSystemSuccessUpload(fileSystem) {
    // get directory entry through root and access all the folders
    var directoryReader = fileSystem.root.createReader();

    // Get a list of all the entries in the directory
    directoryReader.readEntries(successReader, fail);

}

function successReader(entries) {
    var i;
    for (i = 0; i < entries.length; i++) {
        var now = entries[i].nativeURL;
        if (entries[i].isDirectory == true) {
            if (now.indexOf("GFH") != -1) {
                folder.value = now;
                //var directoryReaderIn = entries[i].createReader();
                //directoryReaderIn.readEntries(successReader, fail);
                //index = 0;
            }
        }

    }
};

function fail(error) {
    alert("Failed to list directory contents: " + error.code);
}

function ThisBook(b) {
    var BookName = 0;
    if (book.length > 0) {
        for (var BookName = 0; BookName < book.length; BookName++) {
            if (SongPage[b].Book == book[BookName]) {
                localStorage.CurrentBook = BookName + 1;
            }
        }
    }
}

function FindEnglish() {
    var loc;
    var bookloc;
    var selectedNode = 0;
    if (localStorage.CurrentBook >= 0) {
        var tag = alltitle[localStorage.CurrentBook - 1];
        tag = tag.replace("(", "");
        tag = tag.replace(")", "");
        tag = tag.replace(/\s+/g, '');
        //loc = xmlDocCE.getElementsByTagName(tag);
        var exist = false;
        for (i = 0; i < books.length; i++) {
            if (tag === books[i].Book1) {
                if (localStorage.CurrentPage === books[i].Page1) {
                    selectNode = i;
                    exist = true;
                    i = books.length;
                }
            }
        }
        //document.getElementById("Display2").style.visibility = "hidden";

        if (exist) {
            document.getElementById("OutTitle2").innerHTML = books[selectNode].Book2 + " " + books[selectNode].Page2;
            for (i = 0; i < SongPage.length; i++) {
                if (SongPage[i].Book === books[selectNode].Book2) {
                    if (SongPage[i].Page === books[selectNode].Page2) {
                        songpage1 = i;
                        if(displayBoth === 1)
                            UpdateDisplay1();

                    }
                }
            }
            document.getElementById("OutTitle2").style.visibility = "visible";
        }
        else {
            document.getElementById("OutTitle2").innerHTML = "";
            document.getElementById("OutTitle2").style.visibility = "hidden";
        }


    }

}

function ShowBooks() {
    document.getElementById("books").style.overflow = "scroll";
    document.getElementById("books").style.visibility = "visible";
    results.style.zIndex = 101;
}

function ShowPages() {
    document.getElementById("pages").style.overflow = "scroll";
    document.getElementById("pages").style.visibility = "visible";
    results.style.zIndex = 101;
}

function ShowResults() {
    document.getElementById("results").style.overflow = "scroll";
    document.getElementById("results").style.visibility = "visible";
    results.style.zIndex = 101;
}

function HideResults() {
    document.getElementById("results").style.overflow = "hidden";
    document.getElementById("results").style.visibility = "hidden";
}

function Search1() {
    var Ssearch = document.getElementById("SearchText").value.toUpperCase();
    HideResults();
    if (Ssearch != "") {
        document.getElementById("results").innerHTML = "";
        if (searchByContent.checked) {
            for (var x = 0; x < SongPage.length; x++) {
                var B = SongPage[x].Book;
                var T = SongPage[x].Title;
                var Spage = SongPage[x].Context;
                var res = Spage.toUpperCase();
                l = res.search(Ssearch);
                s = e = l;
                if (l != -1) {
                    while (Spage.charAt(s) != "\n" && s > 0) {
                        s--;
                    }
                    while (Spage.charAt(e) != "\n" && e <= Spage.length) {
                        e++;
                    }
                    var setValue = B + "--" + T + Spage.slice(s, e);
                    var element = document.createElement("input");
                    element.setAttribute("type", "button");
                    element.setAttribute("value", setValue);
                    element.onclick = new Function('Goto(' + x + ')');

                    //element.setAttribute("onclick", "Goto(" + x + ")");
                    element.style.margin = "2px";
                    element.style.width = btWidth;
                    element.style.height = btHeight;
                    document.getElementById("results").appendChild(element);
                    //GotoSearch();
                }
            }
        }
        else {
            for (var x = 0; x < SongPage.length; x++) {
                var B = SongPage[x].Book;
                var T = SongPage[x].Title;
                var res = T.toUpperCase();
                l = res.search(Ssearch);

                if (l != -1) {
                    var setValue = B + "--" + T;
                    var element = document.createElement("input");
                    element.setAttribute("type", "button");
                    element.setAttribute("value", setValue);
                    element.onclick = new Function('Goto(' + x + ')');

                    //element.setAttribute("onclick", "Goto(" + x + ")");
                    element.style.margin = "2px";
                    element.style.width = btWidth;
                    element.style.height = btHeight;
                    document.getElementById("results").appendChild(element);
                    //GotoSearch();
                }
            }

        }
        ShowResults();
    }
}

function HideAll() {
    document.getElementById("iview").style.visibility = 'hidden';
    document.getElementById("Output1").style.visibility = "hidden";
    document.getElementById("pages").style.visibility = "hidden";
    document.getElementById("books").style.visibility = "hidden";
    document.getElementById("results").style.visibility = "hidden";
    document.getElementById("Output1").scrollTop = 0;
    

    $('.responsive-menu').toggleClass('expand', false);
    menuOn = 0;

    document.getElementById("Setting").style.visibility = 'hidden';
    document.getElementById("search").style.visibility = 'hidden';
    document.getElementById("SearchText").style.visibility = 'hidden';
    document.getElementById("btnsearch").style.visibility = 'hidden';

    document.getElementById("AudioLeft").style.visibility = 'hidden';
    //document.getElementById("OutTitle1").style.visibility = "hidden";
    document.getElementById("OutTitle2").style.visibility = "hidden";
    document.getElementById("LowerMenu").style.visibility = "hidden";

    //HideResults();
}

function GotoSetting() {
    //HideAll();
    var setting = document.getElementById("Setting").style;
    if (setting.visibility == "hidden") {
        Setting.style.zIndex = 1;
        document.getElementById("Setting").style.visibility = 'visible';
        document.getElementById("Setting").style.overflow = "scroll";
    }
    else {
        setting.visibility = 'hidden';
    }
}

function GotoSearch() {
    HideAll();
    document.getElementById("SearchText").style.visibility = 'visible';
    document.getElementById("btnsearch").style.visibility = 'visible';
    document.getElementById("search").style.visibility = 'visible';
    ShowResults();

}

function GotoPage() {
    HideAll();

    ShowResults();
}

function GotoSong() {
    updateAll();
    HideAll();
    document.getElementById("Output1").style.visibility = "visible";
    document.getElementById("Output1").style.overflow = "scroll";
    //document.getElementById("OutTitle1").style.visibility = "visible";
    document.getElementById("LowerMenu").style.visibility = "visible";
    var Ssearch = document.getElementById("SearchText").value;
    t = document.getElementById("Output1");
    //    l = t.value.indexOf(Ssearch);
    //    if (l != -1) {
    //        t.selectionStart = l;
    //        t.selectionEnd = l + Ssearch.length;
    //    }
    AddHistory();

}

function AddHistory() {

    if (historyList.length == 0) {
        numhl = 0;
        historyList[numhl] = songpage;
    }
    else if (historyList.indexOf(songpage) < 0) {
        numhl = historyList.length;
        historyList[numhl] = songpage;
    }
}

function ToGrid() {
    if (localStorage.grid == null) {
        localStorage.grid = false;
        document.getElementById("numOnly").value = "Page";
    }
    else if (localStorage.grid == "true") {
        localStorage.grid = false;
        document.getElementById("numOnly").value = "Page";
    }
    else {
        localStorage.grid = true;
        document.getElementById("numOnly").value = "Tile";
    }
    PageList(localStorage.CurrentBook - 1);
}

function PageList(BookName) {
    HideAll();
    fistPage = 0;
    document.getElementById("pages").innerHTML = "";
    for (i = 0; i < SongPage.length; i++) {
        if (SongPage[i].Book == book[BookName]) {
            var element = document.createElement("input");
            element.setAttribute("type", "button");
            element.style.margin = "2px";
            if (localStorage.grid == null || localStorage.grid == "false") {
                element.setAttribute("value", SongPage[i].Title);
                element.style.width = (screenWidth - 40) + "px";
            }
            else {
                element.setAttribute("value", SongPage[i].Page);
                element.style.width = (screenWidth - 40) / 3 + "px";
            }
            if (localStorage.local != "file://" && SongPage[i].Mp3 !== "") {
                element.style.backgroundColor = "red";
            }
            else
            {
                element.style.backgroundColor = "white";
            }
            element.style.fontSize = "large"; 
            element.style.height = btHeight;
            element.onclick = new Function('Goto(' + i + ')');

            //element.setAttribute("onclick", "Goto(" + i + ")");
            document.getElementById("pages").appendChild(element);
        }
    }
    ShowPages();

    localStorage.CurrentBook = BookName + 1;
}

function ListPage() {
    PageList(localStorage.CurrentBook - 1);
}

function Chinese() {
    HideAll();
    fistPage = 0;
    if (document.getElementById("books").innerHTML === "") {
        for (i = 0; i < book.length; i++) {
            var element = document.createElement("input");
            element.setAttribute("type", "button");
            element.setAttribute("value", book[i]);
            element.setAttribute("id", i);
            element.setAttribute("tag", "book");
            element.onclick = new Function('PageList(' + i + ')');
            //element.setAttribute("onclick", "PageList(" + fistPage + ")");
            element.style.margin = "2px";
            element.style.width = (screenWidth - 40) + "px";
            element.style.height = btHeight;
            element.style.fontSize = "large"; 
            document.getElementById("books").appendChild(element);
            fistPage++;
        }
        //AddTitle("父的七珍", 'ShowFavor(1)');
        //AddTitle("主的七珍", 'ShowFavor(2)');
        //AddTitle("宇宙一奇", 'ShowFavor(3)');
        //AddTitle("永恆一景", 'ShowFavor(4)');
    }
    ShowBooks();
}

function AddTitle(title, fn)
{
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", title);
    element.setAttribute("id", "ifather");
    element.setAttribute("tag", "book");
    element.onclick = new Function(fn);
    //element.setAttribute("onclick", "PageList(" + fistPage + ")");
    element.style.margin = "2px";
    element.style.width = btWidth;
    element.style.height = btHeight;
    document.getElementById("results").appendChild(element);
}

function LoadSetting() {
    if (localStorage.songpage == null) {
        localStorage.songpage = 0;
    }
    songpage = localStorage.songpage;

    if (localStorage.songpage1 == null) {
        localStorage.songpage1 = 0;
    }
    songpage1 = localStorage.songpage1;

    if (localStorage.bkMarkList == null) {
        bkMarkList = new Array();
    }
    else {
        var newArr = localStorage.bkMarkList.split(",");
        bkMarkList = new Array();
        for (var numbk = 0; numbk < newArr.length; numbk++) {
            bkMarkList[numbk] = parseInt(newArr[numbk]);
        }
    }

    if (localStorage.setcolor == null) {
        Night.checked = false;
    }
    else {
        if (localStorage.setcolor == "false")
            Night.checked = false;
        else
            Night.checked = true;
    }

    if (localStorage.ce == null) {
        C_E.checked = true;
        E_C.checked = false;
    }
    else {
        if (localStorage.ce == "CE") {
            C_E.checked = true;
            E_C.checked = false;
        }
        else {
            C_E.checked = false;
            E_C.checked = true;
        }
    }

    if (localStorage.fontsize == null) {
        localStorage.fontsize = 20;
    }
    $("#fontSize").val(localStorage.fontsize);
    $("#fontrange").val(localStorage.fontsize);

    if (localStorage.localindex == null) {
        localStorage.localindex = 0;
        document.getElementById("mp3NET").checked = true;
    }
    else {
        updateCheck();
    }

    if (localStorage.grid == null) {
        localStorage.grid = false;
        document.getElementById("numOnly").value = "Page";
    }
    else if (localStorage.grid == "true") {
        document.getElementById("numOnly").value = "Page";
    }
    else {
        document.getElementById("numOnly").value = "Title";
    }

    updateAll();
}

function updatelocalindex() {
    if (document.getElementById("mp3NET").checked == true) {
        localStorage.local = dropboxlink;
        localStorage.localindex = "0";
    }
    //if (document.getElementById("mp3HD").checked == true) {
    //    localStorage.local = "file:///storage/extSdCard/GFH/"; //"file:///storage/emulated/0";
    //    localStorage.localindex = "1";
    //}
    if (document.getElementById("mp3SD").checked == true) {
        localStorage.local = "file://";//"file:///storage/extSdCard";
        localStorage.localindex = "2";
    }
    //if (document.getElementById("mp3SS").checked == true) {
    //    localStorage.local = document.getElementById("folder").value;
    //    localStorage.localindex = "3";
    //}
}

function updateCheck() {
    switch (localStorage.localindex) {
        case "0":
            document.getElementById("mp3NET").checked = true;
            break;
        case "1":
            document.getElementById("mp3HD").checked = true;
            break;
        case "2":
            document.getElementById("mp3SD").checked = true;
            break;
        case "3":
            document.getElementById("folder").value = localStorage.local;
            document.getElementById("mp3SS").checked = true;
            break;
    }
}

function updateAll() {
    localStorage.fontsize = $("#fontSize").val();
    localStorage.setcolor = Night.checked;
    if (C_E.checked) {
        localStorage.CE = "CE";
    }
    else {
        localStorage.CE = "EC";
    }
    for (var i = 0; i < alltitle.length; i++) {
        if (localStorage.CE == "CE") {
            book[i] = alltitle[i];
        }
        else {
            book[i] = alltitle1[i];
        }

    }
    Output1.style.fontSize = localStorage.fontsize + "pt";

    if (localStorage.setcolor == "false") {
        SetColor(true);
    }
    else {
        SetColor(false);
    }

    updatelocalindex();
}

function updateTextInput(val) {
    document.getElementById('fontSize').value = val;
    localStorage.fontsize = $("#fontSize").val();
    Output1.style.fontSize = localStorage.fontsize + "pt";
}

function addBookmark() {
    //bkMarkList.length = 0;
    if (bkMarkList.length == 0) {
        if (confirm("Add To Bookmarks")) {
            numbk = 0;
            bkMarkList[numbk] = songpage;
            localStorage.bkMarkList = bkMarkList.toString();
        }
    }
    else {
        var test = bkMarkList.indexOf(songpage);
        if (test == -1) {
            if (confirm("Add To Bookmarks")) {
                numbk = bkMarkList.length;
                bkMarkList[numbk] = songpage;
                localStorage.bkMarkList = bkMarkList.toString();
            }
        }
    }

}

function deleteBookmark(i) {
    bkMarkList.splice(i, 1);
    numbk--;
    localStorage.bkMarkList = bkMarkList.toString();
    if (bkMarkList.length != 0) {
        openBookmark();
    }
    else {
        GotoSong();
    }
}

function openBookmark() {
    if (bkMarkList.length > 0) {
        HideAll();
        document.getElementById("results").innerHTML = "";

        for (var i = 0; i < bkMarkList.length; i++) {
            try {
                var pointer = bkMarkList[i];
                var element = document.createElement("input");
                element.setAttribute("type", "button");
                element.setAttribute("value", SongPage[pointer].Book + "--" + SongPage[pointer].Title);
                element.style.margin = "2px";
                element.style.width = screenWidth - 80 + "px";
                element.style.height = btHeight;
                element.onclick = new Function('Goto(' + pointer + ')');

                //element.setAttribute("onclick", "Goto(" + pointer + ")");
                document.getElementById("results").appendChild(element);

                var el = document.createElement("input");
                el.setAttribute("type", "button");
                el.setAttribute("value", "X");
                el.style.margin = "0px";
                el.style.width = "40px";
                el.style.height = "50px";
                el.setAttribute("onclick", "deleteBookmark(" + i + ")");
                document.getElementById("results").appendChild(el);
            }
            catch (e) { }
        }
        ShowResults();
    }
    else {
        //Showalert("Click song to add bookmarks")
    }
}

function Showalert(msg) {
    try {
        alert(d);
    }
    catch (e) {
        navigator.notification.alert(msg, "ADD", "OK");
    }

}

function ShowHistory() {
    HideAll();
    document.getElementById("results").innerHTML = "";
    for (var i = 0; i < historyList.length; i++) {
        var pointer = historyList[i];
        var element = document.createElement("input");
        element.setAttribute("type", "button");
        element.setAttribute("value", SongPage[pointer].Book + "--" + SongPage[pointer].Title);
        element.style.margin = "2px";
        element.style.width = btWidth;
        element.style.height = btHeight;
        element.onclick = new Function('Goto(' + pointer + ')');

        //element.setAttribute("onclick", "Goto(" + pointer + ")");
        document.getElementById("results").appendChild(element);
    }
    ShowResults();
}

function ShowAllMP3() {
    HideAll();
    document.getElementById("results").innerHTML = "";

    for (var i = 0; i < SongPage.length; i++) {
        if (SongPage[i].Mp3 !== "") {
            var pointer = i;
            var element = document.createElement("input");
            element.setAttribute("type", "button");
            element.setAttribute("value", SongPage[pointer].Book + "--" + SongPage[pointer].Title);
            element.style.margin = "2px";
            element.style.width = btWidth;
            element.style.height = btHeight;
            element.style.backgroundColor = "red";
            element.onclick = new Function('Goto(' + pointer + ')');
            document.getElementById("results").appendChild(element);
        }
    }
    ShowResults();
}

function GetPointerBookPage(fbook, fpage) {
    var opennum = 0;
    for (var i = 0; i < SongPage.length; i++) {
        if (SongPage[i].Book === fbook) {
            if (SongPage[i].Page === fpage) {
                opennum = i;
                i = SongPage.length;
            }
        }
    }
    return opennum;
}

function ShowFavor(i) {
    switch (i) {
        case 1:
            var listbook = ["第十二冊", "第八冊", "第十一冊", "第八冊", "第十冊", "第十一冊", "第八冊"];
            var listpage = ["6", "4", "16", "13", "36", "40", "20"];
            break;
        case 2:
            var listbook = ["第十三冊", "第十三冊", "第十一冊", "第十一冊", "第八冊", "第八冊", "第十一冊"];
            var listpage = ["20", "39", "91", "151", "66", "24", "107"];
            break;
        case 3:
            var listbook = ["第十三冊", "奧秘詩歌", "第十三冊", "第十二冊", "愛的迴響", "第八冊", "第四冊"];
            var listpage = ["32", "33", "82", "53", "40", "46", "12"];
            break;
        case 4:
            var listbook = ["第六冊", "第十二冊", "愛的迴響", "第十一冊", "愛的迴響", "第六冊", "第九冊"];
            var listpage = ["74", "80", "77", "207", "79", "74", "74"];
            break;
    }
    HideAll();
    document.getElementById("results").innerHTML = "";

    for (var i = 0; i < listbook.length; i++) {
        var pointer = GetPointerBookPage(listbook[i], listpage[i]);
        var element = document.createElement("input");
        element.setAttribute("type", "button");
        element.setAttribute("value", SongPage[pointer].Book + "--" + SongPage[pointer].Title);
        element.style.margin = "2px";
        element.style.width = btWidth;
        element.style.height = btHeight;
        element.onclick = new Function('Goto(' + pointer + ')');
    
        //element.setAttribute("onclick", "Goto(" + pointer + ")");
        document.getElementById("results").appendChild(element);
    } 
    ShowResults();
}

function webViewerLoad() {
    var mybook = location.search.split('mybook=')[1];
    var mypage = location.search.split('mypage=')[1];

    viewport();
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    webViewerLoad();
} else {
    document.addEventListener('DOMContentLoaded', webViewerLoad, true);
}

function toggleMenu() {
    if (menuOn == 0) {
        HideAll();
        showTEXT();
        $('.responsive-menu').toggleClass('expand', true);
        menuOn = 1;
    }
    else {
        HideAll();
        showTEXT();
        $('.responsive-menu').toggleClass('expand', false);
        menuOn = 0;
    }
}

function showPDF() {
    HideAll();
    document.getElementById("Output1").style.visibility = 'hidden';
    document.getElementById("iview").style.visibility = 'visible';
}

function showTEXT() {
    HideAll();
    document.getElementById("Output1").style.visibility = 'visible';
    document.getElementById("iview").style.visibility = 'hidden';
}

function onBook1() {

    $('.responsive-menu').toggleClass('expand', false)
    menuOn = 0;
    showTEXT();
}

function onBook2() {
    location.href = 'PDF/viewer.html?mybook=./bk1.pdf';
}

function onBook12() {
    location.href = 'PDF/viewer.html?mybook=./bk12.pdf';
}

function onBook13() {
    location.href = 'PDF/viewer.html?mybook=./bk13.pdf';
}

function onBook14() {
    location.href = 'PDF/viewer.html?mybook=./bk14.pdf';
}

function onBook15() {
    location.href = 'PDF/viewer.html?mybook=./bk15.pdf';
}

function onBook16() {
    location.href = 'PDF/viewer.html?mybook=./bk16.pdf';
}