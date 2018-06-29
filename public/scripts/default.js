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
var displayBoth = 1;
var appData;
var numhl = 0;
var AudioL;
var btHeight;
var btWidth;


$(document).ready(function () {
    $("#info").click(function () { Info(); });
    $("#btSetting").click(function () { GotoSetting(); });
    $("#btBack").click(function () { GotoSong(); UpdateDisplay(); });
    $("#btBook").click(function () { Chinese(); });
    $("#btPage").click(function () { ListPage(); });
    $("#btFind").click(function () { GotoSearch(); });
    $("#btDisplay").click(function () { Both(); });
    $("#btBookmarks").click(function () { openBookmark(); });
    $("#Output1").click(function () { addBookmark(); });
    $("#btBackPage").click(function () { Back(); });
    $("#btNextPage").click(function () { Next(); });

    //$("#OutTitle1").click(function () { ShowHistory(); });
    $("#OutTitle1").click(function () { ShowAllMP3(); });
    $("#OutTitle2").click(function () { Toggle(); });
    $("#numOnly").click(function () { ToGrid(); });
    $("#btnback").click(function () { GotoSong(); UpdateDisplay(); });
    $("#btnsearch").click(function () { Search1(); });
    historyList = new Array();
    //appData = Windows.Storage.ApplicationData.current;
    DisplayBook();
    var filepointer = null;

    //WinJS.Namespace.define("SdkSample", {
    //    validateFileExistence: validateFileExistence,
    //    filelink: filepointer
    //});
});

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
    document.getElementById(id).style.background = "black";
    document.getElementById(id).style.color = "white";
}

function SetLight(id) {
    document.getElementById(id).style.background = "white";
    document.getElementById(id).style.color = "black";
}

function SetColor(light) {
    if (light) {
        SetLight("results");
        SetLight("Output1");
        SetLight("Output2");
        SetLight("Setting");
        SetLight("song");
        //SetLight("OutTitle1");
        //SetLight("OutTitle2");
        //SetLight("Back");
        SetLight("Setting");
        //SetLight("search");
    }
    else {
        SetBlack("results");
        SetBlack("Output1");
        SetBlack("Output2");
        SetBlack("Setting");
        SetBlack("song");
        //SetBlack("OutTitle1");
        //SetBlack("OutTitle2");
        //SetBlack("Back");
        SetBlack("Setting");
        //SetBlack("search");
    }
}

function viewport() {
    var g = document.documentElement;
    screenHeight = g.clientHeight - 150;
    screenWidth = g.clientWidth;

    document.getElementById("Output1").style.width = (screenWidth - 40) + "px";
    document.getElementById("Output1").style.height = screenHeight + "px";

    document.getElementById("Output2").style.width = (screenWidth - 40) + "px";
    document.getElementById("Output2").style.height = screenHeight + "px";

    document.getElementById("OutTitle1").style.width = (screenWidth ) + "px";
    document.getElementById("OutTitle2").style.width = (screenWidth ) + "px";

    document.getElementById("results").style.height = (screenHeight + 80) + "px";
    document.getElementById("results").style.width = screenWidth + "px";

    document.getElementById("Setting").style.height = (screenHeight + 80) + "px";
    document.getElementById("Setting").style.width = screenWidth + "px";

    document.getElementById("Menu").style.width = screenWidth + "px";
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

var alltitle = ["第一冊", "第二冊", "第三冊", "第四冊", "第五冊", "第六冊", "第七冊", "第八冊", "第九冊", "第十冊", "第十一冊", "第十二冊", "第十三冊", "第十四冊", "第十五冊", "第十六冊", "愛的迴響", "晨鳥", "詩歌分享", "世上奇珍的禱告 (簡短版)", "世上奇珍的禱告", "God Family Hymnal", "Hymnal 1", "Hymnal 2", "Hymnal 3", "Songs of Love", "Songs of My Heart 1", "Songs of My Heart 2", "Songs of My Heart 3", "Songs of My Heart 5", "Songs of My Heart 6", "Songs of My Heart 7", "Songs of My Heart 8", "Songs of My Heart 9", "Pray the precious prayers (CV)", "Pray the precious prayers"]
var alltitle1 = ["God Family Hymnal", "Hymnal 1", "Hymnal 2", "Hymnal 3", "Songs of Love", "Songs of My Heart 1", "Songs of My Heart 2", "Songs of My Heart 3", "Songs of My Heart 5", "Songs of My Heart 6", "Songs of My Heart 7", "Songs of My Heart 8", "Songs of My Heart 9", "Pray the precious prayers (CV)", "Pray the precious prayers", "第一冊", "第二冊", "第三冊", "第四冊", "第五冊", "第六冊", "第七冊", "第八冊", "第九冊", "第十冊", "第十一冊", "第十二冊", "第十三冊", "第十四冊", "第十五冊", "第十六冊", "愛的迴響", "晨鳥", "詩歌分享", "世上奇珍的禱告 (簡短版)", "世上奇珍的禱告"]

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
        show1();
        songpage--;
        UpdateDisplay();
    }
}

