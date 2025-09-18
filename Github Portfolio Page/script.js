const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  const shortAnswer = faq.querySelector('.short');
  const longAnswer = faq.querySelector('.long');
  const moreBtn = faq.querySelector('.more-button');
  const lessBtn = faq.querySelector('.less-button');

  moreBtn.addEventListener('click', () => {
    // Close all FAQs first (accordion style)
    document.querySelectorAll('.long').forEach(ans => ans.classList.add("hidden"));
    document.querySelectorAll('.short').forEach(ans => ans.classList.remove("hidden"));
    document.querySelectorAll('.more-button').forEach(btn => btn.classList.remove("hidden"));
    document.querySelectorAll('.less-button').forEach(btn => btn.classList.add("hidden"));

    // Open this one
    shortAnswer.classList.add("hidden");
    longAnswer.classList.remove("hidden");
    moreBtn.classList.add("hidden");
    lessBtn.classList.remove("hidden");
  });

  lessBtn.addEventListener('click', () => {
    shortAnswer.classList.remove("hidden");
    longAnswer.classList.add("hidden");
    moreBtn.classList.remove("hidden");
    lessBtn.classList.add("hidden");
  });
});
