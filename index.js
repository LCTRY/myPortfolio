const focus = document.querySelector("[data-focus]")
const home_element = document.getElementById("home")
const about_element = document.getElementById("about")
const skills_element = document.getElementById("skills")
const portfolio_element = document.getElementById("portfolio")
const contact_element = document.getElementById("contact")
const home_a = document.getElementById("nav__home")
const about_a = document.getElementById("nav__about")
const skills_a = document.getElementById("nav__skills")
const portfolio_a = document.getElementById("nav__portfolio")
const contact_a= document.getElementById("nav__contact")
const allAnchors = [...document.querySelectorAll("a")]
const contact_input_elements = document.querySelectorAll(".contact__input")
const project_hidden_elements = document.getElementsByClassName('hide')
const project_shown_elements = document.getElementsByClassName('show')

const resume_exit_btn = document.getElementById("resume_exit_btn")
const exit_left_btn = document.getElementById("exit_portfolio_left")
const exit_center_btn = document.getElementById("exit_portfolio_center")
const exit_right_btn = document.getElementById("exit_portfolio_right")
const show_resume_btn= document.getElementById("home_showResume_btn") 
const projects_element = document.getElementsByClassName("portfolio__container")
const portfolio_left_element =  document.getElementById("portfolio_left")
const portfolio_center_element =  document.getElementById("portfolio_center")
const portfolio_right_element =  document.getElementById("portfolio_right")
const resume_element = document.getElementById("resume")

show_resume_btn.addEventListener("click", function(){
  resume_element.classList.add("open");
})
resume_exit_btn.addEventListener("click", function(){
  resume_element.classList.remove("open");
})

window.addEventListener('mouseup', function(e){
  if (e.target !== resume_element) {
    resume_element.classList.remove("open");
  }
})

window.addEventListener("scroll", function (){
  let scroll = window.scrollY + 10;
  let spacing = contact_element.getBoundingClientRect().height * 1
  if (scroll >= 0 && window.screenY  <= about_element.offsetTop)  updateNavBar (home_a, 0);
  if (scroll >= about_element.offsetTop && window.screenY  <= skills_element.offsetTop) updateNavBar (about_a,1);
  if (scroll >= skills_element.offsetTop && window.screenY  <= portfolio_element.offsetTop) updateNavBar (skills_a,2);
  if (scroll >= portfolio_element.offsetTop && window.screenY  <= contact_element.offsetTop) updateNavBar (portfolio_a,3);
  if (scroll + spacing >= contact_element.offsetTop) updateNavBar (contact_a,4);
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
      });
  });
});

function updateNavBar (heading, index) {
  document.querySelectorAll("a").forEach(elem => {elem.classList.remove("active")});
  heading.classList.add("active");
  focus.style.setProperty("--position", index);
}

function updateMessageFocus () {
  let parent = this.parentNode;
  parent.classList.add("message_focus");
}

function blurMessage () {
  let parent = this.parentNode;
  if (this.value == "") parent.classList.remove("message_focus");
}

contact_input_elements.forEach((inputs) => {
  inputs.addEventListener("focus", updateMessageFocus)
  inputs.addEventListener("blur", blurMessage)
})

function sendEmail(){
  const name_ele = document.getElementById("contact__form-name").value
  const email_ele = document.getElementById("contact__form-email").value
  const phone_ele = document.getElementById("contact__form-phone").value
  const message_ele = document.getElementById("contact__form-message").value
  const confirmation_el = document.getElementById("contact__confirmation")

  Email.send({
    SecureToken:"6b4aee9c-bec6-4dd1-a8f4-a1f46480df59",
    To : "youngahector@gmail.com",
    From : "hectorayoung@gmail.com",
    Subject : `Portfolio - Message from ${name_ele}`,
    Body : `Name: ${name_ele} <br/>
            Phone: ${phone_ele} <br/>
            Email: ${email_ele} <br/>
            Message: ${message_ele}
            `
}).then(
  message => alert(message)
);

confirmation_el.innerHTML = "Message Sent"
setTimeout(() => {confirmation_el.innerHTML = ""}, 8000);
document.getElementById("contact__form").reset();
}