function Next() {
    if (songpage < SongPage.length - 1) {
        GotoSong();
        CheckAudio = false;
        show1();
        songpage++;
        UpdateDisplay();
    }
}

function show1() {
    viewport();
    var h = screenHeight;
    document.getElementById("Output1").style.height = h + "px";
    document.getElementById("Output1").scrollTop = 0;
    document.getElementById("Output2").style.height = h + "px";
    document.getElementById("Output2").style.visibility = "hidden";
    //displayBoth = 0;
}

function show2() {
    viewport();
    var h = screenHeight / 2;
    document.getElementById("Output1").style.height = h + "px";
    document.getElementById("Output2").style.height = h + "px";
    document.getElementById("Output2").style.top = h + 80 + "px";

    document.getElementById("Output2").style.visibility = "visible";
    //displayBoth = 1;
}

function Both() {
    //if (document.getElementById("OutTitle2").innerHTML != "") {
        if (displayBoth == 1) {
            //show1();
            displayBoth = 0;
        }
        else {
            //show2();
            displayBoth = 1;
        }
        UpdateDisplay();
    //}
}

function Toggle() {
    if (document.getElementById("OutTitle2").innerHTML != "") {
        songpage = songpage1;
        UpdateDisplay();
    }
}

function UpdateDisplay() {

    ThisBook(songpage);
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
    //document.getElementById("OutTitle2").innerHTML = Book[songpage1].childNodes[0].nodeValue + "--" + Page[songpage1].childNodes[0].nodeValue;
    //document.getElementById("Output2").innerHTML = Title[songpage1].childNodes[0].nodeValue + "<br/>" + Content[songpage1].childNodes[0].nodeValue.replace(/\n/g, "<br />") + "<br/><br/><br/><br/>";
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
                        document.getElementById("Output2").innerHTML = SongPage[i].Context;
                        if(displayBoth === 1)
                            UpdateDisplay1();
                        //show2();
                    }
                }
            }

        }
        else {
            document.getElementById("OutTitle2").innerHTML = "";
            show1();
        }
        show1();

    }

}

function ShowResults() {
    document.getElementById("results").style.height = (screenHeight + 80) + "px";
    document.getElementById("results").style.width = screenWidth + "px";
    document.getElementById("results").style.overflow = "scroll";
    document.getElementById("results").style.visibility = "visible";
    document.getElementById("TitleBack").style.visibility = "visible";
    results.style.zIndex = 1;
}

function HideResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("results").style.height = screenHeight + "px";
    document.getElementById("results").style.width = screenWidth + "px";
    document.getElementById("results").style.overflow = "hidden";
    document.getElementById("results").style.visibility = "hidden";
    results.style.zIndex = -1;

}

