// the 'data' variable should be filled at this point

function start()
{
    let actiepunten = document.getElementById("actiepunten");

    actiepunten.innerHTML = ""; // bye

    let n = data.length;

    var e = document.getElementById("taalvoorkeur");
    var value = e.value;


    if (value == 'nederlands') {
        for (let i = 0; i < n; i++)
        {
            var html = template_actiepunt(data[i].id, data[i].nederlands.titel, data[i].nederlands.beschrijving, data[i].nederlands.toelichting);
            actiepunten.insertAdjacentHTML("beforeend", html);

            if (i != n-1)
            {
                actiepunten.insertAdjacentHTML("beforeend", template_pijl());
            }
        }
    } else {
        for (let i = 0; i < n; i++)
        {
            var html = template_actiepunt(data[i].id, data[i].engels.titel, data[i].engels.beschrijving, data[i].engels.toelichting);
            actiepunten.insertAdjacentHTML("beforeend", html);

            if (i != n-1)
            {
                actiepunten.insertAdjacentHTML("beforeend", template_pijl());
            }
        }
    }
}

function update()
{
    let items = document.getElementsByClassName("actiepunt");

    let is_visible = true;
    let i = 0;

    for (let item of items) {

        let is_checked = item.querySelector(".checkbox").checked;

        // Show or hide the element.
        if (is_visible)
        {
            item.classList.remove("hidden");
            item.getElementsByClassName("checkbox")[0].disabled = false;
            if (is_checked)
            {
                item.classList.add("done");
            }
            else
            {
                item.classList.remove("done");
            }
        }
        else
        {
            item.classList.add("hidden");
            item.getElementsByClassName("checkbox")[0].disabled = true;

            item.classList.remove("done");
        }

        // When we meet an unchecked item, disable visibility for all next items.

        // I've disabled this for now, so people can cross things off, non-sequential.
        // if (!is_checked)
        // {
        //     is_visible = false;
        // }

        i++;
    };
}

function clear()
{
    let items = document.getElementsByClassName("actiepunt");

    for (let item of items) {
        checkbox = item.querySelector(".checkbox");
        checkbox.checked = false;
    }
}

function reset()
{
    clear();
    save_to_cookies();

    start();
    update();

    document.documentElement.scrollTop = 0;
}

function save_to_cookies()
{
    let items = document.getElementsByClassName("actiepunt");

    for (let item of items) {
        checkbox = item.querySelector(".checkbox");
        let is_checked = checkbox.checked;

        set_cookie(String(checkbox.id), String(is_checked));
    }
}

function load_from_cookies()
{
    let items = document.getElementsByClassName("actiepunt");

    for (let item of items) {
        checkbox = item.querySelector(".checkbox");

        let v = get_cookie(checkbox.id);

        if (v == String(true))
        {
            checkbox.checked = true;
        }
        else
        {
            checkbox.checked = false;
        }
    }
}

// Simply copy-pasting this from w3schools:

function set_cookie(cname, cvalue) {
    let days = 40;
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function get_cookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function template_actiepunt(id, titel, beschrijving, toelichting)
{
    return `
        <div class="actiepunt" id=${id}>
            <div class="box">
            <p class="titel titelfont">${titel}</p>
            <p class="beschrijving">${beschrijving}</p>
            <div class="check">
                <input class="checkbox" type="checkbox" id="${id}" onchange="save_to_cookies(); update()">
                <label class="titelfont" for="${id}">Check</label>
            </div>
            </div>
            <div class="inklapbaar">
            <div class="box toevoeging">
                <p class="toelichting">${toelichting}</p>
            </div>
            </div>
        </div>`
}



function template_pijl()
{
    return `
        <img class="pijl" src="../res/img/arrow_down_thin_120.png">`
}


window.addEventListener('load', function () {
    start();
    load_from_cookies();
    update();
  })
