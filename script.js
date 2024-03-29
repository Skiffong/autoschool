document.addEventListener("DOMContentLoaded", () => {
  /*burger menu*/
  let header__burger = document.querySelector(".header__burger");
  let header__menu = document.querySelector(".header__menu");
  let lock = document.querySelector("body");
  let header__list = document.querySelector(".header__list");
  let header__body = document.querySelector(".header__body");

  header__burger.onclick = function () {
    header__burger.classList.toggle("active");
    header__menu.classList.toggle("active");
    lock.classList.toggle("lock");
  };

  header__list.onclick = function () {
    header__burger.classList.remove("active");
    header__menu.classList.remove("active");
    lock.classList.remove("lock");
  };

  document.addEventListener("click", (e) => {
    const outOfMenu = e.composedPath().includes(header__burger);

    if (!outOfMenu) {
      header__burger.classList.remove("active");
      header__menu.classList.remove("active");
      lock.classList.remove("lock");
    }
  });

  //scroll
  function scrollFunction() {
    if (document.documentElement.clientWidth >= 768) {
      window.onscroll = function () {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          header__body.style.height = "50px";
        } else {
          header__body.style.height = "80px";
        }
      };
    }
  }
  scrollFunction();
  window.addEventListener(
    "resize",
    () => {
      if (document.documentElement.clientWidth >= 768) {
        window.onscroll = function () {
          scrollFunction();
        };
      }
    },
    true
  );

  $(".auto__slider").slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });

  $(".teachers__wrapper").slick({
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });

  // send request
  const form = document.querySelector(".preview__form");
  form.addEventListener("submit", formSend);

  function formSend(e) {
    e.preventDefault();

    let formData = new FormData(form);
    formData.append("project_name", window.location.href);
    formData.append("admin_email", "email@email.com");//емайл куда должны приходить формы
    formData.append("form_subject", "Форма записи на курсы");

    form.classList.add("_sending");

    let response = fetch("https://avtoskola.by/mail/mail.php", {
      method: "POST",
      mode: "no-cors",

      // Adding body or contents to send
      body: JSON.stringify(Object.fromEntries(formData)),

      // Adding headers to the request
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
      alert("Ваша заявка принята, скоро мы Вам перезвоним");
      form.reset();
      form.classList.remove("_sending");
    
  }
  /* map scroll */
  $(".map").click(function () {
    $(".map iframe").css("pointer-events", "auto");
  });

  $(".map").mouseleave(function () {
    $(".map iframe").css("pointer-events", "none");
  });
});