function Search1() {
    var Ssearch = document.getElementById("SearchText").value.toUpperCase();
    HideResults();
    if (Ssearch != "") {

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
    document.getElementById("song").style.visibility = 'hidden';
    document.getElementById("Output1").style.visibility = "hidden";
    document.getElementById("OutTitle1").style.visibility = "hidden";
    document.getElementById("Output2").style.visibility = "hidden";
    document.getElementById("OutTitle2").style.visibility = "hidden";
    document.getElementById("Output1").style.overflow = "hidden";
    document.getElementById("Output2").style.overflow = "hidden";
    document.getElementById("Title").style.visibility = "hidden";

    document.getElementById("Setting").style.visibility = 'hidden';
    document.getElementById("Menu").style.visibility = "hidden";
    document.getElementById("search").style.visibility = 'hidden';
    //document.getElementById("btBack").style.visibility = 'hidden';
    document.getElementById("SearchText").style.visibility = 'hidden';
    document.getElementById("btnsearch").style.visibility = 'hidden';
    document.getElementById("TitleBack").style.visibility = 'hidden';
    //document.getElementById("AudioLeft").src = "";
    document.getElementById("AudioLeft").style.visibility = 'hidden';
    document.getElementById("numOnly").style.visibility = 'hidden';
    HideResults();
}

function GotoSetting() {
    HideAll();
    Setting.style.zIndex = 1;
    document.getElementById("Setting").style.visibility = 'visible';
    document.getElementById("Setting").style.overflow = "scroll";
    document.getElementById("TitleBack").style.visibility = 'visible';
}

function GotoSearch() {
    HideAll();
    document.getElementById("SearchText").style.visibility = 'visible';
    document.getElementById("btnsearch").style.visibility = 'visible';
    document.getElementById("search").style.visibility = 'visible';
    document.getElementById("TitleBack").style.visibility = 'visible';
    //document.getElementById("btBack").style.visibility = 'visible';

}

function GotoPage() {
    HideAll();
    show1();
    ShowResults();
}

function GotoSong() {
    updateAll();
    HideAll();
    document.getElementById("Menu").style.visibility = 'visible';
    document.getElementById("song").style.visibility = 'visible';
    document.getElementById("Output1").style.visibility = "visible";
    document.getElementById("Output1").style.overflow = "scroll";
    document.getElementById("OutTitle1").style.visibility = "visible";
    document.getElementById("OutTitle2").style.visibility = "visible";
    document.getElementById("Title").style.visibility = "visible";

    if (NumDisplay == 0) {
        document.getElementById("Output2").style.visibility = "visible";
        document.getElementById("Output2").style.overflow = "scroll";
    }
    document.getElementById("Menu").style.visibility = "visible";

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
    for (i = 0; i < SongPage.length; i++) {
        if (SongPage[i].Book == book[BookName]) {
            var element = document.createElement("input");
            element.setAttribute("type", "button");
            element.style.margin = "2px";
            if (localStorage.grid == null || localStorage.grid == "false") {
                element.setAttribute("value", SongPage[i].Title);
                element.style.width = btWidth;
            }
            else {
                element.setAttribute("value", SongPage[i].Page);
                element.style.width = (screenWidth - 30) / 3 + "px";
            }
            if (localStorage.local != "file://" && SongPage[i].Mp3 !== "") {
                element.style.backgroundColor = "orange";
            }
 
            element.style.height = btHeight;
            element.onclick = new Function('Goto(' + i + ')');

            //element.setAttribute("onclick", "Goto(" + i + ")");
            document.getElementById("results").appendChild(element);
        }
    }
    ShowResults();
    localStorage.CurrentBook = BookName + 1;
    document.getElementById("numOnly").style.visibility = 'visible';
}

function ListPage() {
    PageList(localStorage.CurrentBook - 1);
}

function Chinese() {
    HideAll();
    fistPage = 0;
    for (i = 0; i < book.length ; i++) {
        var element = document.createElement("input");
        element.setAttribute("type", "button");
        element.setAttribute("value", book[i]);
        element.setAttribute("id", i);
        element.setAttribute("tag", "book");
        element.onclick = new Function('PageList(' + i + ')');
        //element.setAttribute("onclick", "PageList(" + fistPage + ")");
        element.style.margin = "2px";
        element.style.width = btWidth;
        element.style.height = btHeight;
        document.getElementById("results").appendChild(element);
        fistPage++;
    }
    AddTitle("父的七珍", 'ShowFavor(1)');
    AddTitle("主的七珍", 'ShowFavor(2)');
    AddTitle("宇宙一奇", 'ShowFavor(3)');
    AddTitle("永恆一景", 'ShowFavor(4)');
    ShowResults();
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
    Output2.style.fontSize = localStorage.fontsize + "pt";
    if (localStorage.fontsize <= 30) {
        OutTitle1.style.fontSize = localStorage.fontsize + "pt";
        OutTitle2.style.fontSize = localStorage.fontsize + "pt";
    }
    else {
        OutTitle1.style.fontSize = "30pt";
        OutTitle2.style.fontSize = "30pt";
    }

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
    Output2.style.fontSize = localStorage.fontsize + "pt";
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
    for (var i = 0; i < SongPage.length; i++) {
        if (SongPage[i].Mp3 !== "") {
            var pointer = i;
            var element = document.createElement("input");
            element.setAttribute("type", "button");
            element.setAttribute("value", SongPage[pointer].Book + "--" + SongPage[pointer].Title);
            element.style.margin = "2px";
            element.style.width = btWidth;
            element.style.height = btHeight;
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
